---
name: continuum-publication
description: Use para criar, publicar, editar ou padronizar Artifacts no Continuum canônico, governando kind/status canônicos, metadata, relações, handoffs e revisão. Quando CLI local autorizada estiver disponível, prefira continuum-local-cli mesmo com MCP acessível; use MCP quando necessário. QUEUED não prova persistência. Para mera leitura use continuum.
---

# Continuum Publication

## Fronteira

Esta Skill governa autoria e persistência de Artifacts no Continuum do repositório ativo; não cria outro Store ou corpus. Para contexto histórico, identidade canônica e exploração do Artifact Graph consulte `continuum` quando necessário. Para documentos canônicos vivos use a especialização `continuum-living-artifacts` sob demanda.

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

`kind`: natureza durável da comunicação, não assunto, etapa, resultado de ferramenta ou rótulo de fluxo. **Catálogo canônico de autoria** (10 valores já encontrados no Continuum):

| `kind` | Use quando o Artifact for... |
|---|---|
| `EXECUTABLE_PLAN` | plano definido para execução e validação; não mera intenção ou investigação. |
| `IMPLEMENTATION_HANDOFF` | relato final da implementação, preservado integralmente conforme contrato de handoff. |
| `WORK_ITEM` | trabalho futuro deliberadamente adiado, com lifecycle de `continuum-work-items`. |
| `VALIDATION_PROOF` | prova objetiva e recuperável de propriedade verificada. |
| `ARCHITECTURAL_DECISION` | decisão arquitetural normativa ou Architecture Map canônico com `artifactRole` apropriado. |
| `INVESTIGATION` | investigação, diagnóstico ou análise que organiza evidências e conclusões sem representar por si uma decisão normativa. |
| `OBSERVATION` | registro factual, retrospectiva, conclusão de integração/merge ou observação operacional sem lifecycle próprio. |
| `CAPABILITY_OPPORTUNITY` | oportunidade material qualificada para avaliar capacidade futura; não é Plano executável nem Work Item por si só. |
| `DOCUMENT` | documento canônico cuja natureza é o próprio texto mantido (ex.: kernels AGENTS/ARCHITECT), diferenciado por `artifactRole`; não é fallback genérico. |
| `VISUAL_REFERENCE` | referência de mídia visual realmente preservada com contexto/proveniência, não relatório sobre UI. |

A lista é deliberadamente fechada **para a autoria padrão por agentes**, embora o backend ainda aceite strings abertas. **Não crie `kind` novo por iniciativa própria**: primeiro procure equivalência semântica neste catálogo; use `artifactRole` ou metadata especializada somente quando agregarem filtragem real. Um `kind` adicional exige necessidade distinta comprovada e decisão explícita de governança, depois atualização desta única Skill canônica. Valores históricos não ganham legitimidade por existirem no corpus. `INTEGRATION_REPORT`, por exemplo, deve ser `OBSERVATION`; `LIVING_ARTIFACT` e `CAPABILITY_MAP` são papéis (`livingArtifact`/`artifactRole`), não novos kinds.

`date`: obrigatório em todo Artifact novo. Use timestamp ISO 8601 completo com data, hora e offset de fuso, por exemplo `2026-10-06T04:05:00-03:00`. Ele representa quando a representação semântica corrente do documento foi produzida, não apenas quando o backend a persistiu. Ao atualizar materialmente conteúdo, status, decisão, prova ou relações do Artifact, atualize também `date` para o momento da nova representação. Não use data sem hora, hora sem fuso ou termos relativos como hoje/agora.

`status`: **opcional** e reservado a lifecycle real. Vocabulário canônico de autoria (6 valores já encontrados):

- `PENDING`: Plano ou Work Item ainda aberto; execução em andamento não exige status novo.
- `COMPLETED`: Plano ou Work Item efetivamente concluído e validado; não significa PR merged nem sincronização local.
- `CANCELLED`: Plano ou Work Item deliberadamente retirado de execução.
- `VALIDATED`: handoff/prova cuja validação exigida está comprovada; não autoriza merge.
- `BLOCKED`: handoff interrompido por impedimento real não resolvido; preserve diagnóstico no corpo.
- `ACTIVE`: somente política/decisão normativa cuja vigência explícita seja útil para descoberta; não significa que todo documento vivo precise de status.

Matriz padrão: `EXECUTABLE_PLAN` e `WORK_ITEM` → `PENDING | COMPLETED | CANCELLED`; `IMPLEMENTATION_HANDOFF` → `VALIDATED | BLOCKED`; `VALIDATION_PROOF` → `VALIDATED` quando efetivamente demonstrada; `ARCHITECTURAL_DECISION` → normalmente **sem status**, excepcionalmente `ACTIVE` para política vigente. `INVESTIGATION`, `OBSERVATION`, `CAPABILITY_OPPORTUNITY`, `DOCUMENT` e `VISUAL_REFERENCE` → normalmente **sem status**. Artifacts históricos sem status não precisam ser alterados só por essa matriz.

Nunca transforme estágio composto (por exemplo publicação remota concluída mas checkout local ainda pendente), status de Git/PR, receipt, saúde, decisão pendente ou resultado da ferramenta em `status` novo. Preserve a nuance no corpo ou em metadata específica já utilizada (como `deploymentStatus`), quando isso melhorar descoberta. Se um caso real não couber, não invente valor: reavalie a natureza/lifecycle e solicite governança antes de ampliar o catálogo.

Metadata adicional deve responder a uma necessidade concreta de seleção. Reutilize chaves e valores existentes e use JSON/YAML estruturado simples. `metadata` filtra igualdade exata por chave, inclusive objetos e arrays; ordem das chaves de objetos é irrelevante. Não transforme tags livres, sinônimos, provenance técnica, paths de armazenamento, hashes ou cópia do corpo em índice agentivo.

Discovery metadata é a projeção do estado corrente do Artifact. Sempre que o conteúdo for materialmente atualizado, revise `name`, `description`, `kind`, `date`, `status`, relações e metadata relevante para impedir que a superfície de descoberta fique obsoleta, incompleta ou contradiga o documento corrente.

Quando a associação entre Artifacts da mesma execução ajudar descoberta, use um `executionId` estável e reutilize-o em todos os Artifacts da execução. Antes de criar um novo `executionId`, descubra Artifacts da execução e verifique se um identificador canônico já existe; reutilize-o sempre que existir. Só crie outro quando não houver associação anterior válida. Filtre por `metadata: {executionId: ...}` e solicite `metadataKeys: [executionId]` somente se necessário. Não crie sub-Continuum nem use nomes livres concorrentes para essa associação. Não acrescente executionId por rotina quando ele não alterar seleção.

IDs, revisão e timestamps operacionais (`createdAt`, `updatedAt`) são atribuídos pelo backend. Eles não substituem `date` no documento: timestamps do backend descrevem persistência/revisão operacional; `date` preserva o tempo semântico da representação corrente dentro do próprio Artifact. Metadata livre não redefine identidade nem seleciona outro repositório. Não produza uma segunda representação semântica JSON do documento.

# Publicar e editar

Com terminal, CLI local funcional e autorização, **prefira `continuum-local-cli`** para publicar ou atualizar com confirmação `PERSISTED`, mesmo quando MCP estiver disponível. Use `publish_artifact`/`update_artifact` via MCP quando a via local não atender à necessidade ou ao ambiente. Ambos chegam ao Store canônico. O destino é o Continuum do repositório ativo. O receipt contém success, artifactId, revisão 1 e updatedAt; não ecoa conteúdo. Preserve artifactId após sucesso e não republique por rotina.

**Referência entregue ao usuário:** após confirmar publicação, informe sempre o **name exato do frontmatter** junto do **artifactId** retornado. Apresente preferencialmente `Nome do Artifact — artifactId`, para que a pessoa identifique e encaminhe o documento a outro agente sem depender apenas do identificador opaco. Use o nome do documento efetivamente publicado; não acrescente chamadas de leitura apenas para repetir metadata já conhecida. Para atualização de Artifact existente, informe nome e artifactId quando comunicar a atualização. Em falha/QUEUED, não apresente o Artifact como publicado.

Edite o Artifact existente quando identidade e finalidade lógica permanecerem: corrigir metadata, mudar status, resolver bloqueio, acrescentar contexto/prova ou ajustar relações. Crie novo Artifact para comunicação com finalidade independente, nunca apenas porque o documento evoluiu.

Fluxo de edição:

get_artifact → observar revision N → editar Markdown/frontmatter completos → update_artifact(artifactId, expectedRevision=N, rawMarkdown).

A atualização substitui representação corrente e relações atomicamente, preserva artifactId/createdAt e grava revisão interna imutável. Relações omitidas são removidas; preserve explicitamente as que continuam válidas. Artifacts relacionados continuam apontando para a mesma identidade.

Em REVISION_CONFLICT, releia a versão corrente, reavalie a alteração e use a nova revisão. Não faça retry cego, merge automático ou novo Artifact para contornar conflito. Histórico não é despejado nem possui navegação pública nesta entrega.

## Saúde incremental das relações do Artifact Graph

**Publicar ou atualizar um documento inclui reavaliar suas conexões semânticas, não apenas preservar as já existentes.** Omitir uma relação material torna conhecimento canônico mais difícil de descobrir mesmo quando o corpo está correto. Faça um gate pequeno e proporcional à mudança, inclusive ao promover um Artifact a Living Artifact ou acrescentar prova/decisão.

1. **Identifique vínculos materiais:** origem da decisão, Plano implementado, handoff/prova que a sustenta, Work Item resolvido, política canônica afetada ou mapa que aprofunda. Use os IDs já presentes no contexto e as relações atuais; quando necessário, descubra seletivamente o documento vizinho por filtros e **um salto** no grafo via `list_artifacts`. Não varra o corpus inteiro para achar links possíveis.
2. **Classifique a relação pelo significado:** `implements` para entrega versus Plano; `resolved-by` para resolução comprovada; `derived-from` para origem/evidência direta; `depends-on` somente para dependência real; `drills-down-to` para aprofundamento de mapa; `related-to` somente para conexão temática com utilidade clara de navegação. Não substitua relação específica por `related-to` genérico. **Na autoria padrão, reutilize apenas `related-to`, `derived-from`, `implements`, `validates`, `resolved-by`, `depends-on` e `drills-down-to`**, selecionando o significado mais específico; relation `kind` também é string aberta no backend, não autorização para inventar sinônimos como `integrates`, `documents` ou `follows-up`. Uma nova semântica exige decisão de governança, não inferência do agente. Menção textual ou URL dentro do Markdown **não cria uma aresta no Artifact Graph**.
3. **Edite com integridade:** confirme `artifactId` e identidade do alvo no mesmo Continuum; preserve arestas ainda válidas, não crie autorrelação, duplicata ou recíproca apenas por simetria. Uma única aresta já permite navegação inbound/outbound. Não mantenha vínculos comprovadamente obsoletos, mas também não os remova por mera mudança de redação.
4. **Confira a persistência quando criar/corrigir arestas:** use receipt/revisão e, quando necessário, `get_artifact` ou consulta direcional limitada para provar que as novas conexões são encontráveis. Em conflito de revisão, reavalie o conjunto completo; `update_artifact` substitui também as relações.

**Gate de saída:** pergunte “um agente que encontrasse este documento conseguiria navegar até a decisão, prova ou entrega diretamente relevante?”. Se houver vínculo material conhecido ausente, corrija-o na mesma publicação. Se o Artifact for legitimamente autônomo, **zero relações é válido**. Não transforme cada menção em aresta, não abra auditoria global por rotina e não atualize o documento de destino apenas para criar backlink redundante.

Para critérios de manutenção do conteúdo de Living Artifacts, use `continuum-living-artifacts`; esta seção governa somente a **integridade das conexões no ato de publicar/editar**.

# Implementation Handoff

O corpo do IMPLEMENTATION_HANDOFF é exatamente o Relato Final exigido pelo AGENTS.md. Materialize uma única fonte em Markdown UTF-8, preserve verbatim e acrescente somente frontmatter de descoberta. Não gere resumo, segundo relatório ou seções duplicadas. Confirme publicação e preserve artifactId.

**Entrega por PR:** quando o trabalho foi validado e será proposto para integração, quem produziu a entrega deve **abrir o Pull Request antes de finalizar/publicar o Relato Final**, se possuir a permissão necessária. Inclua no próprio Relato Final o URL/número real do PR, branch de origem/destino, HEAD e evidências relevantes; assim o mesmo corpo do handoff serve ao revisor sem segundo relatório. O PR é a superfície de revisão de código e o Continuum preserva o relato/provas — um não substitui o outro. A escolha de quando propor, revisar e integrar pertence a `worktree-execution`. Se PR não pôde ser criado, registre o impedimento real sem inventar link; `VALIDATED` não equivale a `PR_OPEN` nem a merge.

Nunca materialize Markdown através de argumentos de shell ou strings interpoladas: backticks, $, ${…}, $(…) e Unicode devem permanecer literais. Use escrita direta de arquivo.

# Reconciliação de conclusão de execução

Quando publicar um `IMPLEMENTATION_HANDOFF` validado **ou receber confirmação documentada de conclusão** de trabalho representado no Continuum, reconcilie **somente** os Artifacts de origem relacionados, sem varredura geral do corpus. Esta é uma responsabilidade de quem tiver a tarefa e a capacidade de escrita autorizada, não de um papel presumido.

1. Confirme persistência do handoff (`PERSISTED` ou receipt equivalente), `status: VALIDATED`, relação `implements` ao Plano correto e `executionId` compatível quando existente. Confira se a evidência cobre **todo** o critério de conclusão do Artifact de origem; handoff parcial, `BLOCKED`, vínculo temático ou mesmo `executionId` isolado não bastam.
2. Leia a revisão corrente do `EXECUTABLE_PLAN` vinculado e de eventual `WORK_ITEM` realmente resolvido pela mesma evidência. Se o lifecycle existente estiver `PENDING` e a conclusão estiver comprovada, atualize **o próprio Artifact** para `COMPLETED`, preservando corpo, identidade, metadata e relações válidas; acrescente `resolved-by` apontando para o handoff quando pertinente. Para a semântica particular de Work Items siga `continuum-work-items`.
3. Execute a edição pelo transporte autorizado (MCP ou `continuum-local-cli`) com `expectedRevision`, atualize `date` semântico e confirme a persistência/estado final. Em `REVISION_CONFLICT`, releia e reavalie; nunca sobrescreva silenciosamente. Não crie novo Plano ou Work Item para corrigir status.
4. Se o Artifact não tiver lifecycle aplicável, a validação for insuficiente, a escrita não estiver autorizada ou só existir `QUEUED`, **não declare a reconciliação concluída**. Informe a pendência específica para um executor com capacidade/autorização, sem inventar status.

**Separação de estados:** implementação validada não prova commit, push nem integração Git. `COMPLETED` aqui registra conclusão do trabalho descrito no Artifact, nunca promoção à `main` por inferência. A verificação das relações e do estado deve ocorrer no Continuum do mesmo repositório, não por título semelhante.

# Compatibilidade offline

Quando houver acesso local funcional e autorizado, prefira a CLI online descrita em `continuum-local-cli`, sem MCP, com o Code Awareness em execução. Quando o canal online estiver indisponível e a escolha **explícita** for transporte assíncrono offline (não publicação já confirmada):

`node scripts/continuum/publish-artifact.cjs publish <arquivo.md>`

O Markdown carrega metadata; o publisher não inventa significado. O envelope fica na inbox do checkout. RepositoryKey serve apenas como locator de transporte legado; o Store pertence ao ID canônico do catálogo.

`QUEUED` confirma envelope na inbox, não persistência. Localize por `list_artifacts` e confirme artifactId/conteúdo por `get_artifact` antes de declarar publicado. O comando v1 implementation-handoff permanece para consumidores antigos, e envelopes v1 pendentes continuam sendo ingeridos. Não apague Stores legados; migração preserva seus dados e os mantém separados por repositório.

Se o runtime ativo ainda expuser somente o protocolo v1, publique handoff pelo comando compatível `implementation-handoff <arquivo.md> --title "<título>"` preservando exatamente o Relato Final, e confirme ingestão. Não publique outra comunicação falsamente como handoff para contornar versão antiga.

Se publicação falhar, preserve o Relato Final e informe que o handoff não foi publicado. Nunca deixe falha de transporte apagar contexto necessário.

