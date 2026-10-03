---
name: feature-investment-gate
description: Use before proposing, planning, productizing, expanding, or adding UI to a feature or capability. Decide whether it should be built at all, remain backend-only, become an agent/tool capability, receive a human-facing interface, or be deferred. Prevent investment in attractive but unnecessary features, workflow-coupled features, duplicate surfaces, and productization whose cost exceeds its additional value.
---

# Feature Investment Gate

Decide whether a capability deserves engineering investment and how far it should be productized.

Do not assume that a useful capability must become a feature, that a backend capability needs a UI, or that an interesting visualization creates product value.

The goal is:

> Build the smallest durable surface that captures the real value.

---

# 1. Separate Capability from Product Feature

A capability answers:

> What can the system do?

A product feature answers:

> What capability needs to be deliberately exposed and operated by a user or agent?

These are not equivalent.

Examples:

```text
Element relationships
→ valuable capability
```

does not imply:

```text
Interactive Element Graph UI
→ valuable product feature
```

A capability may remain completely internal while producing substantial value.

---

# 2. First Question — Should This Exist?

Before discussing architecture or UI, identify the concrete value.

Ask:

```text
What problem disappears if this exists?
Who receives that value?
How often does the problem occur?
What is the current workaround?
What measurable cost does the workaround impose?
```

Valid costs include:

- tokens;
- tool calls;
- latency;
- human effort;
- errors;
- repeated reasoning;
- context consumption;
- operational friction;
- implementation duplication.

If the problem cannot be stated concretely, do not promote the idea to a feature yet.

---

# 3. Identify the Consumer

Classify who actually needs the capability:

```text
human
agent
internal subsystem
developer/operator
multiple consumers
```

This determines the required surface.

Do not build a human interface for information whose real consumer is an agent.

Do not build an agent interface for information used only internally by another subsystem.

---

# 4. Choose the Smallest Useful Surface

Use the lowest sufficient level.

## Level 0 — Internal implementation detail

Keep entirely private when the knowledge exists only to enable another capability.

Example:

```text
internal symbol resolution metadata
```

No standalone API or UI is justified.

---

## Level 1 — Backend capability

Expose through internal services/contracts when multiple internal components require it.

Example:

```text
element-to-element relationships
```

This may be highly valuable without any human-facing feature.

---

## Level 2 — Agent/tool surface

Expose through an agent-facing tool when an AI needs to request the knowledge directly.

Example:

```text
get_symbol_dependencies
```

The agent needs the answer; a human dashboard is unnecessary.

---

## Level 3 — Human-facing UI

Create UI only when direct human interaction adds unique value that cannot be captured adequately through existing surfaces.

Examples may include:

- manipulation;
- monitoring;
- comparison;
- visual inspection;
- repeated human decision-making;
- configuration;
- intervention;
- exploration where spatial representation materially improves comprehension.

UI is not the default destination of backend knowledge.

---

# 5. Backend-Only by Default When the Consumer Is an Agent

If the capability exists primarily to make an AI:

- understand more;
- retrieve context;
- navigate relationships;
- reason with fewer tokens;
- select source more accurately;

prefer:

```text
backend knowledge
+
small agent-facing projection
```

over:

```text
backend
+
large human UI
```

Example:

```text
Element Graph knowledge
→ CodeBrain backend
→ CodeScope queries
```

does not require:

```text
Element Graph visual tab
```

unless humans demonstrate a separate need for that visualization.

---

# 6. UI Must Add New Value

Do not justify UI with:

> "The data already exists."

Data availability lowers implementation cost but does not establish user value.

Ask:

> What can the human accomplish through this interface that they could not accomplish sufficiently without it?

If the answer is merely:

```text
see the backend information visually
```

that is insufficient by itself.

Require a concrete human task.

---

# 7. Do Not Productize Architecture

Internal architectural richness does not need an equivalent product surface.

A system may contain:

```text
graphs
indexes
caches
resolvers
dependency models
symbol maps
state machines
```

without exposing each one as a named feature.

Architecture supports products.

Architecture is not automatically product.

---

# 8. Workflow Coupling Test

Determine whether the feature derives its value from a temporary workflow.

Ask:

```text
If our workflow changes substantially, does this capability still solve a fundamental problem?
```

Classify:

## Durable

Tied to a stable problem.

Examples:

```text
understanding code dependencies
retrieving exact source
detecting file changes
```

## Workflow-coupled

Tied mainly to the current process.

Example:

```text
a visualization whose only purpose is tracking a specific audit ritual
```

Workflow-coupled features require stronger evidence before significant investment.

---

# 9. Code Journey Test

Before approving a feature, ask explicitly:

> Could this become another Code Journey?

Meaning:

- useful because of today's process;
- expensive to build;
- tightly shaped around that process;
- little independent value;
- abandoned when the workflow evolves.

If yes, prefer:

```text
smaller capability
temporary artifact
backend instrumentation
or defer
```

instead of a full product feature.

---

# 10. Durability Test

A strong feature survives changes around it.

Ask whether value persists if:

- the current AI model changes;
- the workflow changes;
- another IDE is used;
- sprint structure changes;
- orchestration changes;
- auditing strategy changes;
- UI layout changes.

The more assumptions required for the feature to remain useful, the less durable the investment.

---

# 11. Frequency Test

Distinguish:

```text
interesting
```

from:

```text
recurrently useful
```

A rare but attractive capability may not deserve permanent product surface.

Prefer permanent features for recurring needs.

For rare needs consider:

- command;
- agent tool;
- script;
- temporary report;
- backend-only query;
- on-demand artifact.

---

# 12. Existing Surface Test

Before creating a new feature, ask:

> Can an existing feature expose this capability naturally?

Prefer enriching:

```text
existing tool
existing view
existing API
existing workflow
```

over adding another top-level surface.

Example:

Improving `get_references` is often better than creating:

```text
Reference Explorer
```

as an independent UI.

---

# 13. Duplicate Knowledge Test

Do not create multiple surfaces that independently calculate the same knowledge.

Prefer:

```text
one source of truth
→ multiple thin projections when justified
```

For example:

```text
CodeBrain relationship
→ CodeScope projection
→ optional UI later
```

not:

```text
CodeBrain relationship logic
+
UI-specific relationship logic
+
agent-specific relationship logic
```

---

# 14. Marginal Value Test

Do not evaluate total value.

Evaluate:

> What additional value does the proposed feature provide over what already exists?

Example:

If CodeScope already lets an agent navigate an Element Graph efficiently, the question for an Element Graph UI is not:

> "Are element relationships useful?"

They clearly are.

The question is:

> "What additional value does visualizing them for humans provide?"

This prevents double-counting the backend capability's value when justifying the frontend.

---

# 15. Full-Cost Test

Estimate more than initial implementation.

Include:

```text
implementation
testing
UI
state management
documentation
maintenance
migration
performance
accessibility
future compatibility
cognitive complexity
additional product surface
```

Frontend often has substantial continuing cost even when backend data already exists.

Evaluate lifetime cost, not just initial coding effort.

---

# 16. Reversibility Test

Prefer cheap reversible decisions when evidence is weak.

Example:

```text
backend capability first
```

is often better than:

```text
backend + permanent UI immediately
```

because UI can be added later if demand appears.

Do not prematurely productize an irreversible or expensive surface.

---

# 17. Progressive Productization

When uncertain, evolve through stages:

```text
internal capability
↓
internal API
↓
agent/tool capability
↓
human UI
```

Advance only when the next surface has demonstrated additional value.

Do not jump directly from:

```text
we discovered useful data
```

to:

```text
build a complete UI feature
```

---

# 18. Feature Versus Infrastructure

Classify the idea.

## Infrastructure

Provides reusable capability to other features.

## Agent capability

Provides reusable knowledge/action to an AI.

## Human feature

Directly supports a recurring human task.

## Instrumentation

Provides measurement, observability or validation.

## Workflow feature

Supports a specific working process.

Classification matters because each deserves different productization.

Do not force all categories into the same UI-centric feature model.

---

# 19. Productization Signal

Strong signals for creating a permanent feature:

- recurring real problem;
- identifiable consumer;
- substantial measurable value;
- existing alternatives are meaningfully worse;
- value survives workflow changes;
- new surface provides additional value;
- maintenance cost is justified;
- capability cannot be adequately absorbed by existing surfaces.

---

# 20. Defer Signal

Prefer `DEFER` when:

- value is plausible but unproven;
- use frequency is unknown;
- workflow is evolving rapidly;
- backend capability is sufficient for now;
- UI adds little marginal value;
- another upcoming change may reshape the requirement.

Defer is not rejection.

It preserves option value.

---

# 21. Reject Signal

Prefer `REJECT` when:

- no concrete problem exists;
- it duplicates an existing capability without meaningful additional value;
- value depends on assumptions already shown to be unstable;
- ongoing cost exceeds realistic benefit;
- the feature exists mainly because the implementation would be interesting;
- the consumer does not actually need a dedicated surface.

---

# 22. Build Signal

Prefer `BUILD` when:

```text
problem is real
+
consumer is clear
+
surface is appropriate
+
marginal value is meaningful
+
cost is justified
+
durability is acceptable
```

---

# 23. Backend-Only Signal

Prefer:

```text
BUILD BACKEND ONLY
```

when:

- information primarily serves agents or internal systems;
- no recurring human interaction is required;
- existing tools can expose the knowledge when needed;
- UI would merely visualize internal state;
- backend capability has independent durable value.

---

# 24. Backend + Agent Surface Signal

Prefer:

```text
BUILD BACKEND + AGENT SURFACE
```

when:

- agents need to query the capability independently;
- progressive/on-demand retrieval matters;
- direct access reduces context, calls or reasoning;
- humans do not need a dedicated interaction surface.

This is the natural default for many CodeBrain capabilities.

---

# 25. Backend + Human UI Signal

Prefer:

```text
BUILD BACKEND + HUMAN UI
```

only when humans have a recurring direct task that benefits materially from interaction with the capability.

Require the UI value to be justified independently from backend value.

---

# 26. Decision Outcomes

Every evaluation should end in one of:

```text
BUILD — INTERNAL ONLY

BUILD — BACKEND ONLY

BUILD — BACKEND + AGENT SURFACE

BUILD — BACKEND + HUMAN UI

EXPAND EXISTING FEATURE

PROTOTYPE / VALIDATE FIRST

DEFER

REJECT

REMOVE / DEPRECATE EXISTING FEATURE
```

Do not force binary build/reject decisions.

---

# 27. Existing Feature Review

This Skill also applies to already-built features.

Ask:

```text
Would we approve building this feature today?
```

If not, determine whether to:

- simplify;
- demote to backend-only;
- merge into another feature;
- stop maintaining;
- deprecate;
- remove.

Sunk implementation cost is not sufficient reason to preserve permanent product surface.

---

# 28. Relationship with Evidence Economy

Use existing evidence before initiating expensive validation.

Do not run research, benchmarks or Spikes automatically.

First inspect:

```text
implementation
tests
existing metrics
existing user behavior
existing product surfaces
```

Escalate only when a material uncertainty remains.

This Skill decides **what deserves investment**.

Evidence Economy decides **how cheaply to obtain the evidence needed for that decision**.

---

# 29. Decision Record

For non-trivial proposals, produce a compact decision containing:

```text
Problem
Consumer
Current alternative
Proposed capability
Required surface
Marginal value
Workflow coupling
Durability
Cost drivers
Decision
Reason
Evidence still missing
```

Do not produce a long document when the decision is obvious.

---

# 30. Core Principle

Build capabilities according to the consumer that actually needs them.

Do not promote backend knowledge into product surface without additional value.

And:

> A capability being useful does not imply that every possible manifestation of that capability should be built.

The goal is not to build everything valuable.

The goal is to invest only in the smallest durable form that captures the value.
