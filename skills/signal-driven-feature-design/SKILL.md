---
name: signal-driven-feature-design
description: Defina decisões, informações Pure Signal e ações a partir da necessidade real do consumidor; reavalie fluxos com etapas, painéis ou compositores intermediários antes de otimizá-los. Use para concepção/redesign funcional e regressão de esforço; não use para otimização puramente interna, decisão de investimento, layout ou planejamento executável.
---

# Signal-Driven Feature Design

## Missão

Derivar **o que o consumidor precisa decidir, quais sinais permitem decidir corretamente e quais ações o sistema deve executar** para atingir um resultado real. Evitar features tecnicamente corretas que devolvem ao usuário o esforço que o software deveria eliminar.

> Necessidade real → decisões → Pure Signal → ações → contratos de experiência → prova de valor.

**A unidade de desenho não é o componente, a tabela ou o botão. É o resultado necessário ao consumidor.**

## Quando acionar

- Ao conceber uma nova feature/fluxo ou redefinir seu comportamento a partir da necessidade do consumidor.
- Quando uma feature já existente exige que o usuário investigue, filtre, correlacione ou interprete dados manualmente para atingir seu objetivo.
- Antes de arquitetura/UI, quando não estiver resolvido **quais informações e ações** geram valor.
- Para reorientar solução aparentemente funcional que falha em atender ao trabalho real do consumidor.
- Quando uma interface, painel, prévia ou etapa intermediária produz atrito apesar de a intenção final do consumidor já ser conhecida; antes de planejar desempenho, correção ou redesign desse intermediário, avalie se ele é necessário.
- Quando uma otimização técnica pretende retirar ou adiar trabalho automático **e pode alterar o resultado, as informações ou as ações exigidas do consumidor**.

**Não acionar** para otimização puramente interna que preserva o contrato funcional, bug localizado com contrato conhecido, ajuste visual/scroll/tema, implementação de requisitos já definidos, validação de código, pesquisa exploratória sem decisão de produto ou configuração meramente operacional. Não tornar o procedimento obrigatório a toda tarefa.

Se ainda não estiver decidido **se** investir na feature ou **para quem**, use primeiro `feature-investment-gate`. Esta Skill começa quando a necessidade de produto merece definição, não substitui esse gate.

## Procedimento

### 1. Fixe consumidor, situação e resultado

Responda concretamente:

- Quem consome a capacidade: pessoa, agente ou outro sistema?
- Em que situação e frequência o problema aparece?
- O que precisa conseguir **sem** a feature ou qual esforço executa hoje?
- Qual resultado observável define sucesso?
- Que custos/restrições importam: atenção, tempo, erros, latência, confiança, autorização?

Distinga **necessidade** (“ser avisado de interferência relevante”) de **solução antecipada** (“selecionar dois itens e comparar”). Não se comprometa com uma interface ou mecanismo antes de compreender a primeira.

### Gate de necessidade do fluxo (condicional)

**Antes de otimizar, corrigir ou redesenhar uma etapa intermediária**, quando o consumidor já conhece a ação que quer executar, confronte três opções: **eliminar a etapa**, **executar a intenção diretamente e manter detalhe sob demanda**, ou **preservar a etapa porque ela é necessária**. Não tome a existência de componente, preview, compositor ou confirmação atual como prova de necessidade.

Pergunte: o que o consumidor realmente decide nessa etapa? A informação muda a decisão ou só repete o trabalho? Qual propriedade de segurança, consentimento, fidelidade, prevenção de perda ou escolha indispensável seria perdida com sua remoção? Uma etapa com custo técnico elevado e pouca contribuição decisória é candidata à **subtração**, não à otimização isolada.

Escolha o fluxo mínimo que preserve o resultado, a autoridade humana e os contratos. Se a intenção for inequívoca e segura, **um acionamento deve executar a intenção**, com feedback e falhas recuperáveis; visualizações e parametrizações opcionais podem permanecer acessíveis sob demanda, sem passagem obrigatória. Não elimine revisão ou confirmação exigida por consequência irreversível, escolha material, segurança ou regulamentação. Não aplique este gate a todo bug local ou a ajustes meramente visuais.

Na entrega, registre sucintamente **qual etapa foi mantida, removida ou tornada opcional e por qual necessidade verificável**. Confirme em cenário real que o resultado ocorre sem cliques preparatórios redundantes, sem perda de capacidade necessária. Menor número de cliques por si só não comprova melhor experiência.

### 2. Derive as decisões

Liste somente as perguntas cuja resposta altera um próximo passo, corrige uma escolha ou permite atingir o objetivo. Formule do ponto de vista do consumidor, não do backend.

Para cada decisão, identifique: gatilho/situação, consequência de ignorá-la, momento em que ela importa e responsável por decidir.

Nem toda informação precisa ser alerta. Orientação e contexto úteis podem ser consultados sob demanda.

### 3. Investigue as capacidades dos fornecedores do sinal

Quando a feature depende de biblioteca, framework, API, banco, serviço, ferramenta ou subsistema existente, **estude seletivamente o que esse fornecedor já disponibiliza antes de projetar coleta, correlação ou mecanismo próprios**. Parta das decisões da etapa 2; não inventarie a tecnologia por curiosidade.

Para cada decisão que depende dele, verifique:

- **Fatos nativos:** que dados, eventos, estados, relações, mudanças ou diagnósticos o fornecedor efetivamente oferece e por qual contrato/interface?
- **Semântica e limites:** o que cada dado prova, o que apenas sugere e o que não permite concluir? Qual sua procedência, cobertura, versão e validade temporal?
- **Disponibilidade real e custo:** a capacidade existe apenas na documentação ou também na versão e integração utilizadas? Quanto custa consultar, agrupar, atualizar e revalidar?
- **Composição decisória:** que sinais úteis podem surgir de fatos já disponíveis, combinados sem duplicar lógica, estado ou fonte de verdade?
- **Lacuna residual:** o que precisa ser desenvolvido de fato para responder à decisão, depois de esgotado o reaproveitamento proporcional das capacidades existentes?

Prefira verificar contratos e saídas reais antes de inferir possibilidades. **Dado disponível não é sinal útil por si só; dado de fornecedor não é autorização para agir.** Distinga fato nativo, interpretação do produto e inferência, com seus limites. Não suponha que o fornecedor já exponha no produto tudo que suporta nativamente.

Investigue na profundidade necessária para fechar o Contrato de Sinal e Ação; interrompa o levantamento quando novas informações não mudarem decisões. Para incertezas materiais que exigirem escolher medições ou Spikes, utilize `engineering-evidence-economy`. A arquitetura posterior define como integrar, preservar invariantes e otimizar a aquisição.

### 4. Especifique o Pure Signal por decisão

Para cada pergunta, determine o **mínimo suficiente** para responder com segurança:

- **Afirmação útil:** o que pode ser dito diretamente em linguagem do consumidor?
- **Evidência/proveniência:** que fonte pode sustentar a afirmação?
- **Cobertura e frescor:** quais escopos/versões/instantes foram realmente examinados?
- **Incerteza:** fato, candidato, inferência, não observado, parcial, stale ou indisponível?
- **Profundidade:** o que é imprescindível de imediato e o que pode ser aprofundado depois?

Um dado tecnicamente correto pode ser **ruído cognitivo** se não ajudar a decisão. Não exibir campos porque existem no banco, logs ou API. Também não esconder uma limitação material para simplificar visualmente.

**Descoberta ≠ comprovação:** quando houver muitos objetos ou relações, descubra candidatos economicamente e confirme seletivamente os relevantes. Separe universo descoberto de cobertura realmente verificada; conclusões negativas valem apenas no escopo observado. Declare quando mudança de versão, fonte, identidade ou instante tornar um sinal obsoleto.

**Regra de verdade:** falta de evidência não é evidência de ausência; interpretação de potencial não vira fato comprovado; status documental não vira operação ao vivo.

### 5. Aloque as ações e transfira esforço

Para cada decisão, pergunte:

1. Que coleta, triagem, correlação, investigação, interpretação ou preparação o sistema pode fazer **antes** de pedir atenção?
2. Que ação automática realmente reduz trabalho sem custo/risco desproporcional?
3. Qual decisão ou mutação requer julgamento, permissão ou autorização humana?
4. Que próximo passo específico, viável e justificado pode ser oferecido?

**Automatize o trabalho preparatório quando houver evidência, custo e autoridade suficientes.** Não converta trabalho automatizável em botões ou filtros. Também não confunda automação de análise com autorização para executar mutações ou consequências irreversíveis.

**Gate de regressão de esforço em otimizações:** ao remover ou adiar coleta, verificação ou atualização automática, identifique qual **resultado útil** o consumidor recebia, como ele continuará disponível e quais **ações recorrentes** passará a exigir. Uma redução de processamento que impõe verificações manuais repetitivas não é melhoria líquida apenas pelo ganho técnico. Preserve o último estado comprovado com honestidade sobre sua validade e recorra à atualização ou ao diagnóstico quando houver necessidade real; não confunda configuração histórica com conexão ativa, nem elimine verificações necessárias à segurança.

Um alerta só é útil se informar **o que foi observado, por que importa e qual decisão/ação merece atenção**; sem confiança ou consequência suficiente, mantenha-o como hipótese/cobertura, não ruído urgente.

### 6. Feche o Contrato de Sinal e Ação

Registre um quadro pequeno, sem criar documento próprio quando uma seção bastar:

| Necessidade/decisão | Sinal mínimo e fonte | Confiança/cobertura | Ação do sistema | Decisão/ação do consumidor | Prova de valor |
|---|---|---|---|---|---|

Elimine **órfãos**:
- informação sem decisão, orientação ou resultado que a justifique;
- ação sem necessidade e autoridade;
- decisão sem sinal suficiente;
- alerta sem consequência ou próximo passo;
- métrica vistosa sem poder decisório;
- interface de comparação que exige do usuário descobrir aquilo que a feature deveria detectar.

Separe informações **primárias**, **contextuais**, **excepcionais** e **técnicas sob demanda**, sem definir layout, componentes ou design visual. O sistema pode precisar internamente de muitos dados que jamais chegarão ao usuário.

### 7. Verifique com cenários e custo marginal

Teste mentalmente ou com evidência barata:
- O consumidor atinge o resultado **sem reconstruir manualmente a investigação**?
- Um caso positivo relevante é encontrado e explicado?
- Um caso negativo/ambíguo evita falsa certeza e falsos alertas?
- Mudança de versão, falta de cobertura ou indisponibilidade preservam verdade?
- A carga de atenção, número de operações, tempo ou erros caiu em relação ao fluxo atual?
- A ação proposta respeita permissões e tem uma saída concreta?
- A solução preserva valor mesmo que IDE, fluxo ou modelo de IA mudem?

**Gate do valor central:** quando o resultado depender de um sinal ainda não comprovado, verifique sua viabilidade com um caso positivo, um negativo/ambíguo, escopo declarado e custo proporcional **antes** de ampliar UI ou infraestrutura. Se o sinal não for sustentável, reduza ou interrompa a proposta; não simule inteligência com heurísticas frágeis nem transfira a investigação central ao consumidor.

Use medições/Spike **somente** quando faltar prova material que mude a decisão. Não gerar telemetria, processo ou interfaces extras por ritual.

## Saída e passagem para outras Skills

Entregue um **Contrato de Sinal e Ação** proporcional à complexidade (às vezes poucas frases; em feature crítica, quadro e cenários). Ele deve fixar:

**consumidor + resultado + decisões + sinais com evidência/limites + divisão sistema/consumidor + critério de valor**.

- `feature-investment-gate`: julga **se** e **onde** investir; não repetir seu ROI, durabilidade ou escolha de superfície.
- Arquitetura: decide como sustentar o contrato, fontes de verdade, segurança, performance e fronteiras.
- `otimizacao-de-ui`: quando UI for necessária, decide **como** organizar hierarquia, interação, estados e visual com base neste contrato; não refazer a descoberta do valor.
- `agent-context-interface-engineering`: quando o consumidor for agente, decide projeção, pureza e aquisição progressiva de contexto.
- `planejamento-executavel`: transforma solução arquitetural resolvida em trabalho implementável; não reabrir decisões já fechadas.
- `validacao-de-implementacoes`: comprova se a implementação entrega o contrato.

Não exigir todas essas Skills em sequência. Chame somente a especialização cujo próximo problema existe.

## Exemplo generalizável

**Necessidade:** coordenar trabalhos paralelos sem acompanhar cada checkout. **Solução insuficiente:** pedir ao usuário que escolha pares para comparação. **Decisão real:** há interferência que merece minha atenção? **Sinal:** trabalhos envolvidos, relação verificada, escopo/limite e próxima decisão. **Ação do sistema:** descobrir e investigar candidatos automaticamente com custo controlado. **Ação do humano:** coordenar quando houver evidência relevante. O mesmo raciocínio vale para qualquer produto: **não transferir ao consumidor a descoberta que o sistema deveria realizar**.

## Aprendizado transferível (condicional)

Uma decisão de feature bem-sucedida também pode revelar um método de desenho reutilizável, **mesmo sem fricção ou erro**. Quando houver uma decisão não óbvia com ganho material, considere se seu mecanismo orientaria decisões em outros domínios. Não promova regras presas ao fornecedor, à interface ou ao caso original.

Para avaliar e encaminhar esse aprendizado, carregue **`references/aprendizado-transferivel.md` somente quando houver candidato concreto**. Antes de alterar qualquer Skill, verifique cobertura existente e use `skill-engineering` para decidir representação, não duplicação e ganho marginal. Não atualize Skills automaticamente após cada feature; *nenhuma atualização* é resultado válido.

## Critério final

A Skill cumpriu seu papel quando se pode explicar para cada informação e ação **qual necessidade atende e qual decisão melhora** — e quando a solução deixa o consumidor mais capaz, com **menos esforço cognitivo**, sem inventar certeza nem automatizar sem autoridade. Pare antes de escolher componentes, telas, parser, banco ou arquitetura interna.
