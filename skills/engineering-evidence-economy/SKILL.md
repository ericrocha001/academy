---
name: engineering-evidence-economy
description: Use when an engineering decision has an unresolved evidence gap and you must choose between code, tests, existing metrics, a targeted measurement or a Spike. Prefer cheaper local evidence over equivalent remote channels when available and authorized. Do not use for routine implementation validation (validacao-de-implementacoes) or to design an agent-facing context API (agent-context-interface-engineering).
---

# Engineering Evidence Economy

Acquire only the evidence necessary to make the engineering decision.

The priority is to produce correct software, not investigations.

Do not create a Spike, benchmark, exploratory artifact, or new instrumentation when the existing implementation already answers the question.

## Evidence Ladder

When facing an uncertainty, escalate through the cheapest sufficient evidence source.

Use this order:

```text
implementation
→ tests and contracts
→ existing indexed/structured knowledge
→ existing benchmark or metrics
→ small targeted measurement
→ Spike
```

Stop as soon as the uncertainty relevant to the decision is resolved.

Do not continue gathering evidence merely because deeper investigation is possible.

## Channel Economy

Evidence cost includes not only tokens and time, but also network calls, hosted integrations, quotas, rate limits, and external infrastructure consumption.

When two channels can produce evidence of equivalent strength:

> **prefer the local channel already available to the executing agent.**

Examples:

- local typecheck instead of remote validation execution;
- local Vitest instead of routing the same suite through a plugin;
- local build instead of a remote wrapper around the same build;
- existing local result instead of reconstructing it through multiple proof lookups.

Use a remote/plugin channel when it provides something materially different, such as:

- evidence unavailable locally;
- independent verification by another role;
- runtime state visible only through that surface;
- shared durable state that is actually required for the decision;
- a capability that has no local equivalent.

Do not spend hosted infrastructure merely to standardize an execution the agent can already perform directly.

A proof identifier or normalized envelope is not additional evidence unless persistence itself is required by the workflow.

## 1. Inspect the Implementation First

Before proposing a Spike, determine whether the current implementation already reveals:

- what the system supports;
- what it rejects;
- its explicit boundaries;
- its invariants;
- its data model;
- its resolution rules;
- its fallback behavior;
- known unsupported cases.

Treat implementation as the primary source for:

> What does the system know how to do?

Do not experimentally rediscover behavior that is already explicit in the code.

## 2. Use Tests to Confirm Intent

Use existing tests to distinguish:

```text
accidental behavior
```

from:

```text
intentional protected behavior
```

Tests are especially valuable for identifying:

- supported cases;
- negative cases;
- edge conditions;
- invariants;
- regression boundaries.

Do not create exploratory experiments merely to reproduce facts already permanently proven by tests.

## 3. Use Existing Structured Knowledge

Prefer existing indexes, models, repositories, metrics, Harnesses, and architectural contracts before reading broad source or creating new probes.

If the system already materializes the required fact, query that fact rather than reconstructing it.

## 4. Use Existing Benchmarks for Prevalence

Implementation tells:

> What can the system do?

A benchmark tells:

> How much does that capability matter in the real codebase?

Use an existing benchmark when the remaining uncertainty concerns:

- frequency;
- coverage;
- distribution;
- token cost;
- performance;
- real-world prevalence;
- regression over time.

Do not use a benchmark to answer a question already deterministically answered by implementation.

## 5. Prefer Small Measurements Before Spikes

If implementation and existing metrics leave one narrow empirical question unanswered, perform the smallest targeted measurement capable of answering it.

Example:

```text
How many unresolved calls belong to category X?
```

does not automatically require a full Spike.

A small structural count may be sufficient.

Discard one-off probes after use unless repeated value has been demonstrated.

## 6. Use a Spike Only for Genuine Uncertainty

Create a Spike when an important engineering decision still depends on knowledge that cannot be obtained cheaply from existing artifacts.

A Spike is appropriate when the uncertainty concerns questions such as:

- whether a proposed resolution is semantically reliable;
- whether an unfamiliar AST or runtime representation supports the required fact;
- whether a new architectural mechanism is feasible;
- whether a proposed capability produces meaningful real-world coverage;
- whether multiple competing technical strategies have materially different costs or precision;
- whether incremental invalidation is practical.

A Spike should answer a specific decision.

Do not use:

```text
Spike → understand the area generally
```

when normal code inspection can do so.

Prefer:

```text
Known facts
+
specific unresolved question
→ Spike
→ decision
```

## 7. Spike Scope

Before starting a Spike, state:

```text
What is already known?
What exact uncertainty remains?
Why can't implementation/tests/benchmarks answer it?
What decision will change based on the result?
```

If these questions cannot be answered clearly, reconsider whether a Spike is necessary.

A Spike should minimize:

- files inspected;
- experimental code;
- tokens;
- permanent artifacts;
- architectural surface.

Prototype code should normally be disposable.

## 8. Benchmark Economy

Create or expand a permanent benchmark only when the measurement has recurring value.

Strong signals:

- the same measurement has been recreated more than once;
- future implementations need comparison against the same baseline;
- regressions would be difficult to detect otherwise;
- the metric materially affects prioritization;
- measurement can remain deterministic and inexpensive.

Do not productize a one-time question automatically.

## 9. Benchmark Semantics Must Be Exact

A metric name must describe only what the measurement proves.

Do not label:

```text
possible factory-like occurrence
```

as:

```text
factory
```

unless the structure actually proves it.

Prefer structural facts over textual heuristics.

When a metric is heuristic, mark it explicitly as heuristic and do not use it as if it were ground truth.

## 10. Separate Capability from Coverage

Never confuse:

```text
Can the system resolve this pattern?
```

with:

```text
How often does this pattern occur?
```

Implementation and tests establish capability.

Benchmarking establishes prevalence and coverage.

A missing capability with zero relevant occurrences may not deserve implementation.

A small capability covering a large real surface may deserve high priority.

## 11. Separate Knowledge Gap from Value

Finding something the system does not know is not sufficient reason to implement it.

Ask:

```text
How often does this gap occur?
How much context/read work does it currently cause?
Can it be solved reliably?
What architectural complexity would it introduce?
```

Prioritize gaps with:

```text
high real value
+
high confidence
+
low or justified complexity
```

## 12. Prefer Production Over Investigation

When evidence is already sufficient to choose a safe implementation:

> implement.

Do not request another Spike merely for additional confidence.

Investigative work has a cost:

- model tokens;
- human attention;
- context window;
- implementation delay;
- maintenance if artifacts become permanent.

Evidence collection should support development, not replace it.

## 13. Stop Condition

Stop investigating when additional evidence is unlikely to change the engineering decision.

Examples:

```text
Implementation already proves the behavior.
→ Stop.
```

```text
Tests prove the boundary and benchmark proves meaningful volume.
→ Implement.
```

```text
Benchmark proves zero useful occurrences.
→ Defer.
```

```text
Two viable architectures remain with unresolved semantic risk.
→ Spike.
```

## 14. Escalation Pattern

Use:

```text
QUESTION
↓
Can implementation answer?
├─ yes → decide
└─ no
   ↓
Can tests/contracts answer?
├─ yes → decide
└─ no
   ↓
Can existing metrics answer?
├─ yes → decide
└─ no
   ↓
Can a small targeted measurement answer?
├─ yes → measure and decide
└─ no
   ↓
Spike
```

## 15. After a Spike

A Spike must end in a decision such as:

```text
IMPLEMENT
IMPLEMENT LIMITED SCOPE
DEFER
REJECT
```

Do not immediately create another Spike unless a genuinely different unresolved decision remains.

First update the known facts using what was learned.

Then return to the Evidence Ladder.

## 16. Harness Improvement Signal

If an investigation reveals that an existing metric, test, tool, or benchmark repeatedly misleads future decisions, improve the Harness rather than compensating manually every time.

Productize the correction when it is:

- reusable;
- deterministic;
- low-maintenance;
- likely to prevent repeated wasted investigation.

## Core Principle

Do not spend expensive evidence to rediscover cheap evidence.

Use:

```text
code to know behavior
tests to know intent
benchmarks to know prevalence
measurements to close narrow gaps
Spikes to resolve genuine uncertainty
```

The goal is the minimum investigative and operational cost required to make a confident engineering decision.

Do not spend remote calls to rediscover evidence already available locally.
