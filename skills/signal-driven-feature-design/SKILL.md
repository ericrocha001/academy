---
name: signal-driven-feature-design
description: Defina decisões, informações Pure Signal e ações necessárias a partir da necessidade real do consumidor antes de projetar uma feature, fluxo ou experiência. Use para concepção/redesign funcional quando ainda não está claro o que o produto deve informar ou fazer; não use para decidir investimento (feature-investment-gate), desenhar layout (otimizacao-de-ui) ou converter solução resolvida em Plano (planejamento-executavel).
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

**Não acionar** para bug localizado com contrato conhecido, ajuste visual/scroll/tema, implementação de requisitos já definidos, validação de código, pesquisa exploratória sem decisão de produto ou configuração meramente operacional. Não tornar o procedimento obrigatório a toda tarefa.

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

### 2. Derive as decisões

Liste somente as perguntas cuja resposta altera um próximo passo, corrige uma escolha ou permite atingir o objetivo. Formule do ponto de vista do consumidor, não do backend.

Para cada decisão, identifique: gatilho/situação, consequência de ignorá-la, momento em que ela importa e responsável por decidir.

Nem toda informação precisa ser alerta. Orientação e contexto úteis podem ser consultados sob demanda.

### 3. Especifique o Pure Signal por decisão

Para cada pergunta, determine o **mínimo suficiente** para responder com segurança:

- **Afirmação útil:** o que pode ser dito diretamente em linguagem do consumidor?
- **Evidência/proveniência:** que fonte pode sustentar a afirmação?
- **Cobertura e frescor:** quais escopos/versões/instantes foram realmente examinados?
- **Incerteza:** fato, candidato, inferência, não observado, parcial, stale ou indisponível?
- **Profundidade:** o que é imprescindível de imediato e o que pode ser aprofundado depois?

Um dado tecnicamente correto pode ser **ruído cognitivo** se não ajudar a decisão. Não exibir campos porque existem no banco, logs ou API. Também não esconder uma limitação material para simplificar visualmente.

**Regra de verdade:** falta de evidência não é evidência de ausência; interpretação de potencial não vira fato comprovado; status documental não vira operação ao vivo.

### 4. Aloque as ações e transfira esforço

Para cada decisão, pergunte:

1. Que coleta, triagem, correlação, investigação, interpretação ou preparação o sistema pode fazer **antes** de pedir atenção?
2. Que ação automática realmente reduz trabalho sem custo/risco desproporcional?
3. Qual decisão ou mutação requer julgamento, permissão ou autorização humana?
4. Que próximo passo específico, viável e justificado pode ser oferecido?

**Automatize o trabalho preparatório quando houver evidência, custo e autoridade suficientes.** Não converta trabalho automatizável em botões ou filtros. Também não confunda automação de análise com autorização para executar mutações ou consequências irreversíveis.

Um alerta só é útil se informar **o que foi observado, por que importa e qual decisão/ação merece atenção**; sem confiança ou consequência suficiente, mantenha-o como hipótese/cobertura, não ruído urgente.

### 5. Feche o Contrato de Sinal e Ação

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

### 6. Verifique com cenários e custo marginal

Teste mentalmente ou com evidência barata:
- O consumidor atinge o resultado **sem reconstruir manualmente a investigação**?
- Um caso positivo relevante é encontrado e explicado?
- Um caso negativo/ambíguo evita falsa certeza e falsos alertas?
- Mudança de versão, falta de cobertura ou indisponibilidade preservam verdade?
- A carga de atenção, número de operações, tempo ou erros caiu em relação ao fluxo atual?
- A ação proposta respeita permissões e tem uma saída concreta?
- A solução preserva valor mesmo que IDE, fluxo ou modelo de IA mudem?

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

## Critério final

A Skill cumpriu seu papel quando se pode explicar para cada informação e ação **qual necessidade atende e qual decisão melhora** — e quando a solução deixa o consumidor mais capaz, com **menos esforço cognitivo**, sem inventar certeza nem automatizar sem autoridade. Pare antes de escolher componentes, telas, parser, banco ou arquitetura interna.
