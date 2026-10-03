---
name: skill-engineering
description: Use ao criar, revisar, dividir, combinar ou melhorar substancialmente uma Skill de agente. Determine primeiro se a capacidade já existe total ou parcialmente em outra Skill e se uma nova Skill realmente deveria existir. Evite duplicação e sobreposição de capacidades, prefira reutilizar, evoluir ou chamar a Skill canônica existente e projete novas Skills apenas quando houver capacidade coerente, reutilizável e materialmente distinta. Use também para revisar escopo, triggering, valor marginal e preservação de capacidade durante refatorações. Não use para simples edição textual de uma Skill já arquiteturalmente resolvida.
---

# Skill Engineering

## Propósito

Projetar Skills que aumentem materialmente a capacidade dos agentes sem inflar desnecessariamente o catálogo de capacidades.

Uma Skill se justifica quando fornece conhecimento, procedimento ou contexto reutilizável que, sem ela, o agente:

- não possuiria;
- precisaria redescobrir;
- aplicaria inconsistentemente;
- ou executaria com custo evitável.

> Otimize para capacidade adquirida por unidade de contexto e por unidade de complexidade do ecossistema.

O objetivo não é criar mais Skills.

É tornar o sistema mais capaz.

## Gate de Existência

Antes de projetar uma Skill, determine se **Skill é realmente o produto correto**.

Pergunte:

- Que capacidade falta sem esta Skill?
- Essa lacuna reaparecerá?
- Existe julgamento suficiente para justificar uma capacidade agentic?
- O agente já faria isso bem sem orientação especializada?
- A capacidade altera materialmente confiabilidade, qualidade ou eficiência?
- Outro mecanismo resolveria melhor a causa?

Uma Skill geralmente se justifica quando preserva:

- procedimento recorrente com julgamento;
- conhecimento de domínio ou projeto não óbvio;
- critérios de decisão específicos;
- restrições operacionais;
- invariantes relevantes;
- modos reais de falha;
- comportamento específico de ferramentas ou ambiente;
- contexto caro de redescobrir.

Uma Skill geralmente não se justifica quando contém predominantemente:

- boas práticas genéricas;
- conceitos amplamente conhecidos pelo modelo;
- preferência pontual;
- instrução isolada;
- regra determinística melhor resolvida estruturalmente;
- documentação criada sem necessidade concreta;
- reação específica a uma única falha sem causa geral identificada.

Quando Skill não for a representação correta, não force sua criação.

## Gate de Não-Duplicação

Antes de criar uma nova Skill, verifique as capacidades existentes relevantes.

A pergunta não é apenas:

> "Já existe uma Skill com este nome?"

Pergunte:

> "Já existe alguma Skill cuja capacidade cobre total ou parcialmente o problema que pretendo resolver?"

Compare **responsabilidade e comportamento**, não apenas nomes.

### Se a capacidade já estiver coberta integralmente

Não crie outra Skill.

Utilize a capacidade existente.

### Se a capacidade existente estiver incompleta

Determine se o novo conhecimento pertence coerentemente à Skill existente.

Se pertencer:

> evolua a Skill canônica.

Não crie uma Skill paralela apenas porque o novo aprendizado surgiu em outro contexto.

### Se houver sobreposição parcial entre capacidades independentes

Preserve fronteiras claras.

Extraia apenas a capacidade realmente distinta e, quando necessário, faça uma Skill utilizar a outra.

Não replique dentro da nova Skill o procedimento que já possui uma fonte canônica.

### Se nenhuma capacidade existente cobrir a necessidade

Somente então considere criar uma nova Skill, submetendo-a aos demais critérios de Skill Engineering.

> **Nova Skill é última etapa da análise, não resposta automática à descoberta de conhecimento útil.**

## Evite Fontes Concorrentes

Uma mesma capacidade operacional deve possuir uma fonte canônica.

Não mantenha duas Skills ensinando independentemente:

- o mesmo procedimento;
- os mesmos critérios de decisão;
- o mesmo contrato;
- a mesma política;
- a mesma resolução de problema.

Duplicação gera:

- divergência futura;
- triggering concorrente;
- manutenção duplicada;
- maior custo de contexto;
- incerteza sobre autoridade;
- crescimento artificial do catálogo.

Quando várias Skills precisarem da mesma capacidade, reutilize a Skill responsável por ela.

> **Compartilhamento de capacidade deve ocorrer por composição, não por cópia.**

## Skill Chama Skill

Conhecimento procedural condicional que constitui uma capacidade coerente e reutilizável deve preferencialmente existir como Skill própria.

Uma Skill pode reconhecer que outra capacidade especializada é necessária e orientar o agente a utilizá-la.

Conceitualmente:

```text
Skill A
↓
necessidade especializada
↓
Skill B
```

Não replique o conteúdo de `Skill B` dentro de `Skill A`.

A Skill chamadora deve preservar apenas:

- quando a outra capacidade é necessária;
- por que ela é necessária;
- qual resultado precisa receber dela, quando isso não for óbvio.

A Skill chamada permanece responsável pelo procedimento especializado.

## Defina uma Capacidade Coerente

Trate o escopo como uma responsabilidade de software.

Uma Skill deve representar uma capacidade coerente.

Una conteúdos quando eles:

- servem à mesma intenção;
- normalmente precisam estar ativos juntos;
- compartilham o mesmo contexto;
- evoluem pela mesma razão.

Separe quando partes relevantes:

- são acionadas por intenções diferentes;
- resolvem problemas independentes;
- evoluem por razões diferentes;
- possuem reutilização própria;
- raramente precisam estar presentes ao mesmo tempo.

Antes de dividir, verifique novamente se a capacidade candidata já existe em outra Skill.

> **Divida por capacidade, não por tamanho.**

Uma Skill longa e verdadeiramente coesa é preferível a várias micro-Skills artificiais.

## Construa a Partir de Evidência

Prefira conhecimento derivado de trabalho real.

Fontes fortes incluem:

- workflows que funcionaram;
- correções recorrentes;
- falhas reais;
- incidentes;
- feedback de revisão;
- contratos;
- rastros de execução;
- comportamento repetidamente desperdiçador;
- dificuldades observadas por agentes.

Extraia causas e padrões reutilizáveis.

Não transforme cada dificuldade observada em uma nova Skill.

Primeiro determine:

1. qual capacidade resolveria a causa;
2. se essa capacidade é reutilizável;
3. se ela já existe;
4. se deve evoluir uma Skill existente;
5. somente então, se uma nova Skill é necessária.

## Metadata é o Índice

Use somente:

```yaml
---
name:
description:
---
```

`name` identifica a capacidade.

`description` deve permitir que o sistema determine:

- o que a Skill faz;
- quando deve ser usada;
- fronteiras relevantes que evitem acionamento incorreto.

Projete `name` e `description` considerando também Skills vizinhas.

Duas descrições que disputam sistematicamente as mesmas situações podem revelar:

- fronteiras ruins;
- sobreposição de capacidades;
- decomposição inadequada;
- duplicação.

Não mantenha catálogos manuais quando a infraestrutura já fornece descoberta pelas próprias Skills.

## Preserve Alto Sinal

Para cada instrução, pergunte:

> Sem isto existe probabilidade materialmente maior de o agente agir incorretamente ou gastar trabalho evitável?

Se não, considere remover.

Priorize:

- restrições não óbvias;
- decisões que o modelo não inferiria confiavelmente;
- armadilhas reais;
- exceções relevantes;
- modos de falha;
- critérios discriminativos;
- peculiaridades do ambiente.

Evite transformar Skills em livros didáticos.

## Prefira Defaults a Menus

Quando várias alternativas forem possíveis, mas uma funcionar como bom padrão, forneça o padrão e indique quando desviar.

Não apresente múltiplas opções equivalentes sem necessidade.

Reduza entropia decisória.

## Conhecimento Volátil

Não congele fatos rapidamente mutáveis quando uma fonte autoritativa puder ser consultada durante a execução.

Preserve princípios estáveis e ensine quando a verdade atual precisa ser obtida novamente.

## Trabalho Determinístico

Quando uma tarefa possuir:

- entrada conhecida;
- saída conhecida;
- procedimento previsível;
- pouco julgamento;

questione se ela realmente precisa ser representada cognitivamente por uma Skill.

Não transforme automaticamente toda automação ou regra mecânica em procedimento agentic.

## Refatorações Devem Preservar Capacidade

Ao:

- reduzir uma Skill;
- dividir;
- combinar;
- renomear;
- adaptar para outra plataforma;
- alterar metadata;

distinga mudança estrutural de mudança comportamental.

Não elimine silenciosamente:

- contratos;
- critérios;
- conhecimento necessário;
- triggering;
- invariantes;
- capacidades indispensáveis.

Ao combinar ou dividir Skills, verifique também se:

- nenhuma capacidade ficou duplicada;
- nenhuma fonte concorrente foi criada;
- nenhuma capacidade existente foi reimplementada desnecessariamente.

## Avalie Valor Marginal

Para mudanças relevantes, pergunte qual ganho existe em relação ao baseline adequado:

- sem a Skill;
- com a versão anterior;
- ou utilizando uma Skill existente equivalente.

Avalie, quando fizer sentido:

- correção;
- confiabilidade;
- qualidade das decisões;
- redução de redescoberta;
- redução de trabalho desnecessário;
- custo de contexto;
- consistência;
- capacidade de concluir a tarefa.

Uma nova Skill não demonstra valor se apenas reproduzir capacidade já disponível em outra.

## Teste o Acionamento

Uma Skill precisa entrar nas situações corretas e permanecer fora das situações erradas.

Observe:

- casos positivos;
- near-misses;
- Skills vizinhas;
- possíveis conflitos de triggering.

Quando duas Skills forem frequentemente acionáveis para exatamente a mesma intenção, investigue sobreposição antes de tentar apenas ajustar suas descrições.

O problema pode estar na arquitetura das capacidades, não no triggering.

## Corrija Causas Gerais

Quando uma execução revelar falha:

1. determine por que o agente tomou a decisão incorreta;
2. identifique a capacidade ou critério ausente;
3. verifique se essa capacidade já existe;
4. determine se existe uma classe maior de falhas;
5. corrija a menor causa geral suficiente;
6. verifique casos relacionados.

Não adicione imediatamente uma nova Skill, nova proibição ou nova exceção para o exemplo específico.

## Critério de Conclusão

Uma Skill está bem projetada quando:

- sua existência possui justificativa real;
- nenhuma Skill existente já cobre integralmente sua capacidade;
- sobreposições parciais foram resolvidas conscientemente;
- existe uma fonte canônica para cada capacidade compartilhada;
- representa uma responsabilidade coerente;
- seu `name` e `description` permitem descoberta adequada;
- seu corpo contém apenas procedimento de alto sinal;
- capacidades condicionais independentes são reutilizadas em vez de copiadas;
- o comportamento generaliza além dos exemplos que originaram a Skill;
- ela produz ganho material de capacidade ou confiabilidade;
- seu tamanho é proporcional ao valor produzido.

## Regra Final

> Antes de criar uma Skill, procure a capacidade. Se ela já existir, reutilize, chame ou evolua sua fonte canônica. Crie uma nova Skill somente quando houver capacidade reutilizável, coerente e materialmente distinta. Otimize o sistema para capacidade, não para quantidade de Skills.
