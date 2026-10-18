---
name: planejamento-executavel
description: Use antes de delegar implementação para verificar se a solução realmente exige um Plano Final Executável, ou se é somente configuração/operação administrativa, e, quando exigir implementação, definir unidades, contratos, prova e executor mínimo. Para cada Plano Final Executável pronto, publique no Continuum e, após receipt persistido, forneça também instrução curta copiável ao Implementador; sem receipt não declare publicação. Não use para decidir investimento em feature (feature-investment-gate) nem para decisões arquiteturais abertas.
---


# Planejamento Executável

Esta Skill define como transformar uma solução arquitetural suficientemente resolvida em um **Plano Final Executável** que possa ser entregue diretamente a um agente de implementação.

Seu objetivo é:

> **comprimir o raciocínio arquitetural em instruções suficientes para que o Implementador execute a solução sem precisar reconstruir a arquitetura que a originou.**

O Plano não deve reproduzir toda a investigação do Arquiteto.

Ele deve transmitir:

**decisões + contratos + fronteiras + trabalho + ordem + evidência necessária**

com a menor carga cognitiva que preserve execução segura.

## Quando esta Skill começa

Use esta Skill ao decidir se uma solução suficientemente resolvida merece ser entregue como implementação e, somente quando necessário, ao estruturar seu Plano Final Executável.

Antes de estruturar o Plano, deve existir clareza suficiente sobre:

- problema;
- resultado desejado;
- arquitetura escolhida;
- contratos e invariantes relevantes;
- responsabilidades;
- fronteiras;
- componentes afetados;
- restrições conhecidas.

Não use a estruturação do Plano para esconder decisões arquiteturais ainda abertas.

Se uma decisão relevante continua indefinida, resolva-a antes de transferir a solução ao executor.

## Gate de custo autorizado e restrições do usuário

**Antes de publicar o Plano, preserve expressamente o orçamento e as exclusões indicadas pelo usuário.** "Sem testes", "sem medição", "sem benchmark", "sem Spike" ou limites de cota são restrições de execução, não preferências descartáveis. Registre-as no escopo e nos critérios de conclusão e confira que **nenhuma Unidade, Validação Global, etapa de aceitação ou handoff** reintroduz a atividade excluída sob outro nome.

Quando a decisão técnica já foi escolhida e o usuário quer implementá-la diretamente, **não imponha experimento, baseline antes/depois, comparação de desempenho ou Spike como pré-condição**, mesmo que a métrica pudesse ser interessante. Implante a solução dentro dos contratos e deixe a avaliação posterior como decisão separada, quando autorizada. Não apresente previsibilidade como prova empírica de ganho.

**A proibição explícita de mecanismos não dispensa honestidade da conclusão:** se um contrato crítico realmente não puder ser demonstrado pelas evidências permitidas, descreva a lacuna e limite o status; não execute silenciosamente a prova proibida nem declare VALIDAÇÃO sem evidência. Se a restrição impossibilitar uma alteração segura, sinalize o bloqueio específico em vez de contorná-la.

**Economia por padrão:** fora de riscos materiais, não prescreva matrizes extensas, baterias genéricas, E2E abrangente ou benchmarking por ritual. Delegue à capacidade `validacao-de-implementacoes` somente as provas mínimas autorizadas e necessárias, reutilizando evidência já existente quando suficiente.

## Gate anterior ao Plano — natureza do trabalho e executor necessário

**Antes de produzir um Plano Final Executável ou delegar ao Codex/Implementador**, identifique qual transformação concreta falta e qual é o menor executor **capaz e autorizado** para realizá-la. Não infira implementação pelo verbo do pedido (`implantar`, `proteger`, `configurar`) ou pelo fato de pertencer a uma iniciativa de engenharia.

- **Mudança no repositório/produto:** código, workflow versionado, teste, script, infraestrutura como código ou contrato técnico que exige edição e validação. Quando relevante e arquiteturalmente resolvida, cabe Plano Final Executável, execução isolada em Worktree e PR na conclusão da sessão.
- **Operação administrativa/externa:** habilitar regra em provedor, conceder permissão, selecionar check, login, alternar configuração de painel, sem alterar fonte versionada. Encaminhe diretamente ao proprietário/operador autorizado ou conector com capacidade administrativa real. Entregue **instrução operacional curta**: URL/tela, campos exatos, riscos e prova de confirmação. **Não gere Plano de implementação, Worktree, PR, handoff de implementador ou sessão Codex apenas para executar essa configuração.**
- **Trabalho misto:** separe a mudança de código realmente necessária da configuração administrativa subsequente. Só a primeira vai ao implementador; descreva a segunda como pré-condição, handoff operacional ao responsável ou checklist de ativação, com dependência real e prova específica. Não transforme uma etapa administrativa em segundo Plano apenas por simetria com a primeira.

A ausência de permissão na ferramenta ou login do agente **não torna a operação administrativa uma implementação**. Identifique o bloqueio como acesso/autoridade e peça intervenção mínima ao proprietário; não consuma ciclos do Codex tentando contornar a ausência de capacidade. Também não direcione ao executor uma tarefa que o próprio Arquiteto já possa realizar com ferramenta autorizada e custo menor.

**Validação proporcional:** diferencie `configuração observada` de `comportamento comprovado`; use leitura do provedor e um PR real subsequente quando suficientes. Reserve ensaio/PR de prova isolado para risco material que exija evidência imediata. Não invente trabalho de implementação nem indefira o resultado administrativo apenas para satisfazer um rito de handoff.

**Saída do gate:** `IMPLEMENTAÇÃO` → Plano quando necessário; `OPERAÇÃO` → instrução/ação administrativa direta; `MISTO` → Plano apenas para o código e checklist operacional separado. Se não houver implementação, encerre esta Skill sem gerar Plano Final.

## Quando esta Skill termina

A Skill termina quando existe um Plano Final que um agente de implementação competente consegue:

- compreender;
- executar;
- verificar;
- corrigir localmente;
- concluir;

sem precisar inventar arquitetura ou recuperar o raciocínio completo que precedeu o Plano.

> **Se o Implementador precisar reconstruir uma decisão arquitetural relevante para conseguir executar o Plano, o planejamento ainda não terminou.**

## O Plano como Compressão Semântica

O Arquiteto pode utilizar muito mais contexto e capacidade de raciocínio do que o Implementador.

Não transfira toda essa matéria-prima.

Transforme-a em:

- decisões;
- contratos;
- invariantes;
- fronteiras;
- responsabilidades;
- instruções;
- dependências;
- propriedades que precisam permanecer verdadeiras.

O Plano é a fronteira entre:

**raciocínio estratégico**

e

**execução tática**.

Ele deve preservar o conhecimento necessário para executar a solução, não o histórico necessário para explicar como o Arquiteto chegou até ela.

## Conteúdo do Plano Final

Inclua somente aquilo que for relevante para a solução.

Quando aplicável, o Plano pode conter:

- problema e objetivo;
- estado atual relevante;
- resultado esperado;
- arquitetura escolhida;
- contratos e invariantes;
- responsabilidades;
- fronteiras;
- comunicação entre componentes;
- dependências;
- decisões arquiteturais relevantes;
- componentes a criar, modificar ou remover;
- escopo;
- exclusões explícitas;
- riscos;
- restrições;
- compatibilidade;
- migração;
- Unidades de Implementação;
- propriedades que precisam ser provadas;
- Validação Global quando necessária;
- critério de conclusão;
- Perfil Mínimo de Execução.

Não adicione seções apenas porque existe um template possível.

> **A estrutura deve servir à solução. A solução não deve servir à estrutura.**

## Especificidade Proporcional

O Plano deve ser preciso onde erro for caro e flexível onde múltiplas soluções locais forem equivalentes.

Especifique fortemente:

- contratos;
- invariantes;
- fronteiras;
- protocolos;
- direção das dependências;
- persistência;
- migração;
- segurança;
- comportamento público.

Preserve liberdade quando a decisão for local e reversível.

Não transforme o Plano em pseudocódigo da implementação.

Não determine:

- helpers privados;
- nomes internos;
- estruturas de controle;
- organização interna;

quando essas escolhas não alterarem arquitetura, contratos ou comportamento esperado.

## Unidades de Implementação

Quando a solução não puder ser executada com segurança como uma única unidade cognitiva, decomponha-a em **Unidades de Implementação**.

Uma Unidade de Implementação é:

> **uma parcela sequencial e coerente do Plano Final que produz um novo estado válido do sistema e possui uma forma objetiva de demonstrar sua conclusão.**

Unidades existem para reduzir carga cognitiva e aumentar confiabilidade.

Não representam tempo, Sprint administrativa ou quantidade arbitrária de arquivos.

Se a solução inteira já constitui uma transformação pequena, coerente e verificável, não crie Unidades artificialmente.

## Propriedades de uma Boa Unidade

Uma boa Unidade deve possuir, quando aplicável:

**Coesão**

Existe um resultado técnico predominante.

**Executabilidade**

O agente consegue realizá-la sem inventar arquitetura.

**Consistência**

Sua conclusão deixa o sistema em estado coerente.

**Verificabilidade**

Existe uma propriedade observável que demonstra que o resultado esperado foi produzido.

Uma Unidade não deve ser apenas um agrupamento de tarefas.

Ela deve representar uma transformação técnica coerente.

## Evite Micro-Unidades

Não decomponha mecanicamente em ações como:

- criar interface;
- importar interface;
- criar método;
- chamar método;
- atualizar tipo.

Quando essas ações pertencem à mesma transformação técnica, mantenha-as juntas.

A Unidade deve representar um resultado que faça sentido como estado intermediário do sistema.

## Estrutura de uma Unidade

Inclua apenas os campos relevantes.

Uma Unidade pode informar:

- nome;
- finalidade;
- resultado produzido;
- arquivos ou componentes envolvidos;
- alterações necessárias;
- dependências;
- contratos relevantes;
- limites;
- propriedade que precisa ser demonstrada;
- resultado esperado ao final.

Não descreva detalhes táticos desnecessários.

A Unidade deve responder principalmente:

> **O que deve passar a ser verdade quando esta Unidade terminar?**

## Ordem das Unidades

Ordene as Unidades pela dependência técnica natural.

Prefira sequências que produzam estados intermediários válidos.

Quando possível:

- adicione antes de remover;
- estabeleça contrato antes de migrar consumidor;
- introduza capacidade antes de depender dela;
- estabilize comportamento antes de eliminar caminho legado;
- mantenha o sistema verificável ao longo da mudança.

Evite planos em que várias Unidades deixem deliberadamente o sistema quebrado até uma etapa distante.

Uma Unidade concluída deve ser uma fundação confiável para a próxima.

## Granularidade

Não determine granularidade apenas por:

- número de arquivos;
- número de linhas;
- quantidade de passos;
- camada arquitetural;
- duração estimada.

A principal referência é:

> **a carga cognitiva residual deixada ao Implementador.**

Pergunte:

> **Um executor competente no baseline do sistema consegue compreender, implementar, verificar e corrigir esta Unidade sem inventar decisões arquiteturais?**

Se sim, a granularidade tende a ser adequada.

Se não, determine a causa.

## Quando dividir uma Unidade

Considere dividir quando:

- o contexto necessário ficou excessivo;
- existem múltiplos resultados técnicos independentes;
- a Unidade contém responsabilidades distintas;
- existem dependências internas que permitem estados intermediários válidos;
- a carga cognitiva ultrapassa razoavelmente o executor previsto;
- a implementação só pode ser compreendida mantendo muitas preocupações independentes simultaneamente.

Não divida apenas para produzir Unidades menores.

Divida para reduzir complexidade real.

## Quando não dividir

Não divida quando a separação:

- quebrar uma transformação naturalmente atômica;
- produzir estados intermediários sem significado;
- aumentar coordenação sem reduzir dificuldade;
- separar alterações fortemente acopladas;
- exigir reconstrução repetida do mesmo contexto;
- criar burocracia maior que o benefício cognitivo.

> **Menor não significa necessariamente mais simples.**

## Decisões Abertas não São Granularidade

Se uma Unidade parece difícil porque ainda contém decisões arquiteturais abertas, não tente resolver o problema apenas dividindo-a.

Primeiro resolva as decisões.

A decomposição serve para reduzir complexidade de execução.

Ela não substitui planejamento arquitetural incompleto.

## Validação das Unidades

Cada Unidade deve terminar com uma propriedade objetiva que precise ser demonstrada.

Esta Skill determina **onde a evidência é necessária e qual resultado precisa ser demonstrado**.

Ela não redefine como selecionar ou projetar o mecanismo de prova.

Quando for necessário determinar a evidência apropriada, utilize a capacidade especializada de validação disponível no Harness.

Não replique regras de validação dentro deste documento.

## Validação Global

Depois das Unidades, determine se existe uma propriedade relevante que só pode ser observada pela composição da solução.

Se existir, registre a necessidade de uma **Validação Global**.

Conceitualmente:

- Unidade A demonstra A;
- Unidade B demonstra B;
- Unidade C demonstra C;
- a composição precisa demonstrar D.

Não crie Validação Global por padrão.

Ela existe somente quando demonstra algo necessário que as evidências locais não demonstram isoladamente.

O desenho do mecanismo de prova pertence à capacidade especializada de validação.

## Baseline de Execução

Por padrão, prepare o Plano para execução por um:

> **Flash Medium competente**

Esse é o executor econômico de referência do Sistema.

Utilize o maior poder de raciocínio disponível no Arquiteto para reduzir a complexidade residual da execução até que, sempre que possível, ela caiba nesse baseline.

Antes de concluir que uma tarefa exige um executor superior, verifique se:

- decisões demais ficaram abertas;
- o Plano está pouco claro;
- a Unidade está grande demais;
- contexto desnecessário está sendo transferido;
- a validação está mal estruturada;
- alguma deficiência de Harness está aumentando artificialmente a dificuldade.

## Perfil Mínimo de Execução

O Perfil Mínimo pertence ao **Plano Final como um todo**, salvo quando existir uma razão técnica real para separar o trabalho em outro Plano.

Declare capacidade, não necessariamente produto comercial.

Defina:

**Raciocínio mínimo**

- LOW
- MEDIUM
- HIGH

**Janela mínima de contexto**

Utilize a faixa operacional adequada, como:

- 32K
- 128K
- 200K
- 500K
- 1M

A escolha de qual modelo disponível satisfaz o Perfil pertence à camada operacional de execução.

O Plano declara necessidade.

A infraestrutura escolhe o executor compatível.

## Quando elevar o Perfil

Se uma parte parecer exigir capacidade superior:

1. resolva mais decisões no Arquiteto;
2. reduza ambiguidade;
3. reavalie a decomposição;
4. melhore a transferência de contexto;
5. verifique se o Harness pode retirar dificuldade incidental.

Eleve o Perfil somente quando a complexidade restante for inerente ao trabalho.

Não use um modelo mais caro como substituto automático para planejamento insuficiente.

## Quando criar outro Plano

Não crie um novo Plano apenas porque uma Unidade ficou ligeiramente mais difícil.

Separe somente quando houver uma fronteira técnica real e o trabalho puder ser tratado como outro problema coerente.

A divisão entre Planos deve refletir arquitetura ou independência técnica, não conveniência administrativa.

## Iniciativas com múltiplos Planos: dependências e concorrência

Quando uma iniciativa contiver **resultados técnicos autônomos**, projete-a como um conjunto pequeno de Planos Finais Executáveis, cada qual com objetivo, contratos, escopo, prova e entrega integrável próprios. Cada Plano deve ser compreensível, executável e validável sem carregar todos os outros, recuperando apenas as precondições materiais. A validação de cada Plano gera um commit rastreável na branch da sessão; **não** exige PR próprio. Não fracione uma mudança atômica apenas para obter vários Planos ou vários agentes.

Antes de publicar, distinga três relações entre os Planos:

- **Dependência real:** B precisa do contrato, código integrado, capacidade ou prova de A para começar, concluir ou ser integrado corretamente. Registre a precondição específica e o momento em que ela estará satisfeita; use relação `depends-on` no Continuum apenas nesse caso.
- **Independência técnica:** A e B podem ser implementados, validados e integrados separadamente, em qualquer ordem. Não declare `depends-on` por fazerem parte da mesma iniciativa.
- **Preferência de sequência:** é conveniente executar A antes de B por prioridade, custo, risco ou disponibilidade, mas B não exige tecnicamente A. Informe a preferência como orientação operacional, não como dependência arquitetural.

A partir dessas relações, formule uma **ordem parcial de execução**, não uma fila artificial. Identifique quais Planos podem avançar concorrentemente e qual entrega desbloqueia outra. Trabalho concorrente só é candidato quando escopo/ownership, branches/Worktrees e contratos não impõem disputa material; independência de arquivos por si só não prova independência semântica. Quando houver conflito de edição, integração ou escritor, sinalize a fronteira para coordenação por `worktree-execution`, sem reproduzir seu protocolo.

Cada Plano tecnicamente independente deve poder deixar o destino compartilhado coerente quando integrado isoladamente; isso **não obriga** a abrir PR ou integrar após cada validação. Vários Planos relacionados podem compor uma sessão e seguir juntos em um PR na conclusão. Onde houver dependências reais, preserve a ordem de integração e a validação do estado composto. O planejamento determina **dependências e possibilidades de paralelismo**; o executor decide alocação e sincronização concretas segundo a governança operacional.

**Exame final:** se dois Planos declarados dependentes puderem ser implementados e integrados separadamente sem quebrar contratos, elimine a dependência artificial. Se um Plano só funcionar quando outros forem integrados simultaneamente, reavalie a separação.

## Validação dos Planos e conclusão da sessão

**Não equipare Unidade de Implementação, Plano, commit, PR e merge.** As Unidades organizam execução e prova; cada Plano Final Executável aprovado constitui uma **validação** e origina **um commit de validação** na branch exclusiva da sessão. Esse commit não encerra a sessão nem abre PR.

**Padrão de integração:** vários Planos relacionados podem ser validados e commitados sucessivamente na mesma Worktree/branch. Quando a sessão for **concluída**, o conjunto será apresentado em **um PR consolidado**; revisão e merge são etapas posteriores. A conclusão exige verificar a coerência da composição e demonstrar propriedades integradas ainda não cobertas, sem repetir provas suficientes por ritual.

O Plano deve definir o que significa sua própria validação; **não precisa determinar a abertura de PR individual**. A Skill `worktree-execution` governa branch, commits de validação, conclusão de sessão, PR único e integração. A Skill `validacao-de-implementacoes` governa suficiência de evidência.

**Coesão e exceções:** não junte artificialmente Planos independentes em uma sessão longa apenas para economizar PR; tampouco quebre uma sessão coesa em micro-PRs. Se uma parte precisar ser integrada antecipadamente, trate-a como conclusão de uma sessão coerente e prossiga em outra branch/sessão com baseline apropriado. Planeje limites quando dependências, ownership, tamanho de revisão ou risco real justificarem unidades de conclusão diferentes, não por número de commits, arquivos ou testes.

**Integração segura:** mantenha contratos coerentes no destino quando uma sessão for merged. Dependências entre sessões exigem ordem apropriada e provas de composição; não mantenha PRs parciais dependentes abertos por mero checkpoint de Plano. A arquitetura e os limites entre Planos continuam determinados por coesão técnica, não por conveniência administrativa de PR.

## Critério de Conclusão do Plano

Defina objetivamente o que deverá ser verdadeiro para que a implementação possa ser encerrada.

O critério deve considerar, conforme aplicável:

- Unidades obrigatórias concluídas;
- propriedades obrigatórias demonstradas;
- regressões relevantes preservadas;
- Validação Global concluída quando necessária;
- contratos atendidos;
- objetivo alcançado;
- ausência de falha conhecida dentro do escopo;
- ausência de bloqueio oculto.

Não transforme esse critério em duplicação das regras especializadas de validação.

O Plano define **o estado final exigido**.

A capacidade de validação define **como demonstrá-lo**.

## Checklist de Qualidade

Antes de entregar o Plano Final, verifique:

1. O problema e o resultado esperado estão claros?
2. A arquitetura escolhida está definida?
3. Os contratos e invariantes relevantes estão preservados?
4. Responsabilidades e fronteiras estão claras?
5. O escopo e as exclusões relevantes estão definidos?
6. O Implementador sabe o que precisa mudar?
7. A ordem do trabalho respeita dependências reais?
8. Cada Unidade representa uma transformação coerente?
9. Cada Unidade termina em estado verificável?
10. Alguma Unidade ainda contém decisão arquitetural indevidamente aberta?
11. Existe propriedade importante que apenas a composição consegue demonstrar?
12. O critério de conclusão é objetivo?
13. O Perfil Mínimo declarado é suficiente?
14. A carga cognitiva é compatível com o executor pretendido?
15. Existe detalhe tático desnecessariamente prescrito?
16. Existe contexto ou explicação histórica que pode ser removido sem perda de executabilidade?
17. Um Implementador que não participou da investigação consegue executar este Plano diretamente?
18. A publicação obrigatória do Plano no Continuum do repositório ativo foi confirmada por receipt persistido e `artifactId` válido (ou a entrega foi explicitamente declarada bloqueada)?
19. A referência entregue ao Implementador aponta para a representação canônica, sem cópia concorrente?
20. O `executionId`, quando necessário para continuidade entre Plano e Handoff, foi criado ou reutilizado de forma estável?
21. Os Planos possuem provas próprias para commits de validação e a sessão tem uma fronteira de conclusão coesa para um PR, sem PR por Plano nem agrupamento artificial?
22. Quando houver múltiplos Planos, o grafo registra somente dependências materiais e identifica entregas paralelizáveis sem forçar concorrência?
23. A necessidade real de implementação e de delegação ao executor foi comprovada, descartando antes operações administrativas mais simples?
24. Após receipt persistido de um Plano pronto para execução, a resposta inclui uma instrução curta, copiável e vinculada ao nome/artifactId correto para o Implementador?

Se a resposta relevante for não, corrija o Plano ou a transferência antes de considerá-lo entregue.

## Anti-Padrões

Evite:

**Operação administrativa disfarçada de implementação**

Não gere Plano, Worktree ou PR, nem consuma tokens do Implementador para ajustes manuais de provedor sem código a entregar.

**Plano como diário**

Não narre toda a investigação.

**Plano como lista de possibilidades**

Escolha a solução quando houver evidência suficiente.

**Plano como pseudocódigo**

Não roube autonomia tática sem necessidade.

**Plano como context dump**

Transfira conhecimento consolidado, não toda a matéria-prima.

**Micro-Unidades**

Não fragmente uma única transformação em passos administrativos.

**Encadeamento artificial de Planos**

Não transforme ordem de preferência em `depends-on`, nem paralelize escopos que disputam a mesma fronteira de integração.

**Unidade impossível**

Não entregue ao executor decisões arquiteturais que ainda precisam ser inventadas.

**Perfil inflado**

Não compense deficiência de planejamento simplesmente aumentando a capacidade do modelo.

**Validação duplicada**

Não copie para esta Skill procedimentos pertencentes à capacidade especializada de validação.

## Publicação e Handoff via Continuum

**Regra obrigatória e incondicional de entrega:** todo Plano Final Executável deve ser publicado no Continuum canônico do repositório ativo **antes de responder com o handoff**. A redação do Plano, sozinha, não conclui a tarefa; exija confirmação de persistência e `artifactId` real. A ausência de ferramenta é bloqueio de publicação, nunca autorização implícita para entregar o texto integral como se fosse o Artifact.

O Plano publicado é a representação canônica da transferência Arquitetura → Implementação.

Use `continuum-publication` para cumprir o contrato vigente de metadata, publicação, edição, relações, data e isolamento por repositório. Esta Skill define apenas a semântica do handoff:

1. finalize e revise o Plano antes de publicar;
2. publique-o como Artifact `EXECUTABLE_PLAN` no Continuum do repositório ativo;
3. quando a execução produzir múltiplos Artifacts relacionados, estabeleça ou reutilize um `executionId` estável;
4. preserve o `artifactId` retornado;
5. entregue ao executor a referência do Artifact, não uma segunda versão reescrita do Plano;
6. o Implementador deve recuperar o Artifact pelo Continuum e executar exatamente a representação corrente selecionada;
7. o `IMPLEMENTATION_HANDOFF` final deve reutilizar o mesmo `executionId` quando ele existir e relacionar-se ao Plano com `implements`.

Não mantenha duas versões semanticamente concorrentes do mesmo Plano em chat, arquivo e Continuum. Se o chat precisar informar o resultado, prefira um receipt compacto com `artifactId`, `executionId` quando houver e estado da publicação.

Se a finalidade e identidade do Plano permanecerem as mesmas, uma revisão material deve atualizar o Artifact existente segundo a Skill `continuum-publication`, em vez de publicar outro Plano concorrente. Crie outro Artifact somente quando houver uma execução ou finalidade realmente independente.

### Instrução de encaminhamento ao Implementador

**Entrega conjunta obrigatória:** quando um Plano Final Executável estiver **publicado com receipt persistido** e pronto para implementação, a resposta ao usuário deve conter, **além da identificação do Artifact**, uma **instrução curta e copiável para encaminhar ao Implementador** (preferencialmente bloco de mensagem editável, quando disponível). Esta é a mensagem de acionamento, **não outro Plano** nem outro Artifact no Continuum.

A instrução deve:
- identificar o Plano pelo **nome exato e `artifactId` real**, orientando o agente a recuperá-lo no Continuum antes de executar;
- explicitar o trabalho solicitado em uma frase e, **somente quando relevantes e confirmados**, a Worktree/branch/sessão existente, restrições de ownership/concorrência e condições de autorização;
- delegar a execução conforme as unidades, contratos e critérios de prova do Artifact, solicitar testes proporcionais e handoff no Continuum;
- **não** reproduzir o Plano, inventar checkout/identidade/acesso, ampliar a autorização para mutações/merge ou alterar a política de commits/PRs.

A instrução é **entregue no chat juntamente com a confirmação da publicação**, não copiada como corpo concorrente do Artifact. Se a publicação falhar ou o trabalho ainda não estiver pronto para implementação, não apresentar o prompt como convocação de um Plano publicado; informar o bloqueio.

### Recuperação do Plano pelo executor

O executor não precisa receber uma segunda cópia do texto do Plano. Use a capacidade `continuum` para decidir o que recuperar e `continuum-local-cli` como transporte preferido quando houver terminal, CLI local funcional, Worktree vinculada e autorização — **mesmo com MCP disponível**. Use MCP somente quando necessário e autorizado.

`artifactId conhecido → recuperar o Artifact exato pelo canal adequado → executar`.

Sem referência direta:

`descoberta filtrada por EXECUTABLE_PLAN → selecionar um Artifact → recuperar seu conteúdo`.

Preserve Metadata Before Content e não abra vários Planos preventivamente. Não fixe nomes de ferramentas MCP num fluxo que também possui acesso local equivalente.

### Falha de publicação

Se o Continuum estiver indisponível:

- preserve integralmente o Plano Final;
- informe que a publicação não foi concluída;
- não invente `artifactId`;
- não produza uma versão resumida como substituto silencioso.

A transferência direta do texto só é fallback excepcional, identificado explicitamente como **não publicado**, quando o usuário solicitar essa alternativa ou a publicação estiver comprovadamente indisponível. Não apresente o Plano como entregue nem reproduza o corpo completo por padrão. Quando a publicação voltar a estar disponível, materialize a mesma representação canônica conforme a Skill `continuum-publication`.

## Forma de Saída

Não imponha um template rígido.

Construa o Plano Final utilizando somente as seções necessárias à solução.

Preserve uma estrutura clara o suficiente para distinguir:

- objetivo;
- solução;
- contratos;
- escopo;
- execução;
- evidência necessária;
- conclusão.

Para cada Unidade, deixe explícito o novo estado que ela deve produzir.

Adapte a forma ao problema sem enfraquecer os contratos necessários para execução segura.

A saída normal é **confirmar a publicação persistida, referenciar o Artifact canônico pelo nome exato e `artifactId` e entregar junto a instrução copiável de encaminhamento ao Implementador**, sem reproduzir o Plano no chat. Se a publicação falhar, declare a pendência e o motivo; nunca declare a entrega concluída.

## Regra Final

> **Transforme arquitetura resolvida em execução econômica. Preserve decisões, contratos e fronteiras; remova histórico e ruído; decomponha somente quando isso reduzir complexidade real; deixe liberdade onde ela for segura; exija estados verificáveis; publique o Plano canônico no Continuum; e faça o Implementador recuperar somente a carga cognitiva que legitimamente pertence à execução.**
