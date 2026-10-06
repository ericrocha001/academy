---
name: continuum-work-items  
description: Use quando trabalho material não será executado agora e precisa ser delegado, retomado ou resolvido posteriormente por outro agente através do Continuum. Converte trabalho qualificado em Work Item autocontido, evita duplicatas e acompanha estados PENDING, COMPLETED e CANCELLED. Não usar para ideias especulativas, tarefas locais imediatas ou Implementation Handoffs normais.
---

# Continuum Work Items

## Finalidade

Preservar trabalho futuro de forma executável para que outro agente possa retomá-lo sem reconstruir o chat que o originou.

Um Work Item representa:

> trabalho deliberadamente deixado para execução futura.

Ele não é apenas memória, nota ou sugestão.

Deve transmitir contexto suficiente para que outro agente compreenda:

- por que o trabalho existe;
- qual problema foi observado;
- qual valor precisa produzir;
- quais decisões já foram tomadas;
- quais limites devem ser preservados;
- como implementar;
- como provar conclusão.

Use a Skill `continuum` para as regras gerais de publicação, recuperação, fidelidade e Pure Signal do Artifact.

---

# Quando criar um Work Item

Crie quando todas estas condições forem verdadeiras:

1. existe trabalho material ainda não executado;
2. o trabalho possui valor demonstrável;
3. ele não será executado no fluxo atual;
4. outro agente pode assumir sua execução;
5. perder o contexto atual tornaria a retomada significativamente mais difícil;
6. há informação suficiente para produzir uma tarefa executável.

Exemplos típicos:

- Capability Opportunity qualificada que será delegada;
- melhoria arquitetural deliberadamente adiada;
- investigação necessária mas fora do foco atual;
- capability nova cuja implementação será conduzida por outro agente;
- tarefa descoberta durante validação que merece projeto próprio.

---

# Quando não criar

Não crie Work Item para:

- ideia casual;
- possibilidade especulativa;
- melhoria sem valor demonstrado;
- detalhe local da implementação atual;
- tarefa que será executada imediatamente;
- lembrete pessoal;
- repetição de Work Item já existente;
- recomendação de baixo valor;
- observação histórica sem ação futura.

Uma recomendação pode ser útil sem merecer um Work Item.

---

# Capability Opportunities

Quando o trabalho nasceu de uma Capability Opportunity:

1. use a capacidade `capability-opportunity` para qualificá-la;
2. somente depois transforme a oportunidade qualificada em Work Item.

Não transforme toda seção `Capability Opportunities` de um handoff automaticamente em tarefas.

Avalie:

- recorrência;
- generalização;
- valor futuro;
- ganho material de capacidade;
- custo de manutenção;
- possibilidade de já estar coberta por capability existente.

Near-misses devem ser descartados, não armazenados por precaução.

---

# Atomicidade

Um Work Item deve representar uma unidade independentemente concluível.

Separe itens quando possam:

- ser implementados por agentes diferentes;
- terminar em momentos diferentes;
- possuir validações próprias;
- ser cancelados independentemente.

Não agrupe oportunidades independentes apenas porque surgiram na mesma conversa.

---

# Estados

Estados suportados:

`PENDING`

`COMPLETED`

`CANCELLED`

## PENDING

Trabalho ainda existente e não concluído.

É o estado inicial.

## COMPLETED

O critério de conclusão foi satisfeito e existe evidência correspondente.

Código escrito sem validação não é `COMPLETED`.

## CANCELLED

O trabalho deixou de ser necessário, foi absorvido por outra solução ou foi deliberadamente descartado.

Registre o motivo.

---

# Por que não existe IN_PROGRESS

Não utilize `IN_PROGRESS` enquanto o Continuum não possuir mecanismo confiável de ownership/lease.

Agentes podem desaparecer, chats podem terminar e execuções podem ser interrompidas.

Um claim persistente sem expiração produziria estado enganoso.

Até existir primitive específica:

`PENDING` significa trabalho ainda aberto, mesmo enquanto alguém o executa.

---

# Conteúdo obrigatório de um Work Item PENDING

## Contexto

Explique o acontecimento real que originou a tarefa.

Preserve apenas contexto que altere decisões futuras.

## Problema

Defina a deficiência concreta.

Evite formulações genéricas como "melhorar X".

## Valor

Explique que capacidade nova ou ganho operacional surgirá quando o trabalho estiver concluído.

## Resultado desejado

Defina o estado observável esperado.

## Evidência de origem

Registre fatos, provas ou eventos que qualificaram a tarefa.

Quando existirem artifacts ou Validation Proofs relevantes, referencie-os.

## Decisões já tomadas

Preserve decisões arquiteturais já resolvidas para evitar redescoberta.

Não retire autonomia tática desnecessariamente.

## Plano executável

Descreva a sequência suficiente para outro agente implementar o trabalho.

## Invariantes e limites

Declare o que não pode ser quebrado.

## Validação

Defina propriedades que precisam ser provadas.

## Fora do escopo

Evite expansão oportunística.

## Critério de conclusão

Defina objetivamente quando o Work Item pode tornar-se `COMPLETED`.

---

# Pure Signal

O próximo agente não precisa conhecer a conversa original.

Inclua:

- decisões;
- razões relevantes;
- contratos;
- evidência;
- riscos;
- estado atual;
- plano.

Não inclua:

- conversa bruta;
- cadeia de pensamento;
- logs integrais sem necessidade;
- alternativas já descartadas sem consequência;
- repetição do mesmo contexto em várias seções.

> Preserve capacidade futura, não volume histórico.

---

# Evite duplicação

Antes de criar um Work Item, consulte Work Items `PENDING` relacionados.

Se já existir item com o mesmo objetivo material:

- não crie outro;
- reutilize o existente.

Se o trabalho existente ganhou contexto material novo, atualize-o segundo o mecanismo de supersession do Continuum.

Não crie fontes concorrentes da mesma tarefa.

---

# Imutabilidade e evolução

Artifacts do Continuum são imutáveis.

Não altere um snapshot já publicado.

Quando um Work Item precisar ser atualizado, publique um novo snapshot preservando:

- o mesmo `workItemId`;
- novo `artifactId`;
- referência ao snapshot anterior através de `supersedesArtifactId`.

O snapshot mais recente representa o estado atual.

---

# Conclusão

Quando o trabalho for concluído:

1. valide a implementação;
2. publique o `IMPLEMENTATION_HANDOFF` normal usando `continuum`;
3. publique novo snapshot do Work Item como `COMPLETED`;
4. preserve o `workItemId`;
5. referencie o snapshot anterior;
6. associe o Work Item ao handoff de resolução.

O histórico deve permitir reconstruir:

`PENDING → Implementation Handoff → COMPLETED`.

---

# Cancelamento

Publique `CANCELLED` quando:

- evidência nova eliminar a necessidade;
- a arquitetura mudar;
- outra solução absorver o trabalho;
- o custo deixar de justificar o valor.

Explique a razão.

Não apague silenciosamente trabalho anteriormente qualificado.

---

# Recuperação

Consulte Work Items quando:

- o usuário pedir tarefas pendentes;
- outro agente receber trabalho delegado;
- uma investigação anterior for retomada;
- o trabalho atual corresponder a uma capability já registrada.

Use Progressive Disclosure:

`listar PENDING`

→ selecionar item relevante

→ recuperar conteúdo integral.

Não carregue todos os Work Items preventivamente.

---

# Relação com Source Atual

Work Item preserva intenção e contexto histórico.

Não é autoridade sobre o estado atual do repositório.

Antes da implementação:

- confirme source relevante;
- confirme runtime quando necessário;
- reavalie fatos que possam ter mudado.

Preserve decisões ainda válidas; não execute cegamente contexto histórico obsoleto.

---

# Falta de Primitive

Se a versão atual do Continuum não suportar `WORK_ITEM`:

- não publique a tarefa falsamente como `IMPLEMENTATION_HANDOFF`;
- não invente outro tipo equivalente;
- preserve o documento integral;
- reporte que a publicação está bloqueada pela primitive ausente.

Não compense proceduralmente uma capability de plataforma inexistente.

---

# Regra Final

Crie um Work Item quando a melhor forma de preservar valor for permitir que:

> **outro agente continue o trabalho, e não a conversa.**
