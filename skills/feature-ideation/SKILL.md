---
name: feature-ideation
description: Identifique, formule e preserve Feature Ideas de produto quando surgirem em brainstorming, investigação, arquitetura, revisão ou uso real. Proponha melhorias espontâneas com gate de valor e registre no Continuum somente ideias distintas e aproveitáveis; não confunda com Capability Opportunity, investimento aprovado ou Plano executável.
---

# Feature Ideation

## Finalidade

Transformar boas hipóteses de produto — vindas do usuário **ou percebidas pelo próprio agente durante o trabalho** — em ideias recuperáveis, sem inflar o backlog, induzir execução nem desviar da tarefa principal.

Uma `FEATURE_IDEA` é uma **proposta de capacidade**. Não precisa comprovar falha ou demanda antes de poder ser preservada, mas deve deixar visível o que é evidência, inferência e hipótese. **Uma ideia registrada não é uma feature aprovada.**

## Trigger positivo e negativo

Acione quando o usuário pedir ideias, refinamento ou registro de uma feature, ou quando um trabalho revelar espontaneamente **uma possibilidade nova com consumidor e ganho plausíveis** que mereça sobreviver à sessão. Exemplos: percepção de uma lacuna agent-facing, nova composição de capacidades existentes ou simplificação estrutural relevante.

Não acione para cada melhoria estética, nome, refatoração, bug, correção contratual obrigatória, pequena escolha tática ou possibilidade sem ganho demonstrável. Quando fricção real revelar uma deficiência geral de capacidade, use `capability-opportunity` para qualificar a **causa evidenciada**; `FEATURE_IDEA` só se houver uma hipótese de produto distinta a preservar.

## Gate leve: merece existir como ideia?

Antes de publicar, responda concisamente:

1. **Problema e destinatário:** que dificuldade ou oportunidade a capacidade atende e quem se beneficiaria — humano, agente, operador ou subsistema?
2. **Diferença marginal:** qual ganho ela pode oferecer além do que já existe? Confira a capacidade atual somente até o suficiente para evitar duplicação óbvia.
3. **Hipótese mínima:** qual comportamento seria útil sem pressupor nova UI, store, workflow ou arquitetura?
4. **Durabilidade:** sobreviveria a mudanças previsíveis de modelo, IDE ou processo? Há motivo para recuperar a ideia depois?
5. **Separação de fatos:** marque experiência/evidência real versus suposição; não afirme que a feature está ausente ou implementada sem verificar.
6. **Identidade:** já existe Feature Idea, Work Item, investigação, capability ou plano canônico equivalente? Reutilize ou relacione, sem publicar duplicata.

Se o ganho for vago, a possibilidade for trivial ou já houver registro suficiente, **não crie Artifact**. No máximo mencione a ideia brevemente ao usuário. Ideação não deve competir com a tarefa atual.

## Registro no Continuum

Quando o usuário pedir registro, ou quando uma ideia autônoma e material surgir durante trabalho autorizado com acesso de escrita ao Continuum do **repositório ativo**, use `continuum-publication` para CAS, frontmatter, relações e recibo. O Artifact leva:

- `kind: FEATURE_IDEA`;
- `status: NOT_IMPLEMENTED` por padrão; `IMPLEMENTED` **somente** se a capacidade integral já estiver comprovadamente entregue;
- nome reconhecível, descrição curta, data ISO 8601;
- corpo enxuto: problema/consumidor, proposta, valor hipotético, capacidades existentes, limites, incerteza e critério para revisitar;
- relações seletivas com documentos canônicos existentes, quando houver.

**Não criar tags, Work Items, planos ou Skills automaticamente** a partir da ideia. Não criar um registro por variação de texto; atualizar o mesmo Artifact se a hipótese evoluir. Não mover documentos entre repositórios por suposição e não armazenar secrets ou transcrições privadas.

Se houver proposta relevante mas não houver autoridade de publicação, exponha a sugestão e peça aprovação ou entregue conteúdo para encaminhamento, sem afirmar que foi registrada.

## Crescimento e conclusão

O investimento é avaliado pela `feature-investment-gate` **quando houver intenção de decidir se construir, quando priorizar ou quando a decisão importar para o próximo passo**. Ela retorna BUILD, DEFER, REJECT etc., que não são status de construção. Quando aprovado, seguir `signal-driven-feature-design` se faltar contrato de sinal/ação e `planejamento-executavel` quando for hora de executar. Nenhuma transição é automática só porque o Artifact existe.

Uma entrega parcial, início de Plano ou PR aberto mantém `NOT_IMPLEMENTED`. Se entrega verificável cobrir integralmente a ideia, atualizar **o mesmo Artifact** para `IMPLEMENTED`, com relação `resolved-by` à prova ou handoff pertinente. Não inventar conclusão, não marcar como implementada só porque o usuário aprovou a intenção e não duplicar o Work Item.

## Sugestão proativa com economia de atenção

Em uma tarefa principal, indique no máximo **uma ou poucas** ideias excepcionais, de forma breve e não intrusiva; preserve-as no Continuum apenas se passaram pelo gate. Não adicione bloco `FEATURE_IDEA` a cada handoff nem procure oportunidades ritualisticamente em toda chamada. Ideias vêm do raciocínio útil, não de uma quota. O usuário pode pedir brainstorming amplo; aí amplie o espaço de exploração sem publicar cada candidato antes da seleção.

## Resultado esperado

- Ideia útil e distinta: proposta clara, estado honesto e Artifact recuperável quando autorizado.
- Ideia incerta: hipótese explicitada, sem plano prematuro.
- Ideia duplicada ou fraca: reuso, ajuste ou descarte sem novo Artifact.

**Regra:** ampliar a inteligência de produto dos agentes com memória durável e pouco ruído; preservar oportunidades sem criar obrigações.
