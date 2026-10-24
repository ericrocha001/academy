---
name: market-intelligence-mining
description: Investigue sinais preexistentes de demanda, público comprador, concorrência e monetização quando surgir ou estiver sendo priorizada uma feature/capacidade de produto voltada ao mercado e essas evidências puderem mudar o investimento. Use GitHub, Reddit e ofertas pagas seletivamente. Entregue sinal à feature-investment-gate; não decida BUILD nem exija testes de oferta.
---

# Market Intelligence Mining

## Finalidade e fronteira

Produza **evidência mercadológica suficiente para uma decisão imediata de investimento em engenharia**, sem transformar cada ideia em projeto de pesquisa. A intenção é reduzir a chance de construir algo que só interessa ao criador, sem sufocar inovação que resolve dores ainda não formuladas como pedido de feature.

Esta Skill investiga **se há problema, para quem, qual valor econômico e quais sinais preexistentes de compra**. Não decide BUILD/DEFER/REJECT, superfície, arquitetura, precificação final ou plano: entregue a evidência à `feature-investment-gate`. Use `implementation-mining` apenas depois, quando uma decisão técnica realmente exigir observar implementações externas.

**Não peça landing page, tráfego pago, entrevistas, pré-venda, pilotos, testes de oferta ou outra produção de demanda** como condição para avaliar uma feature. Trabalhe com evidências que já existem.

## Gatilho proporcional

Use já no **surgimento de uma ideia ou capacidade de produto voltada ao mercado**, inclusive quando ainda não existe Plano, se evidência externa sobre demanda, diferenciação ou monetização puder modificar a decisão de investimento. Pode ser chamada pela `feature-investment-gate` durante sua triagem inicial ou diretamente para investigar uma oportunidade comercial, sem exigir que o usuário formule antes uma pergunta explícita sobre pesquisa de mercado. A análise permanece proporcional: não pesquise extensamente quando a decisão já estiver suficientemente sustentada.

Não exija pesquisa mercadológica para bug reproduzível, correção de regressão, requisito técnico obrigatório, manutenção interna ou trabalho cujo valor já está comprovado no consumidor real. Infraestruturas fundamentais podem ter valor comercial **indireto ou habilitador** mesmo sem compra isolada.

Determine antes de pesquisar: problema/resultado desejado, público comprador e usuário (podem diferir), alternativa atual e decisão que precisa ser respondida. Se o público é incerto, descubra segmentos plausíveis, sem presumir que os usuários de arquitetura semelhante sejam nossos compradores.

## Aquisição incremental de sinal

1. **Reutilize conhecimento existente**, quando acessível e atual: Market Insights do Continuum e decisões anteriores. Conteúdo histórico não comprova preços, comportamento ou concorrência atuais. Falha/indisponibilidade do Continuum não bloqueia pesquisa nem decisão.
2. **GitHub primeiro quando fizer sentido para produto técnico**: examine seletivamente issues, discussions, PRs e releases de produtos com problemas, consumidores ou workflows comparáveis. Busque reclamações, tarefas frustradas, soluções improvisadas e pedidos explícitos. Verifique contexto e desfecho: issue fechada não implica feature entregue; PR mergeado não prova demanda nem qualidade; stars, reações e quantidade de issues não equivalem a compradores.
3. **Reddit para ampliar ou contrariar a hipótese**: procure relatos espontâneos, comparações, objeções, custos do problema e razões de migração; diferencie testemunho de generalização. Considere viés de comunidade, bots, reclamações sem representatividade e relatos de segunda mão. Acesse somente canais/consultas permitidos e respeite condições de uso e limites das plataformas. Se inacessível, declare cobertura parcial e prossiga.
4. **Evidência comercial preexistente**, preferindo fonte direta: páginas de preços e planos atuais, funções pelas quais concorrentes cobram, alternativas pagas, relatos verificáveis de gasto, custo econômico do workaround e objeções de usuários pagantes. Não infira vendas reais de uma página com preço, nem disposição de compra própria da existência de preço concorrente. Preço público não prova volume vendido.
5. **Aprofunde só se mudar a decisão**: outra fonte, segmento ou concorrente deve responder incerteza material ainda aberta. Pare quando o provável ganho de sinal não justificar mais consultas, tempo e tokens; registre a cobertura realmente examinada, não o universo inteiro.

Não restrinja a pesquisa às features explicitamente solicitadas: extraia o *problema subjacente* que usuários conseguem relatar, mesmo que não conheçam a solução inovadora proposta.

## Qualificação comercial sem falsa precisão

Distinga:
- **Pagamento observado** pela própria solução/problema comparável: sinal mais forte quando confirmado, mas não transferível automaticamente para nosso produto;
- **Compromisso financeiro verificável**: orçamento, contratação, upgrade ou negociação documentada, com contexto;
- **Custo econômico ou gasto alternativo observável**: horas, perdas, equipes, ferramentas/serviços pagos para contornar a dor;
- **Interesse declarado**: pedidos, upvotes, opiniões e frases hipotéticas sobre pagar; insuficiente isoladamente.

Identifique **comprador**, **usuário**, **dor**, **alternativa**, **benefício**, **mecanismo plausível de captura de receita** e **barreira de troca**. Diferencie contribuição:
- **direta** — motivo de compra/upgrade;
- **indireta** — conversão, retenção, diferenciação;
- **habilitadora** — requisito para vender outras capacidades.

Considere segmentação e acessibilidade comercial: demanda intensa num público sem orçamento pode valer menos que uma dor menor num público pagante. Mas poucos relatos e ausência de preço público **não provam falta de mercado**. Descreva potencial como `ALTO / PROMISSOR NÃO COMPROVADO / BAIXO / INDETERMINADO`, sempre **relativo ao segmento e à evidência**, sem score numérico ou ROI imaginado.

## Qualidade de evidência

Para cada afirmação decisiva, preserve link, fonte, data/versão quando relevante, segmento, o que foi diretamente observado e o que foi inferido. Distinga:
- **observação** (ex.: plano pago inclui X);
- **interpretação** (X pode contribuir para monetização);
- **hipótese** (usuários pagariam por nossa implementação de X).

Procure sinais contrários e alternativas gratuitas; não trate ausência de relatos na amostra como ausência de demanda. Evidência de outra categoria ou público não valida nosso segmento. Se fonte estiver indisponível, antiga ou limitada, explicite.

## Entrega compacta ao gate

Produza apenas o necessário à decisão, tipicamente:
- **Oportunidade:** problema, usuário e potencial comprador;
- **Demanda:** 2–5 sinais realmente discriminativos, com links e contraevidências;
- **Comercial:** gastos, substitutos e mecanismo direto/indireto/habilitador, distinguindo fato de hipótese;
- **Cobertura/confiança:** o que foi consultado, frescor, vieses e lacunas materiais;
- **Implicação:** o que favorece, enfraquece ou ainda impede priorizar agora frente a outras iniciativas.

Não despeje todas as issues nem generalize a amostra. **A decisão final de investimento e prioridade pertence à `feature-investment-gate`.**

## Memória de mercado no Continuum

Quando houver novo conhecimento mercadológico **durável e reutilizável**, considere o Living Artifact de produto/domínio **Market Insights**, usando `continuum-living-artifacts` para governança e `continuum-publication` para persistência autorizada. Reaproveite identidade canônica e atualize in-place; não crie um Artifact por issue, nem espelhe comentários brutos ou a pesquisa inteira. Conserve problemas, segmentos, sinais, fontes, incerteza, validade temporal e mudanças materiais. Conhecimento de mercado pertence ao Continuum; o procedimento reutilizável pertence à Academy.

Se o Continuum estiver indisponível, não anuncie publicação nem bloqueie o gate. Entregue síntese rastreável para publicação posterior, quando autorizada e viável.

## Critério de sucesso

O agente deve poder recomendar **onde vale examinar investimento**, com evidência verificável de demanda e potencial econômico, por uma investigação mais barata que a decisão/implementação que ajuda a evitar. Pesquisa adicional sem chance de alterar a decisão é ruído.
