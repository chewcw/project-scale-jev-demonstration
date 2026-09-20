import type { DecisionResult, WorkflowDecision, DeterministicCheck } from "../decision/types.js";

export function evaluateProcurementRules(
  input: Record<string, unknown>,
  vendorQuotes: Array<Record<string, unknown>>
): DeterministicCheck[] {
  const checks: DeterministicCheck[] = [];
  const requirements = (input.requirements || []) as Array<Record<string, unknown>>;
  const req = requirements[0] || {};
  const budgetMin = Number(req.budget ? (req.budget as any).min || 0 : 0);
  const budgetMax = Number(req.budget ? (req.budget as any).max || Infinity : Infinity);
  const allowedProtocols = (req.protocol || []) as string[];
  const requiredRedundancy = !!req.redundancy;
  const requiredWarranty = Number(req.warrantyMonths || 0);
  const requiredLeadTime = Number(req.leadTimeDays || 999);

  for (const quote of vendorQuotes) {
    const vendor = String(quote.vendor || "Unknown");
    const price = Number(quote.price || 0);
    const lead = Number(quote.leadTimeDays || 999);
    const protocol = String(quote.protocol || "");
    const redundancy = !!quote.redundancy;
    const warrantyMonths = Number(quote.warrantyMonths || 0);

    checks.push({
      rule: `PRICE_${vendor}`,
      status: price >= budgetMin && price <= budgetMax ? "PASS" : "FAIL",
      message: price >= budgetMin && price <= budgetMax ? `Price within budget: ${price}` : `Price out of budget range [${budgetMin}, ${budgetMax}]: ${price}`,
    });

    checks.push({
      rule: `LEAD_TIME_${vendor}`,
      status: lead <= requiredLeadTime ? "PASS" : "WARNING",
      message: lead <= requiredLeadTime ? `Lead time within requirement: ${lead}d` : `Lead time exceeds requirement (${requiredLeadTime}d): ${lead}d`,
    });

    const protocolAllowed = allowedProtocols.length === 0 || allowedProtocols.includes(protocol);
    checks.push({
      rule: `PROTOCOL_${vendor}`,
      status: protocolAllowed ? "PASS" : "FAIL",
      message: protocolAllowed ? `Protocol allowed: ${protocol}` : `Protocol not allowed (${allowedProtocols.join(", ")}): ${protocol}`,
    });

    checks.push({
      rule: `REDUNDANCY_${vendor}`,
      status: redundancy === requiredRedundancy ? "PASS" : "FAIL",
      message: redundancy === requiredRedundancy ? `Redundancy matches requirement (${requiredRedundancy})` : `Redundancy mismatch: requires ${requiredRedundancy} got ${redundancy}`,
    });

    checks.push({
      rule: `WARRANTY_${vendor}`,
      status: warrantyMonths >= requiredWarranty ? "PASS" : "WARNING",
      message: warrantyMonths >= requiredWarranty ? `Warranty meets requirement: ${warrantyMonths}m` : `Warranty below requirement (${requiredWarranty}m): ${warrantyMonths}m`,
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
