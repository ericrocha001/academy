---
name: continuum-publication
description: Publique, edite e reconcilie Artifacts no Continuum; crie ou atribua tags e copie ou salve Context Bundle por tag somente sob pedido explícito do usuário. Governe CAS, recibos, metadata, relações e handoffs. Prefira continuum-local-cli autorizado; para consulta ou prévia use continuum.
---

# Continuum Publication

## Fronteira

Esta Skill governa autoria e persistência de Artifacts no Continuum do repositório ativo; não cria outro Store ou corpus. Para contexto histórico, identidade canônica e exploração do Artifact Graph consulte `continuum` quando necessário. Para documentos canônicos vivos use a especialização `continuum-living-artifacts` sob demanda.

# Markdown e metadata

Markdown é a fonte semântica única; o corpo deve ser não vazio. No formato econômico, forneça conteúdo semântico e `kind` apenas quando o conteúdo não o determinar com segurança; `name` e `description` podem ser omitidos quando deriváveis do título e da introdução. No contrato atual, publicação econômica nova exige `kind` explícito quando não fornecido por contexto confiável: o backend não infere natureza editorial de texto. O servidor gera o frontmatter canônico. Não redigite artifactId, revisão, timestamps técnicos, hash, sessão, Worktree, commit ou referências de provas que o serviço já consegue comprovar. Preserve decisões, critérios e informações cuja origem confiável o sistema não possui.

O formato autoral/legado com YAML continua válido e é preservado literalmente. Use-o quando precisar de `date` semanticamente significativa, relações deliberadas ou metadata não inferível; não acrescente YAML por ritual. Exemplo com relação semântica intencional:

```markdown
---
name: Migração de identidade do Continuum
description: Abra para compreender o mapeamento do Store legado, as invariantes de isolamento e as provas de restart.
kind: IMPLEMENTATION_HANDOFF
relations:
  - artifactId: artifact-id-do-plano
    kind: implements
---
Conteúdo durável.
```

`name`: curto, específico e reconhecível. Evite títulos genéricos como Relatório ou Contexto. Não repita toda a descrição.

`description`: responda quando outro agente deveria abrir o Artifact. Indique problema, decisão, prova ou fronteira que encontrará. Não escreva um resumo longo nem frases vazias. Legados podem não possuir descrição; enriqueça-os por edição apenas quando houver conhecimento suficiente, sem inventar semântica histórica.

`kind`: natureza durável da comunicação, não assunto, etapa, resultado de ferramenta ou rótulo de fluxo. **Vocabulário de referência para reutilização** (catálogo aberto; não é lista exaustiva):

| `kind` | Use quando o Artifact for... |
|---|---|
| `EXECUTABLE_PLAN` | plano definido para execução e validação; não mera intenção ou investigação. |
| `IMPLEMENTATION_HANDOFF` | relato final da implementação, preservado integralmente conforme contrato de handoff. |
| `WORK_ITEM` | trabalho futuro deliberadamente adiado, com lifecycle de `continuum-work-items`. |
| `VALIDATION_PROOF` | prova objetiva e recuperável de propriedade verificada. |
| `ARCHITECTURAL_DECISION` | decisão arquitetural normativa ou Architecture Map canônico com `artifactRole` apropriado. |
| `INVESTIGATION` | investigação, diagnóstico ou análise que organiza evidências e conclusões sem representar por si uma decisão normativa. |
| `OBSERVATION` | registro factual, retrospectiva, conclusão de integração/merge ou observação operacional sem lifecycle próprio. |
| `CAPABILITY_OPPORTUNITY` | oportunidade de capacidade qualificada por fricção/evidência real; não é uma ideia especulativa genérica. |
| `FEATURE_IDEA` | hipótese ou proposta de feature/capacidade de produto a preservar para avaliação futura, sem aprovação de investimento ou execução. |
| `DOCUMENT` | documento canônico cuja natureza é o próprio texto mantido (ex.: kernels AGENTS/ARCHITECT), diferenciado por `artifactRole`; não é fallback genérico. |
| `VISUAL_REFERENCE` | referência de mídia visual realmente preservada com contexto/proveniência, não relatório sobre UI. |

**Regra de seleção: reutilizar primeiro, expandir quando necessário.** Antes de atribuir `kind`, compare a finalidade do Artifact com os valores acima. Não varra documentos para reconstruir um catálogo; investigue um Artifact específico somente se seu conteúdo for necessário à decisão, não para enumerar metadados. Reutilize o mais específico que corresponda **semanticamente**, sem encaixar à força um conteúdo diferente. Se não houver correspondência adequada, **o agente pode criar um novo `kind` por julgamento próprio**, com nome estável, discriminativo e reutilizável, sem solicitar autorização apenas por ser novo. No documento ou relato, justifique sucintamente a diferença material que o valor existente não cobre. Prefira `artifactRole` ou outra chave de metadata quando a diferença for apenas papel/subtipo de um `kind` já adequado. Evite sinônimos, versões ou nomes atrelados a eventos pontuais. Por exemplo, relatórios de integração factuais costumam caber em `OBSERVATION`, mas isso não proíbe um novo tipo quando houver natureza documental realmente distinta. `LIVING_ARTIFACT` e `FEATURE_MAP` são papéis/metadata de descoberta, não tipos obrigatórios; `CAPABILITY_MAP` é apenas role legado a migrar sem criar Artifact duplicado.

Este vocabulário é uma **base de comparação, não uma whitelist**. Quando um novo valor revelar capacidade reutilizável recorrente, incorpore-o posteriormente à referência canônica para promover convergência; não crie uma revisão da Skill a cada publicação inédita.

`date`: opcional, documental e semanticamente significativa (por exemplo a data de vigência de uma decisão). Preserve valor e formato autorais; só altere quando o significado temporal mudar. Não gere ou atualize `date` para registrar publicação, revisão, teste ou transição: `createdAt` e `updatedAt` são fatos técnicos do backend.

`status`: **opcional**, reservado a lifecycle real e único estado editorial do documento. Planos e Work Items novos recebem `PENDING` do backend quando omitido. Handoff/prova não recebe `VALIDATED` por existir ou conter um teste aprovado. Não escreva status para contornar aprovação; use o contrato governado abaixo. Status autoral legado permanece uma declaração, sem constituir aprovação verificada. **Catálogo operacional compacto de status** — fonte de consulta barata para publicação e reutilização (catálogo aberto a extensões com semântica nova):

- `PENDING`: Plano ou Work Item ainda aberto; execução em andamento não exige status novo.
- `COMPLETED`: Plano ou Work Item efetivamente concluído e validado; não significa PR merged nem sincronização local.
- `CANCELLED`: Plano ou Work Item deliberadamente retirado de execução.
- `VALIDATED`: handoff/prova cuja validação exigida está comprovada; não autoriza merge.
- `BLOCKED`: handoff interrompido por impedimento real não resolvido; preserve diagnóstico no corpo.
- `ACTIVE`: somente política/decisão normativa cuja vigência explícita seja útil para descoberta; não significa que todo documento vivo precise de status.
- `NOT_IMPLEMENTED`: `FEATURE_IDEA` preservada cuja capacidade descrita ainda não foi comprovadamente entregue por inteiro; inclui ideia adiada ou em desenvolvimento, sem definir decisão de investimento.
- `IMPLEMENTED`: `FEATURE_IDEA` integralmente realizada com evidência verificável que corresponda ao seu escopo; não inferir pelo simples início do Plano, commit isolado ou relato parcial.

Matriz padrão: `FEATURE_IDEA` → `NOT_IMPLEMENTED | IMPLEMENTED` (status de existência, não de investimento); `EXECUTABLE_PLAN` e `WORK_ITEM` → `PENDING | COMPLETED | CANCELLED`; `IMPLEMENTATION_HANDOFF` → `VALIDATED | BLOCKED`; `VALIDATION_PROOF` → `VALIDATED` quando efetivamente demonstrada; `ARCHITECTURAL_DECISION` → normalmente **sem status**, excepcionalmente `ACTIVE` para política vigente. `INVESTIGATION`, `OBSERVATION`, `CAPABILITY_OPPORTUNITY`, `DOCUMENT` e `VISUAL_REFERENCE` → normalmente **sem status**. Artifacts históricos sem status não precisam ser alterados só por essa matriz.

**Reutilize antes de ampliar.** Para escolher `status`, consulte **somente o catálogo compacto acima** como referência de vocabulário; não enumere Artifacts nem leia frontmatters de vários documentos para descobrir quais status existem. Essa descoberta global é proibitivamente cara e desnecessária. Se o Artifact tiver lifecycle relevante, use o status existente que corresponda semanticamente. Não force um estado distinto a caber num rótulo inadequado. O vocabulário documental pode ser estendido quando houver semântica nova, com nome e significado curtos e estáveis. Isso não cria uma política executável nem concede autoridade: transições formais dependem da política do backend e de seus gates; ausência da primitive resulta em `REVIEW_REQUIRED`, nunca bypass por YAML. Se a informação for ortogonal ao lifecycle (ex.: publicação remota concluída, checkout local pendente), prefira o corpo ou metadata específica como `deploymentStatus`. O catálogo orienta, não bloqueia extensões justificadas. Não adicione status decorativo.

**Ciclo de uma Feature Idea:** `FEATURE_IDEA` não substitui `WORK_ITEM`, `CAPABILITY_OPPORTUNITY`, `INVESTIGATION` ou `EXECUTABLE_PLAN`. `NOT_IMPLEMENTED` não significa aprovado, priorizado ou prometido. Solicite a transição governada do mesmo Artifact para `IMPLEMENTED` somente após conferir a entrega real e o escopo integral; mantenha relação `resolved-by` ou outra conexão semanticamente pertinente por edição CAS independente, preservando a história. Decisões BUILD/DEFER/REJECT do `feature-investment-gate` não são novos status de construção. Para qualidade da ideação e captura proativa, use `feature-ideation`; esta Skill governa exclusivamente persistência e CAS.

### Manutenção incremental obrigatória do catálogo de status

**Gatilho: publicação persistida de um Artifact com um status ainda ausente deste catálogo.** Nessa situação, o agente deve, **na mesma execução e sem varrer documentos**, atualizar a Skill canônica `continuum-publication` na Academy com **apenas uma entrada nova** (valor, semântica e aplicação quando necessária). Preserve o restante da Skill e suas versões; use a revisão atual (`get_academy_skill` → `update_academy_skill` com `expectedVersion`). Se houver conflito de versão, releia a Skill e verifique se outro agente já adicionou o status ou um equivalente antes de tentar atualizar — não sobrescreva. Nunca abra uma revisão por mera reutilização de status existente, mudança de status de um Artifact ou por execução agendada.

**Falha ou falta de acesso à Academy não bloqueia uma publicação legítima no Continuum.** Nesse caso, informe somente a pendência de catálogo no handoff/relato, com o status novo e significado pretendido, para reconciliação posterior. Não invente outro `status` para sinalizar essa pendência. Quando o catálogo for atualizado, a nova entrada torna-se imediatamente reutilizável por outras publicações; não exige migração de Artifacts antigos.

**Escopo de manutenção recorrente:** só os valores de `status` exigem reconciliação obrigatória na Skill a cada novidade real. `kind`, relation `kind` e metadata adicionais seguem reutilização preferencial e autonomia de extensão, mas não exigem atualização rotineira de catálogos nem inspeção em massa. O backend continua aceitando strings abertas; esta é disciplina de Harness, não uma enumeração rígida de protocolo.

Metadata adicional deve responder a uma necessidade concreta de seleção. **Antes de nomear nova chave ou valor**, consulte metadata já presente na tarefa/Artifact e os exemplos relevantes disponíveis, sem fazer varredura geral por ritual. Reutilize quando houver correspondência semântica; **se faltar uma dimensão ou distinção real, o agente pode introduzi-la**, com nome consistente, significado claro e formato JSON/YAML simples, sem aprovação prévia. Não reaproveite chave inadequada só para evitar novidade. Evite duplicar estado em `status`, corpo e metadata. `metadata` filtra igualdade exata por chave, inclusive objetos e arrays; ordem das chaves de objetos é irrelevante. Não transforme tags livres, sinônimos, provenance técnica, paths de armazenamento, hashes ou cópia do corpo em índice agentivo.

Discovery metadata é a projeção do estado corrente do Artifact. Sempre que o conteúdo for materialmente atualizado, revise a coerência de `name`, `description`, `kind`, `date` documental quando existente, lifecycle, relações e metadata relevante para impedir que a superfície de descoberta fique obsoleta, incompleta ou contradiga o documento corrente.

Quando a associação entre Artifacts da mesma execução ajudar descoberta, use um `executionId` estável e reutilize-o em todos os Artifacts da execução. Antes de criar um novo `executionId`, descubra Artifacts da execução e verifique se um identificador canônico já existe; reutilize-o sempre que existir. Só crie outro quando não houver associação anterior válida. Filtre por `metadata: {executionId: ...}` e solicite `metadataKeys: [executionId]` somente se necessário. Não crie sub-Continuum nem use nomes livres concorrentes para essa associação. Não acrescente executionId por rotina quando ele não alterar seleção.

IDs, revisão e timestamps operacionais (`createdAt`, `updatedAt`) são atribuídos pelo backend. Não exigem duplicação em `date`: timestamps do backend descrevem persistência/revisão operacional; `date` só preserva um tempo documental semanticamente relevante. Metadata livre não redefine identidade nem seleciona outro repositório. Não produza uma segunda representação semântica JSON do documento.

# Publicar e editar

Com terminal, CLI local funcional e autorização, **prefira `continuum-local-cli`** para publicar ou atualizar com confirmação `PERSISTED`, mesmo quando MCP estiver disponível. Use `publish_artifact`/`update_artifact` via MCP quando a via local não atender à necessidade ou ao ambiente. Ambos chegam ao Store canônico. O destino é o Continuum do repositório ativo. O receipt contém success, artifactId, revisão 1 e updatedAt; não ecoa conteúdo. Preserve artifactId após sucesso e não republique por rotina.

**Referência entregue ao usuário:** após confirmar publicação, informe sempre o **name exato do frontmatter** junto do **artifactId** retornado. Apresente preferencialmente `Nome do Artifact — artifactId`, para que a pessoa identifique e encaminhe o documento a outro agente sem depender apenas do identificador opaco. Use o nome do documento efetivamente publicado; não acrescente chamadas de leitura apenas para repetir metadata já conhecida. Para atualização de Artifact existente, informe nome e artifactId quando comunicar a atualização. Em falha/QUEUED, não apresente o Artifact como publicado.

Edite o Artifact existente quando identidade e finalidade lógica permanecerem: corrigir metadata, resolver bloqueio, acrescentar contexto/prova ou ajustar relações. Alterações formais de status usam o workflow governado, preservando a mesma identidade. Crie novo Artifact para comunicação com finalidade independente, nunca apenas porque o documento evoluiu.

Fluxo de edição:

get_artifact → observar revision N → editar Markdown/frontmatter completos → update_artifact(artifactId, expectedRevision=N, rawMarkdown).

A atualização substitui representação corrente e relações atomicamente, preserva artifactId/createdAt e grava revisão interna imutável. Relações omitidas são removidas; preserve explicitamente as que continuam válidas. Artifacts relacionados continuam apontando para a mesma identidade.

Em REVISION_CONFLICT, releia a versão corrente, reavalie a alteração e use a nova revisão. Não faça retry cego, merge automático ou novo Artifact para contornar conflito. Histórico não é despejado nem possui navegação pública nesta entrega.

## Saúde incremental das relações do Artifact Graph

**Publicar ou atualizar um documento inclui reavaliar suas conexões semânticas, não apenas preservar as já existentes.** Omitir uma relação material torna conhecimento canônico mais difícil de descobrir mesmo quando o corpo está correto. Faça um gate pequeno e proporcional à mudança, inclusive ao promover um Artifact a Living Artifact ou acrescentar prova/decisão.

1. **Identifique vínculos materiais:** origem da decisão, Plano implementado, handoff/prova que a sustenta, Work Item resolvido, política canônica afetada ou mapa que aprofunda. Use os IDs já presentes no contexto e as relações atuais; quando necessário, descubra seletivamente o documento vizinho por filtros e **um salto** no grafo via `list_artifacts`. Não varra o corpus inteiro para achar links possíveis.
2. **Classifique a relação pelo significado:** `implements` para entrega versus Plano; `resolved-by` para resolução comprovada; `derived-from` para origem/evidência direta; `depends-on` somente para dependência real; `drills-down-to` para aprofundamento de mapa; `related-to` somente para conexão temática com utilidade clara de navegação. Não substitua relação específica por `related-to` genérico. **Primeiro compare** com `related-to`, `derived-from`, `implements`, `validates`, `resolved-by`, `depends-on` e `drills-down-to`. Reutilize a relação existente quando o significado corresponder. Como relation `kind` é aberto, **o agente pode propor e usar um novo nome** quando expressar relação materialmente distinta e navegável, não coberta pelas existentes; preserve semântica clara e reutilizável e evite apenas renomear uma relação equivalente. Não exige autorização prévia para uma extensão justificada. Menção textual ou URL dentro do Markdown **não cria uma aresta no Artifact Graph**.
3. **Edite com integridade:** confirme `artifactId` e identidade do alvo no mesmo Continuum; preserve arestas ainda válidas, não crie autorrelação, duplicata ou recíproca apenas por simetria. Uma única aresta já permite navegação inbound/outbound. Não mantenha vínculos comprovadamente obsoletos, mas também não os remova por mera mudança de redação.
4. **Confira a persistência quando criar/corrigir arestas:** use receipt/revisão e, quando necessário, `get_artifact` ou consulta direcional limitada para provar que as novas conexões são encontráveis. Em conflito de revisão, reavalie o conjunto completo; `update_artifact` substitui também as relações.

**Gate de saída:** pergunte “um agente que encontrasse este documento conseguiria navegar até a decisão, prova ou entrega diretamente relevante?”. Se houver vínculo material conhecido ausente, corrija-o na mesma publicação. Se o Artifact for legitimamente autônomo, **zero relações é válido**. Não transforme cada menção em aresta, não abra auditoria global por rotina e não atualize o documento de destino apenas para criar backlink redundante.

Para critérios de manutenção do conteúdo de Living Artifacts, use `continuum-living-artifacts`; esta seção governa somente a **integridade das conexões no ato de publicar/editar**.

## Referências visuais — publicação e fallback manual

Quando o usuário solicitar preservação de uma imagem no Continuum, use `publish_visual_artifact` apenas com o **descritor de arquivo autorizado pelo host** (HTTPS + `file_id`), obedecendo o contrato do canal. Os quatro campos semânticos são **nome, descrição, contexto e relações**; a mídia é um arquivo separado. Não confundir `INVALID_FILE` (descritor/transporte inválido, inclusive URL não HTTPS) com `INVALID_VISUAL_MEDIA`, `VISUAL_SIZE_LIMIT`, `FILE_TOO_LARGE` ou falhas de aquisição. A validação real da mídia exige WebP estático lossless, dimensões e tamanho aceitos pelo produto; extensão e MIME declarados não bastam.

**Fallback de publicação pelo usuário:** quando o host não disponibilizar um descritor HTTPS autorizado, a tentativa MCP falhar por transporte, ou o usuário optar pelo upload manual, não repita a chamada com `sediment://`, `sandbox:/`, `file://`, Base64, URL inventada ou URL pública permanente. Entregue o WebP verificado como arquivo para o usuário, junto dos **quatro campos completos**, com texto curto e relações por Artifact ID. Oriente a publicação na interface do Continuum do repositório ativo via **Publicar WebP**. A UI atual aceita inicialmente **uma relação**; indique a conexão principal e preserve as demais para complementação posterior. Não declare publicação concluída antes do recibo.

**Reconciliação após upload:** quando o usuário disser que publicou, localize primeiro o VISUAL_REFERENCE existente por `artifactId` fornecido ou descoberta seletiva (`kind: VISUAL_REFERENCE`, nome/descrição); faça `get_artifact`, confirme identidade/mídia e atualize **in place** somente nome, descrição, contexto e conexões faltantes com `update_artifact(expectedRevision)`. A revisão de texto preserva bytes e SHA-256 imutáveis; nunca republique uma segunda mídia para completar metadata. Se o hash ou a identidade forem incompatíveis, não sobrescreva silenciosamente: investigue e peça evidência específica.

O fallback é **canal alternativo de entrega do mesmo Artifact**, não nova capacidade de armazenamento, fluxo de Git, nem autorização para contornar o controle de origem. Para mockups, `mockup-design` decide quando a referência é necessária; esta Skill governa a publicação no Continuum. Persistência opcional no repositório continua com `repository-file-ingress`.

# Implementation Handoff

O corpo do IMPLEMENTATION_HANDOFF é exatamente o Relato Final exigido pelo AGENTS.md. Materialize uma única fonte em Markdown UTF-8 e preserve verbatim. Use o formato econômico quando suficiente; forneça `kind: IMPLEMENTATION_HANDOFF` quando necessário e a relação deliberada `implements` ao Plano. O backend fornece fatos técnicos, não a decisão de aceite. Não gere resumo, segundo relatório ou seções duplicadas. Confirme publicação e preserve artifactId.

**Entrega por sessão e PR:** publique o Handoff de cada Plano validado sem exigir PR individual e sem adiar seu registro até a conclusão da sessão. **O PR representa a sessão consolidada, não um commit, Plano ou Handoff isolado.** Somente após concluir a sessão, verificar com `worktree-execution` que todos os commits validados pertencentes a ela estão alcançáveis pelo HEAD da branch proposta e receber aprovação específica do responsável, abra um PR único. No Handoff final da sessão, quando houver PR real, inclua URL/número, branch de origem/destino, HEAD, Planos/commits incluídos e evidências; os Handoffs intermediários preservam seus próprios recibos sem inventar PR. Se um Plano estiver validado mas a publicação Git for proibida ou pendente, registre a restrição e não declare que um PR posterior inclui o commit ausente. A escolha de PR, revisão e merge pertence a `worktree-execution`; este procedimento governa o relato, não autoriza Git. `VALIDATED` não significa `PR_OPEN` nem merge.

Nunca materialize Markdown através de argumentos de shell ou strings interpoladas: backticks, $, ${…}, $(…) e Unicode devem permanecer literais. Use escrita direta de arquivo.

## Fallback por atestação revisada

Metadata comum, conteúdo e relações continuam editáveis por `update_artifact` com CAS, preservando campos autorais, tags e status. Nunca escreva lifecycle no YAML para substituir uma transição. Campos técnicos (IDs, repositoryId, revisão, timestamps operacionais, hash e proveniência nativa) pertencem ao servidor.

Quando faltar um fato que hooks não capturaram, registre a declaração em metadata documental `agentAttestations` ou no relato, identificada como `origin: AGENT_ATTESTED`, com atribuição declarada, escopo, referência inspecionável e limitações. Isso não comprova identidade nem vira `HOOK_OBSERVED`. Preserve observações nativas; apresente divergências explicitamente para revisão, sem sobrescrever a fonte oposta.

Consulte o schema anunciado na conexão atual de `transition_artifact_lifecycle`. Comece por `ASSESS`; o padrão `AUTO_VERIFIED` mantém os gates P4 de provas CURRENT e aprovação independente. Se falhar a verificação automática e o runtime anunciar suporte, use explicitamente `evidenceMode: REVIEWED_ATTESTATION` com `attestation: {rationale, limitations, references}` (até dez referências). Cada referência deve ser `{type: ARTIFACT, repositoryId, artifactId, expectedRevision}` ou `{type: LEDGER_PROOF, repositoryId, proofId}`. Logs, commits e relatórios devem estar preservados em um Artifact revisionado e relacionado; não envie paths/URLs arbitrários, payloads privados de provas nem invente evidência. A referência deve existir no mesmo repositório e estar vinculada ao alvo ou suporte.

Confira o diagnóstico read-only antes de solicitar `TRANSITION`. O servidor resolve conteúdo/hash/classificação das fontes, vincula digest e revisão, exige aprovação editorial independente e revalida após confirmação. Atestação não transforma PASSED/UNVERIFIABLE em CURRENT. Sem referências contextualizadas ou autoridade disponível, mantenha REVIEW_REQUIRED. Nunca informe approved ou principal no cliente.

Handoff legado AUTHOR_DECLARED com status VALIDATED pode ser ratificado na mesma semântica sem edição direta do status. Primeiro obtenha seu receipt aprovado contra a revisão exata do Plano; depois solicite COMPLETED no Plano, com supportingArtifactId do Handoff e nova revisão editorial granular. Fechamento por Handoff ratificado requer também REVIEWED_ATTESTATION; não herda verificação automática. Mudança de referência/revisão exige nova avaliação, sem retry cego ou promoção em lote.

Runtime que já anuncia a operação não precisa de outro contrato backend: renove a conexão/snapshot do consumidor e confira tools/list e ASSESS. Atualizar/distribuir a Skill não comprova recarga de plugins ou clientes; registre separadamente fonte confirmada, distribuição e texto efetivamente consumido.

# Reconciliação de conclusão de execução

Quando houver conclusão comprovada, reconcilie somente os Artifacts diretamente relacionados no mesmo repositório. Verifique a operação `transition_artifact_lifecycle` anunciada no runtime; ausência de capacidade ou de autoridade não permite substituir o fluxo por escrita de `status` no Markdown.

1. Publique o Handoff preservando o Relato Final e a relação intencional `implements`. Recupere a revisão corrente; publicação persistida não é aceite editorial.
2. Use `transition_artifact_lifecycle({action:"ASSESS", artifactId, expectedRevision, toState:"VALIDATED", reasonCode:"CRITERIA_ACCEPTED"})` para diagnóstico. O backend seleciona até dez provas CURRENT por `evidenceFor` no alvo e em seu Plano inequívoco, verifica repositório/freshness e resolve revisões. `evidenceRefs` é opcional para seleção deliberada, sem redigitar provas já encontráveis; `supportingArtifactId` só desambigua alvo conhecido. Seleção limitada não demonstra cobertura integral.
3. Quando a decisão estiver autorizada, solicite `action:"TRANSITION"`. O servidor exige revisão explícita de todo o conteúdo, dos critérios e da suficiência das provas. O cliente nunca envia `approved`, identidade do aprovador ou alegação de autoridade. Na confirmação nativa, Cancelar é o padrão e a revisão dos critérios precisa ser marcada; a identidade individual indisponível é registrada como tal.
4. Após Handoff aprovado, solicite `COMPLETED` com `reasonCode:"CLOSURE_ACCEPTED"` para o Plano/Work Item na revisão atual. O backend exige Handoff `implements` validado para essa exata revisão e reutiliza suas provas; a decisão de fechamento tem aprovação independente. `CANCELLED` usa `EXPLICIT_CANCELLATION`, `BLOCKED` usa `BLOCKAGE_CONFIRMED`, `ACTIVE` usa `NORMATIVE_ACTIVATION` e `IMPLEMENTED|NOT_IMPLEMENTED` usa `IMPLEMENTATION_REVIEWED`, sempre sob política e autoridade pertinentes.
5. Confirme `PERSISTED`, revisão e recibo. Repetição exata aceita não duplica revisão; CAS antigo conflitante exige releitura e reavaliação. `REVIEW_REQUIRED` não é conclusão: preserve o diagnóstico e encaminhe a decisão. Nunca promova `READY_FOR_REVIEW`, teste PASSED, PR integrado ou proveniência nativa isolada a aceite.
6. Preserve relações semanticamente relevantes com edição CAS quando necessário, inclusive `resolved-by`; não acrescente backlinks por simetria. Alteração posterior do documento ou evidência revogada sinaliza freshness e exige reavaliação, preservando o status e a aprovação históricos. A projeção `lifecycle` é derivada de `metadata.status`, não outra autoridade.

**Separação de estados:** `operationalActivity.IN_PROGRESS` é diagnóstico observado, não estado editorial ou lease. `VALIDATED` e `COMPLETED` não autorizam commit, PR ou merge nem comprovam distribuição da Academy; mantenha os gates independentes de `worktree-execution`. Não atualize `date` técnica ou Artifacts históricos em lote.

# Compatibilidade offline

Quando houver acesso local funcional e autorizado, prefira a CLI online descrita em `continuum-local-cli`, sem MCP, com o Code Awareness em execução. Quando o canal online estiver indisponível e a escolha **explícita** for transporte assíncrono offline (não publicação já confirmada):

`node scripts/continuum/publish-artifact.cjs publish <arquivo.md>`

O Markdown carrega metadata; o publisher não inventa significado. O envelope fica na inbox do checkout. RepositoryKey serve apenas como locator de transporte legado; o Store pertence ao ID canônico do catálogo.

`QUEUED` confirma envelope na inbox, não persistência. Localize por `list_artifacts` e confirme artifactId/conteúdo por `get_artifact` antes de declarar publicado. O comando v1 implementation-handoff permanece para consumidores antigos, e envelopes v1 pendentes continuam sendo ingeridos. Não apague Stores legados; migração preserva seus dados e os mantém separados por repositório.

Se o runtime ativo ainda expuser somente o protocolo v1, publique handoff pelo comando compatível `implementation-handoff <arquivo.md> --title "<título>"` preservando exatamente o Relato Final, e confirme ingestão. Não publique outra comunicação falsamente como handoff para contornar versão antiga.

Se publicação falhar, preserve o Relato Final e informe que o handoff não foi publicado. Nunca deixe falha de transporte apagar contexto necessário.

## Autoria dedicada de tags e exportação solicitada

Tags canônicas podem ser criadas/atribuídas por agentes **somente quando o usuário solicitar**, usando ferramentas dedicadas do Channel autenticado no repositório ativo. Consulte primeiro o catálogo pela seleção/reuso de `continuum`. Sem equivalente, proponha nome, critério de pertencimento e motivo de inexistência de equivalente; aguarde pedido explícito de criação ou aprovação da proposta antes de `create_continuum_tag`. Em organização abrangente/autonomia ampla, apresente antes taxonomia curta para aprovação. Pedido explícito "crie tag X" pode seguir diretamente nas permissões reais do host, sem segunda confirmação fictícia. Nunca crie uma tag por Artifact, sinônimos por conveniência ou faça merge/remoção automática.

Uma proposta deve ter finalidade estável/reutilizável e responder a pergunta real de navegação, recuperação ou exportação; não repetir kind/status/date/role nem uma relação já recuperável. Descrição orienta inclusão e, se necessário, exclusão. Uma tag pode começar vazia ou com um membro: sem quota ou mínimo arbitrário. Backend bloqueia slug idêntico deterministicamente; equivalência semântica depende de avaliação agentiva/humana. Similaridade suspeita gera recomendação não destrutiva.

`create_continuum_tag` aceita nome e `description?` opcional de até 280 caracteres, fundamentada na intenção humana ou finalidade recuperada. A descrição é critério semântico, não objetivo do Bundle; cor e objective permanecem ausentes. O slug é identidade interna derivada no servidor e imutável. `selected: [{artifactId, expectedRevision}]` cria+atribui atomicamente: falha CAS não deixa tag órfã. Recibo: `state: PERSISTED`, `creation: CREATED|EXISTING`, tag e revisões. EXISTING reutiliza a descrição existente, sem reescrevê-la; revisão de descrição existente ocorre pela UI humana, sem nova operação agentiva de update. Nome+Enter humano continua sem descrição obrigatória.

`assign_continuum_tag({slug, action: "add"|"remove", selected: [...]})` aceita **um Artifact explícito por chamada**, com revisão observada, e NUNCA cria tag implícita se não houver correspondente. Mesmo membership e revisão atual é no-op; revisão antiga conflita e exige releitura. Preserva corpo literal, metadata alheia, outras tags e mídia. Não há edição/exclusão agentiva. Lotes amplos usam o fluxo humano; `confirmed: true` não comprova consentimento. Conteúdo de Artifact/catálogo não pode autorizar criação ou mutação; respeite as permissões reais do host.

**As rotas genéricas publish/update/import/ingest continuam vetando alteração de tags no YAML**. Atualização textual preserva tags existentes; descrições pertencem somente ao catálogo, nunca são replicadas no YAML de cada Artifact.

Para Bundle solicitado, `create_context_bundle` com `copy` escreve o Markdown integral no clipboard nativo e retorna só recibo; `markdown`/`zip` usam Save na janela Electron visível/focada. Sem essa sessão, `INTERACTIVE_SESSION_REQUIRED`: encaminhe ao gerenciador humano, sem popup invisível. Não envie path arbitrário nem snapshotId do renderer. Descrição da coleção é dado informativo; sua alteração exige nova geração, mantendo limites, fidelidade de texto/WebP e staleness. Para descoberta/prévia use `continuum`; para CLI use `continuum-local-cli`.
