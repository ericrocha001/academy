---
name: harness-improvement
description: Avalie uma deficiência concreta ou suspeita do Harness (Skills, prompts, ferramentas, contexto, observabilidade ou guardrails) para decidir se fortalecer capacidade reutilizável traz ganho líquido. Pode ser acionada diretamente, sem triagem prévia obrigatória. Use harness-productization para escolher o produto, harness-ablation para questionar uma peça existente e capability-opportunity para registrar oportunidades gerais.
---

# Harness Improvement

## Finalidade

Harness Improvement transforma dificuldades relevantes encontradas pelos agentes em **capacidade reutilizável do ambiente**.

Seu objetivo é:

> **Tornar o trabalho futuro mais fácil, confiável e econômico sem acumular infraestrutura desnecessária.**

Uma execução difícil não deve produzir automaticamente novo Harness.

Quando houver valor real de reutilização, porém, a inteligência adquirida deve deixar o ambiente mais capaz.

## Definição de Harness

Harness é a infraestrutura cognitiva e operacional que aumenta a capacidade dos agentes.

Pode externalizar:

- conhecimento;
- procedimento;
- execução;
- descoberta;
- observabilidade;
- validação;
- enforcement;
- manutenção.

O Harness existe para que agentes futuros não precisem reconstruir repetidamente aquilo que o ambiente já pode saber, executar, observar, verificar ou impedir.

## Princípio Fundamental

Observe onde agentes gastam desnecessariamente:

- inteligência;
- contexto;
- tokens;
- tempo;
- tentativas;
- investigação;
- intervenção humana.

Pergunte:

> **Que capacidade ausente teria tornado esta classe de trabalho substancialmente mais fácil?**

Não comece escolhendo um artefato.

Comece identificando a capacidade ausente.

## Dificuldade é Sinal

Considere sinais como:

- investigação repetida;
- conhecimento caro de redescobrir;
- contexto excessivo;
- procedimento manual recorrente;
- dificuldade de encontrar informação;
- falta de feedback;
- falta de observabilidade;
- mesma regra sendo esquecida;
- mesma classe de erro reaparecendo;
- trabalho determinístico realizado cognitivamente;
- dependência recorrente de agente mais capaz;
- ciclos de tentativa evitáveis.

Esses sinais autorizam investigação.

Não autorizam automaticamente produtização.

## Não Confunda Harness Fraco com Modelo Fraco

Antes de aumentar a capacidade do modelo, verifique se a dificuldade foi causada por:

- contexto inadequado;
- conhecimento ausente;
- procedimento inexistente;
- ferramenta ausente;
- feedback insuficiente;
- falta de observabilidade;
- validação inadequada;
- trabalho determinístico executado cognitivamente;
- regra importante existente apenas em texto;
- planejamento que deixou complexidade incidental para execução.

Um modelo mais forte pode compensar um Harness fraco.

Isso não torna o Harness adequado.

## Preserve Raciocínio Inerente

Nem toda dificuldade deve ser pavimentada.

Algumas tarefas são:

- raras;
- altamente variáveis;
- estratégicas;
- dependentes de informação inédita;
- genuinamente difíceis;
- pouco reutilizáveis.

O objetivo é eliminar:

> **redescoberta e raciocínio repetitivo, não pensamento legítimo.**

## Harness Improvement Opportunity

Se a causa já foi qualificada como Harness por `capability-opportunity` ou por investigação direta, reutilize a evidência e avalie apenas o que ainda falta para a decisão. Não repita o gate geral nem exija uma etapa intermediária quando a deficiência do Harness já estiver clara.

Existe uma Harness Improvement Opportunity quando uma dificuldade revela uma capacidade reutilizável cuja externalização provavelmente produzirá ganho líquido futuro.

Determine:

**Dificuldade**

O que tornou o trabalho desnecessariamente difícil?

**Causa**

Por que isso aconteceu?

**Capacidade ausente**

O que o ambiente deveria fornecer, executar, observar, verificar ou impedir?

**Reutilização**

Essa capacidade provavelmente será necessária novamente?

**Valor**

O ganho esperado justifica criação e manutenção?

Se não houver capacidade reutilizável com valor real, não produtize.

## Recorrência Pode Ser Antecipada

Não é necessário esperar múltiplas ocorrências quando a recorrência for estruturalmente previsível.

Uma primeira experiência pode justificar melhoria quando, por exemplo:

- vários agentes precisarão da mesma capacidade;
- toda mudança daquela classe exigirá o mesmo procedimento;
- uma fronteira importante sempre precisará ser protegida;
- determinada informação será repetidamente necessária.

Avalie reutilização esperada, não apenas frequência passada.

## Escolha da Representação

Quando a oportunidade estiver confirmada e for necessário decidir:

- qual produto de Harness criar;
- qual força de pavimentação é proporcional;
- se deve ser Skill, ferramenta, teste, guardrail, mapa, observabilidade ou outro mecanismo;

utilize `harness-productization`.

Harness Improvement decide:

> **vale criar ou fortalecer capacidade?**

Harness Productization decide:

> **em que forma essa capacidade deve existir?**

Não replique aqui sua metodologia.

## Progressive Disclosure

Quando a melhoria envolver principalmente:

- descoberta;
- contexto;
- composição entre Skills;
- seleção de capacidades;
- aprofundamento progressivo;
- excesso de informação ativa;

utilize `progressive-disclosure`.

Harness Improvement identifica a deficiência.

Progressive Disclosure determina como revelar apenas a capacidade necessária no momento adequado.

Não replique aqui suas regras.

## Evals Agentic

Quando for necessário obter evidência sobre:

- Skill;
- prompt;
- triggering;
- procedimento agentic;
- seleção de contexto;
- Progressive Disclosure;
- estratégia de agente;
- outra mudança de Harness;

utilize `surgical-evals`.

Harness Improvement determina:

> **qual propriedade deveria melhorar.**

Surgical Evals determina:

> **como obter evidência suficiente para decidir se ela melhorou.**

Eval não é etapa obrigatória de toda melhoria.

## Simplificação e Remoção

Quando uma peça existente do Harness puder ter se tornado:

- redundante;
- obsoleta;
- excessiva;
- duplicada;
- cara em relação ao benefício;

utilize `harness-ablation`.

Harness Improvement não significa adicionar infraestrutura.

> **Um Harness melhor pode ser menor.**

## Fonte Única de Verdade

Antes de criar capacidade:

- procure equivalente existente;
- prefira melhorar a capacidade autoritativa;
- evite duplicação;
- derive automaticamente aquilo que puder ser derivado;
- não mantenha procedimentos concorrentes para a mesma responsabilidade.

Quando uma capacidade especializada já possuir Skill própria, utilize essa Skill em vez de reproduzir suas regras.

## Skills como Composição de Harness

Conhecimento procedural condicional deve preferencialmente ser composto por Skills especializadas.

Exemplo:

```text
harness-improvement
↓
oportunidade confirmada
↓
harness-productization
```

ou:

```text
harness-improvement
↓
mudança precisa de evidência agentic
↓
surgical-evals
```

Não transforme Harness Improvement em uma mega-Skill contendo todas as capacidades necessárias ao ciclo de vida do Harness.

## Validação do Ganho

Uma melhoria não está concluída porque um artefato foi criado.

Pergunte:

> **A capacidade real do agente ou do ambiente aumentou?**

O ganho esperado pode aparecer como:

- menos contexto;
- menos investigação;
- menos tentativas;
- menos erros;
- menor intervenção humana;
- maior autonomia;
- maior observabilidade;
- detecção automática;
- enforcement;
- maior confiabilidade.

Não invente métricas quando evidência qualitativa suficiente resolver a decisão.

## Não Regressão

Depois de aumentar capacidade, considere como evitar sua perda.

A proteção pode assumir formas como:

- teste;
- eval;
- CI;
- enforcement;
- freshness;
- geração derivada;
- monitoramento;
- versionamento.

Não crie proteção maior que o risco protegido.

## Papel do Implementador

O Implementador está em posição privilegiada para observar fricções reais.

Quando encontrar oportunidade relevante, registre de forma compacta:

**Dificuldade observada**

O que tornou a execução desnecessariamente difícil.

**Capacidade aparentemente ausente**

O que o ambiente poderia fornecer, executar, observar, verificar ou impedir.

**Produto provável**

Somente quando evidente.

**Ganho esperado**

Qual custo ou risco poderia diminuir.

O Implementador fornece:

> **evidência de campo.**

Não deve ampliar automaticamente o escopo para construir a melhoria.

## Papel do Arquiteto

O Arquiteto pode identificar oportunidades diretamente ou recebê-las da execução.

Cabe a ele:

- investigar a causa;
- determinar valor de reutilização;
- evitar duplicação;
- decidir se a oportunidade merece tratamento;
- acionar a capacidade especializada adequada;
- decidir se entra no escopo atual ou em trabalho posterior.

Uma oportunidade não autoriza scope creep.

## Critério Econômico

Considere qualitativamente:

**frequência × custo atual × impacto × reutilização**

contra:

**custo de criação + manutenção + contexto + complexidade**

A melhoria deve produzir ganho líquido de capacidade.

## Anti-Padrões

Evite:

**Harness cumulativo**

Adicionar sem reavaliar.

**Artefato como objetivo**

Medir sucesso pela criação do produto.

**Modelo caro como solução padrão**

Compensar Harness inadequado apenas aumentando capacidade do executor.

**Skill para trabalho determinístico**

Usar raciocínio onde ferramenta seria suficiente.

**Automação prematura**

Produtizar ocorrência acidental.

**Duplicação**

Criar outra fonte para capacidade já existente.

**Mega-Skill**

Internalizar capacidades especializadas que poderiam ser compostas.

**Eval por obrigação**

Medir sem pergunta decisória.

**Scope creep**

Implementar automaticamente toda oportunidade descoberta.

## Critério de Conclusão

Uma Harness Improvement Opportunity está suficientemente tratada quando:

1. a dificuldade foi compreendida;
2. a capacidade ausente foi identificada;
3. seu valor de reutilização foi avaliado;
4. foi decidido não agir ou produtizar;
5. quando necessário, a Skill especializada adequada foi utilizada;
6. existe evidência proporcional do ganho esperado;
7. proteção contra regressão foi considerada;
8. não foi introduzida duplicação desnecessária.

## Regra de Parada

Pare quando houver evidência suficiente para decidir:

- não produtizar;
- produtizar;
- fortalecer;
- preservar;
- simplificar;
- mover;
- remover.

Não transforme Harness Improvement em investigação ilimitada.

## Regra Final

> **Observe onde agentes gastam inteligência, contexto, tempo ou tentativas desnecessariamente. Descubra qual capacidade teria tornado aquela classe de trabalho mais fácil. Se houver valor real de reutilização, acione a capacidade especializada necessária para produtizar, organizar, avaliar ou simplificar essa melhoria, preservando fonte única de verdade e evitando complexidade que não pague pelo próprio custo.**
