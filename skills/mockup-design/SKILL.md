---
name: mockup-design
description: Use quando o usuário pedir criar, gerar, desenhar ou refazer um mockup, referência visual, wireframe de alta fidelidade ou direção gráfica de uma UI, ou quando uma otimização de UI precisar resolver visualmente composição, hierarquia, proporção, densidade e linguagem antes da implementação. Produza mockups fiéis ao produto e ao Design System, sem inventar comportamento; trate-os como referência direcional, não especificação literal. Quando Repository File Ingress estiver disponível, preserve o resultado em docs/mockups/<feature>/. Não use para implementar a UI nem para decidir sozinho se uma feature deve existir.
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

## Quando usar

Use quando:

- o usuário pedir explicitamente um mockup;
- uma UI existente será repaginada e a diferença visual desejada é grande;
- múltiplas composições plausíveis ainda competem;
- uma direção visual precisa ser comunicada ao Implementador;
- o Design System está descrito, mas falta representação gráfica da composição;
- `otimizacao-de-ui` concluir que uma referência visual reduzirá incerteza material.

Não gere mockup por ritual quando a direção já estiver suficientemente resolvida e o usuário não o tiver solicitado.

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

1. **contratos funcionais atuais** — source/runtime;
2. **Design System canônico**, quando existir;
3. **UI atual**, quando houver;
4. **objetivo do redesign**;
5. **restrições reais de viewport, estado e interação**.

Prioridade semântica:

> comportamento real → Design System → arquitetura de informação → mockup.

O mockup nunca vence source ou runtime em conflito funcional.

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

Quando houver uma UI atual visualmente útil, ela pode servir como referência de estrutura, mas não deve aprisionar o redesign.

Após a primeira geração, critique explicitamente contra:

1. Design System;
2. contratos funcionais;
3. arquitetura de informação;
4. densidade;
5. implementação plausível.

Itere quando houver falha material.

Não itere apenas por diferenças cosméticas menores.

## Texto no mockup

Texto visual deve priorizar hierarquia e significado, não reprodução literal de todas as strings.

Para regiões críticas:

- preserve nomes de feature;
- preserve labels operacionais importantes;
- preserve métricas/capabilities que definem a compreensão da tela.

Se a ferramenta visual produzir pequenas imperfeições tipográficas, isso não invalida a direção desde que composição e semântica estejam claras.

Não transforme o mockup em fonte para copiar strings.

## Persistência no repositório

Quando o repositório ativo expuser Repository File Ingress:

1. converta/preserve o mockup em formato apropriado, preferencialmente WebP para screenshots e referências raster;
2. armazene em:
   `docs/mockups/<feature>/`
3. use nome kebab-case orientado à função, por exemplo:
   `channel-overview-operational-v1.webp`;
4. não sobrescreva silenciosamente referência existente;
5. se uma revisão material produzir nova direção, incremente a versão do arquivo;
6. confirme integridade pelo recibo de importação;
7. deixe stage/commit para Git Operations.

Não salve mockups temporários, experimentos ruins ou variações descartadas por padrão.

Preserve apenas referências que merecem orientar trabalho futuro.

Se Repository File Ingress não estiver disponível, não invente persistência. Informe que o mockup foi produzido mas ainda não materializado no repositório.

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
- o Implementador pode adaptar medidas, spacing e detalhes locais;
- diferenças entre mockup e runtime final são aceitáveis quando melhoram implementação sem violar direção e contratos.

Não instrua o Implementador a “copiar o mockup exatamente”.

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
