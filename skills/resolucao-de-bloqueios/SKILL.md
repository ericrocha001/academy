---
name: resolucao-de-bloqueios
description: Use quando o Arquiteto receber um Blockage Handoff de uma implementação em andamento e precisar resolver contexto ausente, premissa falsa, conflito, decisão arquitetural ou ajuste localizado do Plano para permitir a retomada. Orienta como preservar evidências e trabalho já realizados, adquirir apenas contexto adicional necessário e produzir uma instrução de retomada. Não use para investigação arquitetural inicial ou dificuldades táticas ainda pertencentes ao Implementador.
---

# Resolução de Bloqueios

## Finalidade

Esta Skill define como o Arquiteto deve resolver um bloqueio recebido durante a execução de um Plano.

Seu objetivo é:

> **resolver a menor incerteza arquitetural necessária para recolocar a implementação em movimento sem reconstruir trabalho já realizado.**

Um bloqueio abre uma intervenção localizada sobre um Plano existente.

Não reinicia automaticamente o planejamento.

## Consuma Primeiro o Handoff

Ao receber o bloqueio, utilize a Skill `blockage-handoff` como contrato autoritativo para interpretar o estado transferido.

Esta Skill determina **como resolver o bloqueio**.

`blockage-handoff` determina **como o estado, a evidência e a incerteza são representados e transferidos**.

Não redefina seu contrato aqui.

## Comece pelo Estado Recebido

Depois de compreender o Handoff, determine:

- o que já foi concluído;
- o que já foi validado;
- qual parte está bloqueada;
- quais fatos estão confirmados;
- quais hipóteses já foram descartadas;
- qual diagnóstico permanece aberto;
- qual decisão foi solicitada.

Trate o Handoff como estado acumulado de uma investigação.

Não recomece do zero.

## Preserve Evidência

Não mande repetir uma hipótese descartada apenas por precaução.

Reabra uma hipótese somente quando existir:

- nova evidência;
- inconsistência relevante no Handoff;
- premissa diferente;
- erro identificável na investigação anterior.

Resultados já demonstrados devem permanecer como conhecimento válido enquanto suas premissas continuarem válidas.

## Identifique a Incerteza Restante

Reduza o bloqueio à menor pergunta que impede a retomada.

Pergunte:

> **Qual decisão, informação ou premissa ainda precisa ser resolvida para que o Implementador possa continuar?**

Não permita que um bloqueio localizado se transforme automaticamente em nova investigação global.

## Natureza do Bloqueio

Quando ajudar o diagnóstico, identifique sua natureza predominante.

Pode ser:

**Contexto insuficiente**

Falta informação verificável.

**Premissa falsa**

O Plano assumiu algo incompatível com o sistema real.

**Decisão arquitetural ausente**

Uma escolha estratégica não foi resolvida anteriormente.

**Conflito arquitetural**

Contratos, fronteiras ou invariantes entraram em conflito.

**Incerteza empírica**

A decisão depende de comportamento real ainda não observado.

**Impedimento externo**

A solução depende de capacidade ou condição fora do controle atual.

A classificação é ferramenta de raciocínio, não saída obrigatória.

## Adquira Contexto Progressivamente

O Blockage Handoff é o primeiro contexto.

Adquira informações adicionais somente quando elas puderem alterar a decisão restante.

Prefira a menor representação suficiente.

Não:

- releia todo o projeto;
- solicite arquivos apenas por proximidade;
- reconstrua todo o planejamento;
- peça novamente contexto já suficiente.

Pergunte:

> **Qual é a menor informação adicional capaz de resolver esta decisão?**

Pare quando houver evidência suficiente.

## Diagnóstico

Determine:

- qual premissa deixou de ser válida;
- qual decisão está realmente bloqueando;
- quais contratos continuam válidos;
- quais fronteiras permanecem intactas;
- quais partes do Plano continuam corretas;
- qual área foi realmente afetada;
- se a solução original continua executável.

Separe cuidadosamente:

**problema local**

de

**falha estrutural do Plano**.

## Menor Intervenção Suficiente

Resolva o bloqueio com a menor mudança arquitetural suficiente.

A resolução pode:

- esclarecer decisão existente;
- fornecer contexto faltante;
- substituir premissa falsa;
- escolher entre alternativas arquiteturais;
- ajustar contrato;
- alterar fronteira;
- modificar uma Unidade;
- reordenar trabalho;
- alterar dependência;
- corrigir escopo;
- exigir uma prova empírica antes de decidir.

Não redesenhe partes que continuam corretas.

> **Preserve tudo que ainda é válido.**

## Impacto no Plano

Quando houver alteração, explicite:

- o que mudou;
- por que mudou;
- o que continua válido;
- quais Unidades foram afetadas;
- quais Unidades permanecem intactas;
- se trabalho já realizado continua aproveitável;
- se alguma evidência anterior foi invalidada;
- qual é o novo ponto de retomada.

Não regenere o Plano inteiro quando um patch localizado for suficiente.

Se a premissa quebrada invalidar substancialmente a solução, produza uma revisão coerente do Plano afetado.

## Preservação do Trabalho

Priorize reutilizar tudo que permaneça correto.

Não exija:

- repetição de trabalho concluído;
- reconstrução de contexto;
- nova execução de provas ainda válidas;
- descarte de implementação saudável;
- retorno ao início da Unidade sem causa material.

Reexecute somente aquilo cuja premissa ou propriedade tenha sido alterada pela nova decisão.

## Quando Falta Evidência

Se ainda não houver informação suficiente para escolher uma solução:

- não invente a resposta;
- identifique exatamente a informação faltante;
- explique qual decisão depende dela;
- determine a menor observação ou experimento capaz de resolvê-la.

A saída pode continuar como bloqueada quando isso for a representação correta do estado.

## Fronteira com Trabalho Adiado

Uma implementação que depende de decisão indispensável ainda aberta **não está pronta para execução futura**. Mantenha explícitos a incerteza, a evidência ausente e o estado bloqueado; não publique Work Item apenas para encerrar a investigação corrente. A própria investigação pode ser delegada como trabalho futuro quando tiver pergunta, evidência esperada e conclusão verificável, sem declarar resolvido o bloqueio da implementação dependente.

Quando uma decisão separada retirar trabalho material da execução atual e ele já puder ser descrito com resultado, limites e provas suficientes para retomada por outro agente, use `continuum-work-items` para sua preservação. Não substitua o Blockage Handoff nem a decisão de retomada por esse registro.

## Instrução de Retomada

Quando o bloqueio estiver resolvido, produza uma instrução diretamente executável pelo Implementador.

Inclua somente quando relevante:

- diagnóstico confirmado;
- decisão arquitetural;
- alteração realizada no Plano;
- ponto de retomada;
- trabalho anterior que permanece válido;
- contratos e limites relevantes;
- novo trabalho necessário;
- propriedade que deverá ser demonstrada para confirmar a resolução.

A instrução deve responder:

> **O que mudou e o que o Implementador deve fazer agora?**

Não repita tudo que o Implementador já informou.

## Não Roube Autonomia Tática

A resolução do Arquiteto deve eliminar a incerteza arquitetural.

Ela não deve transformar a retomada em pseudocódigo.

Depois que a fronteira estratégica estiver novamente clara, devolva ao Implementador suas decisões táticas normais.

## Bloqueio como Sinal de Harness

Depois de resolver o trabalho atual, considere se o bloqueio revelou uma dificuldade recorrente que deveria ser externalizada no Harness.

Isso pode indicar:

- documentação ausente;
- Skill necessária;
- observabilidade insuficiente;
- validação difícil;
- operação manual recorrente;
- guardrail inexistente;
- contexto difícil de descobrir.

Não transforme automaticamente um incidente isolado em nova infraestrutura.

Utilize Harness Improvement quando houver sinal suficiente.

## Anti-Padrões

Evite:

**Reset investigativo**

Ignorar o Handoff e começar novamente.

**Repetição sem nova razão**

Mandar o Implementador repetir hipóteses descartadas.

**Contexto máximo**

Solicitar tudo que possa remotamente ser relevante.

**Redesign oportunista**

Aproveitar o bloqueio para alterar arquitetura não afetada.

**Patch sem diagnóstico**

Modificar o Plano sem compreender qual premissa falhou.

**Descarte de progresso**

Invalidar trabalho correto sem causa.

**Microgerenciamento**

Resolver também as decisões táticas que continuam pertencendo ao Implementador.

## Critério de Conclusão

A resolução termina quando:

- a incerteza bloqueadora estiver resolvida ou precisamente delimitada;
- a decisão arquitetural necessária estiver tomada;
- o impacto sobre o Plano estiver conhecido;
- trabalho e evidências ainda válidos estiverem preservados;
- o ponto de retomada estiver claro;
- nenhuma decisão arquitetural necessária permanecer escondida na instrução de retomada.

## Regra Final

> **Consuma o bloqueio como estado acumulado, preserve evidências e trabalho válidos, reduza o problema à menor decisão restante, adquira apenas o contexto necessário, faça a menor correção arquitetural suficiente e devolva ao Implementador uma retomada diretamente executável.**
