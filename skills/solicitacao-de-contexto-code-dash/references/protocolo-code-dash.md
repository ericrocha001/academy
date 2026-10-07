# Contrato code-dash/v2

Envelope: protocol obrigatório e exatamente "code-dash/v2"; intent opcional e não executável; steps e emit obrigatórios e não vazios; limits opcional com maxTokens inteiro positivo. Campos desconhecidos falham. JSON puro ou dentro de code fence é aceito.

Todos os steps possuem id único e expect: {min,max}, ambos inteiros não negativos, min <= max. Referências apontam somente para steps anteriores. Zero resultados é permitido quando min=0; caso contrário falha. Max nunca trunca candidatos.

## Steps

- Find: {id,find:"file"|"element",where:{campo:filtro,...},expect}. Where não pode ser vazio. Todos os campos e operadores de um filtro são combinados por AND.
- Follow: {id,from:"step",follow:"operador",expect}. Exatamente um hop.
- Set: {id,set:"union"|"intersect"|"subtract",from:["stepA","stepB"],expect}. Pelo menos dois inputs do mesmo tipo. Subtract remove do primeiro conjunto as identidades presentes nos demais.

Filtros textuais: exact, contains, containsAny, containsAll, startsWith. Valores são texto não vazio; containsAny/containsAll recebem arrays não vazios. Case-insensitive, com separação lexical previsível de camelCase, snake_case, kebab-case e espaços. Não há stemming, equivalência semântica ou sinônimos.

Campos file: path, language, extension, status, contextReference.
Campos element: name, kind, signature, path, visibility, granularity, retrievable.

Status, kind, visibility, granularity e retrievable aceitam somente exact ou in, com valores do Code Map. Retrievable usa boolean; visibility pode ser null. Não use offsets, hashes ou IDs de banco.

Tipos: find file gera file-set; find element gera element-set.

| Follow | Entrada | Saída |
|---|---|---|
| contains / containedBy | element-set | element-set |
| imports | file-set ou element-set com elementos kind import | file-set |
| importedBy | file-set | file-set |
| extends / extendedBy / implements / implementedBy | element-set | element-set |
| dependencies | element-set | element-set |
| references | element-set | reference-set |

Contains seleciona filhos diretos; containedBy seleciona pais diretos. Imports/importedBy usam somente imports internos. Hierarquia e dependências são relações diretas resolvidas. References são ocorrências resolvidas apontando para o alvo.

## Emit

Forma: {from:"step",include:["campo",...]}. Include não vazio e compatível com o tipo do step.

- File-set: path, language, extension, status, lines, bytes, tokenCount, contextReference, fileSource.
- Element-set: target, path, name, kind, signature, visibility, modifiers, returnType, granularity, lines, bytes, source.
- Reference-set: path, line, kind, sourceTarget.

Source e fileSource são as únicas autorizações de conteúdo literal. Não existe escolha de formato no request. Source exige Exact Retrieval; fileSource exige arquivo integral disponível e compatível com o índice. Ausência de um campo opcional solicitado é representada por null.

## Exemplo: necessidade de compreender a execução de pedidos do Dash

Este exemplo usa termos lexicais da necessidade, sem paths ou mapa prévio. A cardinalidade é uma hipótese explícita que pode falhar.

```json
{
  "protocol": "code-dash/v2",
  "steps": [
    {
      "id": "target",
      "find": "element",
      "where": {
        "name": {"contains": "dash"},
        "kind": {"exact": "class"}
      },
      "expect": {"min": 1, "max": 4}
    }
  ],
  "emit": [
    {"from": "target", "include": ["path", "signature", "source"]}
  ],
  "limits": {"maxTokens": 6000}
}
```

Se a pergunta for apenas localização, remova source e use name/signature/path. Se precisar de callers, acrescente follow references com expect limitado e emita somente path/line/kind/sourceTarget. Nenhuma relação carrega source implicitamente.

## Falhas

INVALID_JSON, UNKNOWN_PROTOCOL, UNKNOWN_FIELD, INVALID_STEP, DUPLICATE_STEP_ID, UNKNOWN_STEP_REFERENCE, TYPE_MISMATCH, UNKNOWN_OPERATOR, INVALID_FILTER, NOT_FOUND, CARDINALITY_MISMATCH, EXACT_SOURCE_UNAVAILABLE, STALE_SOURCE e BUDGET_EXCEEDED.

Falhas invalidam o pacote completo. Informações diagnósticas ficam no Resolution Report, fora do Context Packet. MaxTokens mede a string realmente copiável com o tokenizer canônico.
