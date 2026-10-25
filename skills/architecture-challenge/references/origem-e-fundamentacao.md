# Origem e fundamentação de Architecture Challenge

**Status deste documento:** memória de concepção e justificativa do desenho inicial, registrada em 24 de outubro de 2026. Descreve o processo relatado na conversa e as referências históricas usadas como inspiração; **não** transforma analogias filosóficas em provas científicas de eficácia de sistemas multiagentes. Atualizações futuras devem acrescentar evidências e decisões datadas, preservando o contexto original.

## 1. O problema que antecedeu a Skill

O usuário e o Arquiteto principal vinham projetando uma capacidade do Code Awareness para examinar alterações em Skills da Academy: o **Academy Change Impact Preflight**. O ponto de partida era relativamente modesto: descobrir referências e possíveis consumidores diretos de uma Skill antes de alterá-la. Um segundo agente, descrito como pesquisador muito eficaz, apresentou abordagens externas, questionou premissas e sugeriu maneiras de ampliar o exame de impacto. O Arquiteto principal também pesquisou e refutou partes das propostas, reconciliando ideias em vez de declarar um vencedor.

A arquitetura evoluiu para comparação do package completo (SKILL.md e complementos), evidências literais de mudanças, candidatos a consumidores, cobertura e snapshots com verificação consultiva de freshness. Algumas ampliações atraentes foram deliberadamente recusadas: inferência semântica automática como certeza, grafo novo sem consumidor, LLM no backend e declaração de compatibilidade a partir de simples menções textuais. **A contribuição do confronto foi melhorar a pergunta e delimitar o que o sistema podia afirmar honestamente.**

O Plano da feature foi implementado e integrado ao GitHub no **PR 57**; testes de aceitação reais no runtime integrado confirmaram seleção histórica, diff retrospectivo, consumidores candidatos, freshness e previews somente leitura. Na implementação surgiu ainda uma Capability Opportunity concreta: recuperar versões históricas seletivamente para evitar o overfetch do histórico completo. Essa segunda melhoria foi implementada no mesmo PR e posteriormente ensinada por um complemento da Skill skill-engineering.

Fontes internas rastreáveis:
- PR 57, Code Awareness: https://github.com/ericrocha001/code_awareness/pull/57
- Plano Change Impact Preflight: Continuum artifact-dc55630a-cfd0-4a54-828c-c860369d3155
- Implementation Handoff original: artifact-50e5d8d2-ecdf-4e80-86c6-3745075fd192
- Plano de versões seletivas: artifact-bd2929e3-0dde-42c2-b83a-2ff6156fde02
- Implementation Handoff de versões seletivas: artifact-deb67ee2-d6a2-48e1-9003-0f97d1453141
- Prova de aceitação prática pós-merge: Validation Ledger proof-681fe866-0847-489e-b7d4-c32ffa2a3281

**Limite da evidência:** esse caso mostra colaboração útil e resultados verificáveis no produto, mas não mede isoladamente quanto da melhoria se deveu ao segundo agente, nem demonstra que uma segunda perspectiva sempre supera uma única.

## 2. Intuição epistêmica e filosofia

**Conhecimento cumulativo:** a reflexão inicial do usuário foi que ideias e teorias não surgem isoladas: pessoas herdam conceitos, argumentos e objeções de outras. Essa intuição inspira **reutilizar descobertas e permitir perspectivas que revelem ângulos ausentes**, não pressupor que qualquer debate gerará progresso.

**Hegel e dialética:** a tradição do confronto de conceitos inspirou o nome informal tese/antítese/síntese. Precisão indispensável: a fórmula popular não descreve fielmente o vocabulário que Hegel adotava para seu próprio método; a interpretação triádica associa-se especialmente a Fichte e a leituras posteriores. Hegel enfatizava o desenvolvimento de tensões internas ao conteúdo, não aplicar mecanicamente um esquema de três etapas. Na Skill, isso se transforma em: objeções devem emergir de premissas, contratos ou evidências, não ser inventadas para completar uma estrutura. Fonte: Stanford Encyclopedia of Philosophy, Hegel's Dialectics, https://plato.stanford.edu/entries/hegel-dialectics/ (ou versão arquivada https://plato.stanford.edu/archives/fall2019/entries/hegel-dialectics/).

**Kant e limites da perspectiva:** a conversa associou Kant à incapacidade de uma mente contemplar todos os ângulos de um fenômeno. Isso é **analogia contemporânea**, não atribuição literal a Kant de uma teoria de pluralismo de agentes ou relativismo. A referência historicamente apropriada é o idealismo transcendental, que investiga as condições e limites do conhecimento humano, inclusive a distinção entre fenômenos e coisas em si. A inspiração transferível é humildade epistêmica: não confundir nossa representação do problema com todas as possibilidades relevantes. Fonte: Stanford Encyclopedia of Philosophy, Kant's Transcendental Idealism, https://plato.stanford.edu/entries/kant-transcendental-idealism/.

**Divergência produtiva:** a síntese conceitual do usuário com o Arquiteto não foi “competir por vitória”; foi buscar uma perspectiva que o primeiro agente não formulara e obter uma proposta melhor fundamentada. Uma crítica pode refutar um erro, mas uma contribuição também pode **expandir o espaço de soluções sem que a proposta inicial esteja errada**. Independência, crítica e convergência são os três pilares resultantes.

## 3. Precedente histórico: disputatio medieval

A disputatio, institucionalizada nas universidades latinas dos séculos XIII e XIV, examinava uma questão por argumentos contrários e favoráveis. Nas formas ordinárias, a atividade podia ser organizada em **duas sessões**: na primeira, argumentos eram trazidos e discutidos sob orientação do mestre, frequentemente com um estudante como respondens; na segunda, o mestre realizava a **determinatio**, expondo sua resposta e tratando as objeções. A analogia útil é **separar descoberta de decisão**. Isso não torna a hierarquia medieval uma regra para engenharia moderna.

As disputas quodlibetais abriam a proposição de perguntas a participantes da audiência, inclusive sem aviso prévio ao mestre; são inspiração para permitir que o Challenger **questione o enquadramento da pergunta**, quando a reformulação for material, sem transformar qualquer desafio em exploração ilimitada.

A forma escrita da quaestio, notadamente nos artigos da Summa Theologiae de Tomás de Aquino, apresenta: questão, objectiones, sed contra, respondeo (determinação) e respostas às objeções (ad objectiones). **Não é idêntica ao roteiro de toda disputa oral.** Sua contribuição mais operacional é obrigar o decisor a enfrentar as **objeções relevantes explicitamente**, não apenas publicar uma conclusão que as ignore.

Importante limite histórico: as disputas coexistiam com hierarquias e restrições institucionais/religiosas; formatos de competição podiam incentivar vitória retórica. A Skill rejeita autoridade como prova, antagonismo performático e conclusão forçada.

Fontes históricas:
- Stanford Encyclopedia of Philosophy, Literary Forms of Medieval Philosophy, seção 2.6 (disputation, quaestio, quodlibet): https://plato.stanford.edu/entries/medieval-literary/
- Routledge Encyclopedia of Philosophy, Medieval philosophy, historical development (formato de disputação): https://www.rep.routledge.com/articles/overview/medieval-philosophy/v-1/sections/historical-development-4
- University of Notre Dame Australia Library, How are the Articles in St Thomas Aquinas' Summa theologiae structured?: https://askus.library.nd.edu.au/faq/233152
- M. V. Dougherty, capítulo sobre a disputação quodlibetal de Aquino (Cambridge University Press, 2011): https://www.cambridge.org/core/books/abs/moral-dilemmas-in-medieval-thought/thomas-aquinas-moral-dilemmas-and-a-missing-article-from-quodlibet-xii/05FFE911F03D6FC8C9C9289FA71B7E2A

## 4. Decisões de produto tomadas na concepção

1. **Criar uma Skill independente** porque a intenção “convocar crítica arquitetural independente e sintetizá-la” não é coberta por implementação mining, Skill Engineering, validação de implementação ou Surgical Evals, embora possa chamá-las condicionalmente.
2. **Não exigir debate em toda arquitetura**: o custo de contexto, latência e coordenação precisa de ganho marginal plausível.
3. **Preservar o Arquiteto como autoridade técnica da síntese** e o usuário como responsável por escopo e autorizações. O Challenger é consultivo e não executa mutações.
4. **A segunda perspectiva não é obrigada a discordar**; deve buscar críticas verdadeiras, alternativas e até razões para manter a solução.
5. **Permitir o modo ordinário e o reenquadramento tipo quodlibet**, sem criar duas Skills nem duas pipelines obrigatórias.
6. **Exigir respostas proporcionais às objeções materiais**; rejeitar contabilidade burocrática de objeções insignificantes.
7. **Iniciar como Harness procedimental**, sem criar MCP, roteador, grafo, UI ou automação antecipada.
8. **O Challenger não dispõe da Skill inicialmente.** O Arquiteto deve enviar briefing autossuficiente; o contrato deve sobreviver à futura mudança para delegação mais automática.
9. **Parar com evidência suficiente**, sem exigir consenso, ciclos fixos ou síntese inédita.
10. **Não confundir inspiração com validação causal**; avaliar uso futuro por ganho marginal e casos negativos de triggering.

## 5. Como preservar a evolução futura

Adicione novas entradas **datadas** a este arquivo apenas quando o uso revelar: uma falha generalizável, uma melhoria material, um gatilho que não funciona, uma simplificação demonstrada ou a necessidade comprovada de integração automática. Para cada entrada registre o caso, evidência observada, mudança de decisão/procedimento e resultado de validação.

Não substitua retrospectivamente a justificativa original, não invente dados de desempenho e não acrescente “novas fontes filosóficas” apenas como ornamentação. Se mudar o procedimento operacional, revise o SKILL.md e o briefing correspondente, mantendo uma fonte canônica. Se surgir automação, preserve a diferença entre **capacidade de solicitar** e **autorização efetiva para delegar**.
