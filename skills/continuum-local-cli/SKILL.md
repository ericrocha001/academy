---
name: continuum-local-cli
description: Use quando um agente de implementação com terminal local precisar descobrir, ler, publicar ou atualizar Artifacts do Continuum sem MCP, pela CLI do Code Awareness. Exige aplicativo ativo, repositoryId explícito e checkout/worktree vinculada; distingue PERSISTED de QUEUED. Não use para acesso remoto sem terminal nem para redefinir contratos de Artifact.
---

# Continuum Local CLI — Implementador

## Quando usar

Use esta Skill para **operar a CLI local no terminal da IDE**, especialmente ao receber um `artifactId` de Plano Executável, recuperar contexto durante a implementação, publicar o Implementation Handoff e atualizar Work Items. A CLI utiliza um canal IPC local do Code Awareness e o mesmo Continuum canônico acessado pelo Arquiteto. **Não chama MCP.**

Para decidir *o que buscar e quando parar*, siga `continuum`. Para `name`, `description`, `kind`, `date`, relações, revisões e conteúdo do handoff, siga `continuum-publication`. Esta Skill é dona **somente do uso do canal local**; não replique suas regras de domínio.

A referência de execução no repositório é `scripts/continuum/LOCAL.md`; os comandos são implementados em `scripts/continuum/local.cjs`. Se comando e documentação divergirem, confirme a versão do source e o runtime antes de agir.

## Preparação e identidade

- É necessário **Code Awareness em execução**, com o repositório correto ativo, e perfil desktop acessível. No Windows, a CLI usa `%APPDATA%\code-awareness` por padrão; `--profile <diretório>` seleciona outro perfil.
- Rode a CLI com o diretório atual dentro do checkout ou da **Git Worktree reconhecida** pelo Code Awareness. Se essa Worktree não contiver os scripts, execute a CLI usando **caminho absoluto do script no checkout que a possui**, mas conserve o diretório atual na Worktree de trabalho.
- Comece sempre por `status`, que informa `repositoryId`, checkout ativo e Worktrees vinculadas. **Todas as operações de dados exigem `--repository <repositoryId>`**. Não deduza o ID pelo nome, pasta, URL do remote ou última janela.
- A CLI e o servidor conferem a identidade da Worktree; falhas de vínculo não são motivo para contornar a checagem ou abrir outro Store. Uma Worktree não registrada deve ser vinculada pelo fluxo seguro do projeto antes da operação.

## Operações essenciais (PowerShell)

```powershell
node scripts/continuum/local.cjs status
node scripts/continuum/local.cjs list --repository <repositoryId> --filter '{"kind":"EXECUTABLE_PLAN","limit":10}'
node scripts/continuum/local.cjs get --repository <repositoryId> --id <artifactId>
node scripts/continuum/local.cjs get --repository <repositoryId> --id <artifactId> --format markdown
node scripts/continuum/local.cjs publish --repository <repositoryId> --file handoff.md
node scripts/continuum/local.cjs update --repository <repositoryId> --id <artifactId> --revision <revision> --file work-item.md
```

- `list` devolve **somente registros de descoberta**, nunca o Markdown. Filtre por `query`, `kind`, `status`, `metadata` ou relações, conforme o contrato atual; para páginas seguintes, reapresente os mesmos filtros e passe `nextCursor` em `cursor`. Relações têm **um hop**, sem carregamento automático.
- `get` abre **um Artifact selecionado** e devolve JSON com revisão, metadata e `rawMarkdown`. `--format markdown` devolve somente o Markdown literal, incluindo seu frontmatter. Não solicite tudo por precaução.
- `publish` recebe um arquivo Markdown UTF-8 completo com frontmatter, validado pelo serviço canônico. Para o Relato Final, use `kind: IMPLEMENTATION_HANDOFF`, `date` com horário/fuso e relação `implements` apontando ao Artifact do Plano quando apropriado. O corpo deve preservar exatamente o relato exigido pelo Harness, sem versão concorrente.
- `update` requer **`artifactId`, revisão atual lida por `get` e arquivo Markdown integral**, inclusive relações ainda válidas. `REVISION_CONFLICT` exige reler e reavaliar, não retry cego. Não publique um segundo Artifact para fugir de conflito.

## Fluxo do Implementador

1. Recebeu `artifactId`? Rode `status`, selecione o `repositoryId` informado e use `get` para abrir **o Plano exato**. Sem ID, use `list` com filtros pequenos, selecione, depois `get`.
2. Execute o Plano e valide as propriedades exigidas, sem misturar prova de software com recibo de transporte.
3. Prepare o arquivo Markdown único do Relato Final com metadata e relação ao Plano. Rode `publish` e registre o `artifactId` retornado.
4. Confirme **`state: PERSISTED`** no receipt da CLI antes de informar que o Artifact está publicado. A escrita online é concluída pelo Store canônico; `status: VALIDATED` no frontmatter descreve a validação do trabalho, não substitui confirmação da publicação.
5. Ao atualizar um Work Item, recupere a revisão corrente e use `update` com o texto integral. Preserve identidade e relações.

## Falhas e limites

- `APP_UNAVAILABLE`: Code Awareness/canal/perfil não acessível. Não declare publicação e não caia automaticamente no caminho offline.
- `REPOSITORY_MISMATCH`, `NO_ACTIVE_REPOSITORY`, `WORKTREE_UNLINKED`: corrija contexto/vínculo; **não** selecione outro repositório por aproximação.
- `ARTIFACT_NOT_FOUND`, `INVALID_ARGUMENT`, `REQUEST_TOO_LARGE`, `IPC_TIMEOUT`, `IPC_CLOSED` e conflitos: não invente conteúdo/IDs; investigue a causa mínima.
- Após perda de comunicação numa escrita, o resultado pode ser **desconhecido** mesmo sem receipt. **Consulte o Continuum antes de reenviar** para evitar publicações duplicadas; a CLI não faz retries automáticos.
- `scripts/continuum/publish-artifact.cjs` é um **publicador offline separado**: `QUEUED` indica apenas entrada na inbox, **não `PERSISTED`**. Use-o somente quando for explicitamente necessário, com confirmação posterior de ingestão; não presuma que inbox de outra Worktree será observada.
- O canal aceita até 8 MiB por request, 16 MiB por response e usa prazo de 15 segundos. Não há truncamento silencioso. O perfil local é fronteira de autorização por usuário; não assume isolamento entre agentes do mesmo usuário.

## Condição de conclusão

O agente recuperou o Artifact correto do repositório correto, consultou só o contexto necessário, concluiu provas de implementação separadamente e, quando houve escrita, confirmou persistência com identidade/revisão reais. Se não conseguiu acesso ou confirmação, relatou precisamente o bloqueio — jamais um falso sucesso.
