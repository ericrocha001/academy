---
name: continuum
description: Use o Continuum do repositório ativo para autocontextualização entre agentes, descoberta seletiva de contexto durável, publicação e edição de Artifacts ou navegação de relações. Recupere somente histórico capaz de alterar a próxima decisão; confirme source atual pelo CodeScope. Não carregue o corpus preventivamente nem preserve conversa bruta.
---

# Um repositório, um Continuum

Repository is the Continuum boundary. Metadata is the internal segmentation mechanism.

Cada repositório possui um Store e um corpus próprios. Continuum Global significa o corpus global **daquele repositório**, nunca um corpus compartilhado do Code Awareness. Artifacts não atravessam a fronteira do repositório. As quatro primitives operam no contexto ativo; para acessar outro Continuum, troque explicitamente o repositório ativo na fronteira do Code Awareness. Não tente selecionar outro repositório por projectId, nome ou filtros.

Dentro do corpus não existem sub-Continuums para implementações, execuções, assuntos ou tipos. Use metadata e relações para segmentação interna. A identidade durável do Store vem do RepositoryRecord.id; nomes e paths não são identidade semântica.

Agents are ephemeral. Artifacts are durable. Context is assembled on demand.

# Pure Signal

Artifact é qualquer unidade durável de comunicação com valor contextual para outro agente. Planos, handoffs, decisões, Work Items, provas, investigações, bloqueios, comunicações futuras e **referências canônicas vivas do repositório** usam a mesma infraestrutura quando isso aumentar descoberta e continuidade.

Preserve contexto deliberado e reutilizável. Não preserve chats completos, cadeia de pensamento, logs arbitrários, histórico de ferramentas ou informação descartável. Não publique apenas para aumentar volume.

Unbounded Corpus, Bounded Context: corpus grande exige índices, filtros, metadata, relações e paginação; não exclusão preventiva de conhecimento útil.

## Living Canonical Artifacts

O Continuum pode hospedar documentos canônicos **repo-specific** cuja identidade permanece estável enquanto o conteúdo evolui, por exemplo:

- Design System do produto;
- mapa ou princípios arquiteturais;
- políticas técnicas específicas do repositório;
- especificações duráveis que agentes precisam consultar ao longo do tempo;
- arquitetura conceitual de sistemas de engenharia e governança do próprio repositório.

### Metadata canônico

Use:

`livingArtifact: true`

Living Artifact **não é kind novo**. O Artifact conserva sua natureza real — por exemplo `ARCHITECTURAL_DECISION`, `INVESTIGATION` ou outro kind apropriado — e recebe a propriedade adicional de que sua representação canônica deve ser reconsiderada quando surgirem aprendizados materiais do seu domínio.

Não crie:

- sub-Continuum de Living Artifacts;
- pasta lógica;
- Store separado;
- kind `LIVING_ARTIFACT`;
- cópia paralela do mesmo documento.

Discovery:

`list_artifacts(metadata: { livingArtifact: true })`

### Semântica de manutenção

`livingArtifact: true` significa:

> este documento é deliberadamente evolutivo e deve ser **reavaliado** quando nova evidência, experiência ou mudança de workflow puder alterar seu conteúdo canônico.

Não significa:

- atualizar em toda tarefa;
- acrescentar log cronológico;
- registrar qualquer observação;
- transformar experiência isolada em regra.

Quando uma execução produzir aprendizado material:

1. determine o domínio afetado;
2. descubra Living Artifacts relevantes, preferindo filtros adicionais quando disponíveis;
3. abra somente os candidatos capazes de mudar;
4. compare aprendizado novo com conteúdo canônico existente;
5. atualize in-place apenas se houver ganho generalizável ou mudança normativa real;
6. preserve artifactId e relações válidas;
7. atualize `date` e metadata de discovery quando a representação mudar.

Se não houver mudança material, não toque no Artifact.

### Promoção de aprendizado

Promova aprendizado para Living Artifact quando ele:

- altera uma regra ou princípio vigente;
- resolve ambiguidade recorrente;
- generaliza evidência de múltiplas execuções ou uma prova especialmente forte;
- muda arquitetura, workflow ou governança de forma durável;
- evita que agentes futuros repitam decisão já resolvida.

Não promova:

- preferência local;
- workaround;
- detalhe acidental de implementação;
- evento histórico que pertence a handoff/observation;
- hipótese ainda não comprovada.

### Identidade e revisão

Para Living Artifacts:

- mantenha um único `artifactId` canônico;
- atualize por revisão;
- não publique `v2`, `v3` como Artifacts concorrentes apenas porque o conteúdo evoluiu;
- mantenha description e metadata adequados para discovery;
- relacione exemplares, decisões ou implementações quando isso melhorar aquisição de contexto.

Não use o Continuum como espelho redundante de todo arquivo importante.

Quando um arquivo é carregado diretamente pelo runtime/harness — por exemplo `ARCHITECT.md`, prompts operacionais, configs ou source — **o arquivo continua sendo a fonte de verdade operacional**. O Continuum pode registrar decisões, rationale ou referências relacionadas, mas não deve manter uma segunda cópia normativa que possa divergir.

Regra de localização:

- **repo-specific + contexto durável para agentes** → Continuum pode ser canônico;
- **procedimento reutilizável entre repositórios** → Academy/Skill;
- **config/prompt/source executado diretamente** → arquivo/sistema que o carrega é canônico;
- **estado atual do software** → source/runtime, nunca Artifact histórico.

# Fast-Finding e Self-Contextualization

Recupere histórico quando implementação anterior, decisão, prova, pendência ou trabalho de outro agente puder alterar uma decisão material. Antes de pedir ao usuário copy/paste de histórico, descubra Artifacts relevantes. Não consulte por precaução quando o plano presente ou source atual já bastam.

Metadata Before Content é estrutural:

necessidade → filtros → discovery records → seleção → get_artifact → conteúdo.

1. Formule a necessidade específica de contexto.
2. Use `list_artifacts` com filtros em interseção: `query` pesquisa somente name/description; `kind`, `status`, `metadata`, `updatedAfter` e `updatedBefore` restringem a seleção. Intervalos usam updatedAt e limites inclusivos.
3. Comece com limite pequeno (default 20, máximo 100). Continue por `nextCursor` somente se a próxima página puder mudar a decisão; envie-o como `cursor` preservando os filtros. Cursor pertence ao Continuum em que foi emitido.
4. Leia apenas discovery records. Metadata adicional não vem por padrão; use `metadataKeys` para solicitar somente chaves que ajudam seleção.
5. Escolha um `artifactId` explícito e use `get_artifact`. Nunca abra todos os resultados automaticamente.
6. Siga relações relevantes um hop por vez e pare quando houver o menor contexto suficiente para agir.

O objetivo é contexto suficiente sem reconstruir a conversa original. Meça qualidade pela precisão da seleção, número de aquisições e tamanho da representação fornecida ao agente.

Continuum tells you what happened. CodeScope tells you what exists now. Artifact histórico não prova source atual ou runtime fresco. Confirme essas propriedades pelas capacidades correspondentes.

# Markdown e metadata

Markdown é a fonte semântica única. Novos Artifacts exigem YAML frontmatter e corpo não vazio:

```markdown
---
name: Migração de identidade do Continuum
description: Abra para compreender o mapeamento do Store legado, as invariantes de isolamento e as provas de restart.
kind: IMPLEMENTATION_HANDOFF
date: 2026-10-06T04:05:00-03:00
status: VALIDATED
relations:
  - artifactId: artifact-id-do-plano
    kind: implements
---
Conteúdo durável.
```

`name`: curto, específico e reconhecível. Evite títulos genéricos como Relatório ou Contexto. Não repita toda a descrição.

`description`: responda quando outro agente deveria abrir o Artifact. Indique problema, decisão, prova ou fronteira que encontrará. Não escreva um resumo longo nem frases vazias. Legados podem não possuir descrição; enriqueça-os por edição apenas quando houver conhecimento suficiente, sem inventar semântica histórica.

`kind`: natureza da comunicação. Reutilize IMPLEMENTATION_HANDOFF, EXECUTABLE_PLAN, WORK_ITEM, VALIDATION_PROOF, ARCHITECTURAL_DECISION, INVESTIGATION ou OBSERVATION quando corresponderem. Verifique convenções antes de introduzir outro termo. Evite sinônimos para a mesma natureza. Esse vocabulário pertence à Skill, não a um enum do backend.

`date`: obrigatório em todo Artifact novo. Use timestamp ISO 8601 completo com data, hora e offset de fuso, por exemplo `2026-10-06T04:05:00-03:00`. Ele representa quando a representação semântica corrente do documento foi produzida, não apenas quando o backend a persistiu. Ao atualizar materialmente conteúdo, status, decisão, prova ou relações do Artifact, atualize também `date` para o momento da nova representação. Não use data sem hora, hora sem fuso ou termos relativos como hoje/agora.

`status`: use somente quando existir lifecycle relevante. Handoffs/provas podem usar VALIDATED ou BLOCKED; Work Items usam PENDING, COMPLETED ou CANCELLED segundo `continuum-work-items`. Não adicione status decorativo a contexto sem lifecycle.

Metadata adicional deve responder a uma necessidade concreta de seleção. Reutilize chaves e valores existentes e use JSON/YAML estruturado simples. `metadata` filtra igualdade exata por chave, inclusive objetos e arrays; ordem das chaves de objetos é irrelevante. Não transforme tags livres, sinônimos, provenance técnica, paths de armazenamento, hashes ou cópia do corpo em índice agentivo.

Discovery metadata é a projeção do estado corrente do Artifact. Sempre que o conteúdo for materialmente atualizado, revise `name`, `description`, `kind`, `date`, `status`, relações e metadata relevante para impedir que a superfície de descoberta fique obsoleta, incompleta ou contradiga o documento corrente.

Quando a associação entre Artifacts da mesma execução ajudar descoberta, use um `executionId` estável e reutilize-o em todos os Artifacts da execução. Antes de criar um novo `executionId`, descubra Artifacts da execução e verifique se um identificador canônico já existe; reutilize-o sempre que existir. Só crie outro quando não houver associação anterior válida. Filtre por `metadata: {executionId: ...}` e solicite `metadataKeys: [executionId]` somente se necessário. Não crie sub-Continuum nem use nomes livres concorrentes para essa associação. Não acrescente executionId por rotina quando ele não alterar seleção.

IDs, revisão e timestamps operacionais (`createdAt`, `updatedAt`) são atribuídos pelo backend. Eles não substituem `date` no documento: timestamps do backend descrevem persistência/revisão operacional; `date` preserva o tempo semântico da representação corrente dentro do próprio Artifact. Metadata livre não redefine identidade nem seleciona outro repositório. Não produza uma segunda representação semântica JSON do documento.

# Artifact Graph

Relações usam `artifactId` canônicos existentes **no mesmo Continuum** e `kind` aberto. Não use título, filename ou path como alvo. Não crie autorrelações nem repita a mesma aresta.

Vocabulário recomendado:

- `related-to`: relevância contextual concreta sem relação mais específica;
- `derived-from`: origem material do contexto;
- `implements`: implementação → plano/decisão executada;
- `validates`: prova → Artifact cuja propriedade foi demonstrada;
- `resolved-by`: Work Item → handoff que comprova resolução.

Prefira a relação mais específica e evite sinônimos ou arestas redundantes. Crie uma relação quando o alvo puder mudar uma decisão de aquisição de contexto. Mesmo repositório, tema vago ou proximidade temporal não bastam.

Navegue com `list_artifacts(relatedToArtifactId, direction, relationKind?)`. Direções: inbound, outbound e both (default). Cada consulta retorna discovery records de um hop. A → B → C não implica C na consulta de A. Selecione um relacionado antes de abri-lo.

Relações mostram caminhos; não carregam contexto automaticamente.

# Publicar e editar

Use `publish_artifact` com `rawMarkdown` completo. O destino é o Continuum ativo. O receipt contém success, artifactId, revisão 1 e updatedAt; não ecoa conteúdo. Preserve artifactId após sucesso e não republique por rotina.

Edite o Artifact existente quando identidade e finalidade lógica permanecerem: corrigir metadata, mudar status, resolver bloqueio, acrescentar contexto/prova ou ajustar relações. Crie novo Artifact para comunicação com finalidade independente, nunca apenas porque o documento evoluiu.

Fluxo de edição:

get_artifact → observar revision N → editar Markdown/frontmatter completos → update_artifact(artifactId, expectedRevision=N, rawMarkdown).

A atualização substitui representação corrente e relações atomicamente, preserva artifactId/createdAt e grava revisão interna imutável. Relações omitidas são removidas; preserve explicitamente as que continuam válidas. Artifacts relacionados continuam apontando para a mesma identidade.

Em REVISION_CONFLICT, releia a versão corrente, reavalie a alteração e use a nova revisão. Não faça retry cego, merge automático ou novo Artifact para contornar conflito. Histórico não é despejado nem possui navegação pública nesta entrega.

# Implementation Handoff

O corpo do IMPLEMENTATION_HANDOFF é exatamente o Relato Final exigido pelo AGENTS.md. Materialize uma única fonte em Markdown UTF-8, preserve verbatim e acrescente somente frontmatter de descoberta. Não gere resumo, segundo relatório ou seções duplicadas. Confirme publicação e preserve artifactId.

Nunca materialize Markdown através de argumentos de shell ou strings interpoladas: backticks, $, ${…}, $(…) e Unicode devem permanecer literais. Use escrita direta de arquivo.

# Compatibilidade offline

Quando a publicação MCP estiver indisponível:

`node scripts/continuum/publish-artifact.cjs publish <arquivo.md>`

O Markdown carrega metadata; o publisher não inventa significado. O envelope fica na inbox do checkout. RepositoryKey serve apenas como locator de transporte legado; o Store pertence ao ID canônico do catálogo.

`QUEUED` confirma envelope na inbox, não persistência. Localize por `list_artifacts` e confirme artifactId/conteúdo por `get_artifact` antes de declarar publicado. O comando v1 implementation-handoff permanece para consumidores antigos, e envelopes v1 pendentes continuam sendo ingeridos. Não apague Stores legados; migração preserva seus dados e os mantém separados por repositório.

Se o runtime ativo ainda expuser somente o protocolo v1, publique handoff pelo comando compatível `implementation-handoff <arquivo.md> --title "<título>"` preservando exatamente o Relato Final, e confirme ingestão. Não publique outra comunicação falsamente como handoff para contornar versão antiga.

Se publicação falhar, preserve o Relato Final e informe que o handoff não foi publicado. Nunca deixe falha de transporte apagar contexto necessário.

# Evolução por evidência

Observe seleção ruim, descriptions insuficientes, transporte manual de contexto, publicação repetitiva ou ausência de primitive real. Use `capability-opportunity` para qualificar causa generalizável e ganho futuro. Não implemente fora do escopo nem crie operação que despeje todo o corpus. Um Artifact aberto, source confirmado ou histórico naturalmente stale não constitui deficiência por si só.

Semântica e procedimento evoluem primeiro na Skill. Backend fornece persistência, identidade, integridade, filtros, índices, relações, revisão, concorrência e paginação. Mude backend somente quando faltar uma primitive estrutural que não possa ser composta com as existentes.
