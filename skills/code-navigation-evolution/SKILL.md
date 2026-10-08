---
name: code-navigation-evolution
description: Avalie e projete melhorias permanentes do Code Awareness Channel/Code Navigation quando o uso revelar overfetching, underfetching, múltiplas chamadas desnecessárias ou primitiva ausente. Exija capacidade reutilizável e prova de valor marginal. Para apenas explorar e ler código use code-navigation; não interrompa uma investigação para otimização especulativa.
---

# code navigation evolution

Esta Skill governa somente a **evolução estrutural** da ferramenta, não sua operação rotineira. Use `code-navigation` quando for necessário investigar um incidente ou navegar pelo repositório usando a capacidade atual. Preserve evidências e fronteiras operacionais existentes, sem abrir um catálogo duplicado.

## Evolução de Code Navigation

Code Navigation não é estática.

Durante o uso, observe oportunidades de melhorar:

- precisão;
- signal density;
- progressive disclosure;
- granularidade;
- seleção;
- observabilidade;
- número de etapas;
- reconstrução manual.

Não interrompa toda investigação para aperfeiçoá-lo, mas não normalize fricção recorrente.

## Capability Opportunities

Considere uma nova capacidade quando ocorrer um padrão como:

- várias chamadas repetidas para obter uma informação conceitualmente simples;
- reconstrução manual recorrente de uma informação que o sistema poderia projetar;
- overfetching inevitável;
- underfetching previsível;
- leitura de source apenas para escolher um target;
- informação necessária existente internamente, mas não exposta;
- inferência repetida onde o sistema poderia fornecer prova direta;
- falta de observabilidade que impede localizar uma fronteira;
- procedimento manual repetitivo que poderia virar primitive.

Pergunta central:

> Uma capacidade nativa permitiria obter mais sinal com menos chamadas, contexto, ambiguidade ou inferência?

## Não compense uma primitive ausente com procedimento permanente

Regra:

> **Do not compensate procedurally for a missing primitive.**

Se uma informação simples e recorrente exige uma sequência complexa de chamadas, não transforme essa sequência em ritual permanente.

Avalie se a necessidade deve virar capacidade nativa.

Runtime Identity é o exemplo canônico:

Antes:

comportamento antigo

→ System Health

→ source

→ testes

→ inferir runtime desatualizado.

Depois:

`get_runtime_identity`

→ `SOURCE_CHANGED_SINCE_START`

→ restart.

A melhoria remove inferência e transforma suspeita em evidência.

## Proof of Marginal Value

Antes de criar uma capacidade, compare com o baseline.

Avalie:

- chamadas;
- tokens;
- source bruto;
- ambiguidade;
- reconstrução manual;
- precisão;
- seleção do próximo alvo.

Uma nova capacidade deve produzir ganho claro em pelo menos uma dessas dimensões sem introduzir ruído ou responsabilidade incoerente.

Não crie tool apenas porque a informação pode ser exposta.

## Ferramenta nova é último recurso

Antes de nova operação pública, avalie:

1. melhorar representação existente;
2. adicionar filtro opcional;
3. adicionar projeção coerente;
4. reutilizar CodeTargets;
5. combinar conhecimento já disponível;
6. somente então criar nova tool.

Preserve progressive disclosure.

Evite mega-tools e tool sprawl.

## Harness Improvement

Quando houver ganho geral comprovado:

**incident/use case**

→ baseline

→ desperdício ou lacuna

→ capacidade mínima

→ prova marginal

→ Harness

→ validação E2E

→ capacidade permanente.

Proteja quando relevante:

- precisão;
- formato;
- signal density;
- token economy;
- número de etapas;
- triggering positivo;
- near-misses;
- regressões de navegação.

## Não faça overfitting

Uma investigação difícil isolada não justifica mudança.

Pergunte:

- isso representa uma categoria coerente de problemas?
- ocorrerá novamente?
- a solução reduz trabalho geral?
- preserva progressive disclosure?
- o ganho supera a complexidade?

Resolva causas gerais, não exemplos isolados.

