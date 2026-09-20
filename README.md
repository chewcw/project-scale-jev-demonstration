# SCALE AI Decision Demo

A technical demonstration showing why an enterprise AI application should separate structured processing, decision AI (Jev / TypeSafe System One), deterministic rules, generative AI (LLM), and human approval.

## What it demonstrates

* Structured data processing (tender input, engineering cross-check, vendor quotes)
* Decision AI through `@typesafe-ai/sdk` (Jev / System One) with runtime-configurable questions
* Deterministic business rules (capability matching, range checks, price comparison)
* Generative AI via Vercel AI SDK for explanations only — not decisions
* Human approval steps visible in the workflow

## Installation

```bash
npm install
```

## Environment variables

Create `.env` from the example:

```bash
TYPESAFE_API_KEY=your_key
LLM_API_KEY=your_key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
```

Never commit `.env` or expose keys to the browser.

## Running locally

```bash
just dev
```

Or:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## How Jev is used

`lib/decision/typesafe-engine.ts` creates a `TypeSafeDecisionEngine` that wraps `TypeSafeClient`. It transforms JSON decision configurations into SDK `choice()` questions, calls `systemOne()`, and returns typed answers with probabilities.

The engine is abstracted (`DecisionEngine` interface) so Jev can be replaced later without redesigning the workflow.

## How to modify decision questions

Every scenario page includes a JSON editor. Edit questions, options, and criteria, then click **Run Decision**. The application validates JSON before sending to the server.

Example:

```json
{
  "questions": {
    "technicalFit": {
      "id": "technicalFit",
      "type": "choice",
      "question": "How well does the company technically fit this tender?",
      "options": ["FIT", "PARTIAL_FIT", "NO_FIT", "UNCLEAR"]
    }
  }
}
```

## How the LLM layer is used

The `VercelGenerationService` (`lib/generation/service.ts`) receives structured facts + the Jev decision + deterministic checks. It constructs a prompt and calls the OpenAI-compatible provider through `ai.generateText()`. It never makes the primary decision.

## Three scenarios

1. **Tender** — structured tender data, risk/fit/recommendation decision, deterministic capability checks, proposal draft.
2. **Engineering** — sample instrumentation records with match/mismatch/unclear, ambiguous data requires human review, FAT form generation.
3. **Procurement** — vendor quote comparison, deterministic price/lead-time/protocol checks, compliance/suitability decisions.

## Design principles

> Generative models generate. Decision models decide. Deterministic software enforces. Humans approve exceptions and technical meaning.

* Do not ask LLMs to perform arithmetic that code can do.
* Do not ask Jev to enforce exact rules; use deterministic checks.
* Keep the decision result visually separate from the application action.

## Limitations

* Synthetic data only
* No database, authentication, or production workflow engine
* TypeSafe SDK requires valid `TYPESAFE_API_KEY` for real calls
* LLM requires valid `LLM_API_KEY` and `LLM_BASE_URL`

## References

* TypeSafe SDK docs: https://docs.typesafe.ai/sdk/javascript
* Installed skill: `.agents/skills/typesafe-ai/SKILL.md`
