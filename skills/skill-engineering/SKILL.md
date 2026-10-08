---
name: skill-engineering
description: Projete ou refatore Skills por capacidade, intenção e contexto de uso. Verifique necessidade, não duplicação, triggering e granularidade discriminativa; preserve compatibilidade entre Claude Code e Codex. Não use para edição textual simples.
---

# Skill Engineering

## Propósito

Projetar Skills que aumentem materialmente a capacidade dos agentes sem inflar desnecessariamente o catálogo de capacidades.

Uma Skill se justifica quando fornece conhecimento, procedimento ou contexto reutilizável que, sem ela, o agente:

- não possuiria;
- precisaria redescobrir;
- aplicaria inconsistentemente;
- ou executaria com custo evitável.

> Otimize para capacidade adquirida por unidade de contexto e por unidade de complexidade do ecossistema.

O objetivo não é criar mais Skills.

É tornar o sistema mais capaz.

## Gate de Existência

Antes de projetar uma Skill, determine se **Skill é realmente o produto correto**.

Pergunte:

- Que capacidade falta sem esta Skill?
- Essa lacuna reaparecerá?
- Existe julgamento suficiente para justificar uma capacidade agentic?
- O agente já faria isso bem sem orientação especializada?
- A capacidade altera materialmente confiabilidade, qualidade ou eficiência?
- Outro mecanismo resolveria melhor a causa?

Uma Skill geralmente se justifica quando preserva:

- procedimento recorrente com julgamento;
- conhecimento de domínio ou projeto não óbvio;
- critérios de decisão específicos;
- restrições operacionais;
- invariantes relevantes;
- modos reais de falha;
- comportamento específico de ferramentas ou ambiente;
- contexto caro de redescobrir.

Uma Skill geralmente não se justifica quando contém predominantemente:

- boas práticas genéricas;
- conceitos amplamente conhecidos pelo modelo;
- preferência pontual;
- instrução isolada;
- regra determinística melhor resolvida estruturalmente;
- documentação criada sem necessidade concreta;
- reação específica a uma única falha sem causa geral identificada.

Quando Skill não for a representação correta, não force sua criação.

## Gate de Não-Duplicação

Antes de criar uma nova Skill, verifique as capacidades existentes relevantes.

A pergunta não é apenas:

> "Já existe uma Skill com este nome?"

Pergunte:

> "Já existe alguma Skill cuja capacidade cobre total ou parcialmente o problema que pretendo resolver?"

Compare **responsabilidade e comportamento**, não apenas nomes.

### Se a capacidade já estiver coberta integralmente

Não crie outra Skill.

Utilize a capacidade existente.

### Se a capacidade existente estiver incompleta

Determine se o novo conhecimento pertence coerentemente à Skill existente.

Se pertencer:

> evolua a Skill canônica.

Não crie uma Skill paralela apenas porque o novo aprendizado surgiu em outro contexto.

### Se houver sobreposição parcial entre capacidades independentes

Preserve fronteiras claras.

Extraia apenas a capacidade realmente distinta e, quando necessário, faça uma Skill utilizar a outra.

Não replique dentro da nova Skill o procedimento que já possui uma fonte canônica.

### Se nenhuma capacidade existente cobrir a necessidade

Somente então considere criar uma nova Skill, submetendo-a aos demais critérios de Skill Engineering.

> **Nova Skill é última etapa da análise, não resposta automática à descoberta de conhecimento útil.**

## Evite Fontes Concorrentes

Uma mesma capacidade operacional deve possuir uma fonte canônica.

Não mantenha duas Skills ensinando independentemente:

- o mesmo procedimento;
- os mesmos critérios de decisão;
- o mesmo contrato;
- a mesma política;
- a mesma resolução de problema.

Duplicação gera:

- divergência futura;
- triggering concorrente;
- manutenção duplicada;
- maior custo de contexto;
- incerteza sobre autoridade;
- crescimento artificial do catálogo.

Quando várias Skills precisarem da mesma capacidade, reutilize a Skill responsável por ela.

> **Compartilhamento de capacidade deve ocorrer por composição, não por cópia.**

## Skill Chama Skill

Conhecimento procedural condicional que constitui uma capacidade coerente e reutilizável deve preferencialmente existir como Skill própria.

Uma Skill pode reconhecer que outra capacidade especializada é necessária e orientar o agente a utilizá-la.

Conceitualmente:

```text
Skill A
↓
necessidade especializada
↓
Skill B
```

Não replique o conteúdo de `Skill B` dentro de `Skill A`.

A Skill chamadora deve preservar apenas:

- quando a outra capacidade é necessária;
- por que ela é necessária;
- qual resultado precisa receber dela, quando isso não for óbvio.

A Skill chamada permanece responsável pelo procedimento especializado.

## Defina uma Capacidade Coerente

Trate o escopo como uma responsabilidade de software. **Uma Skill representa uma intenção operacional coerente, não uma quantidade máxima de palavras.** Tamanho, número de seções e etapas não justificam divisão.

### Gate de coesão versus particionamento

Pergunta central: **em um pedido real, o agente pode deixar de carregar uma parte inteira sem prejudicar a decisão e a execução corretas da parte necessária?** Analise a frequência desse caso e o valor do contexto evitado.

**MANTER COESA, mesmo longa:** as partes servem à mesma intenção, normalmente são necessárias juntas, compartilham contexto/contratos e evoluem pela mesma razão. Etapas diferentes de um fluxo obrigatório não são automaticamente capacidades independentes. Dividir criaria mais entradas no índice, seleções, referências e risco de faltar instrução necessária.

**MANTER COM APROFUNDAMENTO CONDICIONAL:** a intenção continua única, mas um detalhe, referência ou procedimento especializado só é necessário em alguns casos. Preserve a decisão e as invariantes no corpo principal; carregue o detalhe por recurso interno sob demanda. Não crie micro-Skills para cada seção.

**DIVIDIR POR CAPACIDADE:** existem pedidos naturais que precisam de uma parte sem a outra; cada parte possui resultado útil, procedimento material, gatilho distinguível já por `name`/`description` e evolução própria. Uma capacidade pode chamar outra quando necessário, sem copiar seu contrato. Compartilhar o mesmo produto, ferramenta ou agente não torna as intenções uma só.

**SE A FRONTEIRA NÃO ESTIVER COMPROVADA:** mantenha a estrutura atual. Compare pedidos positivos, negativos e próximos, custo total do índice e corpos carregados, além de eventuais regressões, usando `surgical-evals` quando o valor justificar.

Exemplos de fronteira:
- **Manter:** decomposição, critérios de prova e handoff de um Plano Final Executável integram a mesma entrega; não repartir `planejamento-executavel` por etapas.
- **Dividir:** navegar um repositório e projetar a evolução permanente da ferramenta de navegação são intenções diferentes; `code-navigation` e `code-navigation-evolution` podem ser descobertas separadamente.

Antes de criar uma nova Skill, verifique a capacidade existente e aplique o Gate de Não-Duplicação. A divisão só é produtiva quando a independência de acionamento e o ganho marginal compensam o custo de composição.

## Construa a Partir de Evidência

Prefira conhecimento derivado de trabalho real.

Fontes fortes incluem:

- workflows que funcionaram;
- correções recorrentes;
- falhas reais;
- incidentes;
- feedback de revisão;
- contratos;
- rastros de execução;
- comportamento repetidamente desperdiçador;
- dificuldades observadas por agentes.

Extraia causas e padrões reutilizáveis.

Não transforme cada dificuldade observada em uma nova Skill.

Primeiro determine:

1. qual capacidade resolveria a causa;
2. se essa capacidade é reutilizável;
3. se ela já existe;
4. se deve evoluir uma Skill existente;
5. somente então, se uma nova Skill é necessária.

## Capacidades e autoridade verificáveis

Projete o acionamento e a execução das Skills pela necessidade, capacidades efetivamente disponíveis e autorização explícita, nunca apenas pela identidade presumida do agente.

Separe **responsabilidade** (papel atribuído por fonte confiável), **capacidade** (ferramentas e acesso confirmados no ambiente) e **autoridade** (permissões e escopo da tarefa). O papel não prova acesso ao terminal, Git, MCP ou permissão de mutação. Ter uma ferramenta não autoriza usá-la para qualquer alteração.

Quando o resultado for equivalente, prefira a via local disponível e proporcionalmente mais econômica conforme `engineering-evidence-economy`. Use integração remota quando oferecer dados canônicos, alcance, prova independente ou controle exigido e indisponível localmente.

Escreva condições positivas e negativas por tarefa, capacidade e autorização observáveis. Só use «Arquiteto» e «Implementador» para delimitar responsabilidades cuja atribuição foi verificada. Se não houver evidência suficiente sobre acesso ou permissão, não presuma identidade; investigue ou bloqueie somente a operação dependente.

Valide o triggering em agentes com e sem terminal local, com e sem integração MCP e com ou sem autorização de escrita. Não replique esta regra geral em toda Skill; cada Skill descreve apenas suas restrições específicas.

## Granularidade Discriminativa

Divida uma Skill por intenções ou contextos operacionais que exijam procedimentos realmente diferentes e possam ser acionados independentemente. A fronteira deve ser distinguível já por `name` e `description`, antes do carregamento do corpo. Não divida mecanicamente por tamanho, papel presumido (Arquiteto/Implementador), pasta ou transporte. Se uma única intenção tem detalhes condicionais, prefira uma Skill coesa e referências internas sob demanda.

Antes de uma divisão, verifique custo total do índice, falsos positivos/negativos e contexto efetivamente carregado. Compare a versão atual com a candidata usando a capacidade `surgical-evals`, com casos positivos, negativos e near-misses quando a incerteza justificar. Só substitua a Skill canônica quando houver ganho demonstrável e preservação das capacidades compartilhadas.

**Auditabilidade da divisão:** identifique consumidores e referências entre Skills antes da migração; após separar, remapeie explicitamente essas referências para a capacidade responsável. Cada procedimento e invariante original deve permanecer acessível, com fonte canônica única: confira contra a versão imutável anterior a presença de cada bloco exatamente uma vez. Se a checagem de preservação textual passar, registre-a como prova estrutural, jamais como prova de precisão de acionamento. A divisão não está validada comportamentalmente sem evidência de triggering e custo real; não confunda menor corpo com menor contexto total.

## Metadata é o Índice

A Academy é o catálogo canônico único. Otimize para Claude Code e Codex, mas não suponha equivalência de extensões entre produtos. Por padrão, mantenha frontmatter portável com `name` e `description`; campos opcionais da especificação Agent Skills só quando resolverem requisito concreto. Campos proprietários do Claude Code (por exemplo `when_to_use`, `disable-model-invocation` ou `context`) não são garantidamente interpretados pelo Codex e podem ser rejeitados em upload do claude.ai. Controles próprios do Codex, como `agents/openai.yaml`, pertencem à distribuição compatível do destino, quando comprovadamente necessários. Não use metadata personalizada como único gatilho de seleção.

A `description` deve ser curta e distintiva: comece pela intenção/ação, depois diga quando acionar e, somente quando discriminativo, quando não acionar. Evite listas extensas de exceções, exemplos e nomes de agente. Considere Skills vizinhas e o orçamento total do catálogo: aumentar a quantidade de Skills também aumenta o índice, mesmo que cada corpo seja menor. O corpo não corrige um gatilho ruim depois de carregado.

Quando uma configuração específica da plataforma resolver um caso comprovado, mantenha uma fonte semântica canônica e uma projeção/adaptação por destino, sem duplicar manualmente procedimentos. A distribuição deve verificar quais campos são aceitos, em quais superfícies, e quais controles efetivamente alteram descoberta ou invocação. Não introduza router próprio, catálogo paralelo nem variantes sem necessidade observada.

## Preserve Alto Sinal

Para cada instrução, pergunte:

> Sem isto existe probabilidade materialmente maior de o agente agir incorretamente ou gastar trabalho evitável?

Se não, considere remover.

Priorize:

- restrições não óbvias;
- decisões que o modelo não inferiria confiavelmente;
- armadilhas reais;
- exceções relevantes;
- modos de falha;
- critérios discriminativos;
- peculiaridades do ambiente.

Evite transformar Skills em livros didáticos.

## Prefira Defaults a Menus

Quando várias alternativas forem possíveis, mas uma funcionar como bom padrão, forneça o padrão e indique quando desviar.

Não apresente múltiplas opções equivalentes sem necessidade.

Reduza entropia decisória.

## Conhecimento Volátil

Não congele fatos rapidamente mutáveis quando uma fonte autoritativa puder ser consultada durante a execução.

Preserve princípios estáveis e ensine quando a verdade atual precisa ser obtida novamente.

## Trabalho Determinístico

Quando uma tarefa possuir:

- entrada conhecida;
- saída conhecida;
- procedimento previsível;
- pouco julgamento;

questione se ela realmente precisa ser representada cognitivamente por uma Skill.

Não transforme automaticamente toda automação ou regra mecânica em procedimento agentic.

## Refatorações Devem Preservar Capacidade

Ao:

- reduzir uma Skill;
- dividir;
- combinar;
- renomear;
- adaptar para outra plataforma;
- alterar metadata;

distinga mudança estrutural de mudança comportamental.

Não elimine silenciosamente:

- contratos;
- critérios;
- conhecimento necessário;
- triggering;
- invariantes;
- capacidades indispensáveis.

Ao combinar ou dividir Skills, verifique também se:

- nenhuma capacidade ficou duplicada;
- nenhuma fonte concorrente foi criada;
- nenhuma capacidade existente foi reimplementada desnecessariamente.

## Avalie Valor Marginal

Para mudanças relevantes, pergunte qual ganho existe em relação ao baseline adequado:

- sem a Skill;
- com a versão anterior;
- ou utilizando uma Skill existente equivalente.

Avalie, quando fizer sentido:

- correção;
- confiabilidade;
- qualidade das decisões;
- redução de redescoberta;
- redução de trabalho desnecessário;
- custo de contexto;
- consistência;
- capacidade de concluir a tarefa.

Uma nova Skill não demonstra valor se apenas reproduzir capacidade já disponível em outra.

## Teste o Acionamento

Uma Skill precisa entrar nas situações corretas e permanecer fora das situações erradas.

Observe:

- casos positivos;
- near-misses;
- Skills vizinhas;
- possíveis conflitos de triggering.

Quando duas Skills forem frequentemente acionáveis para exatamente a mesma intenção, investigue sobreposição antes de tentar apenas ajustar suas descrições.

O problema pode estar na arquitetura das capacidades, não no triggering.

## Corrija Causas Gerais

Quando uma execução revelar falha:

1. determine por que o agente tomou a decisão incorreta;
2. identifique a capacidade ou critério ausente;
3. verifique se essa capacidade já existe;
4. determine se existe uma classe maior de falhas;
5. corrija a menor causa geral suficiente;
6. verifique casos relacionados.

Não adicione imediatamente uma nova Skill, nova proibição ou nova exceção para o exemplo específico.

## Critério de Conclusão

Uma Skill está bem projetada quando:

- sua existência possui justificativa real;
- nenhuma Skill existente já cobre integralmente sua capacidade;
- sobreposições parciais foram resolvidas conscientemente;
- existe uma fonte canônica para cada capacidade compartilhada;
- representa uma responsabilidade coerente;
- seu `name` e `description` permitem descoberta adequada;
- seu corpo contém apenas procedimento de alto sinal;
- capacidades condicionais independentes são reutilizadas em vez de copiadas;
- o comportamento generaliza além dos exemplos que originaram a Skill;
- ela produz ganho material de capacidade ou confiabilidade;
- seu tamanho é proporcional ao valor produzido.

## Regra Final

> Antes de criar uma Skill, procure a capacidade. Se ela já existir, reutilize, chame ou evolua sua fonte canônica. Crie uma nova Skill somente quando houver capacidade reutilizável, coerente e materialmente distinta. Otimize o sistema para capacidade, não para quantidade de Skills.
