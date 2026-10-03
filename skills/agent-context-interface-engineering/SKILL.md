---
name: agent-context-interface-engineering
description: Use when designing, reviewing, or evolving tools, APIs, retrieval systems, connectors, or interfaces that deliver information to AI agents. Optimize context acquisition for relevance, progressive depth, semantic purity, and measurable cognitive cost. Do not use merely to consume an already well-defined context tool.
---

# Agent Context Interface Engineering

Design interfaces that give AI agents the **minimum sufficient evidence needed for the next decision** without unnecessarily consuming context.

The goal is not to maximize information returned.

The goal is to maximize:

> useful reasoning capability per unit of context.

This applies to repository navigation, document retrieval, databases, logs, observability, CRM, email, research systems, knowledge bases, APIs, connectors, and other agent-facing information systems.

---

# Core Principle

Treat context as something an agent **acquires progressively**, not something the system dumps preemptively.

Prefer:

```text
cheap awareness
→ decision
→ targeted acquisition
→ decision
→ exact evidence
```

over:

```text
large preload
→ model filters everything later
```

A larger context is not automatically a better context.

---

# 1. Design Around Cognitive Questions

Each context capability should answer a clear question for the agent.

Examples:

```text
What exists?
What is related?
What is inside this?
What exactly does this contain?
What changed?
Why did it fail?
```

Avoid one tool trying to answer all questions at once.

A technically cohesive API can still be cognitively overloaded.

Before defining a capability, state:

- what question it answers;
- what information is necessary to answer it;
- what information belongs to a deeper capability.

If its responsibility cannot be stated clearly, the context boundary is probably too broad.

---

# 2. Separate Context Depth

When the domain permits it, provide progressively deeper representations.

A common shape is:

```text
orientation
↓
relationships
↓
structure
↓
exact content
```

These layers are conceptual, not mandatory.

Agents must be allowed to:

- enter at the appropriate depth;
- skip unnecessary layers;
- repeat a layer;
- batch related requests;
- stop whenever enough evidence exists.

Do not turn progressive context into a mandatory pipeline.

---

# 3. Default to the Cheapest Useful Representation

The default response should contain only information broadly useful for the capability's primary question.

Optional enrichment should remain optional.

Prefer:

```text
default → compact
explicit request → enriched
```

instead of:

```text
default → everything that might be useful
```

Examples of enrichment that may belong behind explicit options:

- signatures;
- relationship types;
- metadata;
- diagnostics;
- excerpts;
- expanded descriptions;
- transitive relationships.

Ask:

> Will most reasoning steps require this information?

If not, it probably should not be in the default representation.

---

# 4. Context Purity

Correct information can still be inappropriate context.

A capability is impure when it leaks information belonging to another cognitive layer.

Examples:

- discovery returning source bodies;
- relationship queries returning structural outlines;
- structural inspection returning implementation bodies;
- exact reading returning neighboring items;
- agent-facing output exposing internal database or parser metadata.

Treat contextual purity as an architectural property.

For every capability define:

### Allowed information

What the agent needs to answer the capability's question.

### Forbidden information

Information that is valid internally but belongs elsewhere.

Pure boundaries improve:

- token efficiency;
- predictability;
- composability;
- testing;
- agent decision quality.

---

# 5. Internal Necessity Does Not Imply Agent Necessity

Systems often require rich internal representations.

They may contain:

- internal IDs;
- byte positions;
- offsets;
- cache information;
- parser metadata;
- timings;
- diagnostics;
- database identifiers;
- implementation-specific relationships.

Do not expose these merely because they already exist.

Apply:

> Information required for the system to operate is not automatically information required for the agent to reason.

Create an explicit model-facing projection when necessary.

---

# 6. Measure the Agent-Facing Boundary

When optimizing context cost, measure the representation that the model actually receives.

Prefer:

```text
domain result
→ model-facing serialization
→ canonical tokenizer
→ contextual cost
```

Do not infer model cost primarily from:

- internal DTO size;
- object count;
- database rows;
- bytes before serialization;
- approximate character ratios.

If a transport layer transforms the content, verify the final agent-visible representation as well.

---

# 7. Separate Useful Payload From Interface Overhead

When the requested content itself may legitimately grow, distinguish:

```text
requested information
```

from:

```text
context added by the interface
```

Conceptually:

```text
interface overhead =
final agent-facing payload
-
requested payload
```

This prevents legitimate growth of user-requested information from being misclassified as architectural inefficiency.

The relevant question becomes:

> How much context did the interface add around the information the agent explicitly requested?

---

# 8. Preserve Cheap Ambiguity

Do not make shallow layers increasingly expensive merely to remove every ambiguity.

If an uncertainty can be resolved cheaply through a deeper acquisition, that uncertainty may be acceptable.

Prefer:

```text
small ambiguous representation
→ cheap targeted follow-up
```

over:

```text
permanently larger representation
→ no follow-up needed
```

Apply:

> Do not inflate cheap layers merely to avoid a cheap deeper acquisition.

This is especially important because small additions accumulate.

Repeated attempts to make shallow representations "complete" can eventually recreate the large payload the architecture was designed to avoid.

---

# 9. Let Agents Infer

A context interface should provide strong evidence, not precompute every possible conclusion.

Agents may infer:

- architecture;
- responsibilities;
- likely frameworks;
- dependency roles;
- patterns;
- relevance;
- likely next investigation steps.

Do not suppress useful reasoning by attempting to encode every conclusion into the tool output.

Optimize:

> evidence acquisition

rather than:

> conclusion precomputation

When exact details matter, make deeper evidence inexpensive to acquire.

---

# 10. Relationships Are Evidence, Not Expansion Commands

When a system exposes relationships, do not automatically traverse them.

A relationship means:

> this may be relevant

not:

> load this immediately

Prefer one-hop relationships by default unless the use case clearly requires transitive expansion.

Let the agent choose which relationships deserve deeper investigation.

This prevents graph traversal from becoming uncontrolled context expansion.

---

# 11. Batch Related Acquisition

Batching is useful when multiple already-identified items belong to the same reasoning step.

Good batching:

```text
inspect these three candidate files
```

Bad batching:

```text
inspect everything because batching is available
```

Batch to reduce interaction overhead, not to increase speculative context.

---

# 12. Define a Stop Condition

Context acquisition must have an explicit stopping principle.

Stop when:

> additional information is unlikely to change the current decision.

Do not continue exploring for completeness.

Resume acquisition when reasoning exposes a specific uncertainty.

This is one of the primary defenses against uncontrolled context growth.

---

# 13. Design for Selective Deepening

A good context interface makes the transition from broad awareness to exact evidence inexpensive.

The agent should be able to move from:

```text
I know this exists
```

to:

```text
I know this may matter
```

to:

```text
I know what is inside it
```

to:

```text
I need this exact piece
```

without reloading previously acquired information.

Where practical, provide stable references or selectors that allow exact later retrieval.

---

# 14. Preserve Literal Content When Exactness Matters

If the capability promises exact content, preserve it exactly.

Avoid silently:

- summarizing;
- normalizing;
- reformatting;
- combining neighboring content;
- adding unrelated context.

Compact identification metadata may surround the content when necessary, but distinguish wrapper from payload.

Exact-read capabilities should remain exact.

---

# 15. Avoid Transport Inflation

A compact internal result can become expensive at the final transport boundary.

Protect against:

- JSON serialized inside text;
- escaped structured documents;
- duplicated wrappers;
- repeated metadata;
- protocol information inserted into cognitive content.

When possible, verify:

```text
agent-visible content
===
intended model-facing serialization
```

Protocol envelopes are acceptable.

Cognitive duplication is not.

---

# 16. Validate Functional and Cognitive Contracts Separately

A tool may be functionally correct while being contextually poor.

Validate at least two independent dimensions:

### Functional correctness

Does it return the correct information?

### Cognitive correctness

Does it return only the appropriate information, at an appropriate cost?

Do not treat successful retrieval as sufficient proof of a good agent interface.

---

# 17. Protect Important Properties With a Harness

When contextual behavior becomes architecturally important, protect it with deterministic validation.

Good candidates include:

- forbidden cross-layer information;
- unrequested expansion;
- transport transformations;
- context inflation;
- wrapper overhead;
- exact selection semantics.

Prefer stable deterministic fixtures for regression gates.

Use real systems or repositories for scale observation, not necessarily as permanent deterministic baselines.

---

# 18. Baseline Approved Behavior, Not Historical Mistakes

If contextual efficiency needs regression protection, establish the baseline from a state already accepted as correct.

Do not freeze a known-bad implementation simply because measurements already exist.

A baseline represents:

> the contextual cost we deliberately accepted.

Baseline changes should be explicit.

Never silently update them because a regression test failed.

---

# 19. Relative Budgets Over Universal Token Limits

Avoid inventing universal limits such as:

```text
every response must remain below N tokens
```

Different capabilities carry different legitimate information.

Prefer comparison against an approved deterministic baseline with an explicit tolerance policy.

The specific policy belongs to the project.

The architectural principle is:

> contextual growth should become visible and intentional.

---

# 20. Distinguish Deterministic Regression From Scale Observation

Use separate mechanisms when necessary:

```text
deterministic fixture
→ permanent regression gate
```

```text
real environment
→ scale observation
```

Real repositories, document collections, mailboxes, logs, or databases evolve naturally.

Their changing size should not automatically break CI.

But they remain valuable for observing whether the architecture behaves well at realistic scale.

---

# Design Procedure

When designing or reviewing an agent-facing context interface:

## Step 1 — Define the decision

What decision will the agent make from this information?

## Step 2 — Define the minimum evidence

What must the agent know to make that decision?

## Step 3 — Remove deeper information

What can be acquired later if needed?

## Step 4 — Define purity

What information must never appear in this capability?

## Step 5 — Define deeper acquisition

How does the agent cheaply request additional evidence?

## Step 6 — Define the model-facing representation

What exactly reaches the model?

## Step 7 — Measure

Use the canonical tokenizer or cost mechanism relevant to the actual model-facing representation.

## Step 8 — Validate

Prove both functional correctness and contextual purity.

## Step 9 — Establish non-regression protection

When the property is important and stable enough, create deterministic protection through the project's Harness.

---

# Review Questions

When reviewing an existing interface, ask:

- What cognitive question does this capability answer?
- Is every field necessary for that question?
- Is deeper information appearing prematurely?
- Does default output include optional enrichment?
- Is scope expanding implicitly?
- Can the agent acquire deeper evidence cheaply?
- Are internal implementation details exposed?
- Does transport inflate the intended representation?
- Are we measuring what the model actually receives?
- Can the same reasoning capability be preserved with less context?
- Are we increasing permanent output merely to eliminate cheap ambiguity?
- Is there a clear point at which the agent should stop acquiring context?

---

# Anti-Patterns

Avoid:

### Context Dumping

Returning broad content because the agent might need it.

### Defensive Overfetching

Adding information "for safety" without evidence it improves decisions.

### Layer Collapse

Combining discovery, relationships, structure, and exact content into one response.

### Automatic Traversal

Following every relationship or dependency without agent selection.

### Default Enrichment

Enabling expensive details because they sometimes help.

### Internal Leakage

Exposing parser, storage, cache, location, telemetry, or infrastructure metadata without cognitive value.

### Wrapper Inflation

Making the transport or serialization substantially larger than the requested content.

### Completeness Optimization

Trying to make early representations answer every possible future question.

### Mandatory Navigation Pipelines

Forcing agents through stages they may not need.

### Baseline Auto-Approval

Changing efficiency baselines automatically when tests fail.

---

# Decision Rule

When uncertain whether to add information to an agent-facing response, ask:

> Does this information materially improve the decision this capability exists to support?

If yes, include it or make it explicitly requestable.

If no, keep it out.

When uncertain whether to eliminate an ambiguity, ask:

> Is resolving this ambiguity later cheaper than permanently enriching this layer?

If yes, preserve the cheaper layer.

---

# Relationship to Other Skills

Use this Skill to design **how information reaches agents**.

Use repository-navigation or domain-specific Skills to teach agents **how to consume a particular tool**.

Use Harness Improvement when an important contextual property should become a reusable, permanent, objectively validated protection.

Do not duplicate domain-specific navigation procedures here.

---

# Desired Outcome

A well-designed agent context interface should make this possible:

```text
broad awareness cheaply
→ selective deepening
→ exact evidence
→ stop
```

The agent should receive enough evidence to reason well without paying the contextual cost of information it never needed.