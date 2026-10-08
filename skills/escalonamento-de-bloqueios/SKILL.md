---
name: escalonamento-de-bloqueios
description: Use durante uma implementação quando o agente deixar de conseguir avançar produtivamente dentro de sua autonomia, quando novas tentativas deixarem de reduzir incerteza ou quando prosseguir exigir decisão arquitetural, contexto essencial ou revisão do Plano. Orienta quando continuar investigando e quando interromper e escalar ao Arquiteto. Não use para dificuldades táticas normais que ainda possuam estratégias materialmente diferentes de investigação.
---

# Escalonamento de Bloqueios

## Finalidade

Esta Skill define quando o Implementador deve continuar investigando uma dificuldade e quando deve interromper a execução e escalá-la ao Arquiteto.

Seu objetivo é:

> **evitar tanto a escalada prematura quanto o desperdício causado por investigação que deixou de produzir nova informação.**

O Implementador possui autonomia para resolver problemas táticos dentro das fronteiras definidas pelo Plano.

Escalone somente quando essa autonomia deixar de ser suficiente.

## Progresso Informativo

Continue investigando enquanto cada nova tentativa:

- utilizar nova evidência;
- testar hipótese materialmente diferente;
- eliminar possibilidade relevante;
- esclarecer causa;
- reduzir incerteza;
- produzir informação capaz de orientar a próxima ação.

Não utilize quantidade fixa de tentativas.

O critério é informacional.

> **Enquanto a investigação reduz incerteza, ela continua sendo trabalho produtivo.**

## Sinais de Estagnação

Considere que a investigação deixou de produzir progresso quando:

- as mesmas hipóteses começam a se repetir;
- novas tentativas reproduzem mecanismos já utilizados;
- não surge nova evidência relevante;
- alterações sucessivas não aproximam o diagnóstico;
- não existe estratégia materialmente diferente dentro da autonomia disponível;
- continuar depende de informação que o Implementador não possui;
- uma premissa relevante do Plano mostrou-se falsa;
- avançar exigiria decisão arquitetural não autorizada.

Estagnação não significa necessariamente que muitas tentativas ocorreram.

Uma única descoberta pode demonstrar imediatamente que o problema pertence ao Arquiteto.

## Dificuldade não é Bloqueio

Não escale apenas porque:

- uma implementação ficou difícil;
- um teste falhou;
- ocorreu erro de compilação;
- existe incompatibilidade local;
- uma abordagem inicial não funcionou;
- é necessário investigar o código;
- uma adaptação tática precisa ser realizada.

Enquanto existir estratégia razoável e materialmente diferente dentro das fronteiras do Plano, continue.

O Implementador deve exercer sua autonomia antes de escalar.

## Existe Bloqueio Quando

Considere escalada quando o avanço seguro exigir algo fora da autonomia concedida, como:

- decisão arquitetural;
- alteração de contrato;
- alteração de fronteira;
- mudança relevante de responsabilidade;
- revisão de protocolo;
- mudança de persistência;
- mudança relevante de comportamento público;
- revisão de premissa estrutural do Plano;
- informação indispensável que não pode ser obtida com os recursos disponíveis;
- decisão entre alternativas cujo impacto ultrapassa implementação local.

Também existe bloqueio quando a investigação tecnicamente possível deixou de produzir progresso informativo.

## Caminho Crítico

Determine se o bloqueio impede trabalho dependente.

### Fora do caminho crítico

Quando houver trabalho independente:

- preserve o bloqueio;
- continue o trabalho que permaneça seguro;
- não altere decisões afetadas pelo bloqueio;
- reporte o problema posteriormente com seu estado atualizado.

### No caminho crítico

Quando o bloqueio impedir avanço seguro:

- interrompa a Unidade ou parte afetada;
- preserve todo trabalho válido;
- não improvise uma decisão arquitetural;
- represente o caminho afetado como:

**NÃO CONCLUÍDO — BLOQUEADO**

- transfira o bloqueio ao Arquiteto.

## Fronteira com Trabalho Futuro

Um bloqueio da implementação corrente **não se transforma automaticamente em Work Item**. Enquanto a Unidade pertence à execução atual, preserve seu estado e use `blockage-handoff` para a decisão ou informação fora da autonomia. Trabalho independente que pode continuar no mesmo Plano não exige novo registro durável apenas porque outra parte ficou bloqueada.

Somente quando houver decisão de retirar trabalho material do fluxo atual e delegá-lo para execução futura **autocontida e suficientemente definida**, utilize `continuum-work-items` para avaliar se merece persistência. Se ainda faltar uma decisão arquitetural indispensável à executabilidade, preserve o bloqueio como bloqueio; não o esconda em um Work Item.

## Produção do Handoff

Quando a decisão de escalar estiver tomada, utilize a Skill `blockage-handoff` para produzir o artefato de transferência.

Esta Skill determina **quando escalar**.

`blockage-handoff` determina **como representar e transferir o estado do bloqueio**.

Não replique aqui seu contrato.

## Preservação do Estado

Antes de escalar:

- mantenha alterações válidas;
- preserve provas já aprovadas;
- identifique claramente o último estado confiável;
- não reverta trabalho correto apenas porque uma parte posterior bloqueou;
- diferencie trabalho concluído de trabalho parcial;
- identifique o que depende da decisão pendente.

O objetivo é permitir que a execução seja retomada sem reconstrução desnecessária.

## Depois da Escalada

Não continue modificando a área bloqueada de forma especulativa.

Se existir trabalho independente, ele pode prosseguir.

Quando receber uma instrução de retomada:

- preserve o estado já válido;
- aplique somente as alterações necessárias;
- reexecute evidências que tenham sido materialmente invalidadas;
- retome a partir do ponto indicado.

Não reinicie a implementação do zero sem necessidade.

## Bloqueios Recorrentes

Quando o mesmo tipo de bloqueio surgir repetidamente, registre-o como possível oportunidade de melhoria do Harness.

Não amplie automaticamente o escopo atual para corrigir o Harness.

O trabalho atual continua sendo concluir a implementação.

## Anti-Padrões

Evite:

**Persistência improdutiva**

Continuar tentando apenas porque ainda é tecnicamente possível tentar algo.

**Escalada prematura**

Transferir ao Arquiteto problemas táticos normais.

**Arquitetura improvisada**

Alterar contratos ou fronteiras apenas para destravar a execução.

**Escalada sem estado**

Transferir uma dificuldade sem utilizar o contrato adequado de Handoff.

**Perda de progresso**

Reverter trabalho válido porque uma parte posterior bloqueou.

## Critério de Escalada

Escale quando simultaneamente:

1. o caminho afetado não puder avançar com segurança dentro da autonomia disponível; e
2. novas tentativas razoáveis não estiverem mais reduzindo a incerteza, ou a próxima decisão pertencer claramente ao Arquiteto.

## Regra Final

> **Investigue autonomamente enquanto novas ações produzirem informação. Quando o progresso informativo terminar ou a próxima decisão ultrapassar sua autonomia, preserve o trabalho válido e transfira o bloqueio ao Arquiteto usando o contrato especializado de Blockage Handoff.**
