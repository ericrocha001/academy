---
name: solicitacao-de-contexto-code-dash
description: Formule um request JSON code-dash/v2 sobre o Code Map quando o Code Dash for o canal escolhido ou fallback de contexto: find, follow, set e emit com seleção mínima. Não use para navegação direta pelo Code Awareness Channel; nesse caso use code-navigation.
---

# Solicitação de contexto pelo Code Dash

Comece pela informação que pode alterar a decisão atual. Converta essa necessidade em seleção determinística e projeção explícita. O caminho normal é uma solicitação JSON, uma execução no Code Dash e um Context Packet copiado.

Não exija um mapa prévio do repositório. Quando paths forem desconhecidos, use termos lexicais da necessidade em filtros de name, signature ou path. Esses termos são hipóteses explícitas, não conhecimento confirmado. Não invente paths exatos. Use paths exatos somente quando houver evidência.

A interpretação semântica pertence ao agente. O Code Dash não interpreta intent, não usa sinônimos automáticos, não ranqueia candidatos e não amplia consultas vazias.

## Construção do pedido

1. Defina a pergunta concreta e os campos que a responderiam.
2. Use find para selecionar arquivos ou elementos por filtros lexicais explícitos.
3. Se a pergunta exigir uma relação, acrescente follow a partir de um step anterior. Cada follow atravessa exatamente um hop.
4. Use set somente para combinar conjuntos do mesmo tipo que já foram encontrados.
5. Coloque em emit somente os conjuntos e campos necessários à pergunta. Um conjunto encontrado e não emitido fica fora do pacote.
6. Especifique expect com min e max em todo step, incluindo set. Use limites pequenos que expressem a cardinalidade admissível.
7. Use limits.maxTokens como teto da representação final. Excesso falha integralmente.
8. Confira o contrato em references/protocolo-code-dash.md e emita somente o JSON, sem comentários ou explicações externas.

Metadados como path, name, kind e signature muitas vezes bastam para localizar um alvo. Peça source somente quando literalidade for necessária. Source de elemento é seu range exato: não inclui pai, irmãos, imports ou arquivo inteiro. FileSource é excepcional e precisa de necessidade explícita.

Relacionamentos produzem conjuntos, não autorizações de source. Dependencies e references podem ser emitidos somente em metadados. Não carregue cadeias inteiras por precaução.

## Pure Signal

Nada entra no Context Packet sem emit. Cada campo em include deve justificar seu custo contextual.

Não acrescente vizinhos, testes, arquivos relacionados ou campos extras por conforto. Associação automática de testes, traversal transitivo, busca semântica, ranking e campos agregados como details/full não existem no protocolo.

Entidades repetidas entre emits geram um único registro com a união dos campos pedidos. A ordenação é canônica; a ordem de emit não define prioridade de leitura.

O Resolution Report é diagnóstico para o usuário. O botão Copiar contexto copia somente o Context Packet. Não inclua relatório, candidatos descartados, falhas ou contagens na evidência enviada à IA.

## Refinamento por evidência

Uma segunda solicitação é justificável quando a saída ou uma falha criou uma nova pergunta concreta. Não imponha ciclos preventivos de discovery e aprofundamento.

NOT_FOUND não autoriza widening automático. CARDINALITY_MISMATCH exige revisão dos filtros com base na evidência disponível; não escolha o primeiro resultado nem aumente max apenas para despejar candidatos. Um nome como readCode pode existir em vários métodos: quando houver evidência do dono ou do path, acrescente esse filtro.

Se o orçamento for excedido, retire campos ou entidades que não sejam essenciais. Não peça truncamento. Se source estiver indisponível ou stale, trate a falha de recuperação; não substitua silenciosamente por arquivo inteiro.

Pare quando a necessidade estiver respondida. Só repita contexto quando nova evidência exigir atualização ou literalidade antes ausente.
