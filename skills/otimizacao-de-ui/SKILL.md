---
name: otimizacao-de-ui
description: Use sempre que o trabalho pedir otimizar, repaginar, redesenhar, modernizar, profissionalizar, reorganizar ou melhorar visualmente uma UI existente, preservando seus contratos funcionais. Diagnostique arquitetura de informação, hierarquia, layout, scroll, densidade, estados, responsividade e sistema visual antes de estilizar. Quando a direção visual estiver aberta ou o usuário pedir uma referência visual/mockup, acione `mockup-design`. Exija inspeção visual do runtime real antes de considerar o trabalho validado. Não use para decidir se uma nova UI deve existir, nem para redesenhar backend ou comportamento de produto sem necessidade.
---

# Otimização de UI

## Finalidade

Transforme interfaces funcionais porém cruas em experiências claras, profissionais e coerentes sem confundir redesign visual com mudança de produto.

Princípio:

> **Preserve semantics. Redesign the experience.**

A otimização deve melhorar compreensão, fluxo, densidade, organização e qualidade visual sem perder capacidades existentes.

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

## Mockup como contrato direcional

Quando a direção visual estiver aberta, a diferença entre o estado atual e o desejado for grande ou o usuário pedir explicitamente uma referência visual, use a Skill `mockup-design`.

Esta Skill continua responsável por decidir **quando** o mockup agrega valor ao redesign e qual problema visual ele precisa resolver. `mockup-design` é responsável por produzir a representação visual com qualidade, fidelidade semântica e relação correta com o Design System.

O mockup deve ajudar a fixar:

- composição;
- proporções;
- hierarquia;
- densidade;
- linguagem visual.

> **Mockup defines direction; source defines truth.**

Não implemente campos, estados ou ações ilustrativas que o produto não suporta.

Se a direção visual já estiver resolvida e o usuário não tiver solicitado mockup, não gere outro por rotina.

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

Antes de declarar um redesign concluído, inspecione o **runtime real**.

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
- proximidade com a referência aprovada.

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
