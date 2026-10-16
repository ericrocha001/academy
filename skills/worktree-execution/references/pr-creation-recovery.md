# PR Creation Recovery — complemento condicional

## Acionamento e fronteira

Leia este complemento somente quando uma sessão tiver concluído sua implementação, houver autorização válida para abrir **um único PR**, e a tentativa de criação tiver falhado, retornado resultado desconhecido ou só produzido link de formulário. Não use por ser Cline, modelo gratuito ou Codex; modelos e IDEs não determinam o gatilho. Não execute recuperação durante commit/push de Plano isolado.

A Skill `worktree-execution` permanece fonte canônica para autorização, isolamento, validação, sessão, commit/push, integração e merge. Este documento cobre apenas diagnóstico e recuperação da **abertura verificável de um PR**. Se uma política proíbe criar PR em qualquer canal, não tente outro transporte para contorná-la.

## Diagnóstico mínimo e roteamento

1. Confirme a autorização para abertura do PR e se há restrição de política global ou apenas ferramenta indisponível. Toolkit `github` bloqueado não demonstra que o terminal GitHub CLI também está bloqueado; distinga bloqueio específico de restrição geral. Não tente outro meio se a intenção da política for impedir a operação.
2. Observe repositório remoto, Worktree atual, branch exclusiva, HEAD, upstream, push confirmado, base pretendida e PRs existentes; não infira `main` se outro destino foi estabelecido. Nunca opere em outra Worktree para remediar a atual.
3. Se uma ferramenta GitHub já autorizada criou o PR, primeiro verifique o estado atual, sem recriação. Se existir GitHub MCP confiável e autorizado com `create_pull_request`, ele pode ser alternativa. `git-operations` do Code Awareness e `worktree-mcp-operations` **não fornecem atualmente** criação de PR; push/publicação e mergeabilidade não substituem abertura.
4. Se um terminal local estiver disponível e permitido, prefira **GitHub CLI (`gh`)**; não instale `gh` dentro de cada Worktree. No mesmo host e usuário, o executável e a autenticação normalmente são compartilhados. Em container/host diferente, verifique esse ambiente efetivo.
5. Se `gh` estiver ausente, verifique PATH e instalação; só instale no host/ambiente apropriado quando permitido e por meio confiável. Após instalação reavalie prontidão. `GITHUB_TOKEN` vazio **não comprova** ausência de login `gh` — nunca peça token secreto em mensagem. Se autenticação interativa for necessária, solicite a ação segura indispensável do usuário e não imprima credenciais.

## Operação determinística via GitHub CLI

O GitHub CLI já é a ferramenta executável reutilizável. Evite criar um script novo quando comandos estáveis resolvem a operação e seu contrato. A automação deve fornecer repositório `OWNER/REPO`, `HEAD` (branch atual verificada), `BASE`, título e corpo fiel ao handoff, sem inventar dados.

No terminal **da Worktree correta**, de forma sequencial:

- `git rev-parse --show-toplevel`, `git branch --show-current`, `git rev-parse HEAD`, `git remote -v`: identifique sem alterar estado; confirme que o push normal corresponde ao HEAD destinado ao PR.
- `gh --version`, `gh auth status`, `gh repo view OWNER/REPO --json nameWithOwner`: verifique instalação, autenticação e alcance do repositório. Se o usuário precisar autenticar, prefira o fluxo interativo seguro do próprio `gh`.
- `gh pr list --repo OWNER/REPO --head HEAD --base BASE --state all --json number,url,state,isDraft,headRefName,baseRefName,headRefOid`: procure PR preexistente, incluindo já fechado/merged, antes de mutar. PR existente aberto e correspondente deve ser reutilizado e verificado, jamais duplicado. PR fechado/merged exige decisão explícita; não reabra nem crie outro automaticamente.
- Somente se nenhum PR já existir e a autorização continuar válida: `gh pr create --repo OWNER/REPO --head HEAD --base BASE --title "TÍTULO" --body "DESCRIÇÃO"`. Não use `--web`, `--draft`, `--fill` nem operação de merge. Ajuste a passagem de título/corpo para as regras de quoting do shell; nunca interpole texto não confiável como comandos.
- Independente do exit code ou de perda de resposta, reconcilie primeiro com `gh pr list` no mesmo repositório/head/base (o GitHub CLI pode ter criado o PR antes de retornar erro). Em caso de PR identificado, use `gh pr view NUMERO --repo OWNER/REPO --json number,url,state,isDraft,headRefName,baseRefName,headRefOid` e confronte com o HEAD remoto esperado.
- Só declare êxito quando houver PR real com número, URL real, `state=OPEN`, `isDraft=false`, origem/destino corretos e commit de origem compatível. URL `/pull/new/...` é apenas formulário, nunca PR criado. Não exija `mergeable` para provar abertura.

## Recuperação e parada

- Falha `gh` ausente/PATH: corrija a disponibilidade do executável quando autorizado; não reinstale por Worktree.
- Login expirado/sem permissão: use autenticação interativa e permissões mínimas conforme política local; não peça envio de token em chat. Se o usuário não puder autenticar, registre bloqueio.
- Restrição do toolkit MCP: verifique se a restrição é limitada à ferramenta. Use CLI/MCP alternativo somente se igualmente autorizado e permitido; nunca contorne uma negação de política geral.
- Erro de remoto, branch, base, falta de push ou PR prévio: preserve estado e trate a causa observada; não force-push, não altere base silenciosamente, não reabra PR e não faça merge.
- Timeout/estado desconhecido: reconsulte existência/identidade antes de qualquer retry; nunca duplique PR às cegas.
- Se nenhuma via permitida for operacional, encerre como **PR NÃO CRIADO** com diagnóstico preciso e fallback manual: URL confiável do formulário, título, corpo, head e base. Não afirme conclusão nem merge.

## Aceitação

Casos mínimos: (a) `gh` apto cria um PR normal; (b) toolkit GitHub indisponível, CLI permitida cria; (c) `GITHUB_TOKEN` vazio, mas `gh auth status` autenticado, funciona; (d) PR já aberto não duplica; (e) timeout após criação é reconciliado; (f) bloqueio geral é respeitado; (g) falha persistente entrega instrução manual sem falsa confirmação; (h) Codex com fluxo normal nunca carrega este recurso. Verifique em Cline e Codex se a distribuição inclui **este arquivo** e se a referência é efetivamente legível, antes de declarar que o fallback está disponível nesses clientes.

Fontes oficiais: https://cli.github.com/manual/gh_pr_create ; https://cli.github.com/manual/gh_pr_list ; https://cli.github.com/manual/gh_pr_view ; https://github.com/cline/cline/blob/main/docs/customization/skills.mdx
