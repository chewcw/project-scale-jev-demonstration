"use client";

import React, { useState } from "react";
import ScenarioLayout from "@/components/scenario/ScenarioLayout";
import DecisionModelEditor from "@/components/scenario/DecisionModelEditor";
import DecisionResultViewer from "@/components/scenario/DecisionResultViewer";
import { procurementScenario } from "@/lib/scenarios/procurement";
import { validateDecisionModel } from "@/lib/decision/validation";
import { evaluateProcurementRules, procurementNextAction } from "@/lib/deterministic/procurement";

export default function ProcurementPage() {
  const [model, setModel] = useState<any>(procurementScenario.defaultDecisionModel);
  const [result, setResult] = useState<any>(null);
  const [checks, setChecks] = useState<any[]>([]);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setError("");
    const val = validateDecisionModel(model);
    if (!val.valid) {
      setError("Invalid decision model: " + val.errors.join(", "));
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: "procurement", state: { vendorQuotes: procurementScenario.vendorQuotes }, decisionModel: model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data.result);
      const detChecks = evaluateProcurementRules({ vendorQuotes: procurementScenario.vendorQuotes }, procurementScenario.vendorQuotes);
      setChecks(detChecks);
      setAction(procurementNextAction(detChecks, data.result));
    } catch (e: any) {
      setError(e.message || "Failed to run decision");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: "procurement",
          structuredData: { vendorQuotes: procurementScenario.vendorQuotes },
          decisionResult: result?.answers,
          deterministicChecks: checks,
          promptType: "summary",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "LLM error");
      setExplanation(data.text);
    } catch (e: any) {
      setError(e.message || "Failed to generate explanation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScenarioLayout
      title="Vendor Quote → Compliance → Recommendation"
      description="Compare vendor quotes with deterministic calculations and Jev compliance/suitability decisions."
      leftPanel={
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold text-white">Vendor Quotes</h3>
          <div className="space-y-3">
            {procurementScenario.vendorQuotes.map((v: any) => (
              <div key={v.vendor} className="bg-black/30 p-3 rounded-lg border border-gray-700/40">
                <div className="font-bold text-white text-xs">{v.vendor} — {v.model}</div>
                <div className="text-xs text-gray-300 mt-1">Price: ${v.price} | Lead: {v.leadTimeDays}d | Protocol: {v.offeredProtocol} | Redundancy: {v.redundancy ? "Yes" : "No"}</div>
              </div>
            ))}
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-3">
          <h3 className="font-semibold text-white">Edit Decision Model (JSON)</h3>
          <DecisionModelEditor config={model} onChange={setModel} />
          {error && <div className="text-red-400 text-xs">{error}</div>}
        </div>
      }
      actionBar={
        <button
          onClick={handleRun}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold text-white shadow-lg shadow-amber-900/20 transition-all disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Decision"}
        </button>
      }
      resultPanel={<DecisionResultViewer result={result} checks={checks} nextAction={action} />}
      llmPanel={
        <div className="space-y-3">
          <button
            onClick={handleGenerate}
            disabled={loading || !result}
            className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg font-semibold text-white shadow-lg shadow-violet-900/20 transition-all disabled:opacity-50"
          >
            Generate AI Explanation
          </button>
          {explanation && <div className="p-4 bg-black/20 rounded-lg border border-gray-700 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{explanation}</div>}
        </div>
      }
    />
  );
}
