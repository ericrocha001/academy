---
name: system-health-debugging  
description: Diagnostique falhas, timeouts, integrações quebradas, estados degradados e comportamento operacional incerto no Code Awareness usando System Health como primeira fonte de evidência. Use também ao projetar ou evoluir a observabilidade diagnóstica de capacidades operacionais. Localize a menor fronteira comprovada antes de ler código, colete somente a próxima evidência que reduz incerteza e amplie System Health minimamente quando um incidente revelar uma lacuna reutilizável. Não use para revisão geral de código ou desenvolvimento comum sem incerteza operacional.
---

# System Health Debugging

## Finalidade

Use System Health para reduzir progressivamente o espaço de investigação antes de analisar código.

A sequência preferencial é:

**System Health → localização da falha → CodeScope/CodeBrain → source mínimo → causa → correção → Harness**

System Health não precisa descobrir sozinho a causa em código. Sua função é determinar **onde a investigação deve começar e qual evidência ainda falta**.

Princípio central:

> Localize antes de explicar. Evidência antes de inferência.

---

# Comece pelo System Health

Diante de:

- timeout;
- operação que não responde;
- integração quebrada;
- comportamento degradado;
- resultado inesperado com possível causa operacional;
- dúvida sobre qual camada falhou;

consulte `get_system_health` antes de percorrer código ou logs.

Não use System Health rotineiramente quando não existe incerteza operacional.

Leia primeiro:

- `currentHealth`;
- `diagnosis`;
- `lastFailureDiagnosis`;
- `lastFunctionalProof`;
- freshness/evidence state.

Não confunda estado atual com falha histórica.

Se a sessão foi reiniciada, projeto mudou ou a evidência está stale, reproduza a operação quando necessário antes de concluir.

---

# Diagnostic Zoom

Debugging é redução progressiva do espaço de busca.

A investigação deve tentar avançar por:

**Feature → Stage → Checkpoint → Component → Source mínimo**

Pare assim que alcançar resolução suficiente para uma intervenção útil.

Não aprofunde apenas porque é possível aprofundar.

---

# Deepest Proven Progress

Quando uma camada externa reporta timeout ou erro, não conclua automaticamente que ela causou a falha.

Procure o descendente mais profundo cuja execução foi comprovada.

Exemplo conceitual:

- transporte externo detecta timeout;
- handler MCP já iniciou;
- CodeScope já entrou em execução;
- Snapshot Synchronization ficou pendente.

A localização pertence à região mais profunda comprovada, não ao componente que apenas materializou o timeout.

> O componente que detecta uma falha não é necessariamente o componente que a causa.

Se evidência downstream comprovar execução, não marque essa região como `BLOCKED`.

---

# Diagnostic Frontier

Use `diagnosticFrontier` como a fronteira entre:

- progresso comprovado;
- primeira região falha, aberta ou desconhecida;
- regiões downstream ainda não alcançadas.

Uma frontier útil deve responder:

> Até onde sabemos que funcionou, e onde começa a região que ainda precisa ser explicada?

Não expanda a investigação para componentes anteriores já comprovadamente saudáveis.

---

# Minimum Proven Fault Scope

A precisão do diagnóstico nunca pode exceder a evidência.

Use:

- `EXACT` quando a fronteira/componente estiver comprovado;
- `BOUNDED` quando apenas um intervalo causal puder ser delimitado.

É melhor retornar uma região menor porém ainda limitada do que atribuir falsamente a falha a um componente específico.

> Better unresolved than falsely precise.

Se a evidência prova apenas:

**Desktop Relay Egress → Gateway Relay Ingress**

não declare um componente específico dentro dessa fronteira até existir evidência discriminante.

---

# Diagnostic Resolution

Interprete a resolução semanticamente:

- `FEATURE`
- `STAGE`
- `CHECKPOINT`
- `COMPONENT`

Não transforme resolução em score arbitrário.

Uma resolução `COMPONENT` com `observabilityGap: NONE` normalmente significa:

> pare de instrumentar e investigue o código indicado.

---

# Observability Gap

Use `observabilityGap` para decidir se a investigação precisa de mais observação.

Estados esperados podem incluir:

- `NONE`
- `EVIDENCE_AVAILABLE`
- `EVIDENCE_MISSING`
- `REPRODUCTION_REQUIRED`

## NONE

Já existe evidência suficiente.

Não colete logs adicionais por hábito.

Passe à investigação da fonte.

## EVIDENCE_AVAILABLE

Existe observação já disponível que pode separar as hipóteses.

Leia essa evidência antes de alterar instrumentação.

## EVIDENCE_MISSING

A fronteira ainda não pode ser discriminada.

Adicione a menor observação capaz de mudar a decisão diagnóstica.

## REPRODUCTION_REQUIRED

A evidência existente não permite decidir.

Reproduza de forma controlada.

---

# Next Best Evidence

Quando houver `nextBestEvidence`, priorize essa evidência.

Não tente coletar tudo.

Pergunta orientadora:

> Qual é a menor observação que mais reduz a incerteza atual?

Em fluxo linear, normalmente é a primeira região desconhecida depois do deepest proven progress.

Providers podem especializar essa decisão quando houver ramificações.

---

# Semântica das evidências

Prefira, em ordem:

1. conclusão explícita;
2. falha explícita;
3. início explícito;
4. timeout correlacionado;
5. ausência com significado contratual;
6. ausência inconclusiva.

Um evento `started` não equivale a sucesso.

Ausência de evento não equivale automaticamente a falha.

`BLOCKED` significa que uma região não foi alcançada por causa de uma falha anterior; não atribua reason code próprio sem evidência.

Um estágio reclassificado como saudável não deve continuar carregando reason code pertencente à falha downstream.

---

# Investigation Target

Quando System Health fornecer:

- `systemArea`;
- `component`;
- `boundary`;
- `responsibility`;
- `investigationSeeds`;

use isso para selecionar o menor contexto possível.

Prefira CodeScope para:

- descobrir estrutura;
- inspecionar arquivos;
- seguir relações;
- ler somente source necessário.

Não volte a explorar o repositório inteiro.

---

# Break-glass investigation

O canal usado para investigar pode depender da própria região quebrada.

Exemplo:

System Health localiza falha dentro do CodeMap, mas CodeScope também precisa dessa mesma capacidade para ler código.

Nesse caso:

> não insista no canal que depende da região quebrada.

Use Diagnostic Source Access somente para o escopo já delimitado pelo System Health:

`diagnostic_list_directory` → `diagnostic_read_file` → `diagnostic_find_text`, conforme a menor evidência necessária.

Não transforme o fallback em navegação normal. Ele não oferece semântica, relationships, símbolos, grafo ou escrita.

Depois da correção, volte ao canal normal e valide end-to-end.

## Source stale e restart de desenvolvimento

Quando uma correção alterar source do runtime:

1. consulte `get_runtime_identity`;
2. se a freshness for `SOURCE_CHANGED_SINCE_START` com recomendação `RESTART_RUNTIME`, informe antes da ação que a conexão atual será perdida e que **Atualizar ações** será necessário;
3. chame `request_runtime_restart` com o `expectedInstanceId` atual;
4. após `SCHEDULED`, aguarde o shutdown gracioso e a volta do supervisor;
5. o usuário executa manualmente **Atualizar ações** no plugin/conector do ChatGPT;
6. depois da reconexão, consulte `get_runtime_identity` novamente e confirme novo `instanceId` e freshness `MATCH`.

Não tente automatizar, simular ou diagnosticar o Refresh do ChatGPT. Restart de produção permanece não suportado.

---

# Logs

Logs são evidência bruta, não a interface primária de raciocínio.

Use logs quando:

- System Health indicar evidência faltante;
- a observabilidade estruturada ainda não distinguir duas regiões;
- System Health estiver indisponível;
- for necessário confirmar comportamento interno muito específico.

Se a leitura manual de logs revelar repetidamente uma distinção útil, não deixe esse conhecimento preso aos logs.

Promova-o para evidência estruturada do System Health.

---

# Evolução do System Health por incidentes

Não tente instrumentar antecipadamente todas as falhas possíveis.

Fluxo preferido:

**incidente → diagnóstico → lacuna comprovada → menor melhoria reutilizável → Harness**

Quando a fronteira estiver ampla demais, aprofunde verticalmente nessa região.

Evite inflar globalmente o pipeline canônico.

Semântica específica de uma feature pertence preferencialmente ao seu Provider.

Mova lógica para o Core apenas quando ela representar mecanismo diagnóstico realmente genérico e reutilizável.

---

# Instrument for Decisions

Antes de adicionar um evento, checkpoint ou métrica, pergunte:

> Se eu souber esta informação, ela muda onde investigarei ou qual intervenção escolherei?

Se não mudar, provavelmente não merece instrumentação.

> Não maximize observabilidade. Maximize redução de incerteza com a menor instrumentação necessária.

---

# Diagnostic Zoom by Design

Capacidades operacionais relevantes devem nascer diagnosticamente endereçáveis.

Isso é especialmente importante quando envolvem:

- lifecycle;
- concorrência;
- processos;
- background work;
- rede;
- persistência;
- filas;
- integrações;
- fronteiras entre componentes.

Antes de considerar a capacidade pronta, identifique:

- principais fronteiras de execução;
- ownership de cada fronteira;
- evidência de entrada/progresso/conclusão;
- correlation necessária;
- primeira resolução útil para investigação.

Não construa tracing completo preventivamente.

O objetivo é que o primeiro bug já comece dentro de um espaço de busca delimitado.

> Uma capacidade não precisa nascer totalmente observada. Precisa nascer com resolução diagnóstica suficiente para localizar progressivamente seu primeiro incidente.

## Architectural Diagnostic Mapping

O System Health deve manter um **mapa vivo das fronteiras arquiteturais operacionalmente significativas** à medida que o sistema evolui.

Esse mapa não representa toda a implementação. Sua finalidade é reduzir antecipadamente o espaço de busca para que uma falha possa ser localizada na menor região arquitetural útil antes da investigação de código.

Durante o desenvolvimento ou alteração de uma feature/capacidade, avalie se surgiram novas fronteiras que possam mudar materialmente:

- onde uma investigação começa;
- qual subsistema ou capacidade contém a falha;
- qual ownership deve assumir a investigação;
- qual evidência deve ser coletada em seguida.

Quando uma fronteira satisfizer esse critério, torne-a diagnosticamente endereçável pelo System Health usando a menor evidência estruturada suficiente.

Prefira representar:

- transições entre subsistemas;
- capacidades com responsabilidade operacional própria;
- readiness ou sincronização relevantes;
- mudanças de processo/runtime;
- persistência, rede, filas ou integrações;
- outras fronteiras cuja identificação divida materialmente o espaço de busca.

Não represente classes, métodos, funções ou etapas internas apenas porque existem.

A granularidade inicial deve ser suficiente para:

**sistema → feature → fronteira arquitetural relevante**

Aprofundamento além dessa fronteira continua sob demanda por Diagnostic Zoom:

**fronteira localizada → checkpoint/componente → source mínimo**

Assim, o mapeamento preventivo e o aprofundamento investigativo cumprem papéis diferentes:

- **Architectural Diagnostic Mapping** prepara antecipadamente a menor arquitetura útil para localização;
- **Diagnostic Zoom** aprofunda somente a região que uma falha real justificar.

Se uma fronteira arquitetural conhecida poderia reduzir materialmente o espaço de investigação, mas o System Health ainda consegue apontar apenas para uma região muito mais ampla, trate isso como uma lacuna de mapeamento diagnóstico.

> Mapeie antecipadamente o suficiente para localizar; aprofunde somente quando houver algo concreto para investigar.

---

# Diagnostic Addressability

Uma feature operacional deve permitir que uma falha seja endereçada progressivamente:

**feature → stage → checkpoint → componente**

conforme a evidência disponível.

Se toda falha começa como "algo dentro da feature quebrou", a capacidade ainda não possui diagnostic addressability suficiente.

---

# System Health localiza; source confirma

Não transforme o diagnóstico operacional em conclusão sobre causa de código sem evidência.

System Health pode dizer:

> `Snapshot Synchronization` falhou em `CodeMap Service`.

Isso não prova automaticamente:

> `backfillSymbolReferences` é a causa.

Use source mínimo para explicar a fronteira localizada.

Evite `suggestedFix` ou `rootCause` especulativos dentro do próprio Health.

---

# Diagnóstico como especificação de regressão

Um bom diagnóstico estruturado descreve o comportamento falho de forma que possa orientar uma prova.

Exemplo:

**A alcança sucesso → B inicia → B não conclui → C fica BLOCKED.**

Depois da correção, avalie se essa propriedade merece proteção permanente.

Acione Harness Improvement quando o incidente revelar:

- bug reproduzível;
- contrato crítico;
- race;
- risco estrutural;
- falha que provavelmente poderia retornar.

System Health não precisa sugerir o teste específico.

> System Health localiza e descreve; Harness transforma o aprendizado relevante em não regressão.

Nem todo incidente precisa gerar novo teste permanente.

---

# Critério de encerramento da investigação

Considere a localização suficiente quando:

- há uma frontier coerente;
- a precisão corresponde à evidência;
- o ownership está claro;
- `observabilityGap` não exige nova evidência;
- existe source mínimo ou ação concreta de investigação;
- não há contradições entre status e reason codes.

A partir daí, pare de melhorar observabilidade e corrija a causa.

Depois da correção:

1. reproduza a operação real;
2. consulte System Health novamente;
3. confirme percurso saudável;
4. confirme `lastFunctionalProof`;
5. preserve proteção no Harness quando justificável.

---

# Princípios

> System Health localiza; CodeScope explica; source confirma; Harness protege.

> Debugging é redução progressiva do espaço de busca.

> Encontre o deepest proven progress antes de atribuir culpa a uma camada externa.

> Nunca invente precisão.

> Colete a evidência que mais reduz incerteza, não a maior quantidade de evidência.

> Instrumente para decidir.

> Quando uma distinção descoberta manualmente for reutilizável, transforme-a em capacidade estruturada.

> Toda infraestrutura operacional relevante deve nascer com fronteiras diagnósticas suficientes para tornar seu primeiro incidente investigável.
