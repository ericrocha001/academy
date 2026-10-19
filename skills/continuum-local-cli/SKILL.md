---
name: continuum-local-cli
description: Opere o Continuum pela CLI local quando houver terminal autorizado, app ativo e checkout/Worktree vinculada: descoberta, leitura estrutural seletiva ou integral e escrita. Valide repositoryId e PERSISTED; use MCP quando a CLI não atender. Para decidir a profundidade do contexto, siga continuum.
---

# Continuum Local CLI

## Quando usar

Use esta Skill quando o ambiente oferecer **terminal autorizado e CLI local funcional**, especialmente ao receber um `artifactId` de Plano Executável, recuperar contexto, publicar um Implementation Handoff ou atualizar Work Items. **Prefira esta via quando oferecer acesso equivalente ao Continuum canônico, mesmo que MCP também esteja disponível**; não deduza acesso nem autorização do papel do agente. A CLI utiliza IPC local e **não chama MCP**. Se a condição local falhar, diagnostique o erro e só selecione MCP quando houver necessidade/capacidade/autorização, sem contornar restrições de identidade.

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
node scripts/continuum/local.cjs inspect_artifact_structure --repository <repositoryId> --id <artifactId> --filter '{"limit":50}'
node scripts/continuum/local.cjs inspect_artifact_structure --repository <repositoryId> --id <artifactId> --filter '{"sectionId":"<sectionId>","includeBlocks":true}'
node scripts/continuum/local.cjs read_artifact_section --repository <repositoryId> --id <artifactId> --filter '{"sectionId":"<sectionId>","expectedRevision":2}'
node scripts/continuum/local.cjs get --repository <repositoryId> --id <artifactId>
node scripts/continuum/local.cjs get --repository <repositoryId> --id <artifactId> --format markdown
node scripts/continuum/local.cjs publish --repository <repositoryId> --file handoff.md
node scripts/continuum/local.cjs update --repository <repositoryId> --id <artifactId> --revision <revision> --file work-item.md
```

- `list` devolve **somente registros de descoberta**, nunca o Markdown. Filtre por `query`, `kind`, `status`, `metadata` ou relações, conforme o contrato atual; para páginas seguintes, reapresente os mesmos filtros e passe `nextCursor` em `cursor`. Relações têm **um hop**, sem carregamento automático.
- `inspect_artifact_structure` recebe `--id` e `--filter` JSON com `limit`, `cursor`, ou `sectionId` + `includeBlocks:true`; devolve outline/blocos sem corpo e a revisão corrente. `read_artifact_section` recebe `--id` e `--filter` JSON com `sectionId`, `expectedRevision`, `includeDescendants?`, `blockId?`, `cursor?`; devolve o Markdown literal selecionado e, se paginado, `nextCursor`. No exemplo, `expectedRevision:2` é **ilustrativo**: use sempre a revisão real da inspeção. Reapresente as mesmas opções ao continuar a paginação e concatene `content` sem separadores. Ambas as operações são reais em `scripts/continuum/local.cjs` do PR #38; verifique versão da CLI/runtime antes de depender delas. Também existem via `node scripts/local-agent/local.cjs continuum <operação> ...`.
- `get` abre **um Artifact selecionado** e devolve JSON com revisão, metadata e `rawMarkdown`. `--format markdown` devolve somente o Markdown literal, incluindo seu frontmatter. Use para necessidade integral, edição ou fallback seguro; não solicite tudo por precaução.
- `publish` recebe um arquivo Markdown UTF-8 completo com frontmatter, validado pelo serviço canônico. Para o Relato Final, use `kind: IMPLEMENTATION_HANDOFF`, `date` com horário/fuso e relação `implements` apontando ao Artifact do Plano quando apropriado. O corpo deve preservar exatamente o relato exigido pelo Harness, sem versão concorrente.
- `update` requer **`artifactId`, revisão atual lida por `get` e arquivo Markdown integral**, inclusive relações ainda válidas. `REVISION_CONFLICT` exige reler e reavaliar, não retry cego. Não publique um segundo Artifact para fugir de conflito.

## Fluxo pelo canal local

1. Recebeu `artifactId`? Rode `status` e selecione o `repositoryId` informado. Sem ID, use `list` com filtros pequenos e selecione um Artifact. **A profundidade é decidida por `continuum`:** para pergunta localizada/escopo incerto, use `inspect_artifact_structure` e depois `read_artifact_section` com revisão/ID retornados; para Plano completo, auditoria integral ou atualização, use `get` diretamente. Não imponha inspeção antes de toda leitura nem use `get` para estimar o tamanho de um documento.
2. Execute o Plano e valide as propriedades exigidas, sem misturar prova de software com recibo de transporte.
3. Prepare o arquivo Markdown único do Relato Final com metadata e relação ao Plano. Rode `publish` e registre o `artifactId` retornado.
4. Confirme **`state: PERSISTED`** no receipt da CLI antes de informar que o Artifact está publicado. A escrita online é concluída pelo Store canônico; `status: VALIDATED` no frontmatter descreve a validação do trabalho, não substitui confirmação da publicação.
5. Ao atualizar um Work Item, recupere a revisão corrente e use `update` com o texto integral. Preserve identidade e relações.

## Falhas e limites

- `APP_UNAVAILABLE`: Code Awareness/canal/perfil não acessível. Não declare publicação e não caia automaticamente no caminho offline.
- `REPOSITORY_MISMATCH`, `NO_ACTIVE_REPOSITORY`, `WORKTREE_UNLINKED`: corrija contexto/vínculo; **não** selecione outro repositório por aproximação.
- `ARTIFACT_NOT_FOUND`, `INVALID_ARGUMENT`, `REQUEST_TOO_LARGE`, `IPC_TIMEOUT`, `IPC_CLOSED` e conflitos: não invente conteúdo/IDs; investigue a causa mínima. Na navegação, `REVISION_CONFLICT` e `STRUCTURE_STALE` requerem nova inspeção/revisão, não retry com cursor antigo; erro de integridade não autoriza contorno por `get`.
- Após perda de comunicação numa escrita, o resultado pode ser **desconhecido** mesmo sem receipt. **Consulte o Continuum antes de reenviar** para evitar publicações duplicadas; a CLI não faz retries automáticos.
- `scripts/continuum/publish-artifact.cjs` é um **publicador offline separado**: `QUEUED` indica apenas entrada na inbox, **não `PERSISTED`**. Use-o somente quando for explicitamente necessário, com confirmação posterior de ingestão; não presuma que inbox de outra Worktree será observada.
- O canal aceita até 8 MiB por request, 16 MiB por response e usa prazo de 15 segundos. Não há truncamento silencioso. O perfil local é fronteira de autorização por usuário; não assume isolamento entre agentes do mesmo usuário.

## Condição de conclusão

O agente recuperou o Artifact correto do repositório correto, consultou só o contexto necessário, concluiu provas de implementação separadamente e, quando houve escrita, confirmou persistência com identidade/revisão reais. Se não conseguiu acesso ou confirmação, relatou precisamente o bloqueio — jamais um falso sucesso.
