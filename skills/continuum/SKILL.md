---
name: continuum
description: Use o Continuum universal para autocontextualização entre agentes, descoberta seletiva de contexto durável, publicação e edição de Artifacts ou navegação de suas relações. Recupere somente contexto histórico que possa alterar a próxima decisão; confirme source atual pelo CodeScope. Não carregue o corpus preventivamente nem preserve conversa bruta.
---

# One Continuum

Agents are ephemeral. Artifacts are durable. Context is assembled on demand.

Existe um corpus universal e um Continuum Channel MCP. Projeto é metadata canônica, nunca banco, pasta ou canal separado. Artifacts globais coexistem com Artifacts de todos os projetos. Qualquer comunicação durável relevante pode ser um Artifact; tipos conhecidos não limitam o domínio.

Pure Signal: preserve decisões, provas, planos, investigações e comunicações reutilizáveis. Não preserve chats completos, cadeia de pensamento, logs arbitrários, histórico de ferramentas ou informação descartável. Não publique apenas para aumentar volume.

Unbounded Corpus, Bounded Context: corpus grande exige filtros, índices, relações e paginação; não exclusão preventiva de conhecimento útil.

# Self-Contextualization e Fast-Finding

Use contexto histórico quando implementação anterior, decisão, prova, pendência ou trabalho de outro agente puder alterar uma decisão material. Antes de pedir copy/paste de histórico, procure contexto relevante no Continuum. Não consulte por precaução quando o source ou o plano presente já bastam.

Metadata Before Content é estrutural:

necessidade → filtros → discovery records → seleção → get_artifact → conteúdo.

1. Formule a necessidade específica de contexto.
2. Use `list_artifacts` com filtros em interseção: `query` pesquisa somente name/description; `scope` aceita ANY (default), ACTIVE_PROJECT ou GLOBAL; `projectId`, `kind`, `status` e `metadata` restringem a seleção.
3. Comece com limite pequeno (default 20, máximo 100). Use `nextCursor` como `cursor` somente se a próxima página puder mudar a decisão. Preserve os filtros ao continuar.
4. Leia apenas os discovery records. Metadata adicional não vem por padrão; use `metadataKeys` para solicitar somente chaves úteis.
5. Escolha um `artifactId` explícito e use `get_artifact`. Nunca abra todos os resultados automaticamente.
6. Pare ao obter o menor conjunto suficiente para agir.

Continuum tells you what happened. CodeScope tells you what exists now. Artifact histórico não prova source atual ou runtime fresco. Confirme essas propriedades pelas capacidades correspondentes.

# Markdown e metadata

Novos Artifacts exigem YAML frontmatter e corpo Markdown não vazio:

```markdown
---
name: Correção de identidade do Continuum
description: Mapeamento canônico de projeto, invariantes preservadas e provas para retomar a integração MCP.
kind: IMPLEMENTATION_HANDOFF
status: VALIDATED
relations:
  - artifactId: artifact-id-do-plano
    kind: implements
---
Conteúdo durável.
```

`name`: curto, específico e reconhecível. Evite títulos genéricos como Relatório ou Contexto. Não repita toda a descrição.

`description`: escreva para o agente decidir se abrir vale o custo. Identifique problema, resultado ou decisão que poderá encontrar e fronteiras relevantes. Não use frases vazias, repetições do título ou alegações sobre conteúdo ausente. Legados podem não possuir descrição; enriqueça-os por edição quando houver conhecimento suficiente, sem inventar semântica histórica.

`kind`: natureza da comunicação. Reutilize IMPLEMENTATION_HANDOFF, EXECUTABLE_PLAN, WORK_ITEM, VALIDATION_PROOF, ARCHITECTURAL_DECISION, INVESTIGATION ou OBSERVATION quando corresponderem. Antes de introduzir outro termo, verifique convenções existentes. Evite sinônimos para a mesma natureza. Esse vocabulário é convenção da Skill, não enum do backend.

`status`: use somente quando houver lifecycle. Handoffs/provas podem usar VALIDATED ou BLOCKED; Work Items usam PENDING, COMPLETED ou CANCELLED segundo `continuum-work-items`. Não acrescente status decorativo a uma decisão sem lifecycle.

Metadata adicional deve responder a uma necessidade concreta de seleção recorrente. Reutilize chaves e valores existentes; use JSON/YAML estruturado simples. `metadata` filtra igualdade exata por chave, inclusive objetos e arrays (ordem das chaves de objetos é irrelevante). Evite tags livres, sinônimos, campos decorativos, cópia do corpo, paths de armazenamento, hashes e provenance técnica no índice agentivo. Não confunda metadata livre com identidade: IDs, revisão e timestamps são atribuídos pelo backend.

Semântica e procedimento evoluem primeiro na Skill. Mude o backend somente quando faltar uma primitive estrutural real.

# Identidade de projeto

Na publicação, escolha explicitamente `ACTIVE_PROJECT` ou `GLOBAL`. O backend resolve ACTIVE_PROJECT pelo RepositoryRecord.id; GLOBAL possui projectId null. Não digite nomes livres como identidade e não crie projeto durante publicação. Em descoberta cross-project, use um projectId canônico previamente obtido do catálogo ou dos discovery records; projectName serve somente para compreensão.

# Artifact Graph

Relações usam `artifactId` canônicos existentes e `kind` aberto. Nunca use título ou filename como alvo. Não duplique a mesma aresta nem crie autorrelações.

Vocabulário inicial:

- `related-to`: relevância contextual concreta sem relação mais específica;
- `derived-from`: origem material do contexto;
- `implements`: implementação → plano/decisão executada;
- `validates`: prova → Artifact cuja propriedade foi demonstrada;
- `resolved-by`: Work Item → handoff que comprova resolução.

Prefira a relação mais específica; não crie sinônimos ou múltiplas relações redundantes. Crie uma relação quando o alvo puder mudar uma decisão de aquisição de contexto. Não ligue Artifacts apenas porque são do mesmo projeto ou foram publicados próximos no tempo.

Para navegar, use `list_artifacts` com `relatedToArtifactId`, `direction` inbound/outbound/both (default both), e `relationKind` quando relevante. Cada consulta retorna um hop de discovery records. A → B → C não implica C na consulta de A. Abra um relacionado apenas depois de selecioná-lo. Relação significa pista de relevância, nunca carregar contexto automaticamente.

# Publicar e editar

Use `publish_artifact` com `rawMarkdown` completo e `scope`. O receipt traz success, artifactId, revisão 1 e projectId quando aplicável; não ecoa conteúdo. Preserve o artifactId após sucesso e não republique por rotina.

Edite o Artifact existente quando identidade e finalidade lógica permanecerem: corrigir metadata, mudar status, resolver bloqueio, acrescentar prova ou ajustar relações. Crie novo Artifact para comunicação com finalidade independente, nunca apenas porque houve evolução.

Fluxo de edição:

get_artifact → observar revision N → editar Markdown/frontmatter completos → update_artifact(artifactId, expectedRevision=N, rawMarkdown).

A operação substitui representação corrente e relações atomicamente, preserva artifactId/createdAt e grava revisão interna imutável. Relações omitidas são removidas; preserve explicitamente as que continuam válidas. Associação de projeto permanece por padrão; inclua scope somente para reclassificação deliberada.

Em REVISION_CONFLICT, releia a versão corrente, reavalie a alteração e use a nova revisão. Não faça retry cego, merge automático ou novo Artifact para contornar conflito. Histórico não é despejado nem possui navegação pública nesta entrega.

# Implementation Handoff

O corpo do IMPLEMENTATION_HANDOFF é exatamente o Relato Final exigido pelo AGENTS.md. Materialize uma única fonte em Markdown UTF-8, preserve verbatim e acrescente somente frontmatter de descoberta. Não gere resumo, segundo relatório ou seções duplicadas. Confirme publicação e preserve artifactId.

Nunca materialize Markdown através de argumentos de shell ou strings interpoladas: backticks, $, ${…}, $(…) e Unicode devem permanecer literais. Use escrita direta de arquivo.

# Compatibilidade offline

Se MCP de publicação estiver indisponível, o transporte oficial é:

`node scripts/continuum/publish-artifact.cjs publish <arquivo.md> --scope ACTIVE_PROJECT`

Use GLOBAL explicitamente quando necessário. A semântica vem do frontmatter. O locator repositoryKey é apenas compatibilidade de transporte; a ingestão resolve identidade canônica.

`QUEUED` confirma envelope na inbox, não persistência universal. Depois, localize pelo `list_artifacts` e confirme o mesmo artifactId/conteúdo por `get_artifact` antes de declarar publicado. O comando v1 implementation-handoff continua apenas para consumidores antigos; envelopes pendentes e bancos legados são importados sem alterar Markdown. Não apague os bancos legados.

Se publicação falhar, preserve o Relato Final e informe que o handoff não foi publicado. Nunca deixe uma falha de transporte apagar contexto necessário.

# Evolução por evidência

Observe seleção ruim, descrições insuficientes, contexto transportado manualmente, custo recorrente de publicação ou ausência de primitive real. Use `capability-opportunity` para qualificar causa generalizável e ganho futuro. Não implemente fora do escopo nem crie ferramenta que despeje todo o corpus. Um Artifact aberto, source confirmado ou histórico naturalmente stale não constitui deficiência por si só.
