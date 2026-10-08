---
name: planejamento-executavel
description: Use quando a arquitetura de uma solução já estiver resolvida e precisar virar Plano Final Executável para implementação: unidades coerentes, contratos, ordem, evidências e perfil mínimo do executor. Publique o plano no Continuum quando disponível. Não acione para decidir se a feature merece existir (feature-investment-gate) nem para resolver decisões arquiteturais ainda abertas.
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

Use esta Skill quando as decisões arquiteturais necessárias para a implementação estiverem suficientemente resolvidas.

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
18. O Plano final foi publicado no Continuum do repositório ativo quando a capability estava disponível?
19. A referência entregue ao Implementador aponta para a representação canônica, sem cópia concorrente?
20. O `executionId`, quando necessário para continuidade entre Plano e Handoff, foi criado ou reutilizado de forma estável?

Se a resposta relevante for não, corrija o Plano ou a transferência antes de considerá-lo entregue.

## Anti-Padrões

Evite:

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

**Unidade impossível**

Não entregue ao executor decisões arquiteturais que ainda precisam ser inventadas.

**Perfil inflado**

Não compense deficiência de planejamento simplesmente aumentando a capacidade do modelo.

**Validação duplicada**

Não copie para esta Skill procedimentos pertencentes à capacidade especializada de validação.

## Publicação e Handoff via Continuum

Quando o repositório ativo possuir Continuum disponível, o Plano Final Executável deve ser transferido ao Implementador **por meio do Continuum**, não por copy/paste manual.

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

### Recuperação pelo Implementador

O executor não deve depender de o Arquiteto reenviar o texto.

Preferência:

`artifactId conhecido → get_artifact → executar`.

Quando a referência direta não estiver disponível:

`list_artifacts(kind=EXECUTABLE_PLAN, filtros relevantes) → selecionar discovery record → get_artifact`.

A recuperação continua obedecendo Metadata Before Content. Não abra preventivamente vários Planos.

### Falha de publicação

Se o Continuum estiver indisponível:

- preserve integralmente o Plano Final;
- informe que a publicação não foi concluída;
- não invente `artifactId`;
- não produza uma versão resumida como substituto silencioso.

A transferência direta do texto é fallback operacional, não o caminho normal. Quando a publicação voltar a estar disponível, materialize a mesma representação canônica conforme a Skill `continuum-publication`.

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

Quando o Continuum estiver disponível, a saída operacional normal após a publicação é **referenciar o Artifact publicado**, não reproduzir novamente o Plano inteiro.

## Regra Final

> **Transforme arquitetura resolvida em execução econômica. Preserve decisões, contratos e fronteiras; remova histórico e ruído; decomponha somente quando isso reduzir complexidade real; deixe liberdade onde ela for segura; exija estados verificáveis; publique o Plano canônico no Continuum; e faça o Implementador recuperar somente a carga cognitiva que legitimamente pertence à execução.**
