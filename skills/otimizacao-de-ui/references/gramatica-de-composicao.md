# Gramática de Composição — Clean Screen + Pure Signal

Referência condicional de `otimizacao-de-ui` para **nova tela ou mudança material de composição**. Não é um Design System, catálogo de layouts ou autorização para alterar produto. Fonte da finalidade, decisões e sinais: contrato funcional vigente; fonte da identidade visual: Design System vigente; fonte da verdade operacional: runtime/source.

## 1. Fixe o trabalho real antes da geometria

Em uma frase, registre **resultado da tela + momento de uso + objeto principal**. Identifique o que precisa ser reconhecido, decidido ou executado sem interpretação extra. Reaproveite `signal-driven-feature-design` se essas decisões ainda não foram fechadas; não deduza features a partir de componentes que parecem atraentes.

## 2. Aloque atenção, não campos de banco

Para cada informação ou controle, pergunte:
- O que muda na compreensão, decisão, ação ou orientação quando isso é percebido?
- Precisa ser visto agora, surgir por condição, ou só ser consultado depois?
- Com que frequência aparece e qual é o custo de não o perceber?
- Existe caminho acessível de recuperação se for condensado ou rebaixado?
- O sistema poderia sintetizar, correlacionar ou preparar a resposta em vez de pedir investigação manual?

Destino possível: **foco principal**, **contexto visível discreto**, **alerta condicional**, **detalhe revelado sob demanda**, **representação condensada** ou **remoção da superfície**. Não elimine contratos, comandos relevantes, estados de incerteza nem evidência necessária. Ação importante pode precisar estar acessível mesmo quando seu botão não é permanente.

## 3. Desenhe o percurso da atenção

- Faça o **objeto da tarefa** dominar a composição. Região maior não implica mais valor por si; distribua espaço pelo trabalho realizado nela.
- Mantenha **contexto necessário perto do objeto** que ele explica; se o contexto for raro, mova-o para superfície secundária ou painel revelável.
- Agrupe por responsabilidade e relação semântica, não pelo formato original dos dados.
- Reserve destaque visual para ação prioritária, seleção, foco e anomalias relevantes; estados saudáveis repetitivos devem ser discretos.
- Escolha entre estrutura de leitura linear, workspace com painéis ou navegação hierárquica conforme a tarefa. Não padronize uma única topologia entre telas de exploração, edição e diagnóstico.
- Determine explicitamente o ownership de scroll e o comportamento em viewport menor antes de ornamentar.

## 4. Dê gramática ao refinamento visual

- **Ritmo:** espaçamento e alinhamento devem tornar grupos e relações óbvios; varie espaçamento entre grupos com intenção, não ao acaso.
- **Tipografia:** use poucos níveis distinguíveis de título, rótulo, valor e detalhe; prefira palavras precisas a parágrafos operacionais.
- **Contraste e cor:** use semântica antes de decoração; mantenha foco e estado legíveis em todos os temas e interações.
- **Superfícies:** separe regiões quando isso melhora orientação. Evite transformar cada número ou frase em um card.
- **Profundidade e ornamentação:** sombras, gradientes, ícones, brilhos, texturas e acentos podem agregar **beleza e atmosfera por si**, além de identidade e hierarquia. Preserve tratamentos aprovados. Só reduza os que causem conflito concreto de leitura, contraste, desempenho ou coerência visual; não exija função informacional de um ornamento.
- **Densidade:** maximize sinal informacional por área útil, não elementos por pixel. Espaço vazio é válido, mas não exige aparência austera; beleza e acabamento visual continuam objetivos.
- **Texto:** elimine repetição, mantenha labels que resolvem ambiguidade e não esconda alertas/ações críticos em tooltip.

Não transforme essas heurísticas em valores fixos de padding, proporção ou quantidade de elementos; valores são do Design System e restrições reais.

## 5. Faça duas passagens críticas

**Passagem positiva:** finalidade perceptível? Informação decisória no momento certo? Ação possível? Contexto e limites reconhecíveis?

**Passagem subtrativa informacional:** para cada informação, controle ou bloco funcional, o que aconteceria se fosse removido, condensado, revelado sob demanda ou automatizado? Preserve o que agrega valor ou é necessário.

**Passagem estética:** para cada ornamento existente, não pergunte se é indispensável a uma decisão; avalie se agrega beleza, identidade ou prazer visual. **Mantenha por padrão a direção estética aprovada.** Proponha removê-lo apenas com razão concreta e alternativa que não empobreça o acabamento. Uma tela mais vazia não é automaticamente melhor.

Considere estados normais, vazios, longos, degradados e telas menores. Uma tela limpa em um único screenshot pode falhar com conteúdo real.

## 6. Compare alternativas quando houver decisão aberta

Se duas composições forem materialmente plausíveis, compare-as pela mesma tarefa: velocidade de orientação, sinal visível, recuperabilidade do detalhe, economia de atenção, **qualidade estética e atmosfera**, responsividade e fidelidade ao Design System. Prefira uma direção forte; mockups alternativos somente quando esclarecerem um trade-off real. `mockup-design` materializa e critica referências; `validacao-de-implementacoes` verifica a implementação.

**Regra final:** a melhor composição não é a mais vazia, nem a mais densa. É aquela que torna o trabalho correto mais fácil e preserva uma experiência visual bela, sem esconder a verdade nem desperdiçar a atenção do usuário.
