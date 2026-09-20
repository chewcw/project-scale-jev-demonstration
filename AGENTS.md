# AGENTS.md

## Project

This is the **Project SCALE AI Decision Demo**.

The application demonstrates an enterprise AI architecture that separates:

* Structured data processing
* Deterministic business rules
* Decision AI / TypeSafe System One (Jev)
* Generative AI / LLM
* Human approval

The goal is a clear technical demonstration, not a production enterprise platform.

## Core Principle

Follow this separation:

> Generative models generate. Decision models decide. Deterministic software enforces. Humans approve exceptions and technical meaning.

Do not use an LLM where deterministic logic is sufficient.

Do not use Jev for calculations or rules that can be implemented deterministically.

Do not allow AI decisions to silently become workflow actions. Keep the decision and the resulting application action separate.

## TypeSafe / Jev

A TypeSafe AI skill is already installed in:

```text
.agents/skills/
```

**You MUST inspect and follow the official TypeSafe AI skill before implementing or modifying any TypeSafe / Jev integration.**

Treat that skill as the primary implementation guidance for the TypeSafe API.

Also refer to the official SDK documentation when necessary:

https://docs.typesafe.ai/sdk/javascript

Do not invent TypeSafe SDK APIs. If the installed skill and documentation do not provide enough information, inspect the existing implementation or documentation before making assumptions.

Keep TypeSafe behind an application-level abstraction such as:

```text
DecisionEngine
    ↓
TypeSafeDecisionEngine
    ↓
TypeSafe SDK / Jev
```

The rest of the application should not depend directly on TypeSafe SDK implementation details.

## Architecture
[architecture](./docs/architecture.md)

## Code Organization
[Development Rules](./docs/development-rules.md.md)

## Demo Scope
[Scenarios](./docs/scenarios.md)

## Success Criteria
[Success Criteria](./docs/success-criteria.md)
