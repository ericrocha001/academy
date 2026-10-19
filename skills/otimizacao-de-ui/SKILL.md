---
name: otimizacao-de-ui
description: Projete ou revise a interface real do produto: arquitetura da informação, hierarquia, layout, scroll, densidade, estados, responsividade e Design System. Use na criação ou redesign de UI e valide visualmente o runtime. Para produzir somente mockup ou referência visual use mockup-design; não decida se a feature deve existir.
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

## Fronteira com o desenho funcional

Quando uma UI nova ou um redesign **ainda não tem clareza sobre o que o consumidor precisa decidir, quais sinais necessita e quais ações o sistema deve assumir**, use primeiro `signal-driven-feature-design` e receba seu Contrato de Sinal e Ação. Esta Skill continua responsável por **como organizar e representar** capacidades aprovadas em hierarquia, layout, estados, responsividade e Design System. Não recrie a descoberta do valor em cada ajuste visual nem invoque a Skill de sinal para um layout cujo contrato já esteja claro.

## Design System canônico do Code Awareness — aquisição condicional

Se a interface pertence ao **repositório ativo Code Awareness**, existe um Living Artifact normativo no **Continuum desse repositório**:

- **Nome:** `Code Awareness Design System — Visual Foundation v1`.
- **artifactId canônico:** `artifact-35fcb807-45fb-42a6-a0e8-eb121847ee39`.
- **Descoberta:** `list_artifacts` com `metadata: {livingArtifact: true}` e `query: "Design System"`, seguida de `get_artifact` para o Artifact selecionado. Se o ID conhecido ainda corresponder ao repositório ativo, pode ser usado diretamente.
- **Procedimento de recuperação e seleção de canal:** Skill `continuum`. Não acessar outro repositório ou presumir que esse Artifact exista em qualquer produto.

**Gate de uso:** antes de definir direção visual para UI nova ou redesign material do Code Awareness, recupere a revisão canônica vigente; não trabalhe apenas de memória, por screenshot ou por um mockup isolado. Inicie pela **Entrada Rápida — Preset de Design** e aprofunde as seções relevantes (preset/reprodução, header, gradiente, geometria, estados, exemplares e aceitação), sem inventariar o Continuum. Preserve o Design System como fonte única de identidade, sem copiar seus tokens, receitas ou regras para esta Skill.

Para correção visual pontual cujo padrão já está claro e o source/tokens bastam, não imponha leitura extensa por ritual. Se o acesso ao Continuum falhar, não invente o documento nem alegue adesão verificada: use somente referências disponíveis, registre a limitação e não declare conformidade canônica que não foi conferida.

Em outros projetos, continue usando o Design System próprio, quando existente; o vínculo acima é **específico do Code Awareness**, não um padrão estético universal.

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

Quando precisar navegar no codebase, use `code-navigation`.

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

## Clean Screen + Pure Signal — contrato de atenção

**Uma tela existe para um resultado, não para expor o inventário de dados.** Antes de escolher componentes ou alterar uma tela, responda com base na finalidade já aprovada e no ponto de vista de quem a utiliza:

1. **Finalidade:** para que a tela existe e qual resultado deve possibilitar?
2. **Momento do usuário:** o que ele precisa compreender, decidir ou executar agora?
3. **Sinal:** quais dados, orientações e ações são suficientes para esse resultado, com a evidência e os limites necessários?
4. **Atenção:** quais precisam estar diante dos olhos, quais apenas acessíveis, e quando?
5. **Subtração:** o que remover, condensar, deslocar ou automatizar para eliminar competição sem perder capacidade?

Quando finalidade, decisões ou sinais ainda não estiverem definidos, obtenha o Contrato de Sinal e Ação via `signal-driven-feature-design`; **não recrie aqui o desenho funcional**. Com esse contrato, produza a alocação visual de atenção, sem transformá-lo numa segunda especificação de produto.

### Presunção de Ruído — ônus da presença visual

> **Presuma ruído em informação, controles e destaques que disputam atenção até que contribuam para a finalidade da tela. Ornamentação estética não é ruído informacional por definição.**

Aplique a presunção a **conteúdo e elementos funcionais** — existentes ou propostos — como textos, indicadores, métricas, controles, cards informacionais e destaques de estado. Antes de conceder espaço ou atenção a esses elementos, identifique que compreensão, decisão, ação ou orientação melhoram, para quem e em qual momento.

**Beleza é valor legítimo e independente.** Gradientes, sombras, texturas, brilhos, fundos, detalhes geométricos e outros tratamentos decorativos podem existir **para embelezar, expressar identidade e dar atmosfera ao produto**, mesmo sem transmitir informação ou acelerar uma tarefa. Não exija que cada ornamento se converta em sinal funcional para permanecer. A Presunção de Ruído **não** é uma presunção de inutilidade estética.

**Para informação e controles**, o ônus é de quem propõe sua presença/destaque; sem contribuição demonstrável, não adicione ou proponha condensar, rebaixar ou retirar a representação. **Para ornamentos existentes ou direção estética aprovada, o ônus é de quem propõe a remoção:** demonstre um problema concreto de legibilidade, contraste, acessibilidade, desempenho, incoerência com o Design System ou conflito visual material, e preserve a qualidade estética ao corrigir. Preferência automática por minimalismo não é justificativa. Não preencha espaços com dados inúteis; embelezamento intencional não equivale a preenchimento informacional.

**Presunção não é prova de inutilidade.** Se houver incerteza relevante, especialmente sobre necessidades pouco frequentes, segurança, acessibilidade, erros ou contratos funcionais, investigue antes de excluir. Retirar algo da vista não significa eliminar informação, acesso ou capacidade necessários: preserve caminhos recuperáveis e destaque condicional quando a situação exigir. **Não confunda redução de ruído cognitivo com redução de riqueza visual**: são avaliações diferentes.

Atribua destino aos elementos existentes e propostos: **destaque imediato**, **contexto discreto**, **aprofundamento sob demanda**, **condensação/automação** ou **remoção da superfície**. Julgue pela contribuição ao objetivo, frequência e momento de uso, consequência de não perceber, urgência e custo de recuperar o elemento. Não confunda dado disponível com sinal, nem utilidade eventual com visibilidade permanente. Informação rara, mas crítica, pode exigir destaque contextual imediato.

**A revisão informacional deve ser também subtrativa, inclusive em redesigns.** Questione labels repetidos, indicadores saudáveis redundantes, cards que só empacotam conteúdo, métricas sem finalidade decisória, instruções excessivas e controles que transferem ao usuário trabalho realizável pelo sistema. **Não use essa revisão para despojar a interface de seu acabamento estético.** Remover informação visível não autoriza suprimir funcionalidade, evidência, acessibilidade ou informação necessária à decisão.

> **Pure Signal decide o que contribui. Clean Screen decide o que merece ocupar atenção e espaço.**
>
> **Cada presença visual precisa de justificativa; cada ausência de informação necessária também.**

Tela pouco preenchida pode estar correta; tela densa também. Não preencha vazios com conteúdo irrelevante, mas **aceite ornamentação intencional como parte positiva do visual**. Não esconda sinal importante nem empobreça a aparência para simular minimalismo.

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

Use neon, glow e ornamentação com intenção e em coerência com o Design System; não elimine acabamentos aprovados só por serem decorativos. Modere efeitos apenas quando houver conflito concreto com legibilidade, contraste, desempenho ou hierarquia.

## Gramática de composição visual — quando a composição for material

Componha a tela **a partir da tarefa e da atenção**, não a partir de uma coleção de componentes ou de um layout-padrão. Identifique objeto dominante, caminho de leitura, regiões responsáveis, contexto adjacente, ações e mudanças de estado; traduza-os em proporções, agrupamentos, alinhamento, ritmo, tipografia, contraste e profundidade coerentes com o Design System.

A identidade visual e seus tokens pertencem ao **Design System do produto**, não a uma receita universal de layout. Telas de diagnóstico, exploração e edição podem exigir composições diferentes e ainda obedecer às mesmas regras de clareza e consistência.

**Quando criar tela nova ou mudar materialmente hierarquia, alocação ou composição**, leia `references/gramatica-de-composicao.md` para decidir trade-offs espaciais, subtração, sofisticação gráfica e revisão crítica. Dispense esse aprofundamento para ajustes locais com solução inequívoca. Não copie a referência para esta Skill, nem crie templates fixos de telas.

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

A referência visual só deve ser produzida quando ajudar a resolver uma **decisão de composição ou hierarquia ainda aberta**, comunicar uma direção a outro agente ou atender a pedido explícito do usuário.

Quando houver essa necessidade, acione `mockup-design`, que é a fonte canônica para decidir **GERAR, REUTILIZAR ou DISPENSAR**, produzir a referência, comparar suas premissas com source/runtime e Design System e distinguir direção válida de conteúdo ilustrativo ou não suportado.

Não acione a produção de mockup por rotina para bug visual localizado, spacing, overflow, contraste, estados conhecidos ou direção já aprovada, quando a referência não mudaria a execução. Use diretamente os contratos de UI desta Skill.

O mockup nunca substitui a hierarquia de autoridade do design definida acima. Antes do Plano Executável, preserve a distinção entre intenção visual implementável e elementos ilustrativos, sem autorizar capabilities inexistentes.

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

### Prova de atenção e limpeza

Além da inspeção do runtime, confirme com cenários representativos:

- **Orientação:** o usuário reconhece o objeto, a tarefa e a ação principal sem reconstruir a arquitetura da tela?
- **Sinal:** a informação necessária aparece no momento adequado com destaque proporcional ao seu impacto?
- **Subtração informacional:** cada dado e controle visível ajuda o usuário? O que pode sair sem perda funcional? Não classifique ornamentação como informação inútil.
- **Ausência responsável:** detalhes rebaixados ainda são descobríveis quando necessários? Erros, incerteza, permissões e informações críticas permanecem perceptíveis?
- **Composição e beleza:** regiões, espaçamentos, tipografia, cores, superfícies e ornamentos mantêm clareza **e** sofisticação? A proposta preservou ou elevou a aparência aprovada?
- **Comparação:** no redesign, a tela ficou mais eficiente que a anterior para a finalidade, sem regressão funcional ou cognitiva?

Se houver dúvida material, observe uma tarefa representativa com usuário ou evidência equivalente; não invente ganho de usabilidade a partir de gosto estético. Não use pontuação visual arbitrária ou critérios cosméticos para declarar validação.

### Compare intenção, não pixels

Quando houver mockup, não avalie sucesso por semelhança literal.

Compare o runtime contra quatro perguntas:

1. a hierarquia principal sobreviveu?
2. a composição continua transmitindo a mesma direção?
3. o Design System ficou mais coerente, não menos?
4. a implementação real melhorou alguma simplificação, densidade ou legibilidade sem violar contratos?

O runtime pode — e às vezes deve — divergir do mockup para ficar melhor.

> **Mockup fidelity is not the goal. Intent fidelity is.**

Reduzir ruído informacional, melhorar densidade útil ou adaptar proporções pode ser legítimo **quando preservar a qualidade estética e a identidade aprovadas**. Não trate retirada de ornamentos como melhoria apenas porque a tela ficou mais vazia; alterações visuais materiais exigem justificativa e comparação do antes/depois.

### Transferência da intenção aprovada para a validação

Se houver direção visual aprovada, **identifique antes da execução quais regiões e decisões de aparência são materiais**, especialmente as que diferenciam um redesign completo de uma repintura da UI antiga. Use isso como contrato de aceitação para o executor: o runtime deve mostrar a incorporação dessas decisões, não apenas preservar o arranjo de painéis ou passar testes.

No fechamento, compare cada região materialmente afetada com a referência e sinalize divergências significativas. **Encaminhe a prova e o gate de conformidade visual à Skill `validacao-de-implementacoes`**, sem duplicar aqui sua matriz, mecanismos ou procedimento. Nem liberdade de adaptação nem ausência de comparação pixel-perfect autorizam omitir uma transformação aprovada. Uma diferença que melhora o resultado pode ser aceita se sua intenção e evidência forem explícitas.

### Ciclo curto de comparação visual

Quando houver mockup fornecido ou direção visual aprovada, use um ciclo proporcional: referência → runtime → comparação → correção. Antes de alterar, identifique composição, proporções, densidade, ornamentos e estados materiais que devem sobreviver. Instruções explícitas do usuário sobre fidelidade e exceções prevalecem sobre a liberdade de adaptação desta Skill; não redesenhe silenciosamente uma composição já decidida.

Compare cedo uma região representativa e, antes de concluir, os estados materialmente afetados. Normalize viewport, escala, tema, datas e dados para distinguir mudança de layout de mudança de conteúdo. Use lado a lado ou sobreposição quando ajudarem; diferença de pixels isolada não comprova qualidade. O mockup orienta a composição; uma captura do produto aprovada serve como baseline de não regressão, sem substituir o Design System ou o contrato funcional.

Reutilize o harness visual existente quando disponível. Exercite o componente e os estilos de produção com poucos cenários estáveis que cubram os riscos reais: conteúdo esparso/denso, nomes longos, seleção, filtros e painéis, conforme o escopo. Fixtures sintéticas devem ser explícitas; confirme separadamente a integração real necessária. Não crie uma segunda infraestrutura nem exija matriz exaustiva para ajuste pequeno.

Encaminhe propriedades objetivas de geometria à validação: ausência de sobreposição indevida, rótulos legíveis, cobertura correta do intervalo/eixo, conteúdo coerente com filtros e uso da área útil conforme a composição aprovada. Espaço vazio intencional não é falha por si. Automatize verificações proporcionais quando viável, mantendo inspeção humana ou agentiva para hierarquia, beleza e legibilidade.

Inspecione efetivamente as capturas e corrija divergências materiais antes de declarar aceitação visual; gerar arquivos, obter PASS do harness ou aprovar testes funcionais não substitui essa inspeção. Preserve evidência compacta com estado, viewport, tema e revisão do código, distinguindo desvios justificados de pendências.

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
- minimalismo automático que empobrece acabamento, ornamentos ou atmosfera visual;
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
- a beleza, os ornamentos e a atmosfera aprovados foram preservados ou melhorados;
- capacidades existentes foram preservadas;
- breakpoints mantêm usabilidade;
- o runtime real confirma a qualidade visual.

## Regra Final

> **Uma UI profissional organiza a experiência sem empobrecer sua beleza. Preserve a verdade funcional, promova o que importa, reduza ruído informacional, revele profundidade sob demanda, honre a linguagem estética do Design System e só declare conclusão depois de ver a interface real funcionando.**
