---
name: surgical-evals
description: Use quando for necessário avaliar objetivamente comportamento agentic ou uma mudança de Harness, como Skills, prompts, triggering, procedimentos, seleção de contexto, Progressive Disclosure, uso de ferramentas ou estratégias de agentes. Projeta a menor eval capaz de responder uma decisão real, comparar baseline quando útil e detectar regressões sem criar suites excessivas. Não use para validar propriedades do software implementado; isso pertence à validação de implementações.
---

# Surgical Evals

## Finalidade

Esta Skill define como avaliar comportamento agentic e mudanças no Harness com a menor quantidade de evidência capaz de sustentar uma decisão.

Seu objetivo não é maximizar cobertura de evals.

Seu objetivo é:

> **produzir a menor avaliação capaz de revelar se uma deficiência relevante diminuiu, desapareceu ou regrediu.**

Eval existe para responder uma pergunta.

Não para produzir métricas por obrigação.

## Fronteira

Esta Skill avalia propriedades de:

- Skills;
- prompts;
- procedimentos agentic;
- triggering;
- seleção de contexto;
- Progressive Disclosure;
- uso de ferramentas;
- estratégias de agentes;
- mudanças de Harness;
- comportamento agentic reutilizável.

Ela não valida propriedades do software produzido, como:

- comportamento da aplicação;
- integração;
- persistência;
- contratos de runtime;
- interface;
- performance do produto;
- regressões funcionais da implementação.

Essas propriedades pertencem à Skill `validacao-de-implementacoes`.

> **Software é validado. Comportamento agentic é avaliado.**

## Comece pela Deficiência

Não comece perguntando:

> Que benchmark devemos executar?

Comece perguntando:

> **Qual comportamento inadequado motivou esta avaliação?**

Determine:

- qual deficiência foi observada;
- em quais condições ela aparece;
- por que ela importa;
- qual mudança pretende corrigi-la;
- qual comportamento deveria melhorar.

Sem deficiência ou propriedade identificável, uma eval tende a gerar dados sem decisão.

## Defina a Propriedade

Transforme a deficiência em uma propriedade observável.

Exemplos:

**Triggering**

A Skill entra quando necessária e permanece fora quando não é aplicável.

**Procedimento**

Quando ativada, a Skill conduz o agente pelas decisões relevantes sem orientação adicional indevida.

**Progressive Disclosure**

Contexto especializado é carregado somente quando necessário.

**Eficiência**

O agente evita investigação, contexto ou operações que a melhoria pretendia eliminar.

**Robustez**

A capacidade generaliza além dos exemplos utilizados em sua criação.

**Regressão**

Comportamento anteriormente protegido continua presente após uma mudança.

Avalie a propriedade que justificou a mudança.

Não a superfície inteira por obrigação.

## Pergunta Decisória

Antes de executar a eval, determine qual decisão seu resultado poderá alterar.

Exemplos:

- manter a mudança;
- revisar a Skill;
- estreitar ou ampliar `description`;
- remover uma instrução;
- promover um resource;
- simplificar um procedimento;
- manter ou remover uma capacidade de Harness.

Se nenhum resultado plausível puder alterar uma decisão, questione a utilidade da eval.

## Menor Eval Suficiente

Projete o menor conjunto de casos capaz de observar a propriedade.

Não comece com uma suite extensa.

Expanda somente quando:

- os resultados forem ambíguos;
- houver variabilidade relevante;
- uma classe importante ainda não estiver representada;
- o risco justificar evidência adicional.

> **Eval suficiente é melhor que benchmark ornamental.**

## Baseline

Quando útil, compare a mudança contra um baseline relevante.

Pode ser:

- sem a Skill;
- versão anterior da Skill;
- comportamento anterior do Harness;
- procedimento antigo;
- caso documentado de falha.

Compare:

```text
baseline
versus
candidate
```

somente quando isso ajudar a atribuir o ganho à mudança.

Não exija baseline perfeito quando ele não puder ser reproduzido razoavelmente.

## Quando Baseline Formal não Existe

Em sistemas agentic, modelos, prompts, ferramentas e plataformas podem mudar.

Quando comparação histórica perfeita não for possível, utilize evidência proporcional, como:

- falha anterior documentada;
- reprodução parcial;
- caso atual equivalente;
- comparação aproximada;
- observação operacional consistente;
- regressões preservadas.

Não transforme impossibilidade de experimento perfeito em impossibilidade de aprender.

## Triggering

Quando a propriedade envolver descoberta ou acionamento de uma Skill, avalie pelo menos três classes quando forem relevantes:

**Positivos**

Casos em que a Skill deveria ser acionada.

**Negativos**

Casos em que claramente não deveria.

**Near-misses**

Casos semanticamente próximos em que a distinção exige boa definição de fronteira.

Near-misses são especialmente valiosos para revelar `description` ampla demais ou estreita demais.

## Não Faça Overfitting

Quando um caso falhar, não copie suas palavras para a Skill apenas para fazê-lo passar.

Determine:

1. por que o comportamento falhou;
2. qual conceito ou critério estava ausente;
3. se a causa representa uma classe mais ampla;
4. qual é a menor correção geral suficiente.

Depois da correção, verifique:

- o caso original;
- casos semelhantes;
- pelo menos algum caso diferente governado pela mesma regra quando isso for relevante.

Corrija a causa.

Não memorize o benchmark.

## Avaliação Procedural

Para procedimentos agentic, não observe apenas a resposta final.

Quando relevante, observe também se o agente:

- tomou decisões adequadas;
- carregou apenas contexto necessário;
- utilizou resources corretos;
- evitou resources irrelevantes;
- reduziu investigação repetitiva;
- preservou autonomia apropriada;
- evitou etapas redundantes;
- concluiu sem reconstruir conhecimento que o Harness deveria fornecer.

Um resultado correto produzido por trajetória instável ou excessivamente cara ainda pode revelar deficiência.

## Progressive Disclosure

Quando a mudança envolve carregamento progressivo, avalie seleção, não apenas quantidade.

Exemplo conceitual:

```text
Caso A
→ SKILL.md é suficiente
→ nenhum resource

Caso B
→ resource X é necessário
→ X é carregado

Caso C
→ X é relevante
→ Y existe, mas permanece fora
```

A propriedade é:

> **o contexto certo entra quando necessário e permanece fora quando não é necessário.**

Contagem de tokens pode complementar essa observação.

Não substituí-la.

## Critério de Aprovação

Defina antes da execução o que caracterizará sucesso suficiente.

Não altere o critério apenas porque o resultado da candidate ficou abaixo do esperado.

Critérios podem ser:

- todos os casos críticos corretos;
- ausência de falsos positivos em near-misses relevantes;
- eliminação de determinada falha;
- redução observável de investigação;
- preservação de regressões;
- melhoria clara sobre baseline.

Utilize critérios proporcionais à propriedade.

## Comportamento Estocástico

Modelos podem variar entre execuções.

Não transforme isso automaticamente em dezenas de repetições.

Repita quando:

- a variabilidade puder mudar a decisão;
- um caso crítico estiver instável;
- o resultado observado for ambíguo.

Casos claros não precisam de repetição ritualística.

## Evidência Qualitativa e Quantitativa

Use medição objetiva quando a propriedade for objetivamente mensurável.

Exemplos:

- acionou ou não;
- abriu resource correto;
- concluiu ou não;
- quantidade de tentativas;
- contexto consumido;
- taxa de sucesso.

Use julgamento quando a propriedade depender legitimamente de qualidade sem métrica direta.

Não invente números apenas para aparentar rigor.

## Valor Marginal

Uma eval de Harness deve tentar responder:

> **A capacidade ficou materialmente melhor por causa da mudança?**

Procure ganho onde a deficiência existia.

Uma mudança não precisa melhorar todas as dimensões simultaneamente.

Se uma Skill foi criada para melhorar triggering, seu valor deve aparecer principalmente ali.

Se foi criada para reduzir redescoberta, observe redescoberta.

## Resultados que Não Discriminam

Se baseline e candidate apresentam o mesmo comportamento, a eval não demonstrou valor marginal da mudança.

Isso pode significar:

- a mudança é redundante;
- o caso não discrimina;
- o modelo já possui a capacidade;
- a propriedade escolhida não corresponde à finalidade real.

Não responda automaticamente adicionando mais instruções.

## Regressões

Depois de uma correção, preserve casos que protejam propriedades realmente valiosas.

Não transforme todo exemplo de desenvolvimento em regressão permanente.

Preserve especialmente:

- falhas significativas;
- fronteiras difíceis;
- near-misses relevantes;
- contratos agentic importantes;
- comportamentos que já regrediram.

## Relação com Skill Engineering

`skill-engineering` decide:

- se uma Skill deve existir;
- qual sua responsabilidade;
- como estruturá-la;
- o que pertence a metadata, `SKILL.md` e resources.

Quando for necessário demonstrar:

- triggering;
- valor marginal;
- qualidade procedural;
- Progressive Disclosure;
- preservação de comportamento;

utilize esta Skill.

Não duplique metodologia de avaliação dentro de Skill Engineering.

## Relação com Harness Improvement

`harness-improvement` decide:

- se existe deficiência reutilizável;
- qual capacidade deveria existir;
- se fortalecer a capacidade de Harness produziria ganho líquido;
- quando encaminhar uma capacidade qualificada a `harness-productization` para decidir sua representação, ou a `harness-ablation` para avaliar uma peça existente.

Quando essa decisão depender de observar comportamento agentic antes e depois de uma mudança, utilize esta Skill.

Não duplique metodologia de eval dentro de Harness Improvement.

## Quando Não Criar uma Eval

Não crie eval adicional quando:

- a propriedade já possui prova suficiente;
- a mudança é trivial e determinística;
- não existe deficiência relevante;
- o resultado não alterará decisão alguma;
- a propriedade pode ser verificada por mecanismo mais simples;
- o custo da eval excede claramente o risco protegido.

Eval é instrumento de decisão.

Não etapa obrigatória.

## Automatização

Considere automatizar uma eval quando:

- ela será executada repetidamente;
- protege comportamento valioso;
- seus critérios são suficientemente objetivos;
- o custo manual começa a se repetir;
- regressões precisam ser detectadas ao longo do tempo.

Não automatize prematuramente casos exploratórios cuja propriedade ainda está sendo compreendida.

## Forma da Eval

Não imponha template rígido.

Quando útil, registre de forma compacta:

**Propriedade**

O que está sendo avaliado.

**Deficiência**

Qual problema motivou a eval.

**Baseline**

Quando aplicável.

**Candidate**

Qual mudança está sendo avaliada.

**Casos**

O menor conjunto necessário.

**Critério**

O que constitui sucesso.

**Resultado**

O que foi observado.

**Decisão**

O que a evidência sustenta fazer.

## Regra de Parada

Pare quando houver evidência suficiente para tomar a decisão relevante.

Não continue executando casos apenas para aumentar volume de dados.

Se o resultado estiver claro, a eval terminou.

## Anti-Padrões

Evite:

**Benchmark sem deficiência**

Medir sem saber qual problema está sendo investigado.

**Suite por obrigação**

Executar muitos casos apenas para aparentar rigor.

**Positive-only triggering**

Testar apenas casos que deveriam acionar.

**Overfitting**

Corrigir exemplos em vez de causas.

**Baseline obrigatório**

Bloquear aprendizado porque comparação perfeita não existe.

**Quantificação artificial**

Criar métricas sem relação com a decisão.

**Confundir eval com validação**

Avaliar agente quando a propriedade real pertence ao software.

**Eval eterna**

Continuar depois que já existe evidência suficiente.

## Critério de Conclusão

Uma Surgical Eval termina quando:

- a propriedade está claramente definida;
- os casos utilizados conseguem observá-la;
- existe evidência suficiente;
- ambiguidades relevantes foram reduzidas;
- o resultado sustenta uma decisão;
- não há necessidade proporcional de executar mais casos.

## Regra Final

> **Comece pela deficiência, converta-a em propriedade observável e projete a menor eval capaz de mudar uma decisão. Compare baseline quando isso realmente discriminar valor, teste fronteiras quando elas importarem, corrija causas em vez de exemplos e pare assim que houver evidência suficiente.**
