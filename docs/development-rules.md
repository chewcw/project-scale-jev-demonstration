# Development Rules
Keep:

* UI components
* decision-engine integration
* LLM integration
* deterministic rules
* scenario configuration
* shared types

separate from each other.

Avoid unnecessary abstractions and dependencies.

Prefer small, understandable TypeScript modules.

Avoid `any` unless there is a clear reason.

Before changing existing architecture:

1. Inspect the relevant code.
2. Follow the installed TypeSafe skill for TypeSafe-related work.
3. Reuse existing components and abstractions where appropriate.
4. Keep changes focused on the requested functionality.
5. Verify TypeScript/build errors after implementation.

When an external API behaves differently from the assumed interface, verify the official documentation rather than guessing.


## Security

Never commit:

* API keys
* `.env` files containing secrets
* credentials
* private tokens

Use environment variables for secrets.

The browser must never receive provider API keys.

## Decision Model Configuration

Jev questions and criteria must be runtime-configurable.

Do not hard-code decision questions into individual scenario pages.

The UI should allow users to edit valid JSON, validate it, run the decision, and reset to the default configuration.

Decision configuration should be represented as data and transformed into the format required by the TypeSafe SDK.

