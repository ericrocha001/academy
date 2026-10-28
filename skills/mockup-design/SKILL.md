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

Quando a tarefa incluir **comparar** um mockup já aprovado à UI implementada, acione `comparacao-visual-de-ui` para preparar evidências com o Harness existente e disponível; não carregue o comparador para **criar** mockups, nem trate sua saída como aprovação estética. A validação continua com `validacao-de-implementacoes`.

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

## Design System canônico do Code Awareness — antes do mockup

Quando o mockup for de uma tela do **repositório ativo Code Awareness**, a linguagem visual já possui uma fonte normativa durável no Continuum:

- **Nome:** `Code Awareness Design System — Visual Foundation v1`.
- **artifactId canônico:** `artifact-35fcb807-45fb-42a6-a0e8-eb121847ee39`.
- **Recuperação:** use a Skill `continuum` para descobrir por `metadata: {livingArtifact: true}` + `query: "Design System"` e abrir o Artifact selecionado com `get_artifact` (ou acessar o ID conhecido, após confirmar o repositório ativo).

**Antes de gerar ou transformar o mockup**, leia a revisão vigente, use a **Entrada Rápida** e o **brief visual canônico da seção 39.3** como base de identidade; selecione apenas os exemplares visuais pertinentes indicados pelo Artifact, se acessíveis. Acrescente o contrato de sinal/ação da feature, as regiões e estados realmente sustentados pelo source. A receita visual evita redescobrir o estilo do Code Awareness, mas não determina a composição de todas as features nem autoriza capacidades fictícias.

Não reproduza neste SKILL.md o gradiente, raios, tokens ou o brief: pertencem ao Living Artifact e evoluem lá. Uma imagem ou plano mencionado no Design System não é prova de pixels acessíveis: diferencie exemplar de runtime, mockup aprovado e mídia cuja publicação não foi confirmada.

Se o Continuum estiver indisponível, não presuma acesso ou afirme fidelidade canônica; explicite a limitação e use apenas referências verificáveis. Para outros produtos, respeite o Design System do respectivo projeto, sem transplantar a identidade do Code Awareness.

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

Quando a escolha dos controles afetar o resultado, represente a **decisão de descoberta** no brief: opção central visível versus opções sob demanda, necessidade de comparação e caminho de acesso à ajuda contextual. Use a gramática condicional de `otimizacao-de-ui`, não um veto genérico a dropdowns ou exigência de cards. Não transforme conteúdo ilustrativo em ação real.

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
- sensação de produto real, não concept art;
- beleza intencional, acabamento refinado, atmosfera e ornamentos coerentes com a identidade visual.
- tipografia proporcional à relevância: informação periférica pode ser pequena, escolhas centrais precisam de leitura confortável;
- explicações curtas, com ajuda contextual acionável quando houver detalhe útil;
- efeitos visuais plausíveis para implementação responsiva e leve, sem depender de blur/animacões caras.

Evite:

- UI futurista genérica;
- neon/cyberpunk sem semântica;
- dashboard SaaS genérico;
- textos microscópicos;
- excesso de cards;
- ornamentação que comprovadamente compromete leitura, contraste ou hierarquia (sem eliminar tratamentos estéticos que dão beleza ao produto);
- proporções impossíveis de implementar.

## Crítica de atenção — Clean Screen + Pure Signal

Um mockup visualmente atraente pode ser funcionalmente ruidoso. Antes de aprová-lo, avalie a **eficiência da atenção**, não apenas o acabamento gráfico. Receba da `otimizacao-de-ui` a finalidade da tela, o contrato de alocação visual e a composição escolhida; **não redescubra decisões de produto nem substitua o Design System**.

Faça duas passagens curtas:

1. **Sinal e percurso:** o primeiro olhar revela tarefa/objeto, estado relevante e ação prioritária? Informações necessárias à decisão ou ação estão visíveis no momento correto? O contexto secundário é recuperável? A composição ajuda o olhar a seguir o trabalho?
2. **Subtração informacional:** que texto, card, indicador ou controle ocupa atenção sem contribuir para compreensão, decisão, ação ou orientação? Pode ser removido, condensado, rebaixado ou revelado sob demanda sem ocultar capacidade necessária? **Não aplique esse teste funcional à ornamentação:** beleza, identidade e atmosfera são valores independentes, e uma tela limpa não precisa ser austera.

**Não preencha áreas vazias com cards ou métricas ilustrativas.** Espaço livre pode ser uma escolha de design válida; densidade alta também, quando o trabalho exigir. Preserve labels que removem ambiguidade, acessibilidade e alertas que não podem ser perdidos. Remoção da imagem não autoriza eliminação de funcionalidade.

Quando houver **duas direções realmente concorrentes**, compare-as pela mesma tarefa, hierarquia, distribuição de atenção, clareza visual, densidade, plausibilidade responsiva e coerência com o Design System. Produza alternativas apenas se a comparação resolver incerteza material; caso contrário, uma referência forte é preferível.

**Rejeite ou revise** mockups que escondam sinal crítico, produzam conflitos visuais concretos, exijam investigação manual desnecessária ou adotem layout genérico inadequado à finalidade. **Não rejeite ornamentos apenas por serem decorativos**: acabamento, identidade e beleza podem justificar sua presença por si. A validação do runtime continua pertencendo a `otimizacao-de-ui` e `validacao-de-implementacoes`.

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

## Referência visual no Continuum

Quando o usuário quiser publicar um mockup aprovado como `VISUAL_REFERENCE` no Continuum, use `continuum-publication` para preservar a mídia, nome, descrição, contexto e relações; não confunda essa publicação com `repository-file-ingress`, que grava um arquivo no repositório Git. Se o transporte MCP não receber um descriptor HTTPS autorizado, **use o fallback de publicação manual e reconciliação do Artifact existente definido em `continuum-publication`**. Não recrie o procedimento nesta Skill, nem trate uma cópia na Biblioteca ChatGPT como prova de publicação no Continuum.

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
- ornamentos e tratamentos estéticos materiais da direção aprovada;
- relação entre primary e secondary surfaces.

Ele pode divergir em:

- medidas;
- spacing;
- iconografia local;
- labels;
- distribuição exata;
- detalhes de cardification;
- simplificações necessárias para aderir melhor ao produto real.

Uma divergência visual só representa melhoria se preservar ou elevar **também a qualidade estética**, além da clareza, coerência com o Design System e verdade funcional. **Não aceite empobrecimento do acabamento visual como efeito colateral automático de Clean Screen ou Pure Signal.**

### Pós-implementação

Depois que o runtime for validado visualmente:

- compare direção do mockup com resultado real;
- identifique o que o runtime melhorou;
- se o aprendizado for generalizável, promova-o à Skill ou ao Design System;
- quando útil, preserve uma captura do runtime como exemplar gráfico separado do mockup.

Mockup e runtime cumprem papéis diferentes:

> **Mockup explores direction. Runtime proves embodiment.**

## Aceitação da direção visual

Antes da entrega, confirme que a referência permite ao implementador distinguir **o que deve chamar atenção, o que deve ficar discreto e o que foi intencionalmente excluído da apresentação**, além dos **ornamentos, detalhes e atmosfera que devem ser preservados**. Quando uma simplificação visual afetar posição/acesso a uma capacidade real, registre o caminho de recuperação e preserve o contrato. Se um elemento estético aprovado for proposto para retirada, exija justificativa concreta e alternativa de qualidade equivalente. A crítica não deve virar um checklist extenso nem uma promessa de usabilidade comprovada sem avaliação do runtime.

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
