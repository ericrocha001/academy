---
name: code-navigation
description: Use e evolua Code Navigation através do Code Awareness Channel para compreender e investigar um repositório com alto sinal e baixo ruído, começando por discovery e aprofundando somente o necessário com estrutura, relações, referências, dependências, hierarquia e source literal. Use ao localizar código, formar escopo, entender arquitetura, seguir símbolos, selecionar contexto ou identificar oportunidades para Code Navigation entregar informação mais precisa com menos navegação. Não use para dumps amplos do codebase nem para insistir na navegação quando a própria região quebrada impede sua leitura; nesses casos use o caminho break-glass apropriado.
---

# Code Navigation

## Finalidade

Use Code Navigation, exposta pelo Code Awareness Channel, para construir contexto do repositório com **progressive disclosure** e alta eficiência informacional.

Objetivo:

> Obter somente a informação necessária para tomar a próxima decisão correta.

Fluxo preferencial:

**discover → inspect → relate → follow symbols → read source**

Não comece lendo código arbitrariamente.

## Pure Signal

A filosofia central é:

> **Maximize signal. Minimize noise.**

Uma boa interação com Code Navigation:

- reduz incerteza;
- elimina candidatos;
- identifica o próximo alvo;
- evita source desnecessário;
- evita reconstrução manual;
- não exige filtrar grandes volumes de contexto irrelevante.

Eficiência não significa simplesmente menos chamadas.

Significa:

> máximo sinal útil por unidade de contexto, esforço e navegação.

Duas chamadas pequenas podem ser melhores que uma grande. Uma chamada adicional é valiosa quando elimina ambiguidade ou evita leitura muito maior.

## Ferramentas

Code Navigation expõe, através do Code Awareness Channel:

- `discover_repository`
- `inspect_files`
- `get_relationships`
- `get_references`
- `get_symbol_dependencies`
- `get_symbol_hierarchy`
- `read_code`

O Channel também expõe capacidades operacionais irmãs, como:

- `get_system_health` — localização diagnóstica;
- `get_runtime_identity` — identidade e freshness do runtime.

Não trate essas capacidades como parte de Code Navigation. Elas compartilham o Channel, mas possuem responsabilidades próprias.

Cada ferramenta ou capability responde uma pergunta diferente.

Não use uma representação mais profunda quando uma mais barata já resolver a decisão.

## Progressive Navigation

**Onde está?**

→ `discover_repository`

**O que existe nesses arquivos?**

→ `inspect_files`

**Quais arquivos se relacionam?**

→ `get_relationships`

**Onde este símbolo é usado?**

→ `get_references`

**Do que este símbolo depende?**

→ `get_symbol_dependencies`

**Quem implementa, estende ou deriva deste símbolo?**

→ `get_symbol_hierarchy`

**Como exatamente isso funciona?**

→ `read_code`

Cada etapa deve tornar a próxima mais específica.

## `discover_repository`

Use para consciência espacial barata.

Comece pela raiz ou pela menor região já conhecida e expanda progressivamente.

Use para:

- localizar subsistemas;
- descobrir arquivos;
- formar escopo inicial;
- confirmar ownership provável.

Não peça recursivamente a árvore inteira sem necessidade.

Discovery localiza. Não explica comportamento interno.

## `inspect_files`

Use quando os arquivos candidatos já forem conhecidos.

Obtém:

- outline;
- elementos;
- CodeTargets;
- signatures opcionais.

Prefira `signatures: false` quando nomes e estrutura bastarem.

Use `signatures: true` somente quando assinaturas alterarem a seleção.

Se o outline resolver a pergunta, não leia source.

## Relações e CodeTargets

Use `get_relationships` para imports/importers imediatos.

Prefira um hop e `details: false`, salvo quando detalhes forem discriminantes.

Quando um símbolo específico se tornar relevante, passe de arquivo para **CodeTarget**.

Use:

- `get_references` para consumidores/usos;
- `get_symbol_dependencies` para dependências diretas;
- `get_symbol_hierarchy` para `extends`, `implements`, bases e derivados.

Ausência de referências ou relações representa apenas o conhecimento resolvido pelo CodeMap. Não trate automaticamente como prova absoluta de ausência no source.

## `read_code`

Use por último.

Leia source quando:

- implementação determina comportamento;
- uma hipótese precisa ser confirmada;
- estrutura não basta;
- outra evidência já delimitou o componente.

Leia somente os targets necessários.

> **Source é profundidade máxima, não ponto de partida.**

## Context First

Antes de pedir source, determine:

- responsabilidade investigada;
- arquivos candidatos;
- elementos relevantes;
- relações necessárias.

A meta não é contexto máximo.

É:

> **o menor contexto suficiente para continuar corretamente.**

Antes de cada chamada, pergunte:

> Qual decisão esta resposta permitirá tomar?

Depois:

> O espaço de busca diminuiu?

Se a resposta não altera a próxima decisão, a chamada provavelmente teve baixo valor informacional.

## Runtime Identity

`get_runtime_identity` responde:

> Qual runtime está realmente atendendo esta requisição e ele corresponde ao source atual?

Ele é independente de CodeMap e deve continuar disponível mesmo quando snapshot, maintenance ou navegação de código estiverem degradados.

Use quando:

- implementação acabou de mudar;
- runtime acabou de ser reiniciado;
- comportamento contradiz o source;
- testes indicam correção, mas o comportamento permanece antigo;
- validação E2E contradiz a implementação;
- uma falha histórica pode pertencer a outra instância;
- é importante provar que um restart realmente carregou nova instância.

Não use rotineiramente em navegação arquitetural que depende apenas do source.

## Freshness

Interprete:

**`MATCH`**

O conjunto de source monitorado corresponde ao estado observado quando o runtime iniciou.

Continue normalmente.

**`SOURCE_CHANGED_SINCE_START`**

O source atual divergiu do runtime iniciado.

Não assuma que o source atual explica o comportamento observado.

Use os arquivos divergentes para compreender a mudança e prefira:

> `RESTART_RUNTIME`

antes de aprofundar uma investigação baseada nessa contradição.

Depois do restart, confirme:

- novo `instanceId`;
- novo `startedAt`;
- `MATCH`.

**`UNVERIFIABLE`**

A correspondência não pôde ser provada.

Não transforme ausência de prova em `MATCH`.

## Runtime Identity não é System Health

São dimensões independentes.

**System Health**

> Onde a execução operacional falhou?

**Runtime Identity**

> Qual instância está executando e ela corresponde ao source atual?

É válido existir:

`System Health = OPERATIONAL`

e:

`Runtime Freshness = SOURCE_CHANGED_SINCE_START`.

Freshness divergente não é automaticamente falha operacional.

## Investigação de bugs

Quando houver:

- timeout;
- comportamento degradado;
- integração quebrada;
- resultado operacional inesperado;

use a Skill `system-health-debugging` primeiro.

Fluxo:

**System Health**

→ fault scope

→ deepest proven progress

→ diagnostic frontier

→ investigation target/seeds

→ Code Navigation.

Não reinicie a investigação pela raiz quando System Health já delimitou a região.

Se houver **contradição entre comportamento e source**, consulte também Runtime Identity antes de aprofundar.

Fluxo:

**behavior contradicts source**

→ `get_runtime_identity`

→ se `MATCH`, investigue normalmente

→ se `SOURCE_CHANGED_SINCE_START`, reinicie o runtime e revalide antes de atribuir a causa ao source atual.

## Deepest Proven Scope

Quando System Health fornecer:

- component;
- boundary;
- investigationSeeds;

comece nesse escopo.

Não reinspecione regiões comprovadamente saudáveis.

Se a falha envolver readiness e exigir mudança arquitetural, use `capability-readiness-design`.

Não aumente timeout automaticamente.

## Break-glass

Code Navigation pode depender da própria região quebrada.

Se:

- System Health localizou o problema;
- Code Navigation depende dessa região;
- chamadas deixam de fornecer contexto;

não insista.

Use Diagnostic Source Access para o **menor escopo já delimitado**:

- `diagnostic_list_directory` lista somente filhos imediatos;
- `diagnostic_read_file` lê somente um intervalo de linhas conhecido;
- `diagnostic_find_text` busca texto literal somente em arquivos explicitamente selecionados.

Esse acesso é read-only, restrito ao repositório ativo e independente de CodeMap, readiness e Context Engine. Não o use como navegador de filesystem, busca semântica alternativa ou substituto rotineiro de Code Navigation.

Ele também pode ser usado quando System Health estiver indisponível e o usuário solicitar explicitamente o diagnóstico direto apropriado.

Depois da correção, volte a Code Navigation e valide o fluxo normal.

Break-glass é fallback, não navegação padrão.

## Evite overfetching

Não faça:

`discover tudo`

→ `inspect dezenas de arquivos`

→ `relationships everywhere`

→ `read all`.

Prefira:

`discover`

→ poucos candidatos

→ `inspect`

→ poucos elementos

→ relações discriminantes

→ source mínimo.

Não reduza chamadas artificialmente. Reduza **chamadas desnecessárias**.

## Signal Density

Observe:

> Quanto da resposta foi realmente necessário para decidir o próximo passo?

Baixa densidade aparece quando retornamos:

- muitos elementos irrelevantes;
- metadata não utilizada;
- relações sem utilidade;
- source que precisa ser filtrado manualmente.

Alta densidade significa que a saída corresponde diretamente à decisão necessária.

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

## Quando parar

Pare de navegar quando houver contexto suficiente para:

- explicar causa;
- tomar decisão arquitetural;
- delimitar escopo;
- criar plano executável;
- confirmar ou rejeitar hipótese relevante.

Depois disso, contexto adicional tende a diminuir signal density.

## Princípios

> Maximize signal. Minimize noise.

> Cada chamada deve reduzir o espaço da próxima chamada.

> Descubra amplamente; aprofunde cirurgicamente.

> Contexto suficiente é melhor que contexto máximo.

> Source é profundidade máxima, não ponto de partida.

> Menos chamadas é consequência de melhor design informacional.

> Não compense permanentemente uma primitive ausente com procedimentos complexos.

> Uma nova capacidade deve provar ganho marginal.

> Evolua Code Navigation a partir de padrões reais de uso.

> Preserve progressive disclosure enquanto aumenta signal density.

> System Health localiza falhas operacionais.

> Runtime Identity confirma qual instância e source estão sendo observados.

> Code Navigation explica a arquitetura e o comportamento.

> Source confirma a implementação.

> Quando Code Navigation depender da própria região quebrada, use break-glass.

## Stop rule por degradação do canal

BUSY, CHANNEL_DEGRADED ou REQUEST_TIMEOUT indicam degradação do Code Awareness Channel e interrompem novas chamadas caras de Code Navigation. Use system-health-debugging para uma única localização e respeite recommendedAction/retryability/retryAfterMs; não alterne discover, inspect e read_code como retries equivalentes. Após backoff, permita uma única tentativa half-open. Se persistir a recusa ou degradação, use somente nextBestEvidence ou break-glass no escopo comprovado.

Chamadas repetidas que aumentam pressão operacional sem reduzir o espaço da próxima decisão são sinal negativo, mesmo quando seus argumentos diferem. Não compense indisponibilidade com maior paralelismo, polling ou dumps. Runtime Identity, System Health e evidências leves continuam sendo caminhos independentes quando a navegação está ocupada.
