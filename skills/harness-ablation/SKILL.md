---
name: harness-ablation
description: Use quando uma peça existente do Harness puder ter se tornado redundante, obsoleta, excessiva ou cara em relação ao benefício que ainda produz. Avalia se uma Skill, regra, prompt, etapa, ferramenta, validação, documento, guardrail ou outra capacidade deve ser mantida, simplificada, movida para outra camada ou removida. Não use para criar uma nova capacidade de Harness nem para remover algo apenas por preferência por minimalismo.
---

# Harness Ablation

## Finalidade

Esta Skill define como reduzir complexidade do Harness sem perder propriedades importantes.

Seu objetivo é:

> **preservar somente a infraestrutura que continua pagando pelo próprio custo.**

Harness não deve apenas adquirir capacidade.

Também deve:

- simplificar;
- consolidar;
- despromover;
- mover;
- remover.

Uma peça que foi útil no passado não possui direito permanente de continuar existindo.

## Princípio Fundamental

Para cada candidato à ablation, pergunte:

> **Se esta peça desaparecer, qual propriedade importante pode piorar?**

Se nenhuma propriedade relevante puder ser identificada, existe forte sinal de redundância.

Se existir uma propriedade protegida, determine se a peça ainda é necessária para preservá-la.

## Quando Investigar Ablation

Considere uma peça candidata quando:

- modelos passaram a executar naturalmente o comportamento;
- outra capacidade passou a fornecer a mesma proteção;
- existe sobreposição significativa;
- a Skill raramente é necessária;
- uma regra deixou de resolver problema real;
- uma etapa não altera decisões;
- contexto é carregado e quase nunca utilizado;
- uma ferramenta passou a garantir mecanicamente o mesmo contrato;
- nova arquitetura tornou o procedimento antigo redundante;
- custo de manutenção cresceu mais que o benefício;
- infraestrutura existe principalmente por legado.

Esses sinais autorizam investigação.

Não autorizam remoção imediata.

## O que Pode Ser Ablacionado

A unidade de análise pode ser:

- uma instrução;
- uma regra;
- uma seção de prompt;
- uma Skill;
- uma relação entre Skills;
- um documento;
- uma etapa de workflow;
- uma validação;
- uma eval;
- uma ferramenta;
- um agente especializado;
- um guardrail;
- um índice;
- uma automação;
- um mecanismo de contexto;
- outra capacidade de Harness.

Aplique ablation na menor unidade conceitual capaz de ser avaliada com clareza.

## Identifique a Propriedade Protegida

Antes de alterar a peça, determine:

- por que ela foi criada;
- qual deficiência original corrigia;
- qual propriedade pretendia preservar;
- se essa deficiência ainda existe;
- se outra capacidade agora protege a mesma propriedade.

Não remova algo sem saber o que potencialmente será perdido.

## Custo Atual

Considere o custo da peça em dimensões como:

- tokens;
- contexto;
- latência;
- complexidade cognitiva;
- manutenção;
- triggering desnecessário;
- coordenação;
- duplicação;
- superfície de erro;
- drift;
- dificuldade de evolução.

Uma capacidade pode continuar funcionando e ainda assim ter deixado de valer seu custo.

## Tipos de Resultado

A análise deve terminar preferencialmente em uma destas decisões:

### KEEP

A peça continua protegendo uma propriedade relevante com custo justificável.

### SIMPLIFY

A propriedade continua importante, mas pode ser preservada de forma mais simples.

### MOVE

A capacidade continua útil, porém está na camada errada e deve entrar apenas quando necessária.

### REMOVE

A peça não produz benefício relevante suficiente para justificar permanência.

Ablation não significa necessariamente exclusão.

Frequentemente significa **retirar complexidade da camada errada**.

## Simplificação

Simplificar pode significar:

```text
Skill grande
→ Skills menores e coerentes
```

```text
procedimento agentic
→ ferramenta determinística
```

```text
múltiplas regras
→ princípio único
```

```text
regra textual
→ enforcement
```

```text
etapa manual
→ automação
```

```text
capacidade sempre ativa
→ Skill especializada sob demanda
```

O objetivo é preservar a propriedade com menos custo.

## Progressive Disclosure como Ablation

Conteúdo não precisa ser inútil para sair da camada atual.

Uma instrução pode ser relevante apenas condicionalmente.

Nesse caso:

```text
sempre carregado
↓
capacidade especializada
↓
carregada somente quando necessária
```

Quando a questão for principalmente onde uma capacidade deve aparecer e quando deve ser carregada, utilize `progressive-disclosure`.

> **Remover do contexto permanente não significa remover do Harness.**

## Duplicação

Capacidades duplicadas são candidatas prioritárias.

Quando duas peças preservarem essencialmente a mesma propriedade:

1. determine qual é a fonte mais adequada;
2. identifique diferenças realmente necessárias;
3. consolide responsabilidade;
4. elimine fontes concorrentes.

Não mantenha duplicação apenas porque ambas funcionam.

Se a simplificação envolver divisão, combinação ou mudança de escopo de Skills, use `skill-engineering` para preservar as capacidades, seus gatilhos e a fonte canônica. A decisão KEEP/SIMPLIFY/MOVE/REMOVE permanece nesta Skill; a refatoração de Skills pertence à especialização.

Duplicação aumenta:

- drift;
- contexto;
- ambiguidades;
- manutenção.

## Evolução dos Modelos

Reavalie periodicamente instruções criadas para compensar limitações antigas dos modelos.

Pergunte:

> **O modelo atual ainda precisa dessa infraestrutura para preservar a propriedade?**

Não remova apenas porque o modelo parece mais capaz.

Observe comportamento relevante antes de decidir quando o risco justificar.

## Texto versus Garantia Mecânica

Quando uma propriedade que antes dependia de instrução textual passar a ser garantida por:

- ferramenta;
- tipo;
- lint;
- teste;
- guardrail;
- mecanismo estrutural;

investigue se a instrução textual ainda produz valor marginal.

Não mantenha duas proteções caras quando uma garantia mecânica já for suficiente.

## Isolamento da Mudança

Quando possível, altere uma variável conceitual por vez.

Isso facilita responder:

> O que mudou por causa desta remoção?

Não é necessário isolamento experimental perfeito.

É necessário rastreabilidade suficiente para uma decisão confiável.

Evite remover muitas peças relacionadas simultaneamente quando isso impedir diagnóstico de regressão.

## Evidência Proporcional

A força necessária da evidência depende de:

**risco × impacto × dificuldade de detectar regressão**

Mudança de baixo risco pode ser avaliada por observação simples.

Remoção de proteção crítica pode exigir evidência mais forte.

Não transforme toda ablation em benchmark formal.

## Quando Usar Surgical Evals

Quando a peça protege comportamento agentic e a remoção puder alterar:

- triggering;
- procedimento;
- uso de contexto;
- estratégia;
- qualidade de decisão;
- autonomia;

utilize `surgical-evals` para produzir a menor evidência capaz de sustentar a decisão.

Harness Ablation decide **o que está sendo questionado e qual propriedade pode ser perdida**.

Surgical Evals decide **como observar o comportamento suficientemente**.

## Relação com Harness Improvement

`harness-improvement` observa o sistema e identifica oportunidades de aumentar ou corrigir capacidade.

Use `harness-ablation` quando a oportunidade for predominantemente:

- reduzir;
- consolidar;
- despromover;
- mover;
- remover.

Harness Improvement não deve ser sinônimo de adicionar infraestrutura.

> **Um Harness melhor pode ser um Harness menor.**

## Relação com Harness Productization

Quando a ablation demonstrar que uma propriedade continua necessária, mas sua representação atual é inadequada, utilize `harness-productization` para escolher uma representação melhor.

Exemplo:

```text
procedimento textual redundante
↓
propriedade continua importante
↓
representação atual custa demais
↓
harness-productization
↓
guardrail mais simples
```

## Monitoramento Após Remoção

Algumas regressões só aparecem em uso real.

Quando necessário, após simplificar ou remover:

- observe ocorrências relevantes;
- preserve evidência de regressão;
- restaure ou reprojete a capacidade se a propriedade realmente piorar.

Não mantenha monitoramento indefinido sem necessidade.

## Anti-Padrões

Evite:

**Harness cumulativo**

Adicionar para sempre sem reavaliar.

**Minimalismo cego**

Remover apenas para reduzir tamanho.

**Ablation sem propriedade**

Excluir sem saber o que a peça protegia.

**Legacy preservation**

Manter porque sempre existiu.

**Benchmark excessivo**

Gastar mais para provar remoção do que a peça custa.

**Remoção em massa**

Alterar várias proteções simultaneamente sem capacidade de atribuir regressões.

**Confundir posição com utilidade**

Assumir que algo deve desaparecer apenas porque não deveria estar permanentemente ativo.

## Critério de Conclusão

A ablation termina quando:

- a propriedade originalmente protegida está identificada;
- o custo atual da peça foi considerado;
- existe evidência proporcional de seu valor ou redundância;
- foi possível decidir entre manter, simplificar, mover ou remover;
- fontes de verdade continuam claras;
- risco relevante de regressão foi tratado proporcionalmente.

## Regra de Parada

Pare quando houver evidência suficiente para decidir.

Não transforme ablation em busca por minimalismo perfeito.

## Regra Final

> **Harness deve acumular capacidade, não complexidade histórica. Preserve o que continua protegendo propriedades relevantes; simplifique, mova ou substitua o que puder fazê-lo com menor custo; e remova aquilo que deixou de justificar sua presença.**
