---
name: validation-evidence-channels  
description: Use principalmente pelo Arquiteto ou revisor remoto quando precisar escolher, combinar ou interpretar canais de evidência do Code Awareness para validar uma implementação, confirmar runtime, verificar provas existentes ou investigar contradições. Implementadores com execução local equivalente devem validar pelo próprio workspace e evitar Validation Execution/Ledger remotos como rotina; use esses canais somente quando não houver equivalente local ou quando uma verificação independente exigir a superfície remota.
---

# Validation Evidence Channels

## Finalidade

Escolher a menor combinação de evidências capaz de responder com confiança à pergunta atual.

Diferentes canais provam coisas diferentes.

Nunca trate:

- source como prova de comportamento;
- teste verde como prova de runtime atual;
- handoff como prova de implementação;
- System Health como prova global de correção;
- Validation Ledger como executor de testes.

> A força da validação vem da correspondência entre a propriedade e a evidência.

Para definir **o que precisa ser provado**, use `validação-de-implementações`.

Para investigação profunda de falhas operacionais, use `system-health-debugging`.

Para economia de investigação, use `engineering-evidence-economy`.

## Economia de Canal e Responsabilidade por Papel

Escolha também **onde** produzir a evidência.

Quando o agente possui execução local equivalente, a evidência deve ser produzida localmente.

### Implementador com workspace local

Use diretamente os mecanismos disponíveis no ambiente de implementação para:

- typecheck;
- testes direcionados;
- Vitest ou runner equivalente;
- regressões;
- build;
- acceptance local;
- inspeção de logs produzidos pela própria execução.

Não use rotineiramente o plugin do Code Awareness para `list_validation_profiles`, `start_validation`, `get_validation_run`, `list_validation_proofs` ou `get_validation_proof` quando a mesma evidência pode ser produzida ou consultada localmente.

Normalização, `proofId`, freshness e persistência no Ledger **não justificam por si só** trocar uma execução local barata por chamadas remotas.

O Implementador deve preservar no handoff final evidência suficiente para que o Arquiteto saiba o que foi executado e qual foi o resultado.

### Arquiteto ou revisor remoto

Validation Execution, Validation Ledger, Runtime Identity e demais canais remotos do Code Awareness existem principalmente para permitir verificação independente quando o Arquiteto não possui o workspace de execução local do Implementador.

Nesse papel:

1. consulte evidência já existente antes de executar novamente;
2. execute apenas a menor prova ausente;
3. prefira targeted proof antes de regressão ampla;
4. use gate global somente quando a propriedade realmente exigir;
5. pare quando evidência adicional não mudar a conclusão.

### Exceções para o Implementador

O Implementador pode recorrer ao canal remoto somente quando:

- a capacidade necessária não possui equivalente local;
- a superfície remota é a própria propriedade sendo validada;
- existe necessidade explícita de verificação independente;
- uma instrução arquitetural exige aquela evidência específica.

> **Capacidade local equivalente → execução local. Canal remoto → somente quando acrescenta evidência que o ambiente local não fornece.**

---

# Comece pela pergunta

Antes de escolher um canal, formule a propriedade que precisa ser conhecida.

Exemplos:

- O source contém a mudança?
- Essa propriedade já foi testada?
- A prova ainda corresponde ao source atual?
- O runtime carregou esse source?
- A capability funciona no sistema rodando?
- Onde a operação falhou?
- O handoff de outro agente é sustentado por evidência atual?

Não colete canais indiscriminadamente.

---

# Validation Ledger

Para o Arquiteto ou revisor remoto, use primeiro quando a pergunta puder já possuir prova registrada.

O Implementador com execução local não deve consultar o Ledger remotamente apenas para reconstruir provas que ele próprio acabou de produzir no workspace.

O Ledger responde:

> **Que validações já foram executadas e quão atuais elas ainda são?**

Consulte antes de repetir testes relevantes.

Observe especialmente:

- propriedade/evidenceFor;
- tipo da prova;
- resultado;
- source fingerprint;
- runtime instance;
- freshness.

Uma prova `CURRENT` pode evitar nova execução.

Uma prova `SOURCE_STALE`, `RUNTIME_HISTORICAL` ou `UNVERIFIABLE` continua sendo contexto histórico, mas não deve ser apresentada como prova atual.

## O Ledger não prova

O registro não executa a validação.

Uma entrada prova apenas o que a execução registrada realmente demonstrou.

Se uma execução for realizada por um canal capaz de registrar automaticamente no Ledger, prefira esse fluxo.

Caso contrário, registre a prova imediatamente após executá-la.

## Validation Execution

Validation Execution é um canal remoto voltado principalmente ao Arquiteto/revisor ou a agentes sem execução local equivalente.

O Implementador com terminal e runner disponíveis no workspace não deve usá-lo para typecheck, testes, build ou regressões rotineiras que pode executar diretamente.

Quando o canal remoto for realmente necessário:

1. use `list_validation_profiles` para descobrir os profiles autorizados;
2. selecione o menor profile suficiente;
3. use `start_validation` somente com `profileId`, targets permitidos, produtor e `evidenceFor` aplicável;
4. consulte `get_validation_run` pelo `runId` até um estado terminal;
5. use o `proofId` retornado para consultar a prova automática no Ledger.

`FAILED` significa que a validação executou corretamente e encontrou falhas no software. Trate-o como evidência diagnóstica válida.

`ERROR` significa que não foi possível produzir uma execução confiável.

Não chame `record_validation_proof` depois de uma run produzida por Validation Execution. Preserve essa operação manual somente para evidências externas à capacidade.

---

# Source Inspection

Use CodeScope quando precisar saber:

- o que está implementado;
- onde está implementado;
- contratos atuais;
- relações estruturais;
- mudanças relevantes no source.

Source inspection prova:

> **o que o código atual expressa.**

Não prova que:

- o código compilou;
- o teste passou;
- o runtime carregou a versão atual;
- o comportamento funcionou em execução.

Quando o CodeMap/CodeScope estiver operacionalmente degradado e impedir a própria investigação, use o procedimento diagnóstico especializado disponível, não invente conclusões a partir de contexto histórico.

---

# Provas Automatizadas

Incluem conforme o projeto:

- targeted tests;
- subsystem tests;
- E2E;
- typecheck;
- build;
- harnesses;
- acceptance automatizada.

Use a menor prova capaz de discriminar a propriedade.

Um teste verde prova apenas o contrato coberto por ele.

`typecheck` prova consistência estática relevante.

`build` prova produção do artefato conforme aquela pipeline.

Nenhum deles, isoladamente, prova necessariamente comportamento no runtime atualmente carregado.

Use `validação-de-implementações` para selecionar suficiência e escopo da prova.

---

# Runtime Identity

Use quando a conclusão depender do sistema que está realmente rodando.

Ele responde:

> **o runtime atual corresponde ao source atual?**

Estados divergentes como:

`SOURCE_CHANGED_SINCE_START`

significam que runtime acceptance não deve ser usada para julgar o source novo.

Nesse caso:

1. reconheça a divergência;
2. obtenha runtime atualizado pelo mecanismo disponível;
3. confirme `MATCH`;
4. somente então execute a aceitação.

Nunca atribua ao source atual um comportamento observado em runtime stale.

---

# Runtime Acceptance

Use quando precisar provar que uma capability funciona de verdade no sistema carregado.

Exemplos:

- chamar uma operação MCP;
- recuperar relationships;
- executar um fluxo de integração;
- observar resultado real através da interface pública.

Antes da aceitação, confirme Runtime Identity quando alterações recentes puderem tornar o runtime stale.

Runtime acceptance prova:

> **esse comportamento foi observado nessa instância e nesse estado do sistema.**

Prefira repetir a operação quando sucesso isolado não for suficiente para descartar flakiness ou estado transitório.

Registre a prova no Validation Ledger.

---

# System Health

Use quando houver:

- erro;
- timeout;
- comportamento inesperado;
- resultado operacional contraditório;
- necessidade de localizar a fronteira responsável.

System Health responde:

> **até onde a operação progrediu e qual fronteira está falhando ou bloqueando?**

Fluxo preferido:

`falha observada`

→ `System Health`

→ `deepest proven progress / investigation target`

→ `source inspection`

→ `prova direcionada`.

System Health localiza.

Source confirma.

Teste ou runtime acceptance prova a correção.

Não comece lendo arquivos aleatoriamente quando System Health já pode reduzir o espaço de investigação.

Use `system-health-debugging` para o procedimento completo.

---

# Continuum

Continuum responde:

> **o que outros agentes fizeram, decidiram ou deixaram como contexto durável?**

Use para:

- Implementation Handoffs;
- contexto histórico;
- Work Items;
- decisões anteriores.

Continuum não é autoridade sobre o estado atual.

Um handoff dizendo `VALIDADO` não substitui:

- Validation Ledger;
- Runtime Identity;
- source atual;
- runtime acceptance quando necessária.

Use artifacts como contexto e claims a verificar, não como substitutos de evidência atual.

---

# Combinação de Canais

## Arquiteto/revisor — validar implementação recém-entregue

1. Defina a propriedade.
2. Consulte Validation Ledger.
3. Inspecione source somente quando necessário para confirmar escopo/contrato.
4. Execute a menor prova ausente.
5. Se comportamento real importar, confirme Runtime Identity.
6. Execute runtime acceptance.
7. Em caso de falha, use System Health.
8. Registre novas provas.
9. Pare quando a regra de suficiência estiver atendida.

---

## Verificar handoff de outro agente

`Continuum`

→ recuperar handoff

→ identificar claims de validação

→ consultar Validation Ledger

→ verificar freshness

→ executar apenas provas ausentes ou insuficientes.

Não rerode tudo automaticamente.

Não aceite claims não sustentadas quando forem materialmente relevantes.

---

## Investigar comportamento contraditório

Exemplo:

source parece correto, mas runtime falha.

Fluxo:

`Runtime Identity`

→ se stale, corrigir runtime primeiro

→ se MATCH, reproduzir

→ `System Health`

→ investigation target

→ CodeScope

→ targeted proof

→ Ledger.

---

# Evidência Negativa Também é Evidência

Uma prova que falha pode revelar mais valor que uma confirmação.

Não trate validação apenas como gate final.

Falhas podem revelar:

- contrato incompleto;
- readiness inadequada;
- acoplamento oculto;
- runtime stale;
- observability gap;
- flakiness;
- nova Capability Opportunity.

> **Validation is also investigation.**

Quando uma prova contradiz a expectativa, investigue a causa antes de relaxar o critério.

---

# Não Confunda Canais

Evite:

- `source existe` → "implementação validada";
- `typecheck verde` → "feature funciona";
- `handoff diz verde` → "prova atual";
- `runtime funciona` com source stale → "source novo funciona";
- `System Health operacional` → "todas as propriedades estão corretas";
- `teste antigo verde` → "prova ainda current";
- repetir suíte cara sem consultar Ledger.

---

# Freshness Antes de Confiança

Sempre que source ou runtime puder ter mudado, freshness faz parte da validade da evidência.

Pergunte:

- Esta prova foi produzida contra qual source?
- O runtime é a mesma instância?
- O artifact é histórico?
- Houve mudanças desde então?

Evidência correta em um estado antigo pode ser irrelevante para o estado presente.

---

# Pare Quando Souber o Suficiente

Mais canais não significam automaticamente maior confiança.

Use `engineering-evidence-economy`.

Pare quando:

- a propriedade está provada;
- a prova é suficientemente forte;
- está fresh para o estado relevante;
- canais adicionais não mudariam a decisão.

Evite validação cerimonial.

---

# Registro de Evidência

Toda prova material executada deve permanecer reutilizável.

Para o Implementador, o handoff final é o registro normal das provas locais: propriedade, mecanismo, resultado e exceções relevantes. Não é necessário transformar cada execução local em uma chamada remota ao Ledger.

Para o Arquiteto/revisor, quando houver Validation Ledger e a persistência compartilhada agregar valor:

- registre resultado;
- preserve escopo;
- associe evidenceFor;
- registre source fingerprint quando disponível;
- registre runtime instance quando aplicável.

Falhas também devem ser registradas quando constituírem evidência útil.

O objetivo é permitir que o próximo agente consulte antes de repetir trabalho.

---

# Regra Final

Use cada canal para a pergunta que ele realmente consegue responder.

A sequência preferida é:

> **evidência existente → menor nova prova suficiente → runtime quando necessário → diagnóstico quando contradito → registro durável da evidência.**

Validação não é acumular checks.

É reduzir incerteza com evidência adequada.
