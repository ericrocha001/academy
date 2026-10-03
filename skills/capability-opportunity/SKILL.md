---
name: capability-opportunity  
description: Use durante ou após trabalho agentivo quando a execução revelar dificuldade, fricção, limitação, repetição, desperdício ou incapacidade que possa ser convertida em capacidade reutilizável. Identifique e qualifique oportunidades que aumentem materialmente o poder de resolução futuro, encaminhando-as para evolução de capacidade existente, Skill, Harness, automação, melhoria de ferramenta, código, validação ou processo. Não use para transformar toda inconveniência em infraestrutura nem para criar ou remover capacidades automaticamente.
---

# SKILL

## Capability Opportunity

## Propósito

Transformar dificuldades reais encontradas durante o trabalho em oportunidades de aumentar permanentemente a capacidade do sistema.

O objetivo não é registrar lições aprendidas.

É identificar situações nas quais uma dificuldade atual pode deixar de ser dificuldade em execuções futuras.

> Fricção é evidência. Generalize a causa. Converta dificuldade em capacidade somente quando houver ganho futuro relevante.

## Observe Durante o Trabalho

Detecte oportunidades durante ou após a execução.

Considere qualquer situação em que tenha ocorrido custo relevante, como:

- erro ou retrabalho;
- tentativa e erro;
- redescoberta;
- trabalho repetitivo;
- execução manual evitável;
- contexto ou chamadas excessivas;
- dificuldade de obter sinal útil;
- comportamento pouco confiável;
- limitação de ferramenta;
- dependência excessiva de improvisação;
- incapacidade de executar ou verificar algo adequadamente.

Esses sinais iniciam investigação.

Não provam, sozinhos, que uma nova capacidade deve existir.

## Gate de Capability Opportunity

Uma candidata deve satisfazer quatro condições.

### 1. Evidência real

Deve existir fricção, limitação, desperdício ou risco material identificado durante trabalho real.

Não crie oportunidades apenas porque uma melhoria parece possível.

### 2. Causa generalizável

Identifique a causa além do episódio específico.

Pergunte:

> Resolver isto elimina ou reduz uma classe de problemas, ou apenas este caso?

Não transforme exemplos isolados em infraestrutura.

### 3. Reutilização provável

Deve existir razão para acreditar que a solução poderá beneficiar trabalho futuro.

Recorrência observada fortalece a evidência, mas não é obrigatória.

Uma única ocorrência pode justificar a oportunidade quando revelar uma lacuna estrutural, possuir alto impacto ou tiver recorrência futura razoavelmente previsível.

### 4. Ganho futuro relevante

A capacidade proposta deve reduzir materialmente pelo menos um custo relevante, como:

- erro;
- esforço;
- retrabalho;
- latência;
- consumo de contexto;
- chamadas de ferramenta;
- trabalho manual;
- incerteza;
- dependência de improvisação;
- baixa confiabilidade.

O benefício esperado deve justificar o custo de criar, manter e acionar a capacidade.

Se esses quatro elementos não forem suficientemente fortes, não promova a candidata.

## Teste Contrafactual

Pergunte:

> Se essa capacidade já existisse antes de iniciar a tarefa, a dificuldade teria sido significativamente menor ou inexistente?

Se não houver diferença material, a oportunidade é fraca.

Se houver diferença clara e reutilizável, existe evidência forte de Capability Opportunity.

## Encontre a Causa Antes da Solução

Não escolha imediatamente um artefato.

Pergunte primeiro:

> Qual deficiência do sistema tornou essa dificuldade possível?

Procure a menor causa geral suficiente.

Prefira eliminar ou reduzir estruturalmente a dificuldade em vez de apenas ensinar o agente a contorná-la.

Uma dificuldade cognitiva aparente pode ter como causa real uma ferramenta que fornece sinal insuficiente.

Uma sequência que parece exigir uma Skill pode ser melhor resolvida por automação.

Um erro recorrente pode ser melhor impossibilitado por código ou detectado por validação.

## Verifique Capacidades Existentes

Antes de propor algo novo, determine se o sistema já possui capacidade destinada a resolver a causa.

Se existir:

- identifique por que ela não resolveu o problema;
- verifique triggering, cobertura, implementação ou integração;
- prefira evoluir a capacidade existente quando isso preservar coerência.

> Não crie uma nova capacidade quando a correção pertence naturalmente a uma capacidade já existente.

## Escolha o Tratamento Pela Natureza da Causa

Escolha o mecanismo que remove melhor a causa.

### Skill

Use quando a solução principal for conhecimento, julgamento ou procedimento reutilizável que precisa alterar o comportamento do agente sob condições reconhecíveis.

Quando o destino for Skill, utilize `skill-engineering` para decidir e projetar a capacidade.

### Harness ou automação

Prefira quando o trabalho puder ser pavimentado, automatizado ou tornado determinístico, reduzindo a necessidade de o agente raciocinar novamente sobre o problema.

Quando aplicável, utilize a capacidade especializada de Harness Improvement.

### Ferramenta ou código

Prefira quando a causa estiver em informação ausente, interface inadequada, baixo sinal, comportamento da ferramenta ou limitação estrutural do software.

### Teste, validação ou guardrail

Prefira quando o principal valor estiver em detectar, impedir ou provar automaticamente uma classe de falhas.

### Processo ou workflow

Prefira quando a causa estiver na organização do trabalho, sequência de decisões, passagem de contexto ou coordenação entre capacidades.

A lista não é exaustiva.

Escolha o tratamento que melhor resolve a causa identificada, mesmo quando ele não estiver previamente categorizado.

## Gate Específico para Nova Skill

Não proponha Skill apenas porque o agente enfrentou dificuldade.

Uma Capability Opportunity é candidata a Skill quando:

- existe conhecimento, julgamento ou procedimento reutilizável;
- condições de acionamento podem ser reconhecidas;
- o agente não executaria aquilo com confiabilidade suficiente sem orientação;
- a capacidade não é melhor substituída por mecanismo determinístico ou estrutural;
- o ganho futuro esperado justifica contexto e manutenção adicionais.

A decisão final sobre criação pertence à Skill Engineering.

## Não Confunda Oportunidade com Criação

Esta Skill detecta e qualifica.

Ela não cria automaticamente:

- Skills;
- Harnesses;
- automações;
- testes;
- ferramentas;
- mudanças de processo.

Produza uma proposta para avaliação posterior.

Isso preserva separação entre:

**detecção → qualificação → decisão → construção → validação**

## Não Promova Ruído

Não gere Capability Opportunity quando a dificuldade for:

- episódica e improvável de reaparecer;
- extremamente específica;
- barata de resolver novamente;
- consequência normal da própria tarefa sem deficiência reutilizável;
- incapaz de demonstrar benefício futuro relevante;
- mera preferência;
- uma ideia de melhoria sem evidência suficiente.

A ausência de oportunidade também é um resultado válido.

## Não Remova Capacidades a Partir de Uma Execução

Não conclua que uma capacidade é desnecessária apenas porque não foi útil para o agente atual.

Agentes diferentes podem depender de níveis diferentes de suporte.

Redução, fusão, depreciação ou remoção de capacidades exige avaliação própria baseada em evidência mais ampla.

## Saída

Quando houver uma oportunidade material, registre somente o necessário:

**Capability Opportunity**

- **Evidência:** o que ocorreu.
- **Fricção:** qual custo foi produzido.
- **Causa generalizada:** deficiência subjacente além do caso específico.
- **Contrafactual:** como uma capacidade pré-existente teria alterado a execução.
- **Reutilização:** por que isso pode beneficiar trabalho futuro.
- **Ganho esperado:** o que deve melhorar.
- **Capacidade existente:** inexistente, insuficiente ou não acionada, quando conhecido.
- **Tratamento candidato:** Skill, Harness, ferramenta, código, validação, processo ou outro.
- **Próximo passo:** qual capacidade especializada deve avaliar ou construir a solução.

Não infle a saída quando evidência e encaminhamento puderem ser expressos de forma mais curta.

## Critério de Conclusão

Uma Capability Opportunity está bem qualificada quando:

- nasce de evidência real;
- identifica uma causa generalizável;
- possui reutilização plausível;
- oferece ganho futuro material;
- passou pelo teste contrafactual;
- verificou capacidade existente quando possível;
- não confunde sintoma com causa;
- recomenda tratamento pela natureza do problema;
- prefere solução estrutural a contorno;
- não cria infraestrutura sem justificativa;
- permanece uma proposta, não uma implementação automática.

## Regra Final

> Quando uma dificuldade revelar uma deficiência reutilizável do sistema, procure transformá-la em capacidade. Não documente apenas o problema e não transforme toda fricção em infraestrutura: ataque a causa geral somente quando isso tornar futuras execuções materialmente mais capazes.
