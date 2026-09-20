import type { DecisionResult, WorkflowDecision, DeterministicCheck } from "../decision/types.js";

export function evaluateProcurementRules(
  input: Record<string, unknown>,
  vendorQuotes: Array<Record<string, unknown>>
): DeterministicCheck[] {
  const checks: DeterministicCheck[] = [];
  for (const quote of vendorQuotes) {
    const price = Number(quote.price || 0);
    const lead = Number(quote.leadTimeDays || 999);
    checks.push({
      rule: `PRICE_${quote.vendor}`,
      status: price > 0 ? "PASS" : "FAIL",
      message: price > 0 ? `Price valid: ${price}` : `Price missing for ${quote.vendor}`,
    });
    checks.push({
      rule: `LEAD_TIME_${quote.vendor}`,
      status: lead < 60 ? "PASS" : "WARNING",
      message: lead < 60 ? `Lead time acceptable: ${lead}d` : `Lead time extended: ${lead}d`,
    });
    const protocolMatch = quote.requiredProtocol === quote.offeredProtocol;
    checks.push({
      rule: `PROTOCOL_${quote.vendor}`,
      status: protocolMatch ? "PASS" : "FAIL",
      message: protocolMatch ? `Protocol matches (${quote.offeredProtocol})` : `Protocol mismatch: requires ${quote.requiredProtocol} got ${quote.offeredProtocol}`,
    });
  }
  return checks;
}

export function procurementNextAction(checks: DeterministicCheck[], decision: DecisionResult): string {
  const compliance = (decision.answers?.compliance as any)?.choice || "UNCLEAR";
  const suitability = (decision.answers?.technicalSuitability as any)?.choice || "UNCLEAR";
  const fails = checks.filter((c) => c.status === "FAIL");
  if (fails.length > 0) return "Hold — mandatory requirement failures";
  if (compliance === "UNCLEAR" || suitability === "UNCLEAR") return "Human Procurement Review Required";
  if (suitability === "SUITABLE" && compliance === "COMPLIANT") return "Recommend vendor for approval";
  return "Review and compare vendors";
}
