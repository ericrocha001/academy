---
name: otimizacao-de-ui
description: Use ao criar do zero, desenhar, otimizar, repaginar, redesenhar, modernizar, profissionalizar, reorganizar ou melhorar visualmente uma UI. Resolva arquitetura de informação, hierarquia, layout, scroll, densidade, estados, responsividade e aderência ao Design System antes de estilizar; preserve contratos funcionais quando a UI já existir. Decida explicitamente se mockup agrega valor e, quando necessário, acione `mockup-design`. Exija inspeção visual do runtime real antes de considerar o trabalho validado. Não use para decidir se uma feature deve existir nem para alterar backend ou comportamento de produto sem necessidade.
---

# Design e Otimização de UI

## Finalidade

Projete interfaces novas e transforme interfaces existentes em experiências claras, profissionais e coerentes sem confundir design visual com mudança de produto.

Princípio:

> **Preserve truth. Design the experience.**

Para UI existente, preserve capacidades e contratos funcionais.

Para UI nova, derive a experiência apenas de capacidades e requisitos realmente aprovados; não use o design para inventar produto.

## Escopo: criação e redesign

Esta Skill é a fonte canônica tanto para:

- criar uma UI do zero para uma feature já justificada;
- estruturar uma nova tela, painel, modal ou workspace;
- otimizar uma UI funcional porém crua;
- repaginar ou modernizar uma superfície;
- corrigir arquitetura de informação, densidade, scroll, responsividade ou hierarquia;
- alinhar uma superfície existente ao Design System do produto.

Se a própria existência da UI ainda estiver em dúvida, use primeiro `feature-investment-gate`.

Não crie uma segunda Skill de “UI design” paralela: criação e otimização compartilham os mesmos contratos de experiência e devem evoluir juntas.

## Hierarquia de autoridade do design

Quando houver múltiplas referências, use esta ordem:

1. **Source/runtime — verdade funcional.** Define capacidades, dados, estados, ações e comportamento realmente suportados.
2. **Design System — verdade visual normativa.** Define identidade, semântica visual, tokens, padrões e regras compartilhadas.
3. **Arquitetura/Plano — composição específica da feature.** Define hierarquia, regiões, responsabilidades, invariantes e direção particular da tela.
4. **Mockup — referência visual direcional.** Materializa composição, proporções, densidade e atmosfera.

Em conflito, a camada superior vence.

Consequências:

- não implemente ação, métrica, filtro ou estado apenas porque apareceu no mockup;
- não viole o Design System apenas para copiar uma imagem;
- não use o source atual como desculpa para preservar uma composição visual ruim quando o comportamento pode ser apresentado melhor;
- diferenças entre mockup e runtime final são esperadas quando preservam melhor verdade funcional, Design System e arquitetura aprovada.

## Antes de desenhar

Estude a UI atual e seu source suficiente para responder:

- qual é o objeto principal da tela;
- quais tarefas o usuário executa;
- quais dados e ações são realmente suportados;
- quais contratos não podem regredir;
- quais regiões controlam layout e scroll;
- quais elementos são primários, secundários e excepcionais;
- qual design system ou linguagem visual já existe no produto.

Não redesenhe apenas a screenshot. A screenshot mostra sintomas; o source revela estrutura e contratos.

Quando precisar navegar no codebase, use `codescope-navigation`.

## Separe conteúdo de apresentação

Classifique o que existe em quatro grupos:

**Primário**
- objeto ou tarefa central da tela;
- ações mais frequentes;
- estado necessário para decidir o próximo passo.

**Contextual**
- informação importante, mas que não deve competir com o foco principal.

**Excepcional**
- conflitos, erros, warnings, estados degradados e operações raras.

**Ruído**
- repetição;
- detalhes técnicos sempre expostos sem necessidade;
- estados saudáveis anunciados excessivamente;
- informação que pode ser derivada ou revelada sob demanda.

Não esconda capacidade. Rebaixe visualmente o que não merece atenção constante.

> **Healthy state should be quiet. Exceptional state should be loud.**

## Arquitetura de informação antes de styling

Não tente corrigir uma UI estruturalmente ruim apenas com:

- cores;
- sombras;
- radius;
- gradientes;
- ícones.

Primeiro defina regiões com responsabilidades claras.

Exemplos de regiões coerentes:

- navegação/catálogo;
- workspace principal;
- contexto operacional;
- header;
- secondary surface;
- drawer/modal para ações ocasionais.

Uma tela profissional deve permitir perceber rapidamente:

1. onde estou;
2. o que está selecionado;
3. qual é a tarefa principal;
4. qual estado exige atenção;
5. onde estão as ações secundárias.

## Viewport e ownership de scroll

Detecte o anti-padrão de “conteúdo solto”: várias seções empilhadas fazendo o documento crescer indefinidamente, sem fronteiras claras.

Para aplicações desktop ou workspaces densos, prefira quando apropriado:

> **constrained application viewport with independently scrollable panes**

Defina explicitamente:

- quem ocupa o viewport;
- quem pode crescer;
- quem possui scroll;
- onde `min-height: 0` / `min-width: 0` são necessários;
- quais superfícies viram drawer em breakpoints menores.

Evite:

- scroll global + scroll interno competindo;
- overflow horizontal acidental;
- cards crescendo sem limite;
- textarea/editor expandindo o documento inteiro.

## Hierarquia visual

Construa hierarquia por uma combinação coerente de:

- posição;
- tamanho;
- contraste;
- espaço;
- agrupamento;
- superfície;
- tipografia;
- badges;
- iconografia.

Não faça todos os elementos parecerem igualmente importantes.

Use accent forte principalmente para:

- seleção;
- ação principal;
- foco;
- estado que realmente merece destaque.

Evite transformar a UI inteira em neon, glow ou ornamentação.

## Densidade

Interfaces profissionais não são necessariamente espaçosas; são **densas de forma controlada**.

Ajuste:

- quantidade de informação por card;
- line clamp;
- ellipsis;
- wrapping;
- largura mínima;
- altura consistente;
- espaçamento entre grupos.

Nomes longos nunca devem quebrar caractere por caractere.

Detalhes técnicos extensos devem preferir:

- expansão;
- tooltip;
- drawer;
- modal;
- detalhe secundário.

## Progressive Disclosure

Quando informação ou ação for necessária apenas ocasionalmente, não a mantenha permanentemente aberta.

Exemplos:

- artifact editor;
- destination management;
- destructive confirmation;
- hashes e paths completos;
- histórico detalhado;
- conflito resolvível;
- configuração avançada.

Use `progressive-disclosure` quando o problema exigir estruturar múltiplos níveis de profundidade.

## Verdade operacional antes do acabamento

Quando uma UI exibir estados operacionais como carregando, sincronizando, pendente, saudável, degradado ou concluído, confirme antes do redesign que esses estados representam a verdade do sistema.

Se a interface aparenta estar trabalhando enquanto o backend está ocioso, ou aparenta estar saudável enquanto existe backlog/falha, isso não é apenas um problema visual.

Antes de estilizar:

- identifique a fonte de verdade do estado;
- diferencie backlog, atividade, saúde e erro;
- confirme como início, progresso, conclusão e falha chegam ao renderer;
- corrija estado stale, evento de conclusão ausente ou contrato quebrado antes de redesenhar sua aparência.

Não use polling extra, timeout visual, limpeza artificial de estado ou remoção de spinner para mascarar inconsistência operacional.

> **Não otimize a aparência de um estado cuja semântica ainda não é verdadeira.**

Depois que o contrato estiver correto, a UI pode representar cada estado com a hierarquia e semântica visual apropriadas.

## Design system existente primeiro

Antes de criar tokens ou padrões novos:

1. procure os tokens existentes;
2. estude componentes visualmente maduros do mesmo produto;
3. reutilize superfícies, radius, border, shadow, spacing, focus e status colors;
4. extraia nova primitiva somente quando houver reutilização real.

Não crie um design system paralelo dentro de uma feature.

Uma UI nova deve parecer parte do produto, não um microsite dentro dele.

## Semântica de estado durante interação

Quando um controle comunica estado operacional, sua aparência deve continuar comunicando esse estado durante a interação.

- Use os tokens de estado existentes; não substitua sua semântica pelo accent da feature.
- Preserve a cor de estado em repouso, hover e aberto. Inspecione a cascata dos componentes compartilhados: um hover global pode recolorir o controle e apagar essa distinção.
- Preserve a geometria do controle e o foco visível. O contorno de foco pode seguir o padrão global sem recolorir o estado.
- Vincule spinner ou animação de atividade a uma operação real em andamento; pendência e integridade desconhecida não implicam processamento.
- Mantenha rótulo ou ícone que permita compreender o estado sem depender exclusivamente da cor.

Na validação, cruze os estados afetados com repouso, hover, aberto e foco por teclado nos temas suportados, quando aplicáveis. Uma screenshot em repouso não prova que a semântica e o contraste sobrevivem à interação.

## Decida se mockup agrega valor

Não gere mockup por rotina. Faça um gate explícito antes da implementação visual.

### GERAR mockup

Use `mockup-design` quando pelo menos uma destas condições for material:

- o usuário pediu explicitamente uma referência visual;
- a UI é nova e possui composição não trivial ainda sem referência gráfica;
- o redesign altera substancialmente arquitetura de informação ou composição;
- existem múltiplos layouts plausíveis e a escolha visual ainda está aberta;
- a direção precisa ser comunicada a outro agente antes da implementação;
- o Design System está descrito, mas a aplicação concreta dele à tela ainda é ambígua;
- uma referência gráfica terá valor durável como exemplo do Design System.

### REUTILIZAR mockup existente

Se já existe mockup aprovado e a direção material não mudou:

- reutilize a referência;
- não gere outra variação por hábito;
- confirme apenas se source/runtime e Design System ainda preservam as premissas relevantes.

### NÃO GERAR mockup

Normalmente pule o mockup quando:

- a mudança é pequena e local;
- trata-se de bug visual, spacing, overflow, contraste ou ajuste de estado conhecido;
- um padrão canônico já resolve diretamente a composição;
- a arquitetura visual já está aprovada e inequívoca;
- o mockup não alteraria nenhuma decisão do Implementador.

O custo do mockup deve comprar redução real de incerteza.

Quando gerado, trate-o segundo a hierarquia de autoridade acima:

> **Mockup defines direction; source/runtime define truth.**

Antes de planejar implementação, identifique explicitamente qualquer elemento ilustrativo do mockup que não seja suportado pelo produto e exclua-o do Plano.

## Preserve contratos funcionais

Antes da refatoração, liste o comportamento que precisa sobreviver.

Exemplos:

- seleção;
- criação;
- edição;
- cancelamento;
- filtros;
- estados;
- operações assíncronas;
- confirmações;
- acessibilidade;
- atalhos;
- integração com backend.

Mova ações para novas superfícies sem eliminá-las.

Evite espalhar orchestration durante o redesign. Quando possível:

- container/orchestrator possui dados e integrações;
- componentes filhos possuem apresentação e interação local.

## Responsividade por transformação, não compressão

Não apenas encolha três colunas até ficarem inutilizáveis.

Defina transições de composição.

Exemplo:

**wide**
`catalog | workspace | operations`

**medium**
`catalog | workspace` + operations drawer

**narrow**
workspace principal + catalog/operations drawers

Preserve foco e responsabilidade em cada breakpoint.

## Validação visual é obrigatória

Testes, typecheck e build são necessários, mas não provam qualidade visual.

Antes de declarar uma UI nova ou redesign concluído, inspecione o **runtime real**.

Verifique estados representativos, incluindo quando aplicável:

- conteúdo curto e longo;
- selecionado e não selecionado;
- empty state;
- erro/conflito;
- wide e medium viewport;
- sidebar aberta/fechada;
- tema dark e light;
- truncamento;
- overflow;
- scroll ownership;
- contraste;
- proximidade com a direção visual aprovada.

### Compare intenção, não pixels

Quando houver mockup, não avalie sucesso por semelhança literal.

Compare o runtime contra quatro perguntas:

1. a hierarquia principal sobreviveu?
2. a composição continua transmitindo a mesma direção?
3. o Design System ficou mais coerente, não menos?
4. a implementação real melhorou alguma simplificação, densidade ou legibilidade sem violar contratos?

O runtime pode — e às vezes deve — divergir do mockup para ficar melhor.

> **Mockup fidelity is not the goal. Intent fidelity is.**

Se a implementação eliminar ornamentação desnecessária, reduzir ruído, aumentar densidade útil ou adaptar proporções às restrições reais, isso é uma melhoria legítima.

### Runtime como exemplar

Quando uma UI validada materializar muito bem o Design System:

- considere preservar uma captura representativa como exemplo gráfico;
- trate essa captura como exemplar, não como novo contrato;
- use exemplos reais para ensinar como princípios abstratos aparecem no produto;
- não generalize uma composição local para regra global sem evidência de reutilização.

Se a prova visual obrigatória não puder ser executada, o trabalho não é `VALIDADO`.

Use `validacao-de-implementacoes` para definir e produzir evidência proporcional.

## Quando planejar implementação

Depois que:

- arquitetura de informação;
- composição;
- contratos;
- direção visual;
- responsividade;

estiverem resolvidos, use `planejamento-executavel` para transformar a solução em plano de implementação.

Não entregue ao Implementador a decisão “faça ficar bonito”.

Entregue:

- objetivo;
- regiões;
- responsabilidades;
- invariantes;
- comportamento;
- referência visual;
- propriedades a provar.

## Anti-padrões

Evite:

- styling before structure;
- page-long admin dump;
- excesso de informação saudável;
- todos os elementos com a mesma hierarquia;
- mockup inventando produto;
- novo design system local;
- componente monolítico crescendo durante o redesign;
- responsividade por esmagamento;
- validar UI apenas por testes;
- mudar backend para satisfazer um desenho ilustrativo.

## Critério de sucesso

Uma otimização de UI é bem-sucedida quando:

- a tarefa principal é evidente;
- a informação está hierarquizada;
- o layout possui fronteiras claras;
- scroll e overflow são previsíveis;
- estados excepcionais recebem atenção proporcional;
- detalhes secundários permanecem acessíveis sem gerar ruído;
- a interface parece pertencer ao produto;
- capacidades existentes foram preservadas;
- breakpoints mantêm usabilidade;
- o runtime real confirma a qualidade visual.

## Regra Final

> **Uma UI profissional nasce da arquitetura da experiência antes da decoração. Preserve a verdade funcional, promova o que importa, silencie o estado saudável, revele profundidade sob demanda, use o design system existente e só declare conclusão depois de ver a interface real funcionando.**
