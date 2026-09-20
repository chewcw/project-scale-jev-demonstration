export type DecisionQuestionType = "choice" | "noul" | "score";

export interface DecisionQuestionConfig {
  id: string;
  type: DecisionQuestionType;
  question: string;
  options: readonly string[];
  criteria?: Record<string, unknown>;
}

export interface DecisionModelConfig {
  questions: Record<string, DecisionQuestionConfig>;
}

export interface DecisionResult {
  answers: Record<string, unknown>;
  raw?: unknown;
}

export interface WorkflowDecision {
  decision: DecisionResult;
  deterministicChecks: DeterministicCheck[];
  nextAction: string;
}

export interface DeterministicCheck {
  rule: string;
  status: "PASS" | "FAIL" | "WARNING" | "UNCLEAR";
  message: string;
}
