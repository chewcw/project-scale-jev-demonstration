import type { DecisionResult, WorkflowDecision, DeterministicCheck } from "../decision/types.js";

export function evaluateTenderRules(
  input: Record<string, unknown>,
  decision: DecisionResult
): DeterministicCheck[] {
  const checks: DeterministicCheck[] = [];
  const deadline = input.deadlineDays as number;
  if (deadline < 14) {
    checks.push({ rule: "DEADLINE_MINIMUM", status: "FAIL", message: "Deadline too short (<14 days)" });
  } else {
    checks.push({ rule: "DEADLINE_MINIMUM", status: "PASS", message: "Deadline acceptable" });
  }
  const value = input.estimatedValue as number;
  if (value > 5000000) {
    checks.push({ rule: "VALUE_THRESHOLD", status: "PASS", message: "Value exceeds threshold" });
  } else {
    checks.push({ rule: "VALUE_THRESHOLD", status: "PASS", message: "Value within range" });
  }
  const requirements = (input.requirements || []) as Array<{ id: string; category: string; requirement: string }>;
  const categories = new Set(requirements.map((r) => r.category));
  const capabilities = (input.knownCapabilities || []) as string[];
  for (const req of requirements) {
    const match = capabilities.some((c) => c.toLowerCase().includes(req.category.toLowerCase()));
    checks.push({
      rule: `CAPABILITY_MATCH_${req.id}`,
      status: match ? "PASS" : "FAIL",
      message: match ? `${req.category} capability present` : `${req.category} capability missing`,
    });
  }
  return checks;
}

export function tenderNextAction(checks: DeterministicCheck[], decision: DecisionResult): string {
  const hasFail = checks.some((c) => c.status === "FAIL");
  const recommendation = (decision.answers?.bidRecommendation as any)?.choice || "UNCLEAR";
  if (hasFail && recommendation === "DO_NOT_PURSUE") return "Review required — high risk and missing capabilities";
  if (hasFail) return "Review required — some deterministic checks failed";
  if (recommendation === "DO_NOT_PURSUE") return "Do not pursue — Jev recommendation";
  return "Proceed to proposal draft";
}
