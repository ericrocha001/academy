---
name: system-health-observability-design
description: Projete ou evolua a observabilidade do System Health para capacidades operacionais: mapeie fronteiras arquiteturais diagnosticamente relevantes, defina checkpoints e feche lacunas de evidência. Use durante design/refatoração de features ou após incidentes que revelam falta de localização. Para investigar uma falha corrente use system-health-debugging.
---

# system health observability design

Esta Skill governa somente a **evolução estrutural** da ferramenta, não sua operação rotineira. Use `system-health-debugging` quando for necessário investigar um incidente ou navegar pelo repositório usando a capacidade atual. Preserve evidências e fronteiras operacionais existentes, sem abrir um catálogo duplicado.

# Evolução do System Health por incidentes

Não tente instrumentar antecipadamente todas as falhas possíveis.

Fluxo preferido:

**incidente → diagnóstico → lacuna comprovada → menor melhoria reutilizável → Harness**

Quando a fronteira estiver ampla demais, aprofunde verticalmente nessa região.

Evite inflar globalmente o pipeline canônico.

Semântica específica de uma feature pertence preferencialmente ao seu Provider.

Mova lógica para o Core apenas quando ela representar mecanismo diagnóstico realmente genérico e reutilizável.

---

# Instrument for Decisions

Antes de adicionar um evento, checkpoint ou métrica, pergunte:

> Se eu souber esta informação, ela muda onde investigarei ou qual intervenção escolherei?

Se não mudar, provavelmente não merece instrumentação.

> Não maximize observabilidade. Maximize redução de incerteza com a menor instrumentação necessária.

---

# Diagnostic Zoom by Design

Capacidades operacionais relevantes devem nascer diagnosticamente endereçáveis.

Isso é especialmente importante quando envolvem:

- lifecycle;
- concorrência;
- processos;
- background work;
- rede;
- persistência;
- filas;
- integrações;
- fronteiras entre componentes.

Antes de considerar a capacidade pronta, identifique:

- principais fronteiras de execução;
- ownership de cada fronteira;
- evidência de entrada/progresso/conclusão;
- correlation necessária;
- primeira resolução útil para investigação.

Não construa tracing completo preventivamente.

O objetivo é que o primeiro bug já comece dentro de um espaço de busca delimitado.

> Uma capacidade não precisa nascer totalmente observada. Precisa nascer com resolução diagnóstica suficiente para localizar progressivamente seu primeiro incidente.

## Architectural Diagnostic Mapping

O System Health deve manter um **mapa vivo das fronteiras arquiteturais operacionalmente significativas** à medida que o sistema evolui.

Esse mapa não representa toda a implementação. Sua finalidade é reduzir antecipadamente o espaço de busca para que uma falha possa ser localizada na menor região arquitetural útil antes da investigação de código.

Durante o desenvolvimento ou alteração de uma feature/capacidade, avalie se surgiram novas fronteiras que possam mudar materialmente:

- onde uma investigação começa;
- qual subsistema ou capacidade contém a falha;
- qual ownership deve assumir a investigação;
- qual evidência deve ser coletada em seguida.

Quando uma fronteira satisfizer esse critério, torne-a diagnosticamente endereçável pelo System Health usando a menor evidência estruturada suficiente.

Prefira representar:

- transições entre subsistemas;
- capacidades com responsabilidade operacional própria;
- readiness ou sincronização relevantes;
- mudanças de processo/runtime;
- persistência, rede, filas ou integrações;
- outras fronteiras cuja identificação divida materialmente o espaço de busca.

Não represente classes, métodos, funções ou etapas internas apenas porque existem.

A granularidade inicial deve ser suficiente para:

**sistema → feature → fronteira arquitetural relevante**

Aprofundamento além dessa fronteira continua sob demanda por Diagnostic Zoom:

**fronteira localizada → checkpoint/componente → source mínimo**

Assim, o mapeamento preventivo e o aprofundamento investigativo cumprem papéis diferentes:

- **Architectural Diagnostic Mapping** prepara antecipadamente a menor arquitetura útil para localização;
- **Diagnostic Zoom** aprofunda somente a região que uma falha real justificar.

Se uma fronteira arquitetural conhecida poderia reduzir materialmente o espaço de investigação, mas o System Health ainda consegue apontar apenas para uma região muito mais ampla, trate isso como uma lacuna de mapeamento diagnóstico.

> Mapeie antecipadamente o suficiente para localizar; aprofunde somente quando houver algo concreto para investigar.

---

# Diagnostic Addressability

Uma feature operacional deve permitir que uma falha seja endereçada progressivamente:

**feature → stage → checkpoint → componente**

conforme a evidência disponível.

Se toda falha começa como "algo dentro da feature quebrou", a capacidade ainda não possui diagnostic addressability suficiente.

---

