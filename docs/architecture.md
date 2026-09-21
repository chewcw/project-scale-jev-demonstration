# Architecture

Use server-side API routes for calls to:

* TypeSafe / Jev
* LLM provider

Never expose API keys to the browser.

The LLM provider is OpenAI-compatible and should be accessed through the Vercel AI SDK.

Keep these concerns separate:

```text
Input / Structured Data
        ↓
Decision AI / Jev
        ↓
Deterministic Rules
        ↓
Workflow Action
        ↓
Human Approval
        ↓
Optional LLM Explanation / Generation
```

