---
name: validacao-de-implementacoes
description: Use quando for necessário definir ou demonstrar que uma implementação satisfaz seus contratos, por evidência proporcional e verificável. Oriente provas locais, aceitação e regressões sem confundir teste com validação. Para escolher canais remotos de evidência use validation-evidence-channels; para avaliar comportamento agentic ou Skills use surgical-evals.
---

# SKILL

## Finalidade

Esta Skill define como projetar, selecionar, executar e interpretar evidências que demonstrem que uma **implementação de software** está correta e concluída.

Seu objetivo não é maximizar testes.

Seu objetivo é:

> **produzir a menor quantidade de evidência capaz de demonstrar, com força suficiente, as propriedades relevantes da implementação.**

A validação determina quando a implementação pode ser considerada concluída.

## Fronteira da Skill

Esta Skill valida propriedades do **software produzido**.

Exemplos:

- comportamento;
- contratos;
- integração;
- persistência;
- compatibilidade;
- recuperação;
- performance;
- interface;
- distribuição;
- regressões.

Ela não avalia propriedades do agente ou do Harness, como:

- triggering de Skill;
- qualidade de prompt;
- adesão agentic a procedimento;
- seleção de resources;
- eficiência de contexto;
- comportamento de uma Skill;
- diferença entre estratégias de agentes.

Essas propriedades pertencem às capacidades de avaliação agentic do Harness.

> **Software é validado. Comportamento agentic é avaliado.**

Não misture os dois domínios apenas porque ambos utilizam evidências.

## Princípio Fundamental

Antes de perguntar:

> Qual teste devemos executar?

determine:

> **O que precisa ser verdadeiro para que esta implementação possa ser considerada correta?**

A ordem é:

```text
Propriedade
↓
Evidência suficiente
↓
Mecanismo adequado
↓
Execução
↓
Resultado
```

Nunca comece pela ferramenta disponível.

## Propriedade Antes da Prova

Formule primeiro a propriedade.

Exemplos:

- dados persistidos sobrevivem corretamente ao reload;
- consumidores utilizam o novo contrato;
- comportamento anterior relevante permanece preservado;
- operação é atômica;
- interface apresenta o estado correto;
- fluxo integrado entrega o resultado esperado.

Evite formulações baseadas apenas em mecanismo:

> "typecheck deve passar"

quando a propriedade real é outra.

Ferramentas são mecanismos para observar propriedades.

## Validação não é Teste

Teste é somente uma categoria possível de evidência.

Dependendo da propriedade, mecanismos adequados podem incluir:

- compilação;
- análise estática;
- verificação de tipos;
- teste unitário;
- teste comportamental;
- integração;
- E2E;
- execução funcional;
- persistência real;
- inspeção visual;
- screenshot;
- benchmark;
- comparação de saída;
- recuperação;
- regressão;
- outra observação objetiva apropriada.

Não transforme nenhum mecanismo em requisito universal.

## Regra de Suficiência

Use:

> **a prova de menor custo que observe diretamente e com força suficiente a propriedade necessária.**

A ordem dessa regra é importante.

Primeiro determine:

1. a prova é relevante?
2. observa realmente a propriedade?
3. possui força suficiente?

Somente entre mecanismos suficientemente fortes considere:

- custo;
- velocidade;
- complexidade;
- tokens;
- conveniência operacional.

Uma prova barata que não demonstra a propriedade não é uma prova válida.

## Não Superestime Evidências Fracas

Não considere automaticamente suficiente:

- build verde;
- compilação;
- typecheck;
- ausência de erro no console;
- alta cobertura;
- grande quantidade de testes;
- inspeção superficial;
- código aparentemente correto.

Cada evidência demonstra apenas aquilo que consegue observar.

Build pode demonstrar que um artefato é produzido.

Não demonstra automaticamente comportamento.

Análise estática pode demonstrar propriedades estruturais.

Não demonstra automaticamente integração em runtime.

## Validação Agnóstica de Tecnologia

Pense primeiro em categorias de propriedade e evidência.

Depois utilize os mecanismos existentes no projeto.

Não presuma:

- linguagem;
- framework;
- IDE;
- checker;
- runner;
- biblioteca de testes.

A propriedade é estável.

A ferramenta concreta depende do ambiente.

## Matriz de Provas

Use uma Matriz de Provas quando existirem várias propriedades relevantes ou quando a estratégia puder ficar ambígua.

Cada linha deve relacionar:

|Campo|Pergunta|
|---|---|
|Propriedade|O que precisa permanecer verdadeiro?|
|Evidência|O que observaria essa propriedade?|
|Mecanismo|Como produzir essa evidência?|
|Escopo|Unidade, integração ou solução global?|
|Aprovação|Qual resultado caracteriza sucesso?|

A Matriz existe para evitar:

- lacunas;
- redundância;
- testes escolhidos por hábito;
- propriedades sem evidência correspondente.

Não crie Matriz quando uma implementação simples possuir uma única prova evidente.

## Relação com Planejamento Executável

O Plano determina:

> **qual estado ou propriedade precisa ser alcançado e demonstrado.**

Esta Skill determina:

> **qual evidência é suficientemente forte para demonstrá-lo.**

Não transforme Validação em uma segunda Skill de planejamento.

O Arquiteto pode utilizar esta capacidade durante o planejamento para garantir que a solução seja verificável.

O Implementador utiliza a mesma capacidade durante execução para produzir as evidências.

## Economia de Canal Durante a Implementação

Quando o Implementador possui acesso direto ao workspace e aos runners do projeto, a validação deve ocorrer **localmente por padrão**.

Use diretamente:

- typecheck;
- testes direcionados;
- runners do projeto;
- build;
- scripts de acceptance;
- ferramentas locais equivalentes.

Não roteie essas execuções pelo plugin do Code Awareness apenas para obter normalização, `proofId`, freshness ou registro automático no Validation Ledger.

Esses canais remotos existem principalmente para o Arquiteto produzir ou recuperar evidência independente sem possuir o mesmo ambiente local do Implementador.

O Implementador deve recorrer ao canal remoto somente quando ele demonstrar algo que o ambiente local não consegue demonstrar ou quando o plano exigir explicitamente aquela superfície.

Durante iteração:

1. execute primeiro a menor prova afetada;
2. corrija;
3. repita apenas a prova materialmente afetada;
4. execute regressão mais ampla somente quando o risco ou o contrato justificar;
5. concentre gates globais caros no fechamento, em vez de repeti-los após mudanças sem impacto correspondente.

> **A força da prova é obrigatória. O canal mais caro não é.**

## Prova da Unidade

Cada Unidade de Implementação deve terminar com evidência objetiva de que o resultado técnico pretendido foi produzido.

O ciclo é:

```text
Executar
↓
Verificar
↓
Falhou?
├─ sim → corrigir → verificar novamente
└─ não → avançar
```

Uma Unidade não termina apenas porque suas alterações foram escritas.

Termina quando sua propriedade obrigatória foi demonstrada.

## Prova não Significa Teste Permanente

Diferencie:

**prova da Unidade**

de

**proteção permanente da suíte**.

Uma Unidade pode ser demonstrada por:

- teste existente;
- teste temporário;
- execução;
- compilação;
- integração;
- inspeção de saída;
- benchmark;
- outra evidência apropriada.

Crie ou preserve teste permanente quando houver valor real de proteção futura.

Normalmente isso ocorre quando houver:

- contrato relevante;
- comportamento crítico;
- bug reproduzível;
- regressão;
- integração arriscada;
- caso de borda relevante;
- mudança estrutural cujo comportamento deva permanecer protegido.

> **A Unidade precisa de uma prova. O comportamento recebe proteção permanente quando merece proteção permanente.**

## Bugs Reproduzíveis

Para bugs reproduzíveis, prefira:

```text
Bug
↓
prova que reproduz a falha
↓
confirmação da falha
↓
correção
↓
mesma prova aprovada
↓
proteção de regressão preservada quando valiosa
```

Não altere uma prova correta apenas para acomodar uma implementação defeituosa.

A intenção da prova permanece estável enquanto a correção é realizada, salvo evidência independente de que a própria prova estava incorreta.

## Validação Local

Cada Unidade deve utilizar evidência proporcional ao que produz.

Exemplos conceituais:

**Contrato**
→ análise estrutural, compilação ou teste de contrato.

**Comportamento**
→ prova comportamental.

**Integração**
→ interação real entre componentes.

**Persistência**
→ storage real quando necessário.

**Interface**
→ execução funcional ou evidência visual.

**Performance**
→ benchmark adequado.

Não reutilize mecanicamente a mesma estratégia para todas as Unidades.

## Evidência Visual em Electron

Quando houver harness local equivalente de Electron real, prefira-o para evidência visual reproduzível, com perfil isolado, interações reais e captura nativa. No Code Awareness, utilize a lane `scripts/ui-visual-validation/` e seu contrato local, sem duplicar aqui sua documentação.

Computer Use continua útil para exploração interativa quando disponível. Sua indisponibilidade não impede `VALIDADO` quando uma prova visual local equivalente observa as propriedades exigidas com força suficiente.

Inspecione efetivamente as screenshots antes de aprovar a aparência. Arquivo PNG gerado ou receipt aprovado não substitui inspeção visual. Registre os estados e viewports observados e os limites da evidência: fixtures de renderer não provam backend, persistência ou integração remota.

## Escopo da Prova

Escolha o menor escopo que observe diretamente a propriedade.

Prefira:

- unidade quando a propriedade é isolável;
- integração quando depende da colaboração real;
- sistema ou E2E quando depende do fluxo completo.

Não utilize E2E apenas por parecer mais abrangente.

Não utilize teste unitário quando a propriedade depende de uma integração real que o isolamento elimina.

## Mocks

Mocks são adequados quando permitem observar diretamente a propriedade sem remover justamente o comportamento que precisa ser demonstrado.

Não use mocks para provar:

- integração real que o mock substituiu;
- persistência real que não foi exercitada;
- comportamento de infraestrutura cuja implementação concreta é parte da propriedade.

Mocks reduzem escopo.

Não devem falsificar a força da evidência.

## Paridade das Fronteiras de Validação

Quando uma prova usa fixture, runner ou ambiente substituto, identifique as restrições do runtime real que podem determinar a propriedade testada (por exemplo, políticas de segurança, permissões, configuração de inicialização e canais de integração). Preserve essas restrições relevantes na prova; caso não sejam reproduzidas, limite explicitamente o alcance da evidência e não declare o comportamento integrado como validado.

Prefira compartilhar a fonte canônica das restrições, quando viável, a manter configurações equivalentes por cópia. Quando uma diferença já tiver produzido falso positivo, proteja a fronteira com uma regressão discriminativa: a prova deve falhar sob a restrição incompatível e passar com o contrato correto.

Não exija ambiente integralmente idêntico ao de produção. Exija apenas paridade das fronteiras capazes de alterar a propriedade observada, com custo proporcional.

## Validação Global

Depois das provas locais, pergunte:

> **Existe alguma propriedade importante que apenas a composição da solução consegue demonstrar?**

Se sim, defina uma Validação Global.

Conceitualmente:

```text
U1 prova A
U2 prova B
U3 prova C

Global prova:
A + B + C realmente entregam D
```

A Validação Global deve acrescentar evidência.

Não deve repetir provas já suficientes.

## Quando Não Criar Validação Global

Não crie quando:

- não existe comportamento relevante emergente da composição;
- todas as propriedades já foram suficientemente demonstradas;
- nenhuma integração adicional precisa ser observada.

Validação Global é condicional.

Não é rito de encerramento.

## Refinamento Tático pelo Implementador

O Arquiteto pode definir a propriedade e uma estratégia de prova durante o planejamento.

Durante execução, o Implementador pode encontrar mecanismo:

- mais direto;
- já existente;
- operacionalmente possível;
- equivalente ou superior;
- mais econômico.

Ele pode adaptar o mecanismo quando preservar a força da evidência.

> **O mecanismo pode mudar. A propriedade não pode ser silenciosamente enfraquecida.**

Se a mudança necessária alterar o contrato ou o que precisa ser demonstrado, isso deixa de ser adaptação tática.

## Responsabilidade do Arquiteto

Durante planejamento, o Arquiteto utiliza esta Skill para:

- identificar propriedades relevantes;
- distinguir propriedades locais e globais;
- determinar evidência suficiente;
- escolher categorias adequadas de prova;
- identificar proteção permanente quando necessária;
- evitar redundância;
- tornar a arquitetura verificável;
- definir as condições necessárias para `VALIDADO`.

O Arquiteto define principalmente:

> **o que precisa ser demonstrado.**

## Responsabilidade do Implementador

Durante execução, o Implementador:

- preserva a propriedade definida;
- produz evidência localmente quando possui mecanismo equivalente no workspace;
- evita Validation Execution/Ledger remoto para testes, typecheck, build e regressões que pode executar diretamente;
- implementa ou executa o mecanismo adequado;
- observa o resultado;
- investiga falhas;
- corrige a implementação quando necessário;
- repete a prova;
- executa regressões relevantes;
- registra evidências relevantes.

O Implementador produz:

> **a evidência.**

## Falha de Validação

Uma prova que falha é informação.

Não altere automaticamente a prova para fazer a implementação passar.

Determine se a falha está em:

- implementação;
- hipótese;
- ambiente;
- mecanismo de prova;
- propriedade originalmente especificada.

Quando a propriedade permanece correta, corrija a implementação.

Quando surgir evidência de que a especificação ou arquitetura está incorreta, não altere silenciosamente o contrato.

## Progresso Informativo Durante Validação

Continue investigando enquanto novas ações:

- produzirem evidência;
- testarem hipótese materialmente diferente;
- reduzirem incerteza;
- aproximarem o diagnóstico.

Quando a dificuldade ultrapassar a autonomia do Implementador ou a investigação deixar de produzir progresso informativo, utilize a capacidade especializada de escalonamento de bloqueios.

Esta Skill não redefine o protocolo de bloqueio.

## Evidência no Relato Final

Registre apenas evidência útil.

Para cada prova relevante, informe:

**Propriedade**

O que foi demonstrado.

**Mecanismo**

Como foi observado.

**Resultado**

PASS, FAIL, resultado medido ou conclusão equivalente.

Não é obrigatório fornecer IDs do Validation Ledger para provas produzidas localmente pelo Implementador. O relato deve ser suficiente para permitir verificação posterior pelo Arquiteto quando necessário.

Não despeje por padrão:

- logs completos;
- comandos;
- saídas extensas;
- detalhes sem impacto na conclusão.

O relato transmite:

> **estado + evidência + exceções**

## Resultado `VALIDADO`

`VALIDADO` possui significado forte.

Utilize somente quando:

- todas as propriedades obrigatórias estiverem suficientemente demonstradas;
- todas as Unidades obrigatórias estiverem aprovadas;
- regressões relevantes permanecerem aprovadas;
- proteção permanente necessária estiver estabelecida;
- Validação Global estiver aprovada quando necessária;
- não houver falha conhecida incompatível com conclusão;
- não houver bloqueio incompatível com conclusão.

`VALIDADO` não significa:

> não encontrei mais problemas.

Significa:

> **as evidências obrigatórias estabelecidas para esta implementação foram produzidas e aprovadas.**

## Resultado Incompleto

Se uma propriedade obrigatória não puder ser demonstrada, a implementação não está validada.

Não reduza a força da evidência apenas para encerrar a tarefa.

Quando houver bloqueio legítimo, preserve o estado real da execução e utilize o fluxo especializado de bloqueios do Harness.

## Anti-Padrões

Evite:

**Teste por hábito**

Escolher teste antes de definir propriedade.

**Build como prova universal**

Tratar compilação como demonstração de comportamento.

**Quantidade como qualidade**

Usar número de testes ou cobertura como substituto de evidência adequada.

**E2E por segurança**

Escolher mecanismo mais caro quando prova mais simples observa diretamente a mesma propriedade.

**Unit test por hábito**

Usar isolamento quando a propriedade depende da integração real.

**Mock que remove a propriedade**

Substituir exatamente aquilo que deveria ser exercitado.

**Enfraquecimento silencioso**

Modificar a propriedade apenas porque sua prova ficou difícil.

**Validação redundante**

Executar mecanismos diferentes que não acrescentam evidência.

**Validação remota por conveniência**

Usar canais do Code Awareness para executar provas que o Implementador já pode produzir localmente com a mesma força.

**Gate global repetido sem impacto material**

Reexecutar regressões amplas após mudanças que não afetam as propriedades cobertas, quando uma prova direcionada suficiente já discrimina a alteração.

**Mistura com agentic evals**

Usar esta Skill para avaliar comportamento de prompts, Skills ou agentes.

## Critério de Conclusão

A validação termina quando:

1. propriedades obrigatórias estão identificadas;
2. existe evidência suficientemente forte para cada uma;
3. provas obrigatórias foram aprovadas;
4. regressões relevantes permaneceram protegidas;
5. propriedades globais foram demonstradas quando necessárias;
6. nenhuma incerteza obrigatória permaneceu escondida;
7. o resultado pode ser declarado `VALIDADO`.

## Regra Final

> **Não produza testes para demonstrar trabalho. Produza evidências para demonstrar propriedades. Escolha primeiro uma prova suficientemente forte e somente depois a mais econômica entre as provas válidas. A Unidade termina quando sua propriedade foi demonstrada; a implementação termina quando todas as propriedades obrigatórias estiverem validadas.**
