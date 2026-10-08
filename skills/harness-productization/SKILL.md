---
name: harness-productization
description: Use quando uma Harness Improvement Opportunity já tiver sido identificada e for necessário decidir em que produto de Harness transformar a capacidade ausente, como documentação, Skill, ferramenta, teste, guardrail, mapa, observabilidade, eval ou automação, e qual grau de pavimentação é proporcional. Não use para decidir se existe uma oportunidade de Harness nem para avaliar se uma capacidade existente deve ser removida por obsolescência.
---

# Harness Productization

## Finalidade

Esta Skill define como transformar uma **capacidade reutilizável já identificada** em um produto concreto de Harness.

Seu objetivo é responder:

> **Qual representação retira do agente a quantidade adequada de trabalho futuro com o menor custo proporcional de contexto, complexidade e manutenção?**

Esta Skill começa depois que a necessidade de uma capacidade já foi estabelecida.

Ela não decide se determinada dificuldade merece Harness Improvement.

## Comece pela Capacidade, não pelo Produto

Não comece perguntando:

> Devemos criar uma Skill?

Comece perguntando:

> **O que o ambiente deveria ser capaz de fornecer, executar, observar, verificar ou impedir?**

Transforme:

```text
dificuldade
↓
capacidade ausente
↓
produto adequado
```

Exemplo:

```text
agente reconstrói repetidamente uma sequência operacional
↓
capacidade ausente: execução determinística
↓
produto provável: script ou ferramenta
```

Outro:

```text
agentes violam repetidamente uma fronteira arquitetural
↓
capacidade ausente: detecção automática
↓
produto provável: lint ou structural test
```

## Classes de Produto

Use como heurística:

|Capacidade necessária|Produto provável|
|---|---|
|Conhecimento estável|documentação / referência|
|Procedimento com julgamento|Skill|
|Execução determinística|script / ferramenta|
|Comportamento que deve permanecer correto|teste|
|Bug que não deve retornar|teste de regressão|
|Regra estrutural|lint / structural test|
|Violação que deve ser impedida|guardrail / hook|
|Estrutura difícil de descobrir|mapa / índice|
|Estado difícil de observar|observabilidade|
|Comportamento agentic|eval|
|Degradação recorrente|scanner / automação / manutenção|

A matriz orienta.

Não aplique mecanicamente.

## Quando Escolher uma Skill

Prefira Skill quando a capacidade:

- exige julgamento;
- possui critérios de decisão;
- depende do contexto;
- representa um procedimento recorrente;
- contém conhecimento procedural não óbvio;
- beneficia-se de composição com outras capacidades agentic.

Não transforme operação determinística em Skill apenas porque o agente consegue executá-la.

Quando uma Skill for escolhida como representação, utilize `skill-engineering` para decidir escopo, granularidade, triggering e não duplicação. Não replique aqui o projeto interno de Skills.

Quando computação puder realizar o trabalho diretamente, considere ferramenta.

## Trabalho Determinístico

Quando houver:

- entradas conhecidas;
- saídas conhecidas;
- processo previsível;
- julgamento insignificante;

prefira execução determinística.

> **Não pague repetidamente em tokens por aquilo que pode ser executado por computação.**

Uma Skill pode decidir **quando** utilizar uma ferramenta.

A ferramenta deve realizar o trabalho que não exige raciocínio.

## Conhecimento Estável

Documentação é produto legítimo quando conhecimento:

- foi caro de descobrir;
- permanece verdadeiro;
- possui reutilização real;
- reduz investigação futura.

Prefira conhecimento derivado automaticamente quando a informação já existe em outra fonte de verdade.

Não mantenha documentação manual que apenas copie estrutura derivável do sistema.

## Comportamento e Regras

Quando a capacidade necessária for:

> **esta propriedade precisa continuar verdadeira**

considere teste.

Quando for:

> **esta violação precisa ser detectada ou impedida**

considere:

- lint;
- structural test;
- guardrail;
- hook;
- outro mecanismo executável.

Quanto mais crítica e recorrente for uma regra, menos ela deveria depender apenas de memória textual.

## Grau de Pavimentação

O Grau de Pavimentação representa quanto trabalho futuro foi retirado do agente.

### Nível 0 — Descoberto

A solução foi encontrada, mas continua apenas no contexto atual.

Agentes futuros precisam redescobrir.

### Nível 1 — Descobrível

A capacidade foi externalizada para consulta.

Exemplos:

- documentação;
- referência;
- mapa.

### Nível 2 — Procedimental

O caminho foi estruturado como capacidade agentic.

Exemplo:

- Skill.

### Nível 3 — Executável

O trabalho virou capacidade pronta.

Exemplos:

- script;
- comando;
- ferramenta.

### Nível 4 — Verificável

O ambiente consegue demonstrar se determinada propriedade continua verdadeira.

Exemplos:

- testes;
- evals;
- validações automatizadas.

### Nível 5 — Enforced

O ambiente detecta ou impede automaticamente caminhos proibidos.

Exemplos:

- lint;
- structural test;
- guardrail;
- hook.

### Nível 6 — Automanutenível

O ambiente detecta deterioração e inicia manutenção.

Exemplos:

- scanner;
- regeneração;
- verificação recorrente;
- agente de manutenção.

## O Grau não é uma Escada

Uma capacidade não precisa atravessar todos os níveis.

Pode ir diretamente:

```text
regra descoberta
→ structural test
```

ou:

```text
procedimento manual
→ ferramenta
```

Escolha diretamente a força adequada.

O objetivo não é avançar níveis.

É retirar trabalho futuro suficiente.

## Escolha Proporcional

Considere:

- frequência;
- custo cognitivo;
- criticidade;
- risco de regressão;
- dificuldade de detectar falha;
- facilidade de automatização;
- reutilização;
- custo de contexto;
- custo de manutenção.

Como heurística:

```text
raro + baixo risco
→ documentação pode bastar

frequente + julgamento
→ Skill

frequente + determinístico
→ ferramenta

comportamento importante
→ teste

regra crítica
→ enforcement

entropia recorrente
→ manutenção automatizada
```

## Promoção

Fortaleça uma capacidade quando a representação atual continuar produzindo custo ou erro.

Exemplos:

```text
documentação
→ Skill

Skill
→ ferramenta

regra textual
→ lint

mapa manual
→ representação derivada
```

Promova por evidência.

Não por preferência por automação.

## Caminho Correto

Um Harness forte não apenas explica o que é correto.

Ele reduz o custo de fazer o correto.

Quando proporcional:

- ofereça defaults seguros;
- automatize preparação;
- forneça operações prontas;
- aproxime feedback da ação;
- derive informação automaticamente;
- detecte violações importantes;
- impeça violações críticas.

> **O caminho correto deve tender a ser o caminho mais fácil.**

## Progressive Disclosure

Quando o problema de produtização envolver principalmente:

- descoberta;
- contexto;
- carregamento condicional;
- organização de capacidades;
- composição entre Skills;
- redução de conteúdo ativo;

utilize a Skill `progressive-disclosure`.

Esta Skill escolhe **o produto e sua força**.

`progressive-disclosure` determina **como revelar a capacidade somente quando necessária**.

## Simplificação e Remoção

Esta Skill trata principalmente de criar ou fortalecer capacidade.

Quando a questão for se uma peça de Harness existente:

- ficou redundante;
- tornou-se obsoleta;
- custa mais do que entrega;
- deveria ser simplificada ou removida;

utilize `harness-ablation`.

## Critério Econômico

Considere qualitativamente:

```text
valor esperado =
frequência
× custo evitado
× impacto
× reutilização
```

contra:

```text
custo =
criação
+ manutenção
+ complexidade
+ contexto
```

Não é necessário calcular numericamente.

O modelo serve para evitar infraestrutura cujo custo seja maior que o problema resolvido.

## Anti-Padrões

Evite:

**Produto antes da capacidade**

Escolher Skill, ferramenta ou documento antes de compreender o que falta.

**Skill para tudo**

Transformar trabalho determinístico em procedimento agentic.

**Automação prematura**

Criar infraestrutura para ocorrência acidental.

**Texto crítico eterno**

Manter regra importante apenas como orientação quando enforcement proporcional já se justifica.

**Pavimentação máxima**

Escolher sempre o nível mais forte independentemente de custo.

**Representações acumuladas**

Manter documento, Skill, script e regra antiga quando uma representação superior já substitui as anteriores.

## Critério de Conclusão

A produtização está suficientemente definida quando:

- a capacidade ausente está clara;
- o produto corresponde à natureza dessa capacidade;
- o Grau de Pavimentação é proporcional;
- não existe produto equivalente melhor;
- trabalho determinístico foi retirado do agente quando apropriado;
- o custo de manutenção é justificável;
- a representação escolhida preserva uma fonte de verdade clara.

## Regra Final

> **Comece pela capacidade ausente. Escolha a representação mais simples suficientemente forte para externalizá-la, retire do agente trabalho repetitivo sempre que isso gerar ganho líquido e pavimente apenas até o ponto em que capacidade adicional continue pagando por sua própria complexidade.**
