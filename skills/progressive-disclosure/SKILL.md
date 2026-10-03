---
name: progressive-disclosure
description: Use quando for necessário organizar contexto, conhecimento, Skills, ferramentas, documentos, código ou evidências em níveis de descoberta e aprofundamento, para evitar carregar informação antes que ela seja relevante. Define como partir de representações baratas, selecionar somente o necessário e aprofundar progressivamente. Não use apenas para reduzir tamanho de arquivos nem para dividir capacidades sem uma fronteira coerente.
---

# Progressive Disclosure

## Finalidade

Esta Skill define como revelar contexto e capacidade **somente quando sua relevância estiver demonstrada**.

Seu objetivo é:

> **maximizar informação útil por unidade de contexto ativo.**

Progressive Disclosure não significa esconder informação.

Significa tornar informação:

- descobrível;
- selecionável;
- aprofundável;
- carregada no momento correto.

## Princípio Fundamental

Use:

> **Descobrir → Selecionar → Aprofundar**

Comece pela representação de menor custo capaz de orientar a próxima decisão.

Aprofunde apenas quando o nível atual não for suficiente.

Pare quando informação adicional provavelmente não alterar mais a decisão.

## Contexto é Recurso Finito

Não carregue contexto apenas porque ele pode vir a ser útil.

Todo conteúdo ativo compete por:

- atenção do modelo;
- janela de contexto;
- tokens;
- capacidade de distinguir sinal de ruído.

Pergunte sempre:

> **Esta informação é necessária para a decisão atual ou apenas potencialmente relevante?**

Potencial relevância, sozinha, não justifica carregamento.

## Níveis Conceituais

Use níveis de profundidade conforme o domínio.

### Nível 0 — Descoberta

Representação barata que permite saber o que existe.

Exemplos:

- `name` e `description` de Skills;
- nomes e descrições de ferramentas;
- mapa estrutural;
- índice;
- metadata;
- resumo de estado;
- lista de documentos;
- assinatura ou símbolo.

O objetivo é orientar seleção.

Não resolver a tarefa inteira.

### Nível 1 — Capacidade Principal

Aprofunde somente na capacidade selecionada.

Exemplos:

- `SKILL.md`;
- relações relevantes de código;
- assinatura detalhada;
- seção específica de documento;
- resumo de componente;
- Plano relevante;
- Handoff relevante.

Esse nível deve frequentemente ser suficiente.

### Nível 2 — Especialização Adicional

Quando uma capacidade condicional coerente for necessária, utilize outra Skill especializada.

Exemplo:

```text
harness-improvement
↓
precisa decidir forma do produto
↓
harness-productization
```

ou:

```text
skill-engineering
↓
precisa avaliar triggering
↓
surgical-evals
```

No Sistema de Engenharia Agentiva, conhecimento procedural reutilizável deve preferencialmente ser aprofundado por **composição entre Skills**.

### Nível 3 — Evidência ou Source

Carregue material literal ou detalhado somente quando a decisão realmente depender dele.

Exemplos:

- source completo;
- logs relevantes;
- saída bruta;
- documento integral;
- benchmark detalhado;
- evidência experimental;
- implementação de ferramenta.

Esse é geralmente o nível mais caro.

Não comece por ele sem necessidade.

## Skills Chamam Skills

No Sistema de Engenharia Agentiva, Progressive Disclosure procedural segue preferencialmente:

```text
índice nativo
↓
Skill principal
↓
necessidade especializada
↓
Skill especializada
```

Não concentre conhecimento procedural condicional dentro de uma mega-Skill apenas para evitar composição.

Também não divida mecanicamente uma Skill apenas para reduzir tamanho.

Promova uma parte para Skill própria quando ela possuir:

- responsabilidade coerente;
- intenção distinguível;
- valor reutilizável;
- possibilidade real de uso independente ou por múltiplas capacidades.

> **Divida por capacidade, não por contagem de palavras.**

Como heurística, prefira Skills pequenas e coesas, idealmente com até cerca de 1.600 palavras.

Esse valor é orientação arquitetural, não limite rígido.

Uma Skill maior é aceitável quando sua responsabilidade permanecer verdadeiramente única e coesa.

## Metadata como Índice

Para Skills, `name` e `description` formam o primeiro nível de descoberta.

Projete-os para permitir selecionar a capacidade correta antes de carregar seu corpo.

Não duplique catálogos manuais de Skills quando a plataforma já oferece índice nativo.

A qualidade do Progressive Disclosure começa pela qualidade da metadata.

## Código

Para código, prefira:

```text
estrutura ampla
↓
relações / símbolos / assinaturas
↓
trechos relevantes
↓
source completo somente quando necessário
```

Não leia arquivos completos apenas porque estão próximos do problema.

Aprofunde de acordo com a incerteza restante.

## Ferramentas

Para ferramentas:

```text
descoberta da capacidade
↓
seleção da ferramenta
↓
detalhes operacionais necessários
↓
execução
```

Não carregue documentação completa de todas as ferramentas antes de saber qual será utilizada.

## Documentação

Para documentação:

```text
índice / título / resumo
↓
seção relevante
↓
documento completo se necessário
```

Não trate documento inteiro como unidade mínima de contexto.

## Evidência

Para evidência:

```text
conclusão relevante
↓
evidência resumida
↓
dados brutos somente se necessários
```

Não despeje logs ou resultados completos quando uma observação compacta já sustenta a decisão.

## Estado e Handoffs

Transfira estado sem transferir toda a história da sessão.

Prefira:

```text
estado atual
+
evidência relevante
+
incerteza restante
+
próxima decisão
```

a:

```text
histórico completo
```

Isso reduz reconstrução e ruído.

## Fonte de Verdade

Progressive Disclosure não autoriza duplicação.

Uma informação pode aparecer em diferentes níveis de representação, mas deve permanecer claro qual fonte é autoritativa.

Prefira:

- representação derivada;
- referência à capacidade canônica;
- composição entre Skills;

em vez de copiar regras independentes para múltiplos lugares.

## Critério de Aprofundamento

Aprofunde quando o nível atual não permitir:

- tomar decisão segura;
- distinguir alternativas relevantes;
- verificar hipótese importante;
- executar corretamente a próxima ação;
- demonstrar propriedade necessária.

Não aprofunde apenas por curiosidade ou completude.

## Critério de Parada

Pare quando contexto adicional:

- não mudar a decisão;
- não reduzir incerteza relevante;
- não alterar execução;
- não fortalecer evidência necessária.

> **Contexto suficiente é melhor que contexto máximo.**

## Anti-Padrões

Evite:

**Source first**

Começar pelo material mais caro.

**Contexto preventivo**

Carregar tudo antes de saber o que será necessário.

**Mega-Skill**

Concentrar várias capacidades independentes num único corpo permanente.

**Fragmentação artificial**

Criar Skills pequenas sem responsabilidade própria.

**Índice duplicado**

Replicar manualmente discovery já fornecido pela plataforma.

**Context dump**

Transferir material bruto quando estado semântico basta.

**Aprofundamento automático**

Assumir que cada nível sempre precisa levar ao próximo.

**Duplicação de verdade**

Copiar o mesmo contrato ou procedimento para múltiplas Skills.

## Relação com Harness Productization

Quando a dúvida for:

> Qual produto de Harness deve representar esta capacidade?

utilize `harness-productization`.

Quando a dúvida for:

> Como essa capacidade deve ser descoberta e aprofundada sem inflar contexto?

utilize esta Skill.

## Relação com Skill Engineering

`skill-engineering` define como projetar uma Skill coerente.

Esta Skill pode ser utilizada quando a estrutura de uma capacidade exigir decisões sobre:

- composição entre Skills;
- tamanho do contexto ativo;
- descoberta;
- aprofundamento;
- separação de capacidades condicionais.

Não transforme Progressive Disclosure em justificativa automática para criar novas Skills.

A fronteira continua sendo capacidade coerente.

## Critério de Conclusão

A estratégia de Progressive Disclosure está adequada quando:

- existe uma representação barata de descoberta;
- a próxima camada só entra por necessidade;
- capacidades especializadas permanecem separadas quando possuem responsabilidade própria;
- material caro não entra antecipadamente;
- informação necessária continua encontrável;
- fonte de verdade permanece clara;
- existe uma regra de parada.

## Regra Final

> **Comece pela representação mais barata capaz de orientar a próxima decisão. Se ela não bastar, aprofunde somente na capacidade relevante. Prefira composição entre Skills para conhecimento procedural especializado, preserve fontes de verdade e pare assim que contexto adicional deixar de reduzir incerteza útil.**
