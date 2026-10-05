---
name: git-operations
description: Use para operar Git com segurança através das ferramentas MCP do Code Awareness: inspecionar estado e mudanças, preparar commits, gerenciar branches, sincronizar remoto, fazer merge/revert, preservar worktree com shelves, resolver conflitos tipados e recuperar mutações por operationId. Use quando uma tarefa exigir alteração real do repositório via Git Operations. Não use para editar código, navegar arquitetura ou substituir validação de implementação.
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

## Branches e remoto

Use `manage_git_branch` para operações locais tipadas.

Antes de decisões dependentes do remoto, prefira `sync_git_remote FETCH` quando freshness remota importar.

Use:

- `PULL_FF_ONLY` quando a intenção for apenas avançar sem criar merge;
- `PUSH` sem force;
- `merge_git_branch` com FF_ONLY por padrão quando aplicável;
- MERGE somente quando a integração real exigir merge commit/semântica de merge.

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

> Estado observado define a precondition. Paths explícitos definem a intenção. operationId define a identidade da mutação. Verificação mínima confirma o resultado. Nunca troque segurança por atalhos e nunca aumente chamadas para descobrir algo que o próprio contrato pode responder.
