---
name: git-operations
description: Use para operar Git e Pull Requests pelo MCP do Code Awareness: estado, evidência, branches, sync, consulta, criação, revisão, fechamento, merge autorizado e reconciliação. Escolha CLI, plugin GitHub ou MCP conforme acesso e autoridade; para Worktrees protegidas use worktree-mcp-operations.
---

# Git Operations

## Finalidade

Esta Skill governa **operações Git pelo Code Awareness MCP**, acessível localmente ou via Cloudflare. CLI, plugin GitHub e Code Awareness MCP são opções que o agente escolhe conforme contexto, capacidade efetiva, custo e autorização, sem preferência universal. **Se escolher Code Awareness MCP, prefira a conexão local à remota Cloudflare quando forem equivalentes e disponíveis; caso contrário, o remoto é permitido.** Os dois transportes são acesso à mesma capability, não duas implementações Git.

Princípio:

> Inspecione antes de mutar. Preserve intenção explicitamente. Use preconditions. Reutilize operationId para recuperar resultado; nunca repita uma mutação às cegas.

Git Operations não substitui Code Navigation, validação, System Health ou Continuum.

- Code Navigation, através do Code Awareness Channel, explica o repositório.
- Continuum informa o que aconteceu anteriormente.
- Git Operations altera e verifica o estado Git atual.
- Validation Evidence Channels decide como provar software.
- System Health localiza falhas operacionais.


## Worktrees remotas protegidas

Se a intenção envolver Worktrees externas, inspeção de checkout alheio, aprovação remota, lease, mutação protegida ou integração por sandbox, utilize `worktree-mcp-operations`. Não carregue o procedimento especializado para Git remoto comum.

## Comece pelo estado

Antes de qualquer mutação relevante, use `get_git_state`.

Observe quando aplicável:

- branch;
- HEAD;
- upstream;
- `ahead/behind` (sempre relativos às refs de tracking locais, sem prova do servidor);
- staged/unstaged/untracked;
- conflitos;
- operação Git ativa;
- `indexRevision`;
- `worktreeRevision`.

Use `get_git_changes` somente quando precisar descobrir quais paths compõem o estado dirty.

### Prova remota sob demanda

Se a decisão depender da posição **real** da branch no servidor, prefira `get_git_state({ remoteCheck: 'VERIFY' })` em vez de presumir que `ahead/behind: 0/0` prove sincronização. A chamada padrão não consulta o remoto e retorna `remoteEvidence.status: NOT_CHECKED`; `VERIFY` utiliza leitura autenticada do upstream sem `fetch`, sem atualizar refs, índice, HEAD ou Worktree.

Interprete `remoteEvidence`:

- `VERIFIED`: use `remoteHead`, `trackingHead`, `localHead`, `observedAt`, `tracking` e `relationship` vinculados àquele instante; `TRACKING_STALE` significa que o cache de tracking não corresponde ao servidor. `remoteCounts: null` ou `relationship: UNKNOWN` não autoriza inventar divergência, FF ou quantidade de commits.
- `NOT_CHECKED`: nenhuma consulta remota foi feita.
- `UNAVAILABLE`: a verificação falhou ou não existe upstream; preserve `reason` e não alegue `IN_SYNC`.

A leitura remota é uma fotografia pontual e não substitui preconditions em futuras mutações. Faça `sync_git_remote(FETCH)` somente quando a intenção **for atualizar refs locais** para operações que dependam delas; não use FETCH como mero diagnóstico quando VERIFY suficiente.

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

## Higiene da operação

No MCP, antes de stage/commit, examine mudanças tracked e untracked; `analyze_git_hygiene` pode separar resíduos de trabalho legítimo. Faça stage de paths explícitos do escopo validado, sem `add all` indiscriminado nem ocultar fontes com `.gitignore`. Não descarte dirty desconhecido; handoff não substitui estado Git fresco.

Agente com Git local autorizado observa as mesmas invariantes sem usar MCP; o procedimento do checkout local pertence a `worktree-execution`.

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

`get_git_state`
→ descobrir e selecionar paths explícitos com `get_git_changes` quando necessário
→ gerar `operationId` antes da primeira tentativa
→ `stage_git_changes` com `mode`, `paths`, `expectedIndexRevision`, `expectedWorktreeRevision` do snapshot observado e `operationId`
→ confirmar receipt e staged/indexRevision no resultado ou em `get_git_state`
→ `commit_git_changes` com `expectedHead`, `expectedIndexRevision` inspecionado e seu próprio `operationId`.

STAGE e UNSTAGE exigem as duas revisões e identidade de operação. Uma falha antes da publicação do índice preserva o índice inteiro; UNSTAGE preserva os arquivos do worktree. `GIT_STATE_CHANGED` exige atualizar o snapshot e redecidir.

Mesma `operationId` e mesmos argumentos recuperam o resultado com `replayed: true`, sem nova mutação. Argumentos diferentes retornam `IDEMPOTENCY_CONFLICT`.

Em `OPERATION_OUTCOME_UNKNOWN`, preserve a `operationId`; `retryability: NOT_SAFE` e `recommendedAction: RECONCILE_OPERATION` proíbem uma nova tentativa de mutação às cegas. Reconcile o estado sem assumir sucesso ou falha. Reutilizar os mesmos argumentos e ID recupera um receipt completo, mas PREPARED continua UNKNOWN e nunca reexecuta.

O commit deve representar exatamente o índice inspecionado.

Não misture resíduos desconhecidos com a mudança pretendida apenas para deixar o worktree limpo.

## Roteamento de Pull Request

Para **Plano Final Executável validado**, registre um commit na branch exclusiva da sessão; **não abra PR por Plano, commit ou checkpoint**. Vários commits validados podem se acumular até a **conclusão da sessão**, quando o padrão de transferência e integração é **um único PR consolidado**, regido por `worktree-execution`. Esta Skill trata apenas de **Git remoto tipado pelo MCP**; aprovação nativa e permissões do provedor continuam obrigatórias para PRs. Com autorização, `sync_git_remote PUSH` pode publicar **somente a branch da sessão** (nunca `main` por inferência), inclusive antes da conclusão para backup/sincronização; push intermediário não dispara PR. Na conclusão, use um canal autorizado e operacional para abrir o PR (GitHub CLI, plugin GitHub ou ferramenta Code Awareness MCP quando esta efetivamente existir no catálogo). Quem recebe revisa no provedor e somente então integra com permissão própria. Merge Git direto via MCP continua exceção expressa, sem eliminar revisão.

## Identidade do App e diagnóstico de grants

O produto incorpora a identidade pública do App oficial. Não crie .env por Worktree, copie credenciais ou repita variáveis para inicialização comum. Um App customizado exige o par completo CODE_AWARENESS_GITHUB_CLIENT_ID/CODE_AWARENESS_GITHUB_APP_SLUG; override parcial falha fechado. Sessões cifradas continuam no perfil canônico do Desktop; expiração ou revogação ainda pode exigir reautorização.

Quando disponível, examine diagnostics/evidence de get_pull_request_access. O user token interno do Desktop observa instalação, repositórios acessíveis e grants; gh e o conector GitHub não provam essa autorização. GET público bem-sucedido nunca concede operations.read nem permissões de escrita. Ausência na listagem de repositórios acessíveis pode ser seleção da instalação ou acesso do usuário: não invente qual deles falta.

INSTALLATION_GRANT_MISSING pede conferir cadastro do App e instalação. INSTALLATION_PERMISSION_UPDATE_NOT_GRANTED significa que o cadastro anuncia um grant que a instalação ainda não concede: o proprietário deve revisar eventual atualização. REAUTH_REQUIRED pede conexão/reauthorização no Desktop; resposta inconclusiva, suspensão e 403 preservam negação. Informe operação afetada, requiredGrant e nextAction do diagnóstico. Ajustes administrativos exigem autorização própria; nunca amplie grants, apague tokens ou encaminhe a outro canal para contornar uma negativa. A presença dos grants não substitui aprovação nativa específica, políticas ou recibos de mutação.

## Descoberta, leitura e criação REST de PR

Antes de abrir um PR, confirme projeto/repositório ativo, branch remota efetivamente publicada, HEAD e SHA esperado, destino e autorização para a ação. Descubra se `get_pull_request_access`, `list_pull_requests`, `get_pull_request` e `create_pull_request` estão expostas no catálogo da sessão; implementação no source não garante exposição no cliente. Use listagem paginada e consulta individual para detectar PR já aberto da mesma origem/destino e não multiplicar PRs após um timeout.

`create_pull_request` pertence à **conclusão autorizada da sessão**, não a cada commit/Plano; necessita grant Pull requests: write, aprovação nativa específica para repositório, head/base e SHA publicado, `operationId` durável e preconditions de identidade. `worktreeId`, quando informado, vincula a origem sem trocar checkout ou criar posse sobre ele. Reconciliar o mesmo ID e recibo antes de qualquer nova tentativa; `OUTCOME_UNKNOWN` não autoriza novo POST. A criação REST não publica branch, não valida commits, não faz merge nem fecha Worktree. Se canal ou grant faltar, registre o bloqueio; use via alternativa **somente com autoridade própria legítima**, nunca para contornar uma negativa de segurança do produto.

## Revisão e integração REST de PR

Descubra o catálogo e use `get_pull_request_access` antes de escolher estas operações: a versão instalada e a configuração podem não expô-las. CLI e plugin GitHub continuam alternativas autorizadas. A versão com identidade de produto incorporada usa o App oficial sem variáveis por checkout; `CONFIGURATION_REQUIRED` pode indicar override incompleto. Não envie tokens pelo chat. Leituras PR/reviews, check runs, statuses, close e merge possuem permissões distintas.

Use `get_pull_request`, `get_pull_request_reviews` e `get_pull_request_checks` para conferir identidade, head/base, revisão efetiva e evidências atuais. Histórico bruto não é aprovação efetiva; aprovação descartada ou de head antigo não conta. `INCOMPLETE`, `UNKNOWN` e `UNAVAILABLE` não aprovam integração. `NO_CHECKS` não prova ausência de checks obrigatórios. Políticas cumulativas, fila ou stack materialmente desconhecidos bloqueiam merge.

`merge_pull_request` exige PR, `operationId`, `expectedHeadSha`, `expectedBaseSha` e autorização nativa própria de curta validade. Usa merge assíncrono com ação `default` e sem bypass; fila controla o método e método incompatível com preservação de commits bloqueia. PR stacked é recusado. CREATE nunca autoriza MERGE ou CLOSE.

`close_pull_request` exige PR, `operationId` e `expectedHeadSha`; a base observada também é vinculada na aprovação nativa independente. Nenhuma dessas APIs oferece CAS atômico da base. Drift e mudança de projeto invalidam a autorização. Não alteram Git local, sincronizam main, apagam branches ou encerram Worktrees.

Após timeout ou aceitação pendente, preserve o ID e consulte `get_pull_request_operation`; repetir a mesma operação somente reconcilia, nunca reenvia PUT/PATCH. `PENDING` e `ENQUEUED` não significam `MERGED`. Merge exige comprovação remota e SHA de integração; fila requer leitura posterior do PR. UUID do GitHub expira após retenção de 24h: reconsulte PR, sem inferir sucesso ou repetir merge. UUID recebido em 409 de terceiro não é recibo próprio. `OUTCOME_UNKNOWN` bloqueia nova mutação cega. Sincronização e cleanup exigem intenção e autorização separadas.

## Mergeabilidade de Pull Request

Quando precisar de evidência de integração de um PR no **GitHub associado ao repositório ativo**, use `inspect_pull_request_mergeability({ prNumber })`, se a ferramenta estiver disponível e a integração REST do Code Awareness estiver configurada. A consulta é somente leitura e distinta do transporte Git usado por `get_git_state(VERIFY)`; Git remoto funcional não prova configuração do GitHub REST.

- `MERGEABLE`: o provedor não detectou impedimento de merge do grafo naquele snapshot; não significa revisões/checks/políticas aprovados.
- `NOT_MERGEABLE`: não significa necessariamente conflito; somente `conflict: CONFLICT_CONFIRMED` com evidência explícita do provedor justifica afirmar conflito.
- `UNKNOWN`: provedor ainda não conclusivo; reconsulte depois sob demanda, sem polling contínuo.
- `UNAVAILABLE` (inclusive `CONFIGURATION_REQUIRED`): limite de configuração/autoridade/alcance, **não** um veredito de mergeabilidade. Use outra via autorizada do GitHub quando necessário, sem inventar resultado.

Compare `base.sha`, `head.sha` e `observedAt` com a revisão que pretende integrar. Siga `worktree-execution` para revisão, autorização e merge; esta tool nunca integra PR.

## Branches, upstream e remoto

Use `manage_git_branch` para operações locais tipadas, inclusive o vínculo de upstream da branch atual.

A existência simultânea de `main` e `origin/main` é normal:

- `main` é a branch local;
- `origin/main` é a remote-tracking ref.

O problema é existir uma branch destinada a sincronizar com remoto e ela permanecer com `upstream: null` sem intenção explícita.

### Regra preventiva de tracking

Ao trabalhar em uma branch que deve acompanhar uma branch remota, especialmente a branch principal:

1. observe `get_git_state`;
2. se `upstream` estiver configurado, interprete `ahead/behind` somente como posição perante a remote-tracking ref local; quando importar servidor real, verifique `remoteEvidence` explicitamente;
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

Antes de decisões dependentes do remoto, prefira `get_git_state(remoteCheck: VERIFY)` para observar o servidor sem mutação; faça FETCH deliberado quando a operação exigir refs locais atualizadas.

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


