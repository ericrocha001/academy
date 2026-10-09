---
name: worktree-mcp-operations
description: Use para descobrir, inspecionar, delegar, mutar, publicar ou integrar Worktrees remotas pelo MCP do Code Awareness, com aprovação, leases, snapshots e provas de validação. Não acione para Git local autorizado ou simples isolamento de sessão; use worktree-execution.
---

# Worktree MCP Operations

## Fronteira

Use somente quando a tarefa exigir a superfície tipada remota de Worktrees do Code Awareness. O procedimento Git MCP geral (`git-operations`) é a fonte canônica para estado, optimistic concurrency, hygiene, receipts e proteção contra retry cego quando essas operações forem necessárias. Não inferir autorização por papel, posse da IDE ou acesso à ferramenta.

## Roteamento de entrega para PR

Quando a Worktree remota possui **uma entrega validada pronta para revisão**, siga `worktree-execution`: quem controla e executa a branch de origem, com delegação adequada, publica os commits pela operação autorizada e abre PR pela plataforma Git (este MCP não dispõe de criação de PR). A revisão e a integração ficam com o consumidor autorizado do PR, **não com um papel inferido do nome do agente**. `publish_worktree` comprova push da branch, não PR nem aprovação. `integrate_worktree PROMOTE` continua disponível para integração direta **expressamente delegada**, mas não é o fluxo padrão quando PR é possível. Nenhuma autorização da Worktree de origem transfere automaticamente autoridade sobre a `main`.

## Worktrees externas: localização, inspeção e não interferência

Quando o resultado de uma implementação foi produzido em outra Worktree do mesmo repositório, **não confunda** o checkout ativo do Code Awareness com o workspace de origem. Recupere somente o handoff/Artifact relevante no Continuum e use os metadados `worktreeId` e/ou `worktreePath` como **pistas de descoberta**, nunca como autorização de mutação. Se precisar agrupar outros Artifacts originados naquela mesma Worktree, filtre o Continuum pelo campo de metadata disponível (`worktreeId` preferencialmente, `worktreePath` como fallback histórico), sem carregar todo o corpus. `executionId` correlaciona a execução, não substitui a identidade da Worktree.

Quando Worktree Operations estiver disponível pelo Channel:
1. Descubra a Worktree pelo registry Git do projeto canônico (`discover_worktrees`), revalidando ID, common-dir e path. Não aceite um path informado no handoff como seletor livre ou prova de existência atual.
2. Inspecione somente o estado e as revisões necessários (`inspect_worktree`): branch, HEAD, dirty/index, ocupação e status de operação. Não solicite diff/source no discovery.
3. Identifique commits ou paths relevantes antes de solicitar conteúdo. Prefira metadata, contagens e lista curta de mudanças; não faça dump da Worktree.
4. Aprofunde com diff **bounded** por paths explícitos e leitura literal de **ranges** somente quando a decisão exigir evidência além do handoff e das provas já existentes.
5. Pare quando o contexto for suficiente. Uma nova inspeção da mesma sessão deve confirmar freshness/HEAD e aproveitar a identificação anterior, em vez de redescobrir todo o trabalho.

### Leitura seletiva e revisões por arquivo (Worktree Operations)

Para investigar muitos arquivos alterados, chame `get_worktree_changes` com `pathPrefixes` repository-relative literais e, quando necessário, `categories` (STAGED, UNSTAGED, UNTRACKED, DELETED, CONFLICTED; categorias combinadas por OR). `pageSize` opcional: 1–100; default 100. Prefira prefixos das áreas já identificadas, não a listagem integral seguida de filtragem no modelo. A filtragem ocorre no servidor **antes** da paginação e retorna somente metadata, sem patch/source. Prefixos de diretórios devem preservar a fronteira do segmento, evitando coincidência com nomes semelhantes. O cursor vincula filtros, pageSize e estado Git: continue com argumentos idênticos; em drift ou alteração de filtros, reinicie sem cursor antigo.

Para leitura literal, `read_worktree_file.expectedFileRevision` é a precondição SHA-256 dos **bytes do próprio arquivo**. A resposta retorna `fileRevision` e `revisionKind: FILE_BYTES_SHA256`. `inspect_worktree.worktreeRevision` resume **o estado da Worktree** e jamais substitui `expectedFileRevision`. `expectedRevision` existe apenas como alias legado; se ambos forem fornecidos, devem coincidir. Reutilize o hash de uma leitura anterior do mesmo arquivo ou de uma referência CURRENT com hash comprovado; não derive um hash de arquivo a partir do snapshot global.

Se `WORKTREE_LINE_OUT_OF_BOUNDS` retornar `totalLines`, `validRange` e `maxLines`, ajuste explicitamente o intervalo solicitado numa nova chamada. Nunca considere a falha como leitura parcial nem suponha clamping automático. Em `GIT_STATE_CHANGED`, distinga mismatch de FILE_BYTES_SHA256 da mudança de snapshot/Worktree; atualize a evidência específica correta antes de repetir. Paths inseguros, identidade ausente ou arquivo não validado não autorizam inferir linhas ou bytes. Limites existentes de 400 linhas/24 KB de saída continuam em vigor.

Se a intenção for **compreender elementos e relações modificados** e não apenas estado Git, use a Skill `code-navigation` e `inspect_worktree_structure` após selecionar paths por Git Operations. Não replique extração estrutural neste fluxo.

Se a capability ainda não estiver disponível, não invente seus resultados nem assuma que Git Operations legado lê outra Worktree: mantenha o escopo comprovado e informe a limitação. Para engenharia de contexto mais profunda utilize a Skill `progressive-disclosure`.

**Escopo de autoridade:** neste MCP, descobrir Worktree ou receber handoff não concede permissão. Toda mutação requer pedido autorizado, aprovação nativa, lease scoped e snapshot/receipt exigidos pelo backend. Confirme ausência de escrita concorrente e preserve a Worktree após commit/merge; publicação, integração e encerramento são ações distintas.

**Quando não usar o MCP:** agente com acesso local ao checkout correto, Git funcional e autorização para a operação usa Git local conforme `worktree-execution`. Não use este canal para repetir Git, Vitest, typecheck ou build equivalentes. MCP continua adequado quando acesso remoto, dados do registry canônico, prova independente ou enforcement específico forem necessários. Ferramenta disponível não implica autorização para `main` ou Worktree de outro agente.

## Operações tipadas em Worktrees

Descubra com `discover_worktrees` e selecione pelo worktreeId retornado; paths físicos são informativos, nunca seletores. `inspect_worktree` fornece snapshot; envie somente branch, head, indexRevision, worktreeRevision e operation. Leituras seletivas usam `get_worktree_changes`, `get_worktree_diff` e `read_worktree_file`, respeitando limites e cursores; revisão por metadados não equivale a hash de conteúdo.

Para uma operação **delegada pelo canal MCP**, o agente autorizado usa `handoff_worktree_for_git` REQUEST; somente aprovação do operador no backend pode conceder autoridade. PENDING não é concessão: respeite `retryAfterMs`, use ACCEPT com as credenciais privadas da própria solicitação, proteja a leaseCredential e não infira posse de handoff ou silêncio da IDE. Scope, snapshots, geração, paths, branches e startPoints são limites materiais. Expiração, drift, restart ou resultado desconhecido exigem reconciliação/RECOVER, nunca tomada por timeout. RELEASE encerra a concessão. Essas exigências pertencem ao transporte MCP, não ao Git local.

`mutate_worktree` faz STAGE/UNSTAGE explícitos, COMMIT do índice exato e CREATE_BRANCH exclusivo. `manage_worktree` CREATE deriva o diretório no servidor e exige branch nova e commit inicial exato aprovado, sem trocar projeto ativo. CLOSE é operação **separadamente solicitada pelo usuário**, nunca efeito de commit/integração. Só aceita checkout gerenciado, limpo, unlocked, sem ownership ativo e com commits preservados em branch autorizada; nunca remover worktree externa. A fonte permanece disponível por padrão para correção/retomada.

`publish_worktree` faz push explícito sem force: PUBLISHED não significa integrado. `preview_worktree_integration` vincula source, target, snapshots e merge-base. `integrate_worktree` APPLY opera somente em sandbox gerenciado; conflitos ficam nele e são lidos/resolvidos explicitamente por `get_worktree_conflict`/`resolve_worktree_conflict`. Execute profiles existentes com `start_worktree_validation` e acompanhe `get_worktree_validation`; somente prova autêntica PASSED, CURRENT, do checkout/commit correto sustenta PROMOTE. Prova manual, cwd diferente, runtime diferente ou fingerprint obsoleto não valida integração. PROMOTE revalida preview e exige concessão legítima no target quando ocupado; não atualizar lateralmente ref de branch em checkout. Delegue o ciclo de execução à Skill worktree-execution.
