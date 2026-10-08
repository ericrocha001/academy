---
name: continuum-living-artifacts
description: Use ao criar ou manter documentos canônicos vivos no Continuum (Living Artifacts, Capability Maps e sua governança), sem duplicar source ou Skills. Use architecture-map para consultar Architecture Maps e architecture-map-authoring para criá-los, revisá-los ou corrigi-los e continuum-publication para persistir revisões. Não acione para consulta histórica comum.
---

# Continuum Living Artifacts

## Fronteira

Aplica a governança de documentos canônicos duráveis em um único Continuum por repositório. Para seleção por discovery ou relações consulte `continuum`; para publicar/editar consulte `continuum-publication` apenas quando precisar persistir. A Skill `architecture-map` governa a consulta do mapa; `architecture-map-authoring` governa seu conteúdo, criação e gatilhos de atualização.

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

### Architecture Maps

Use o papel semântico:

`artifactRole: ARCHITECTURE_MAP`

sempre em combinação com:

`livingArtifact: true`

Architecture Map é a projeção arquitetural canônica de alto sinal do **repositório como sistema**.

Regra padrão:

> **um Architecture Map canônico por repositório.**

Ele responde principalmente:

- como o sistema se organiza;
- quais são os grandes subsistemas;
- quem possui quais responsabilidades;
- quais são as direções principais de dependência;
- quais runtime boundaries existem;
- quais fluxos atravessam subsistemas;
- quais invariantes arquiteturais governam o todo.

Architecture Map não deve repetir em profundidade as features. Para drill-down, relacione Capability Maps com:

`drills-down-to`

Exemplo de aquisição:

Architecture Map
→ `list_artifacts(relatedToArtifactId, direction: "outbound", relationKind: "drills-down-to")`
→ selecionar Capability Map relevante
→ abrir somente esse Artifact.

Discovery direto:

`list_artifacts(metadata: { livingArtifact: true, artifactRole: "ARCHITECTURE_MAP" })`

Criação, revisão, discrepância e gatilhos de atualização pertencem à Skill `architecture-map-authoring`.

### Capability Maps

Use o papel semântico:

`artifactRole: CAPABILITY_MAP`

sempre em combinação com:

`livingArtifact: true`

Capability Map é uma projeção arquitetural canônica de alto sinal para compreender rapidamente **o que uma feature/subsistema é hoje**, sem reconstruir sua arquitetura pelo source.

Ele não é novo `kind`. Preserve a natureza do Artifact e use `artifactRole` apenas para discovery.

#### Gate de criação

Crie um Capability Map somente quando a feature/subsistema:

- possui arquitetura ou fronteiras não triviais;
- é consultada repetidamente por agentes;
- expõe múltiplas capacidades, contratos ou garantias;
- costuma exigir várias chamadas de Code Navigation apenas para recuperar compreensão básica;
- continuará relevante ao longo de várias execuções;
- pode ser descrita em uma representação significativamente menor que sua implementação.

Não crie quando:

- a feature é pequena e autoexplicativa;
- o source já é barato o suficiente para contextualização;
- o documento apenas repetiria README, plano ou handoff;
- a arquitetura ainda muda rápido demais para uma representação canônica ser útil;
- não existe consumidor recorrente.

Teste contrafactual:

> Se este Capability Map já existisse, um agente novo conseguiria tomar decisões corretas sobre a feature com materialmente menos navegação, source e inferência?

Se não, não crie.

#### Conteúdo permitido

Um Capability Map deve privilegiar:

- finalidade;
- modelo conceitual;
- capabilities atuais;
- fronteiras e ownership;
- contratos de consumo;
- garantias relevantes;
- estados/readiness/freshness quando materiais;
- superfícies públicas;
- limites explícitos;
- relações com capacidades vizinhas;
- gatilhos de manutenção.

Evite:

- copiar classes/funções;
- reproduzir schemas completos;
- listar todo arquivo;
- narrar histórico;
- registrar decisões já obsoletas;
- documentar detalhes internos sem impacto de consumo;
- substituir source/runtime como autoridade atual.

#### Manutenção

Atualize quando mudança material alterar:

- capability pública;
- fronteira arquitetural;
- contrato de consumo;
- garantia;
- estado/readiness;
- ownership;
- limite relevante;
- forma principal de interação com consumidores.

Não atualize por refactor interno semanticamente neutro.

Capability Map representa **o melhor modelo corrente da feature**, não seu changelog.

Discovery recomendado:

`list_artifacts(metadata: { livingArtifact: true, artifactRole: "CAPABILITY_MAP" })`

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

