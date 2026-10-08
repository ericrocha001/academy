---
name: continuum
description: Use para recuperar contexto durável do Continuum do repositório ativo: decisões, handoffs, relações e histórico relevante. Descubra por metadados, abra apenas Artifacts necessários e confirme source atual via Code Navigation. Não acione para publicar ou editar Artifacts; use continuum-publication.
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

Continuum tells you what happened. Code Navigation tells you what exists now. Artifact histórico não prova source atual ou runtime fresco. Confirme essas propriedades pelas capacidades correspondentes.

# Artifact Graph

Relações usam `artifactId` canônicos existentes **no mesmo Continuum** e `kind` aberto. Não use título, filename ou path como alvo. Não crie autorrelações nem repita a mesma aresta.

Vocabulário recomendado:

- `related-to`: relevância contextual concreta sem relação mais específica;
- `derived-from`: origem material do contexto;
- `implements`: implementação → plano/decisão executada;
- `validates`: prova → Artifact cuja propriedade foi demonstrada;
- `resolved-by`: Work Item → handoff que comprova resolução;
- `drills-down-to`: Architecture Map → Capability Map que aprofunda um subsistema representado no mapa global.

Prefira a relação mais específica e evite sinônimos ou arestas redundantes. Crie uma relação quando o alvo puder mudar uma decisão de aquisição de contexto. Mesmo repositório, tema vago ou proximidade temporal não bastam.

Navegue com `list_artifacts(relatedToArtifactId, direction, relationKind?)`. Direções: inbound, outbound e both (default). Cada consulta retorna discovery records de um hop. A → B → C não implica C na consulta de A. Selecione um relacionado antes de abri-lo.

Relações mostram caminhos; não carregam contexto automaticamente.

# Evolução por evidência

Observe seleção ruim, descriptions insuficientes, transporte manual de contexto, publicação repetitiva ou ausência de primitive real. Use `capability-opportunity` para qualificar causa generalizável e ganho futuro. Não implemente fora do escopo nem crie operação que despeje todo o corpus. Um Artifact aberto, source confirmado ou histórico naturalmente stale não constitui deficiência por si só.

Semântica e procedimento evoluem primeiro na Skill. Backend fornece persistência, identidade, integridade, filtros, índices, relações, revisão, concorrência e paginação. Mude backend somente quando faltar uma primitive estrutural que não possa ser composta com as existentes.

## Capacidades especializadas

Para publicação, edição, metadata de autoria e transporte offline, utilize `continuum-publication`. Para manutenção normativa de Living Artifacts e Capability Maps, utilize `continuum-living-artifacts`. Para gestão de trabalho futuro, utilize `continuum-work-items`. Não carregue estas capacidades para mera consulta.
