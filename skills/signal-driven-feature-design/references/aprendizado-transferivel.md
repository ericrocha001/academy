# Aprendizado transferível de decisões de feature

## Acionamento e responsabilidade

Use este complemento **somente** quando, durante ou após o desenho de uma feature, houver uma decisão específica, sustentada e não óbvia que possa aumentar a qualidade de decisões futuras em *outras* features. Não acione por rotina, para documentar todas as escolhas ou apenas porque a implementação terminou.

Este complemento qualifica um **candidato de aprendizado de desenho funcional**. Não governa criação de Skills; para isso use `skill-engineering`. Não substitui `capability-opportunity` ao tratar fricções gerais, `engineering-evidence-economy` para escolher provas ou `validacao-de-implementacoes` para provar software.

## Extraia o mecanismo, não o caso

1. **Decisão original:** qual necessidade/decisão do consumidor motivou a escolha? Qual alternativa foi rejeitada e por quê?
2. **Evidência do resultado:** o que foi demonstrado de fato e sob qual cobertura, custo e restrições? Separe decisão planejada, implementação validada e melhoria mensurada.
3. **Mecanismo generalizável:** reescreva a decisão sem nomes de biblioteca, produto, UI, arquivo ou tecnologia. Preserve pré-condições, interpretação permitida e limite de confiança.
4. **Contraste entre domínios:** teste o mecanismo em pelo menos um contexto diferente. Ele realmente muda a escolha, reduz erro/incerteza ou trabalho? Identifique também onde seria inaplicável.
5. **Destino canônico:** verifique se o princípio já existe. Se já existe, não duplique. Se for regra de desenho baseada em consumidor, pode enriquecer a Skill principal; se for procedimento independente, encaminhe à Skill responsável. Conhecimento específico ou volátil permanece na documentação ou fonte competente.

## Padrões transferíveis observados

**Descoberta ampla, confirmação seletiva.** Quando o espaço de candidatos é grande e a prova é cara, adquira pistas de baixo custo, priorize por relevância e confirme apenas casos que mudam decisões. Serve tanto para relacionar alterações de software quanto para pesquisar documentos ou identificar anomalias. Não substitui prova quando a consequência exigir cobertura exaustiva.

**Cobertura honesta e validade temporal.** Um conjunto descoberto não significa conjunto completamente verificado; resultado de ontem não é automaticamente atual. Explicite a abrangência, a procedência e a regra de invalidação do sinal. Exemplos: inventários, painéis operacionais, análise documental. Sistemas estáticos com dados imutáveis podem dispensar revalidação recorrente.

**Gate do núcleo de valor.** Quando toda a experiência depende de detectar ou resolver algo com precisão, demonstre a capacidade em caso positivo e controle negativo antes de construir a apresentação mais ampla. Se falhar, reduza escopo ou reveja a proposta, sem mascarar incerteza com indicadores decorativos.

**Responsabilidade cognitiva do sistema.** Se a informação serve para a decisão, o sistema deve preparar a investigação que puder realizar legitimamente; o usuário recebe explicação e próximo passo, não uma coleção de filtros para reconstruir o mesmo raciocínio. Exceção: exploração manual é o próprio objetivo do consumidor.

Esses padrões são **exemplos de transferência**, não regras universais nem checklist obrigatório para toda feature. Mantenha exemplos particulares fora da regra canônica.

## Gate de promoção

Só proponha atualização quando houver, em conjunto:
- **evidência real** de uma escolha com efeito útil, sem transformar hipótese em prova;
- **transferibilidade material** para outro domínio, com pré-condições e exceções;
- **lacuna na fonte canônica** (não duplicar princípio já existente);
- **ganho marginal plausível** em precisão, esforço, segurança ou decisão;
- **custo de contexto e manutenção justificável**.

Escolha a **menor mudança** que preserva o mecanismo. Regra de uso frequente pertence ao `SKILL.md`; protocolo ou caso de aprofundamento condicional pode ficar em `references/`; procedimento independente usa a Skill responsável; fatos operacionais ficam na fonte própria. Confirme preservação do comportamento anterior e, quando houver risco material de regressão agentic, encaminhe para `surgical-evals`.

## Resultado

Entregue somente: **decisão original, princípio neutro de domínio, evidência, caso contrastante, limite, Skill/representação canônica e ganho incremental**. Quando não houver candidato qualificado, registre apenas **Nenhum aprendizado promovido**. Não amplie automaticamente a tarefa em andamento para editar Harness.
