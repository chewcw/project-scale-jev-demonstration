import type { DecisionResult, WorkflowDecision, DeterministicCheck } from "../decision/types.js";

export function evaluateEngineeringRules(
  input: Record<string, unknown>,
  decision: DecisionResult
): DeterministicCheck[] {
  const checks: DeterministicCheck[] = [];
  const customerRange = String(input.customerRange || "");
  const drawingRange = String(input.drawingRange || "");
  if (drawingRange.includes("?") || drawingRange === "") {
    checks.push({ rule: "RANGE_SPECIFIED", status: "UNCLEAR", message: "Drawing range unspecified or ambiguous" });
  } else if (customerRange === drawingRange) {
    checks.push({ rule: "RANGE_SPECIFIED", status: "PASS", message: "Ranges match exactly" });
  } else {
    checks.push({ rule: "RANGE_SPECIFIED", status: "FAIL", message: `Customer range (${customerRange}) does not match drawing range (${drawingRange})` });
  }
  return checks;
}

export function engineeringNextAction(checks: DeterministicCheck[], decision: DecisionResult): string {
  const decisionValue = (decision.answers?.matchDecision as any)?.choice || (decision.answers?.match as any)?.choice || "UNCLEAR";
  if (checks.some((c) => c.status === "UNCLEAR")) return "Human Engineering Review Required — ambiguous drawing data";
  if (checks.some((c) => c.status === "FAIL")) return "Review mismatch before FAT approval";
  if (decisionValue === "UNCLEAR") return "Human Engineering Review Required — unclear AI judgment";
  return "Generate FAT form";
}
