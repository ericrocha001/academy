---
name: blockage-handoff
description: Use quando um bloqueio de implementação precisar ser transferido do Implementador ao Arquiteto de forma estruturada, preservando progresso, evidências, incerteza restante e decisão necessária. Define o contrato canônico do Blockage Handoff e pode ser usada tanto para produzi-lo quanto para interpretar ou validar um Handoff recebido. Não use para decidir quando escalar nem para resolver o bloqueio.
---

# Blockage Handoff

## Finalidade

Esta Skill define o contrato canônico utilizado para transferir um bloqueio de implementação entre Implementador e Arquiteto.

Seu objetivo é:

> **transferir estado suficiente para que o Arquiteto continue a investigação a partir do ponto alcançado, sem reconstruir a execução inteira.**

O Blockage Handoff não resolve o bloqueio.

Ele preserva e transfere:

**estado + evidência + incerteza restante + decisão necessária**

## Responsabilidades

Esta Skill responde:

> **O que precisa ser transferido entre os agentes?**

Ela não responde:

- quando o Implementador deve escalar;
- se ainda vale continuar investigando;
- como o Arquiteto deve resolver o bloqueio;
- qual decisão arquitetural deve ser tomada.

Essas responsabilidades pertencem às Skills especializadas de escalonamento e resolução de bloqueios.

## Princípio Fundamental

Um Handoff deve permitir que o próximo agente:

- saiba o que já foi concluído;
- preserve evidências já obtidas;
- evite repetir hipóteses descartadas;
- identifique exatamente onde o trabalho parou;
- compreenda qual incerteza permanece;
- saiba qual decisão ou informação é necessária.

Não transfira a sessão.

Transfira o **estado útil da investigação**.

## Estado de Conclusão

Quando o bloqueio impedir avanço seguro no caminho afetado, represente explicitamente:

**NÃO CONCLUÍDO — BLOQUEADO**

Não apresente trabalho bloqueado como concluído.

## Conteúdo do Handoff

Inclua somente os campos aplicáveis.

### Progresso concluído

O que já foi implementado ou validado e continua aproveitável.

### Ponto bloqueado

Unidade, etapa, componente ou decisão em que o avanço parou.

### Comportamento esperado

O que deveria acontecer segundo Plano, contrato ou comportamento pretendido.

### Comportamento observado

O que efetivamente ocorreu.

### Evidências confirmadas

Fatos demonstrados por código, execução, testes, documentação, ambiente ou outra fonte confiável.

### Hipóteses descartadas

Hipóteses relevantes já investigadas e rejeitadas por evidência.

### Tentativas materialmente diferentes

Somente estratégias que acrescentaram informação relevante.

Não liste repetições equivalentes.

### Diagnóstico atual

A melhor descrição factual do problema no estado atual.

Separe diagnóstico confirmado de hipótese ainda aberta.

### Informação ausente

Contexto ou evidência indispensável que ainda não está disponível, quando houver.

### Decisão solicitada

A decisão arquitetural, esclarecimento ou intervenção necessária para permitir a retomada.

### Trabalho pendente

O que ainda precisa ser realizado depois que o bloqueio for resolvido.

## Fato e Hipótese

Diferencie explicitamente quando houver risco de confusão:

**Fato confirmado**

Evidência já demonstrada.

**Hipótese aberta**

Explicação ainda não comprovada.

Não apresente inferência como evidência.

## Decisão Solicitada

Quando possível, formule a menor decisão capaz de destravar a execução.

Evite:

> Não consegui continuar.

Prefira:

> A evidência X contradiz a premissa Y do Plano. Precisamos decidir se o contrato Y permanece obrigatório ou se a arquitetura deve ser ajustada para Z.

O Handoff deve reduzir o problema à menor incerteza restante possível.

## Preserve Trabalho e Evidência

Não descarte progresso válido apenas porque uma etapa posterior bloqueou.

Identifique:

- o último estado confiável;
- provas que continuam válidas;
- partes da implementação que não dependem da decisão;
- evidências que podem ser reutilizadas após a retomada.

O objetivo é evitar reconstrução.

## O que Não Incluir

Não inclua por padrão:

- cadeia de raciocínio;
- diário cronológico;
- todas as tentativas realizadas;
- logs completos;
- todos os comandos executados;
- dumps extensos de código;
- contexto sem relação com a decisão;
- hipóteses descartadas irrelevantes.

Inclua evidência extensa somente quando ela for necessária para sustentar o bloqueio.

## Forma

Não imponha template rígido.

Use somente as seções necessárias para preservar o contrato.

O Handoff deve ser compacto, mas suficientemente completo para permitir continuidade segura.

## Consumo do Handoff

Ao receber um Blockage Handoff:

- trate progresso confirmado como estado acumulado;
- preserve evidências enquanto suas premissas continuarem válidas;
- não reabra hipóteses descartadas sem nova razão;
- identifique a incerteza restante;
- solicite contexto adicional somente quando puder alterar a decisão.

O Handoff é ponto de continuidade, não convite para reiniciar a investigação.

## Critério de Qualidade

Um Blockage Handoff é suficiente quando o consumidor consegue responder:

1. O que já está concluído?
2. Onde exatamente o trabalho bloqueou?
3. O que esperávamos?
4. O que observamos?
5. O que já sabemos com evidência?
6. O que já foi descartado?
7. Qual incerteza permanece?
8. Qual decisão ou informação é necessária?
9. O que poderá continuar depois da resolução?

Se essas respostas relevantes estiverem disponíveis, não acrescente contexto apenas por completude.

## Regra Final

> **Transfira o estado da investigação, não seu histórico. Preserve progresso e evidência, descarte repetição, separe fatos de hipóteses e reduza o bloqueio à menor incerteza ou decisão necessária para permitir a retomada.**
