import type { DecisionModelConfig, DecisionQuestionConfig } from "./types.js";

export function validateDecisionModel(config: unknown): { valid: boolean; errors: string[]; parsed?: DecisionModelConfig } {
  const errors: string[] = [];
  if (!config || typeof config !== "object") {
    errors.push("Configuration must be an object");
    return { valid: false, errors };
  }
  const cfg = config as Record<string, unknown>;
  if (!cfg.questions || typeof cfg.questions !== "object" || Array.isArray(cfg.questions)) {
    errors.push("'questions' must be an object mapping IDs to question configs");
    return { valid: false, errors };
  }
  for (const [key, val] of Object.entries(cfg.questions)) {
    if (!val || typeof val !== "object" || Array.isArray(val)) {
      errors.push(`Question '${key}' must be an object`);
      continue;
    }
    const q = val as Record<string, unknown>;
    if (!q.id || typeof q.id !== "string") errors.push(`Question '${key}' missing 'id'`);
    if (!q.type || !["choice", "noul", "score"].includes(q.type as string)) errors.push(`Question '${key}' has invalid 'type'`);
    if (!q.question || typeof q.question !== "string") errors.push(`Question '${key}' missing 'question'`);
    if (!Array.isArray(q.options) || q.options.length === 0) errors.push(`Question '${key}' must have non-empty 'options' array`);
  }
  if (errors.length === 0) {
    return { valid: true, errors: [], parsed: cfg as unknown as DecisionModelConfig };
  }
  return { valid: false, errors };
}
