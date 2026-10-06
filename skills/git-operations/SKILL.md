---
name: git-operations
description: Use para operar Git com segurança através das ferramentas MCP do Code Awareness: inspecionar estado e mudanças, manter a higiene do worktree, preparar commits, gerenciar branches e upstreams, sincronizar remoto, fazer merge/revert, preservar trabalho com shelves, resolver conflitos tipados e recuperar mutações por operationId. Use quando uma tarefa exigir alteração real do repositório via Git Operations. Não use para editar código, navegar arquitetura ou substituir validação de implementação.
---

# Git Operations

## Finalidade

Use Git Operations para executar mudanças Git reais com segurança, baixo ruído e estado observável.

Princípio:

> Inspecione antes de mutar. Preserve intenção explicitamente. Use preconditions. Reutilize operationId para recuperar resultado; nunca repita uma mutação às cegas.

Git Operations não substitui CodeScope, validação, System Health ou Continuum.

- CodeScope explica o repositório.
- Continuum informa o que aconteceu anteriormente.
- Git Operations altera e verifica o estado Git atual.
- Validation Evidence Channels decide como provar software.
- System Health localiza falhas operacionais.

## Comece pelo estado

Antes de qualquer mutação relevante, use `get_git_state`.

Observe quando aplicável:

- branch;
- HEAD;
- upstream;
- ahead/behind;
- staged/unstaged/untracked;
- conflitos;
- operação Git ativa;
- `indexRevision`;
- `worktreeRevision`.

Use `get_git_changes` somente quando precisar descobrir quais paths compõem o estado dirty.

Não leia diffs amplos por rotina.

## Higiene do worktree

Worktree limpo é uma propriedade operacional desejável, mas nunca justifica ocultar, descartar ou misturar trabalho não compreendido.

Quando o estado dirty for dominado por untracked gerado, ou antes de concluir uma implementação, use `analyze_git_hygiene` antes de enumerar centenas de paths manualmente.

A análise deve separar:

- mudanças tracked legítimas;
- resíduos gerados;
- projeções de ferramentas;
- runtimes, logs e validações;
- untracked não classificados que ainda exigem inspeção.

Para novas regras de ignore:

`analyze_git_hygiene`
→ escolher somente regras justificadas
→ `manage_gitignore(PREVIEW_ADD)`
→ verificar `newlyIgnoredCount`, grupos afetados e `remainingUntrackedCount`
→ `manage_gitignore(ADD)` com o mesmo `expectedWorktreeRevision` e `expectedPreviewId`.

`PREVIEW_ADD` é obrigatório antes de `ADD`.

Nunca use `.gitignore` para esconder:

- arquivos tracked modificados;
- trabalho cuja intenção ainda não foi determinada;
- conteúdo fonte apenas porque dificulta staging;
- uma árvore ampla sem evidência de que ela é gerada/disponível para descarte.

Prefira a regra mais estável que represente uma fronteira realmente gerada. Uma regra de diretório raiz só é adequada quando histórico e preview sustentarem que a árvore não contém conteúdo versionado intencionalmente.

`manage_gitignore ADD` é mutação receipted: crie `operationId` antes da primeira tentativa e reutilize o mesmo ID em recuperação.

## Higiene do Implementador

Durante implementação, evite criar resíduos em locais versionáveis quando puder usar áreas já ignoradas.

Antes do handoff final:

1. use `get_git_state`;
2. se houver untracked inesperado ou grande volume dirty, use `analyze_git_hygiene`;
3. preserve mudanças tracked legítimas em commit coerente ou shelf deliberado;
4. trate resíduos gerados por regra de ignore somente após preview;
5. confirme `stagedCount = 0`, `unstagedCount = 0`, `untrackedCount = 0`, salvo estado residual explicitamente justificado.

Não entregue um worktree dirty por acidente.

Se algum dirty precisar permanecer, registre explicitamente no handoff:

- paths ou grupo;
- motivo;
- propriedade/intenção;
- ação esperada do próximo agente.

A meta é que o próximo agente receba um worktree com alto sinal, sem pagar novamente o custo de separar centenas de resíduos do trabalho real.

## Optimistic Concurrency

Preconditions representam o estado que o agente realmente observou.

Use:

- `expectedHead` para proteger história/branch;
- `expectedIndexRevision` para proteger o índice;
- `expectedWorktreeRevision` para proteger o worktree;
- `expectedConflictRevision` para proteger um conflito específico.

Se receber estado stale:

> atualize a evidência e redecida.

Não contorne optimistic concurrency.

## Staging e commit

Nunca use intenção implícita equivalente a “add all” quando existirem mudanças não relacionadas.

Fluxo preferido:

`get_git_changes`
→ selecionar paths explícitos
→ `stage_git_changes`
→ `get_git_state`
→ confirmar staged/indexRevision
→ `commit_git_changes`.

O commit deve representar exatamente o índice inspecionado.

Não misture resíduos desconhecidos com a mudança pretendida apenas para deixar o worktree limpo.

## Branches, upstream e remoto

Use `manage_git_branch` para operações locais tipadas, inclusive o vínculo de upstream da branch atual.

A existência simultânea de `main` e `origin/main` é normal:

- `main` é a branch local;
- `origin/main` é a remote-tracking ref.

O problema é existir uma branch destinada a sincronizar com remoto e ela permanecer com `upstream: null` sem intenção explícita.

### Regra preventiva de tracking

Ao trabalhar em uma branch que deve acompanhar uma branch remota, especialmente a branch principal:

1. observe `get_git_state`;
2. se `upstream` estiver configurado, use `ahead/behind` como sinal de sincronização;
3. se `upstream: null`, determine se isso é intencional;
4. quando o tracking deveria existir, garanta freshness com `sync_git_remote FETCH` se necessário;
5. confirme que a remote-tracking branch alvo existe;
6. use `manage_git_branch(SET_UPSTREAM)` com:
   - `branch` atual;
   - `remote`;
   - `remoteBranch`;
   - `expectedHead`;
   - `operationId`;
7. confirme pelo novo `get_git_state` que `upstream`, `ahead` e `behind` representam o vínculo esperado.

`SET_UPSTREAM` só deve configurar a branch atualmente checkoutada e não faz network I/O.

Não use `PUSH` como substituto implícito de tracking. Sincronizar conteúdo remoto e configurar upstream são intenções distintas:

- `sync_git_remote PUSH` publica o HEAD observado;
- `manage_git_branch SET_UPSTREAM` configura o relacionamento local de tracking.

Quando a branch local e a remote-tracking branch precisarem convergir, primeiro sincronize o conteúdo com as operações remotas seguras e depois estabeleça o upstream.

Antes de decisões dependentes do remoto, prefira `sync_git_remote FETCH` quando freshness remota importar.

Use:

- `PULL_FF_ONLY` quando a intenção for apenas avançar sem criar merge;
- `PUSH` sem force;
- `merge_git_branch` com FF_ONLY por padrão quando aplicável;
- MERGE somente quando a integração real exigir merge commit/semântica de merge.

Não configure upstream para mascarar divergência. Se `main` e `origin/main` apontarem para histórias incompatíveis, resolva primeiro a relação Git real.

Não use Git Operations para reescrever história.

## Shelves

Shelf preserva trabalho legítimo antes de uma operação que exige worktree compatível.

Use somente paths explícitos.

Fluxo:

`get_git_state`
→ `get_git_changes`
→ CREATE dos paths selecionados
→ operação Git necessária
→ RESTORE
→ verificar preservação
→ DROP somente depois da prova.

RESTORE não consome automaticamente o shelf.

Nunca DROP antes de confirmar que o worktree restaurado preserva a intenção original.

Shelves do Code Awareness são próprios da ferramenta. Não manipule stashes externos como se fossem shelves gerenciados.

## Mutation Receipts

Mutações Git que exigem `operationId` possuem recuperação idempotente.

Crie o `operationId` antes da primeira tentativa.

Se a resposta for perdida ou o transporte falhar:

> repita a mesma operação com o mesmo operationId.

Não gere um novo ID para “tentar novamente”.

Resultados esperados:

- primeira execução concluída → `replayed: false`;
- mesma operação concluída consultada novamente → resultado original com `replayed: true`;
- mesmo ID com argumentos diferentes → conflito de idempotência;
- outcome desconhecido/PREPARED → não reexecute cegamente.

Mutation receipt elimina a necessidade de reconstruir manualmente “será que aconteceu?” através de várias consultas.

## Conflitos

Descubra conflitos com `get_git_changes(CONFLICTED)`.

Para um path:

`get_git_conflict`
→ metadata primeiro
→ leia BASE/OURS/THEIRS/WORKTREE somente se necessário.

Use `resolve_git_conflict` apenas quando a intenção final estiver comprovada.

- OURS/THEIRS: somente quando um lado representa integralmente a intenção correta.
- CONTENT: para reconciliação semântica.
- DELETE: somente quando remoção é a intenção real.

Não escolha OURS/THEIRS apenas para encerrar o conflito.

Depois da resolução, verifique o estado antes de continuar merge/revert.

## Revert

Use lifecycle tipado:

- START;
- CONTINUE;
- ABORT.

CONTINUE exige que o estado observado ainda corresponda ao esperado e que conflitos tenham sido resolvidos.

Não substitua revert seguro por reset ou reescrita de história.

## Backpressure e economia de canal

Respeite Operational Guidance.

Se receber:

- `VALIDATION_BUSY`;
- `CHANNEL_DEGRADED`;
- retry guidance;
- `retryAfterMs`;
- active operation/run;

não aumente a pressão no canal.

Não faça polling rápido.

Não use chamadas adicionais para reconstruir uma mutação quando um mutation receipt consegue responder diretamente.

Uma falha de transporte em mutação não autoriza replay com novo `operationId`.

Para disciplina geral de evidência, use `engineering-evidence-economy`.

Para timeout/degradação, use `system-health-debugging`.

## Diffs e histórico

Use `get_git_diff` somente para paths explicitamente relevantes.

Use `get_git_history` quando a decisão depender de commits anteriores.

Git history não substitui Continuum para contexto semântico de implementação; Continuum não substitui Git como autoridade do estado atual.

## Quando parar

Pare quando a intenção Git estiver realizada e objetivamente verificada.

Não continue chamando ferramentas apenas para acumular confiança.

Uma sequência saudável tende a ser:

estado
→ decisão
→ mutação protegida
→ verificação mínima
→ parar.

## Capability Opportunities

Durante uso real, observe fricções como:

- várias chamadas necessárias para responder uma única pergunta operacional;
- ambiguity após mutação;
- falta de backpressure;
- necessidade recorrente de reconstrução manual;
- conflito que exige informação já conhecida pelo sistema.

Quando material, use `capability-opportunity`.

Não amplie automaticamente o escopo da tarefa atual.

## Regras de segurança

Nunca use Git Operations para:

- force push;
- reset hard;
- clean destrutivo;
- rebase interativo;
- rewrite de história;
- comandos Git arbitrários;
- ocultar ou descartar mudanças não compreendidas.

Quando uma operação segura não estiver representada pela superfície tipada, não improvise um equivalente destrutivo.

## Regra final

> Estado observado define a precondition. Paths explícitos definem a intenção. operationId define a identidade da mutação. Upstream explícito define a relação local↔remoto quando ela deve existir. Verificação mínima confirma o resultado. Nunca troque segurança por atalhos e nunca aumente chamadas para descobrir algo que o próprio contrato pode responder.
