---
name: architecture-challenge
description: Use quando uma decisão arquitetural material ainda incerta puder melhorar com investigação independente, crítica fundamentada e novas alternativas. Oriente Challenger sem acesso à Skill, reconcilie objeções e determine a solução. Não use em tarefas triviais, investigação já suficiente ou arquitetura validada sem nova incerteza.
---

# Architecture Challenge — Divergência Produtiva

## Finalidade

Fortalecer decisões arquiteturais relevantes por **exploração independente, contraposição fundamentada e determinação responsável**. O Challenger existe para descobrir o que o Arquiteto principal ainda não considerou; não existe para vencê-lo. O Arquiteto principal não deve defender a própria proposta por inércia: deve construir a melhor arquitetura justificada pelas evidências.

Inspiração: dialética filosófica e disputatio medieval, **adaptadas**, não reproduzidas literalmente. Para os motivos históricos, distinções conceituais e trajetória do método, consulte **references/origem-e-fundamentacao.md** apenas ao revisar a própria capacidade ou estudar suas origens.

## Gate de acionamento: desafio ou trabalho individual?

Acione quando **todas** as condições forem plausíveis:
- existe decisão de arquitetura ainda aberta, de impacto material;
- há hipóteses concorrentes, premissas frágeis, alto custo de erro, conhecimento especializado ou chance concreta de reenquadrar o problema;
- uma perspectiva independente pode trazer **ganho marginal** que justifica contexto, pesquisa e rodada adicional;
- há acesso e autoridade para delegar ou uma forma legítima de obter uma resposta.

Pode dispensar quando a solução está suficientemente determinada, evidências locais resolvem a dúvida, a decisão é reversível e barata, o trabalho é tático/rotineiro, ou o Challenger apenas repetiria investigação já suficiente. Não convoque por cerimônia, pelo tamanho da tarefa ou para cumprir uma quantidade de rodadas.

O Arquiteto mantém sua própria responsabilidade de pesquisar, buscar contexto e criticar; o Challenger **não substitui** essa investigação. Para pesquisa em implementações externas use implementation-mining quando aplicável; para decidir necessidade de Harness use harness-improvement; para avaliação comportamental do protocolo use surgical-evals.

## Responsabilidades

- **Arquiteto principal:** detém a questão, contratos e invariantes, prepara escopo e candidato, avalia evidências e emite a determinação. Não terceiriza decisão estratégica.
- **Challenger:** pesquisa de modo independente, testa pressupostos, apresenta alternativas e as objeções **mais fortes**, inclusive razões para manter a solução. Não é implementador, não decide nem altera o projeto.
- **Responsável pelo produto:** governa objetivos, restrições e autorizações. Não presuma que o Arquiteto pode invocar modelos, ferramentas ou efetuar mudanças sem canal e autorização observáveis.

Divergência não é obrigação de discordar. Convergência não é obrigação de concordar. Nenhuma posição ganha por autoridade, retórica, volume de referências ou número de agentes.

## Procedimento — pergunta, contraposição, determinação

### 1. Delimite a quaestio

Formule uma pergunta decisória específica. Registre: problema e consumidor, estado conhecido, arquitetura candidata (se houver), invariantes, custos/risco, alternativas já avaliadas, pontos verdadeiramente abertos e evidências relevantes. Se não houver candidata, permita exploração sem inventar uma tese artificial.

Pergunta adicional útil: **estamos resolvendo o problema correto?** O Challenger pode reenquadrar a questão (inspiração no quodlibet), mas só se justificar por que a reformulação muda materialmente a decisão. Não permita expansão ilimitada do escopo.

### 2. Convoque uma perspectiva realmente independente

Quando o Challenger não tiver acesso a esta Skill, **leia e use references/briefing-do-challenger.md** para enviar instruções autossuficientes junto do contexto mínimo. Inclua todas as restrições que afetem a resposta; não pressuponha que o outro modelo conhece Academy, Code Awareness, SEA, papéis ou decisões anteriores.

Oriente a investigar hipóteses alternativas antes de ancorar-se na solução inicial quando isso for útil. Autorize discordância, concordância fundamentada, investigação externa proporcional e novas perguntas. Peça evidências verificáveis e distinção entre fato, inferência e hipótese. Prefira **uma entrega de alto sinal** a relatórios extensos.

**Canal:** se não houver integração direta autorizada entre agentes, produza o briefing para transferência manual pelo usuário ou pelo canal disponível; não afirme ter convocado ou recebido trabalho que não aconteceu. Uma futura integração de delegação deve preservar o mesmo contrato, sem mudar a autoridade do Arquiteto.

### 3. Examine as objeções mais fortes

Classifique contribuições pelo efeito sobre a decisão, não por quantidade:
- **REVISAR:** objecção ou alternativa muda contrato, arquitetura, risco, custo ou enquadramento;
- **MANTER:** candidata resiste, com justificativa;
- **INVESTIGAR:** falta prova material e existe experimento/leitura delimitada capaz de decidir;
- **DESCARTAR:** hipótese infundada, incompatível com invariantes ou sem ganho marginal.

Trate tanto objeções à arquitetura quanto novas possibilidades não antecipadas. Não confunda ausência de crítica com prova de qualidade, nem simples discordância com descoberta. Enfrente explicitamente as **objeções materiais**; não mantenha uma lista burocrática de observações triviais.

Se o debate depender de realidade observável, adquira a menor prova proporcional em vez de continuar argumentando sem dados. Desconfie de consenso por ancoragem, de referências não verificadas e de soluções sofisticadas sem consumidor real.

### 4. Faça a determinatio — síntese justificada

O Arquiteto apresenta a solução escolhida e, proporcionalmente à criticidade:
- que alternativas/reformulações foram consideradas e por que;
- quais objeções materiais foram aceitas, respondidas, deixadas como risco ou convertidas em prova;
- quais contratos e invariantes permanecem;
- por que a decisão melhora (ou mantém) o baseline, inclusive custos novos;
- o que ainda está incerto e se impede planejamento.

A síntese pode **preservar** a arquitetura inicial. Pode **combinar** contribuições, escolher uma alternativa distinta, adiar ou determinar que faltam evidências. Não invente uma terceira opção apenas para parecer dialético. Registre decisões duráveis no artefato de planejamento/Continuum já apropriado; não crie log permanente duplicado por padrão.

### 5. Critério de parada

Uma rodada substantiva é o default, não uma obrigação. Nova rodada somente se revelar hipótese, contradição ou evidência **material e diferente** que possa alterar a decisão. Pare quando novas informações dificilmente mudariam o resultado, ou quando o custo marginal do desafio superar o ganho esperado. Não transforme o SEA em torneio de agentes.

Depois da determinação, use planejamento-executavel se a decisão realmente exigir implementação. Uma revisão futura pode reabrir a questão mediante novas evidências, não por mero desejo de continuar disputando.

## Antipadrões

- Fazer o Challenger discordar artificialmente, gerar dez alternativas por quota ou premiar eloquência.
- Delegar sem contexto suficiente e depois atribuir falhas ao agente consultado.
- Obrigar o Challenger a possuir esta Skill; ele deve receber briefing autocontido.
- Enviar o repositório inteiro quando bastam contratos, mapa e poucos arquivos.
- Encerrar com síntese retórica sem responder uma objeção crítica.
- Repetir rodadas para obter unanimidade, ou confundir maioria de modelos com verdade.
- Projetar integração, ferramentas, registro ou votação antes de fricção comprovada.

## Evidência de valor e evolução

A experiência que originou a capacidade (Academy Change Impact Preflight, PR 57) mostrou evolução material da proposta após colaboração e crítica, mas **não constitui estudo controlado** de superioridade sobre trabalho individual. Nos usos seguintes observe: objeção nova e material, alternativa adotada ou descartada com razão, melhora verificável do contrato, custo de pesquisa/rodadas, e casos em que **não acionar** foi a escolha correta.

Se houver dúvida material sobre ganho e triggering, convoque surgical-evals para comparação pequena e discriminativa. Evolua este método por evidência; mantenha sua origem em references/origem-e-fundamentacao.md e evite reescrever retrospectivamente a história para justificar decisões novas.
