---
name: capability-readiness-design  
description: Projete ou refatore readiness de sistemas com inicialização, manutenção em background, filas, índices, caches ou enrichments quando consumidores estão esperando trabalho global que não precisam. Use para separar readiness, maintenance e quiescence; definir capacidades mínimas por consumidor; isolar falhas e trabalho caro; e evitar que operações simples dependam de full initialization ou global idle. Não use para otimização genérica de performance quando não houver dependência de readiness.
---

# Capability Readiness Design

## Finalidade

Use esta Skill quando uma operação estiver bloqueada esperando o sistema ficar "totalmente pronto", embora necessite apenas de parte dos dados ou capacidades disponíveis.

O objetivo é substituir dependências como:

**consumer → global ready → todo o sistema**

por:

**consumer → required capability → menor readiness suficiente**

Princípio central:

> Consumidores devem depender das propriedades de que realmente necessitam, não do estado global do produtor.

---

# Diferencie três conceitos

Antes de alterar código, separe explicitamente:

## Readiness

Quais propriedades precisam ser verdadeiras para um consumidor operar corretamente.

## Maintenance

Trabalho que repara, migra, reconcilia, atualiza ou enriquece o sistema.

## Quiescence

Estado momentâneo em que filas ou workers não possuem trabalho pendente.

Não trate esses conceitos como equivalentes.

Exemplos:

- `queue idle` não significa necessariamente `data ready`;
- `maintenance completed` não significa necessariamente `maintenance succeeded`;
- `full enrichment completed` não significa que uma leitura básica precisava esperar.

---

# Comece pelo consumidor

Para cada operação afetada, pergunte:

> Quais propriedades precisam estar verdadeiras para esta operação funcionar corretamente?

Liste somente dados realmente consumidos.

Exemplo:

**Repository discovery**

Consome:

- inventário de arquivos.

Não consome necessariamente:

- referências semânticas;
- token metadata;
- enriquecimento documental;
- resolução global;
- fila global ociosa.

A readiness deve refletir essa necessidade mínima.

---

# Nomeie capacidades semanticamente

Prefira capabilities que representem propriedades observáveis do sistema.

Exemplos conceituais:

- `FILE_INVENTORY`
- `STRUCTURE`
- `RELATIONSHIPS`
- `SYMBOL_REFERENCES`
- `EXACT_SOURCE`

Evite capabilities baseadas em detalhes internos como:

- `BACKFILL_X_DONE`
- `QUEUE_Y_EMPTY`
- `MIGRATION_Z_FINISHED`

O consumidor deve declarar **o que precisa**, não **como o produtor obtém aquilo**.

---

# Não modele toda a matriz antecipadamente

Crie apenas capabilities justificadas por consumidores reais.

Fluxo preferido:

**incidente ou necessidade concreta**

→ identificar propriedade necessária

→ criar menor readiness correspondente

→ migrar somente o consumidor necessário

→ validar

→ expandir quando outro consumidor justificar nova capability.

Evite construir um framework completo de readiness antes de provar necessidade.

---

# Preserve maintenance independente

Uma nova readiness não significa remover maintenance.

Background work pode continuar executando:

- reconciliação;
- backfills;
- enrichments;
- migrations;
- indexação derivada;
- reparações.

A mudança é:

> consumidores que não dependem desse trabalho deixam de esperar por ele.

---

# Failure Isolation

Uma falha em capability avançada deve degradar somente consumidores dependentes dela sempre que os dados fundamentais continuarem válidos.

Exemplo:

`FILE_INVENTORY — READY`

`STRUCTURE — READY`

`SYMBOL_REFERENCES — FAILED`

Nesse cenário:

- discovery pode continuar;
- operações de references podem degradar ou falhar.

Princípio:

> Falha em uma capacidade avançada não deve inutilizar capacidades fundamentais já válidas.

---

# Enrichment Isolation

Um enrichment caro não deve aumentar a duração de consumidores que não o utilizam.

Prefira esta propriedade:

> A duração de um consumidor não cresce com a duração de um enrichment irrelevante.

Isso costuma ser mais útil que um contrato arbitrário como:

> deve terminar em menos de X milissegundos.

---

# Não use Global Idle como selo universal

`waitForIdle()` ou equivalente pode ser correto quando uma operação realmente precisa esperar uma fila terminar.

Mas:

**queue idle**

não é automaticamente:

**snapshot consistent para todos os consumidores**.

Em sistemas vivos, novos eventos podem aparecer imediatamente depois do idle.

Use quiescence somente quando fizer parte do contrato específico daquela operação.

---

# Evite acoplamento temporal oculto

Procure padrões em que uma API:

1. dispara uma operação assíncrona;
2. não aguarda;
3. assume que um efeito síncrono já aconteceu.

Exemplo conceitual:

**ensureInstance**

→ chama `openRepository()`

→ não aguarda

→ imediatamente espera encontrar a instância.

Isso depende da ordem interna de execução da função assíncrona.

Prefira contratos separados:

## Async

`ensureReady/open`

garante que a dependência necessária existe antes de retornar.

## Sync

`requireExisting`

somente lê estado já estabelecido.

Princípio:

> APIs síncronas não devem depender silenciosamente de efeitos assíncronos não aguardados.

---

# Examine failure semantics de maintenance

Se uma Promise representa um pipeline de maintenance, determine o que sua resolução realmente significa.

Pergunte:

- resolveu porque tudo teve sucesso?
- erros foram capturados internamente?
- uma falha interrompe tarefas posteriores?
- consumidores conseguem distinguir sucesso de término?
- quais etapas realmente dependem umas das outras?

Nunca trate:

`Promise resolved`

automaticamente como:

`system ready`.

---

# Decomponha maintenance somente quando necessário

Se um pipeline monolítico impedir isolamento ou diagnóstico, considere fases semanticamente nomeadas.

Exemplo:

**Core Metadata**

→ **Disk Reconciliation**

→ **Structural Enrichment**

→ **Semantic Enrichment**

Não crie scheduler complexo apenas por organização.

Separe fases quando isso permitir:

- readiness distinta;
- failure isolation;
- melhor ownership;
- diagnóstico mais preciso;
- execução independente.

---

# Serving e Maintenance são responsabilidades diferentes

O sistema pode estar servindo uma capability válida enquanto outras tarefas continuam em background.

Modele isso explicitamente.

Evite arquitetura binária:

`NOT READY / READY`

quando a realidade é:

`capability A ready`

`capability B pending`

`capability C failed`.

---

# Observabilidade da readiness

Capacidades operacionais relevantes devem nascer diagnosticamente endereçáveis.

Instrumente o mínimo necessário para distinguir:

**Readiness Requested**

→ **Readiness Satisfied**

ou:

→ **Readiness Failed**

Inclua a capability quando útil.

Exemplo:

`STRUCTURE readiness failed`

é melhor que:

`initialization failed`.

Não registre checkpoints que não mudam a decisão de investigação.

---

# Diagnostic Zoom

Quando readiness falhar, o diagnóstico deve permitir reduzir:

**Feature**

→ **Operation**

→ **Required Capability**

→ **Responsible Component**

Se uma capability nova ainda produz apenas "alguma coisa na inicialização falhou", sua fronteira diagnóstica provavelmente está ampla demais.

---

# Harness

Toda correção de readiness deve avaliar testes permanentes para os contratos que causaram o incidente.

Provas úteis:

## Pending irrelevant maintenance

Um trabalho de background permanece pendente indefinidamente.

O consumidor que não depende dele continua funcionando.

## Busy queue

A fila global está ocupada.

Consumidor sem dependência de quiescence continua funcionando.

## Warm state

Dados persistidos válidos já existem.

O consumidor os utiliza sem esperar enrichment.

## Empty/new state

Preservar a semântica legítima de sistema ainda não inicializado.

Não disparar trabalho global implicitamente sem contrato.

## Maintenance failure

Falha em enrichment não inutiliza capability fundamental já válida.

## Consumer isolation

Consumidores ainda não migrados preservam seus contratos atuais.

---

# Não corrija readiness aumentando timeouts

Timeout maior pode esconder o problema, mas não corrige uma dependência desnecessária.

Antes de aumentar um prazo, pergunte:

> Este consumidor deveria estar esperando esta operação?

Se não deveria, remova a dependência.

---

# Não otimize o produtor antes de corrigir o contrato

Um backfill ou enrichment lento pode expor o bug, mas não ser sua causa arquitetural.

Diferencie:

## Dependency problem

Consumidor espera trabalho irrelevante.

## Efficiency problem

O trabalho relevante ou de maintenance é caro demais.

Corrija dependency primeiro.

Depois avalie otimização do produtor separadamente.

---

# Ownership

A separação preferencial é:

## Consumer

Declara a capability necessária.

## Readiness/Service boundary

Traduz capability para as barreiras internas corretas.

## Producer/Model

Fornece e persiste dados.

## Maintenance

Repara e enriquece.

## Synchronizer

Processa mudanças incrementais.

Não faça consumidores conhecerem nomes de backfills, migrations ou filas internas.

---

# Critério de conclusão

Considere a mudança concluída quando:

- a capability necessária está explicitamente definida;
- o consumidor depende somente dela;
- maintenance irrelevante pode continuar pendente;
- quiescence global não é exigida sem motivo;
- falhas avançadas não degradam capacidades independentes;
- não existem dependências assíncronas temporais ocultas na fronteira alterada;
- há prova de regressão para o incidente real;
- observabilidade identifica a readiness envolvida;
- consumidores não migrados permanecem inalterados.

---

# Princípios

> Readiness expressa propriedades necessárias ao consumidor, não o término de todo trabalho disponível.

> Maintenance e serving devem poder evoluir independentemente.

> Quiescência global não é sinônimo de consistência de leitura.

> Enrichment lento deve degradar apenas consumidores dependentes daquele enrichment.

> Consumers depend on capabilities, not implementation steps.

> Otimize dependências antes de otimizar timeouts.

> Crie a próxima capability quando um consumidor real justificar sua existência, não antecipadamente.
