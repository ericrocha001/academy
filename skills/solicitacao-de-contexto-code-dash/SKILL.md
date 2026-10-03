---
name: solicitacao-de-contexto-code-dash
description: Transforma necessidades específicas de contexto de um repositório em solicitações mínimas, progressivas e válidas para o Code Dash. Use quando for necessário decidir quais arquivos solicitar ao Code Dash, escolher individualmente entre source e compression, expandir contexto de forma escalonada ou emitir e validar requests code-dash/v1 sem carregar contexto desnecessário.
---

# Solicitação de Contexto para o Code Dash

## Objetivo

Transforme uma necessidade concreta de informação sobre o repositório em uma solicitação válida, mínima e eficiente para o Code Dash.

O objetivo não é fornecer o máximo de contexto possível.

Forneça contexto suficiente para a necessidade atual, com o mínimo de ruído e pelo menor custo de janela que preserve a evidência necessária.

Use como regra central:

> Contexto suficiente, não contexto máximo.

Cada arquivo precisa justificar o espaço que ocupa na janela.

## Papel do Code Dash

Trate o Code Dash como mecanismo de aquisição seletiva de contexto profundo do Code Awareness.

Ele recebe uma solicitação declarativa com arquivos específicos e devolve as representações solicitadas em XML.

Não use o Code Dash como:

- leitura indiscriminada do repositório;
- coleta preventiva de arquivos;
- substituição do mapa arquitetural;
- mecanismo para maximizar contexto;
- carregamento de dependências inteiras por precaução.

Use-o para responder à pergunta:

> Qual informação concreta ainda falta para que a decisão atual possa ser tomada com segurança?

## Comece pela Necessidade Informacional

Antes de selecionar arquivos, determine internamente:

1. qual decisão, investigação ou implementação está bloqueada;
2. qual informação ainda falta;
3. por que essa informação pode alterar ou desbloquear a decisão;
4. se o conteúdo concreto de um arquivo é realmente necessário para obtê-la.

Não comece perguntando quais arquivos parecem relacionados.

Comece pela informação necessária e procure o menor conjunto capaz de fornecê-la.

Se não for possível explicar por que um arquivo é necessário, não o solicite ainda.

## Use Aquisição Progressiva

Quando houver uma representação arquitetural ou estrutural disponível, use como referência:

**Mapa → Compression → Source cirúrgico**

Não é obrigatório passar pelos três níveis.

Pare assim que o contexto for suficiente.

Use o mapa para descobrir:

- módulos;
- responsabilidades;
- relações;
- contratos prováveis;
- fronteiras da mudança;
- arquivos candidatos.

Não solicite conteúdo profundo para descobrir algo que a representação estrutural já informa com segurança.

Depois de cada aquisição:

1. retorne à pergunta original;
2. determine o que ficou esclarecido;
3. identifique a incerteza relevante restante;
4. solicite somente a informação adicional necessária;
5. pare imediatamente quando houver evidência suficiente.

Não carregue antecipadamente uma cadeia inteira de dependências.

Siga uma dependência somente quando o contexto já adquirido demonstrar que ela se tornou decisiva.

## Selecione Arquivos pela Informação que Eles Fornecem

Inclua um arquivo somente quando seu conteúdo puder fornecer informação diretamente necessária.

Pergunte para cada candidato:

> Se este arquivo não for recebido, alguma informação necessária continuará inacessível?

Se não, remova-o.

Priorize conforme a necessidade, não por proximidade.

Não inclua arquivos apenas porque:

- estão no mesmo diretório;
- têm nomes parecidos;
- são importados pelo arquivo principal;
- pertencem à mesma feature;
- foram alterados recentemente;
- podem ser úteis depois.

Relacionamento não implica necessidade contextual.

Antes de selecionar ou expandir arquivos, leia `references/selecao-de-contexto.md` quando precisar de critérios mais detalhados para minimalidade, ordem, testes, contratos, repetição de contexto ou expansão progressiva.

## Escolha `compression` ou `source` Individualmente

Cada item usa exatamente uma representação:

- `compression`;
- `source`.

Não existe representação padrão universal.

### Use `compression` quando

A representação condensada preservar tudo o que é necessário para a decisão atual.

Ela tende a ser adequada para:

- implementações grandes;
- services;
- orquestradores;
- adapters extensos;
- módulos densos;
- responsabilidades;
- fluxo;
- dependências;
- relacionamentos;
- estrutura geral de comportamento.

Pergunte:

> Preciso compreender como esta parte funciona ou preciso conhecer exatamente como ela está escrita?

Se compreensão estrutural for suficiente, prefira `compression`.

### Use `source` quando

Fidelidade literal for necessária.

Ela tende a ser adequada para:

- contratos;
- interfaces;
- tipos;
- protocolos;
- testes;
- assinaturas críticas;
- arquivos pequenos;
- semântica exata;
- lógica em que pequenos detalhes mudam a decisão;
- implementação que precisa ser examinada literalmente.

Use a seguinte regra:

> Compression pode sustentar compreensão, mas não uma decisão que dependa exatamente do detalhe omitido pela compressão.

Não escolha `source` apenas para se sentir mais seguro.

Não escolha `compression` apenas para economizar.

Escolha a representação mais econômica que preserve toda a informação necessária.

É válido adquirir primeiro um arquivo em `compression` e depois solicitar `source` se surgir uma nova necessidade de literalidade.

Não faça esse upgrade preventivamente.

## Não Repita Contexto sem Motivo

Em aquisições posteriores:

- não repita arquivos já adquiridos;
- não peça novamente a mesma representação;
- não repita contexto apenas para relembrar o modelo.

Repita um arquivo somente quando:

- a representação anterior se tornou insuficiente;
- outra representação passou a ser necessária;
- o conteúdo pode ter mudado e essa mudança é relevante.

## Use Somente Caminhos Confiáveis

Use paths obtidos de:

- representação arquitetural;
- contexto fornecido pelo usuário;
- conteúdo já adquirido;
- consultas anteriores;
- fontes confiáveis do repositório.

Nunca invente paths.

Se o caminho exato for desconhecido, primeiro obtenha uma forma confiável de identificá-lo.

## Emita Apenas o Request Declarativo

Quando chegar o momento de emitir uma solicitação, produza apenas o JSON do protocolo.

Não inclua no request:

- explicações;
- justificativas;
- comentários;
- instruções ao pipeline;
- metadados inventados.

A inteligência sobre por que os arquivos foram escolhidos pertence ao agente, não ao protocolo.

Antes de emitir qualquer request, leia `references/protocolo-code-dash.md`.

Esse arquivo contém o contrato canônico, campos permitidos, regras de path, deduplicação, códigos de erro, checklist defensivo e template de saída.

Nunca improvise o protocolo a partir da memória quando a referência estiver disponível.

## Fluxo Canônico

Use este fluxo:

1. **Necessidade** — determine a informação faltante.
2. **Mapa** — use a representação estrutural disponível para orientar a busca.
3. **Candidatos** — selecione apenas arquivos capazes de fornecer a informação.
4. **Minimalidade** — remova candidatos não essenciais.
5. **Representação** — escolha `compression` ou `source` por arquivo.
6. **Ordem** — organize os itens pela prioridade de compreensão.
7. **Validação** — confira integralmente o contrato do protocolo.
8. **Emissão** — produza somente o JSON.
9. **Reavaliação** — após receber o resultado, volte à necessidade original.
10. **Expansão ou parada** — peça somente o que ainda falta ou encerre a aquisição.

## Ordem de Leitura

Quando não houver motivo específico para outra ordem, considere:

1. contratos;
2. interfaces;
3. tipos;
4. testes relevantes;
5. componentes de orquestração;
6. serviços;
7. adapters;
8. detalhes internos.

Essa ordem é heurística.

A necessidade informacional sempre prevalece.

O pipeline preserva a ordem dos itens. Use-a para facilitar a compreensão do consumidor.

## Testes como Contexto

Use testes como fonte de evidência quando a decisão depender de:

- comportamento esperado;
- contratos observáveis;
- casos de borda;
- regressões;
- semântica atualmente protegida.

Quando o detalhe das expectativas do teste importar, solicite o teste em `source`.

Não presuma que um teste existente está correto só porque existe.

Interprete-o como evidência.

Não solicite toda a suíte quando um teste relevante basta.

## Contratos Antes de Implementações Densas

Quando o problema envolver interação entre módulos, procure compreender primeiro:

- interfaces;
- tipos;
- contratos;
- fronteiras.

Isso frequentemente elimina a necessidade de carregar implementações inteiras.

Para decisões arquiteturais, uma combinação como:

**mapa + contratos em source + implementações densas em compression**

pode fornecer mais sinal do que a leitura integral de todo o subsistema.

## Minimalidade em Duas Dimensões

Antes de emitir o request, pergunte:

> Qual item posso remover sem perder informação necessária?

Remova tudo o que não pagar seu custo contextual.

Depois pergunte:

> Algum `source` pode virar `compression` sem perder informação relevante?

Se sim, troque.

Otimize simultaneamente:

- número de arquivos;
- profundidade de representação.

Não maximize confiança por volume.

Confiança deve vir de evidência relevante.

## Falhas de Aquisição

Um request estruturalmente válido ainda pode falhar ao resolver arquivos.

Quando houver `not_found`, `ambiguous` ou falha equivalente:

1. determine qual informação deixou de ser obtida;
2. confirme se ela continua necessária;
3. descubra o path correto por fonte confiável;
4. corrija somente a aquisição afetada.

Não compense falha de localização solicitando vários arquivos próximos.

Trate um problema de localização como problema de localização.

Leia `references/protocolo-code-dash.md` ao diagnosticar erros de contrato ou resolução.

## Aplicação no Fluxo de Engenharia

Quando esta skill for usada durante planejamento arquitetural, handoff de bloqueio, definição de validação ou preparação de contexto para implementação, leia `references/integracao-com-fluxo.md`.

Esse arquivo contém as regras específicas para:

- Arquiteto;
- Handoff de Bloqueio;
- decisões arquiteturais;
- contexto de validação;
- Perfil Mínimo;
- separação entre contexto do Arquiteto e do Implementador;
- Harness Improvement Opportunities.

Não carregue essa referência quando a tarefa for apenas construir ou validar um request isolado.

## Evite Context Dump

Nunca use o Code Dash para produzir um grande despejo de contexto como substituto de engenharia de contexto.

Use:

**descobrir → selecionar → aprofundar → decidir**

Não use:

**coletar tudo → esperar que o modelo encontre o que importa**

Mais contexto pode reduzir a qualidade quando adiciona ruído sem adicionar evidência.

## Armadilhas Principais

Evite:

### Pedir tudo inicialmente

Use aquisição escalonada.

### Usar `source` como padrão

Avalie se `compression` preserva a informação necessária.

### Usar `compression` como padrão cego

Suba para `source` quando literalidade for decisiva.

### Pedir dependências antecipadamente

Siga dependências somente quando elas se tornarem relevantes.

### Inventar paths

Use somente caminhos obtidos de fontes confiáveis.

### Repetir contexto

Adquira somente informação nova, salvo necessidade objetiva de outra representação ou atualização.

### Pedir por precaução

Exija necessidade informacional concreta.

### Continuar depois de resolver

Pare imediatamente quando a decisão puder ser tomada com segurança.

## Critério de Conclusão

A aquisição está suficiente quando:

- a necessidade informacional original foi respondida;
- a decisão bloqueada pode ser tomada com segurança;
- nenhuma incerteza material restante justifica novo contexto;
- todos os arquivos solicitados contribuíram para a necessidade;
- nenhuma representação mais profunda foi carregada sem necessidade;
- o request respeita integralmente o protocolo.

Não continue adquirindo contexto para aumentar conforto.

Adquira contexto apenas enquanto ele reduzir incerteza relevante.

## Regra de Ouro

> Forneça ao agente somente a informação necessária para a decisão atual, na representação mais econômica que preserve toda a evidência relevante. Adquira progressivamente e pare no instante em que o contexto se tornar suficiente.
