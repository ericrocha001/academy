---
name: mockup-design
description: Crie ou avalie a necessidade de mockup, wireframe ou referência visual de alta fidelidade quando solicitado ou quando otimizacao-de-ui identificar incerteza visual relevante. Preserve Design System e contratos; não use para implementar UI, definir layout operacional completo ou decidir se a feature deve existir.
---

# Mockup Design

## Finalidade

Transforme uma direção de UI ainda abstrata em uma referência visual concreta que reduza ambiguidade para arquitetura, implementação e revisão.

Princípio:

> **Mockup defines direction; source and runtime define truth.**

O mockup deve tornar visíveis:

- composição;
- hierarquia;
- proporções;
- densidade;
- linguagem visual;
- relação entre superfícies;
- foco da tarefa principal;
- tratamento de estados quando material.

Ele não é uma especificação pixel-perfect nem autoridade sobre dados, comportamento ou contratos.

## Gate de mockup

A função desta Skill não é maximizar quantidade de mockups. É criar a menor referência visual capaz de reduzir incerteza material.

### GERAR

Gere quando:

- o usuário pedir explicitamente;
- uma UI nova possuir composição não trivial ainda não materializada;
- um redesign mudar substancialmente composição ou hierarquia;
- múltiplas direções visuais plausíveis competirem;
- o Design System estar definido, mas sua aplicação concreta à tela ainda exigir uma decisão visual material;
- outro agente precisar de referência visual antes da implementação;
- a tela puder se tornar exemplo gráfico durável do Design System.

### REUTILIZAR

Se já houver mockup aprovado e a direção relevante continuar válida:

- use o existente;
- não crie variação redundante;
- atualize somente quando houver mudança material de direção;
- confirme que source/runtime e Design System não invalidaram as premissas relevantes da referência.

### DISPENSAR

Dispense quando:

- o ajuste for local/cosmético;
- o problema for um bug conhecido de spacing, overflow, contraste ou semântica de estado, sem incerteza de composição a resolver;
- o padrão visual canônico já determinar a solução;
- a direção já estiver inequívoca;
- a imagem não mudaria decisão arquitetural ou de implementação.

Se esta Skill foi chamada porque o usuário pediu explicitamente um mockup, gere-o; o gate serve para decisões autônomas do agente.

## Hierarquia de autoridade

Use sempre:

1. **Source/runtime — verdade funcional**
2. **Design System — verdade visual normativa**
3. **Arquitetura/Plano — composição específica**
4. **Mockup — referência visual direcional**

Em conflito, a camada superior vence.

O mockup pode explorar apresentação, não produto.

Ele não autoriza:

- ações inexistentes;
- métricas não produzidas;
- filtros inexistentes;
- estados impossíveis;
- histórico que o sistema não possui;
- backend novo;
- mudanças de contrato.

## Fronteiras com Skills vizinhas

### Otimização de UI

`otimizacao-de-ui` decide:

- o que precisa melhorar;
- quais contratos preservar;
- arquitetura de informação;
- responsabilidade das regiões;
- responsividade;
- quando um mockup agrega valor.

`mockup-design` recebe essa direção e a materializa visualmente.

### Feature Investment Gate

Mockup não prova que uma feature merece existir.

Quando a própria existência da UI ainda estiver em dúvida, use primeiro `feature-investment-gate`.

### Planejamento Executável

Mockup não substitui Plano Final.

Depois da direção visual estar resolvida, `planejamento-executavel` transforma arquitetura + contratos + referência visual em execução.

## Fontes de verdade

Antes de desenhar, adquira somente o necessário de:

1. source/runtime atual;
2. Design System canônico;
3. arquitetura/Plano da feature;
4. UI atual, quando houver;
5. objetivo e restrições reais de viewport/estado.

Não use screenshot isolada como autoridade funcional.

## Não invente produto

Não introduza apenas para “ficar bonito”:

- ações inexistentes;
- filtros inexistentes;
- métricas não produzidas;
- estados impossíveis;
- informações que o backend não possui;
- fluxos novos não aprovados;
- controles decorativos que parecem funcionais.

Pode simplificar conteúdo textual para legibilidade visual, mas preserve o significado.

Se um elemento ilustrativo for necessário para demonstrar composição, ele deve representar uma capability real.

## Design System primeiro

Quando houver Design System:

- recupere sua representação canônica;
- preserve assinatura cromática;
- use hierarquia de superfícies coerente;
- respeite semântica de estados;
- reutilize padrões de geometry, spacing, typography e iconografia;
- não crie um microsite visual dentro do produto.

O mockup pode explorar composição nova.

Não pode criar um Design System paralelo.

## Preparação do mockup

Antes de gerar a imagem, consolide um brief visual curto:

- **Tela/feature:** o que está sendo representado;
- **Objetivo principal:** o que o usuário precisa perceber/fazer;
- **Regiões:** grandes blocos e suas responsabilidades;
- **Hierarquia:** primário, contextual, excepcional;
- **Estado representado:** normal, issue, empty etc.;
- **Viewport:** proporção e contexto desktop/mobile;
- **Design System:** identidade e regras relevantes;
- **Invariantes:** capacidades que não podem desaparecer.

Não despeje toda a arquitetura no prompt visual.

Comprima-a em relações espaciais e semânticas.

## Composição

Prefira uma imagem canônica forte a muitas variações fracas.

Para desktop denso:

- preserve viewport de aplicação;
- use painéis com responsabilidade clara;
- evite page-long admin dump;
- mantenha alta densidade e baixo ruído;
- rebaixe detalhes secundários;
- deixe exceptional state mais saliente que healthy state;
- preserve legibilidade de dados técnicos.

Quando responsividade for material e não puder ser inferida com segurança, produza uma segunda referência específica para o breakpoint relevante. Não coloque vários breakpoints em um collage confuso por padrão.

## Estado visual

Escolha um estado representativo real.

Healthy deve ser silencioso.

Pending não deve parecer Working.

Working só pode usar indicadores de atividade se a capability realmente trabalha.

Issue pode ter maior saliência.

Unknown deve permanecer neutro.

O mockup não pode contradizer a verdade operacional definida pelo produto.

## Qualidade gráfica

Busque:

- leitura imediata da tarefa principal;
- hierarquia inequívoca;
- alinhamento e ritmo consistentes;
- superfícies suficientemente distintas sem cardificação excessiva;
- densidade profissional;
- labels legíveis;
- contraste apropriado;
- iconografia coerente;
- uso disciplinado de accent, gradiente e glow;
- sensação de produto real, não concept art.

Evite:

- UI futurista genérica;
- neon/cyberpunk sem semântica;
- dashboard SaaS genérico;
- textos microscópicos;
- excesso de cards;
- ornamento que compete com conteúdo;
- proporções impossíveis de implementar.

## Geração e iteração

Use a capacidade visual disponível para gerar o mockup.

Quando houver UI atual visualmente útil, ela pode servir como referência de estrutura, mas não deve aprisionar o redesign.

Após cada geração material, faça uma revisão curta contra:

1. source/runtime;
2. Design System;
3. arquitetura/Plano;
4. densidade e hierarquia;
5. plausibilidade de implementação.

### Passo obrigatório de divergência

Antes de entregar o mockup ao Implementador, identifique elementos que são apenas ilustrativos ou não suportados atualmente.

Classifique-os como:

- **direção válida** — composição/estilo que deve orientar a implementação;
- **conteúdo ilustrativo** — valores/textos de exemplo sem obrigação literal;
- **não suportado** — ação, dado, métrica, estado ou comportamento que não deve ser implementado.

O Plano Executável deve preservar essa distinção quando o mockup puder induzir erro.

Itere quando houver falha material. Não itere apenas por diferenças cosméticas menores.

## Texto no mockup

Texto visual deve priorizar hierarquia e significado, não reprodução literal de todas as strings.

Para regiões críticas:

- preserve nomes de feature;
- preserve labels operacionais importantes;
- preserve métricas/capabilities que definem a compreensão da tela.

Se a ferramenta visual produzir pequenas imperfeições tipográficas, isso não invalida a direção desde que composição e semântica estejam claras.

Não transforme o mockup em fonte para copiar strings.

## Persistência no repositório

Quando o mockup aprovado merecer valor durável, use a Skill `repository-file-ingress` para materializá-lo no repositório ativo.

Convenção preferida:

`docs/mockups/<feature>/`

Nome:

`<feature>-<state-or-purpose>-vN.webp`

Exemplo:

`channel-overview-operational-v1.webp`

Regras:

- preserve apenas referências aprovadas ou materialmente úteis;
- não salve experimentos descartados por padrão;
- não sobrescreva silenciosamente;
- incremente versão quando a direção mudar materialmente;
- registre/retorne o path e, quando disponível, hash do arquivo;
- stage/commit continuam pertencendo a `git-operations`.

Se o ingress não estiver disponível, não invente persistência alternativa; entregue a imagem e informe a limitação.

## Relação com o Design System

Mockups salvos podem funcionar como **exemplos gráficos derivados** do Design System.

Eles não substituem o documento canônico.

Uma decisão visual recorrente observada em vários mockups pode sugerir evolução do Design System, mas não deve ser promovida automaticamente.

Use evidência de múltiplas superfícies antes de transformar composição local em regra global.

## Entrega ao Implementador

O mockup deve ser acompanhado pela interpretação correta:

- referência visual direcional;
- Design System continua normativo;
- source/runtime continuam normativos para comportamento;
- o Implementador pode adaptar medidas, spacing, densidade e detalhes locais;
- diferenças entre mockup e runtime final são aceitáveis quando melhoram implementação sem violar direção e contratos.

Não instrua o Implementador a “copiar o mockup exatamente”.

### Fidelidade esperada

A fidelidade correta é à **intenção visual**, não aos pixels.

O runtime final deve preservar principalmente:

- hierarquia;
- proporções relativas;
- regiões e responsabilidades;
- densidade;
- foco;
- atmosfera visual;
- relação entre primary e secondary surfaces.

Ele pode divergir em:

- medidas;
- spacing;
- quantidade de ornamentação;
- iconografia local;
- labels;
- distribuição exata;
- detalhes de cardification;
- simplificações necessárias para aderir melhor ao produto real.

Se o runtime ficar mais claro, mais denso, mais coerente com o Design System e funcionalmente verdadeiro, uma divergência visual pode ser uma melhoria.

### Pós-implementação

Depois que o runtime for validado visualmente:

- compare direção do mockup com resultado real;
- identifique o que o runtime melhorou;
- se o aprendizado for generalizável, promova-o à Skill ou ao Design System;
- quando útil, preserve uma captura do runtime como exemplar gráfico separado do mockup.

Mockup e runtime cumprem papéis diferentes:

> **Mockup explores direction. Runtime proves embodiment.**

## Critério de sucesso

Um bom mockup:

- parece pertencer ao produto;
- resolve a incerteza visual relevante;
- deixa clara a arquitetura de informação;
- preserva capacidades reais;
- não inventa produto;
- apresenta densidade e hierarquia implementáveis;
- fornece direção suficiente para um Plano Executável;
- permanece útil mesmo que o runtime final difira em pixels e detalhes locais.

## Regra Final

> **Crie a menor referência visual capaz de tornar a direção inequívoca. Preserve a semântica do produto, derive identidade do Design System, não invente comportamento e trate o mockup como ponte entre arquitetura e implementação — nunca como substituto do source, runtime ou contrato.**
