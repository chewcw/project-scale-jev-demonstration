"use client";

import React, { useState } from "react";
import ScenarioLayout from "@/components/scenario/ScenarioLayout";
import DecisionModelEditor from "@/components/scenario/DecisionModelEditor";
import DecisionResultViewer from "@/components/scenario/DecisionResultViewer";
import InputDataEditor from "@/components/scenario/InputDataEditor";
import { engineeringScenario } from "@/lib/scenarios/engineering";
import { validateDecisionModel } from "@/lib/decision/validation";
import { evaluateEngineeringRules, engineeringNextAction } from "@/lib/deterministic/engineering";

export default function EngineeringPage() {
  const [model, setModel] = useState<any>(engineeringScenario.defaultDecisionModel);
  const [result, setResult] = useState<any>(null);
  const [checks, setChecks] = useState<any[]>([]);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");

  const [record, setRecord] = useState<any>(engineeringScenario.records);

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
        body: JSON.stringify({ scenario: "engineering", state: record, decisionModel: model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data.result);
      const detChecks = evaluateEngineeringRules(record, data.result);
      setChecks(detChecks);
      setAction(engineeringNextAction(detChecks, data.result));
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
          scenario: "engineering",
          structuredData: record,
          decisionResult: result?.answers,
          deterministicChecks: checks,
          promptType: "test_description",
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
      title="Engineering Cross-check → FAT"
      description="Cross-check customer requirements against drawing data. Unclear cases must go to human review."
      leftPanel={
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold text-slate-900">Sample Records</h3>
          <InputDataEditor config={record} onChange={setRecord} />
        </div>
      }
      rightPanel={
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">Edit Decision Model (JSON)</h3>
          <DecisionModelEditor config={model} onChange={setModel} />
          {error && <div className="text-red-400 text-xs">{error}</div>}
        </div>
      }
      actionBar={
        <button
          onClick={handleRun}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-white shadow-lg shadow-blue-200/40 transition-all disabled:opacity-50"
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
            className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg font-semibold text-white shadow-lg shadow-violet-200/30 transition-all disabled:opacity-50"
          >
            Generate AI Explanation
          </button>
          {explanation && <div className="p-4 bg-slate-50 rounded-lg border border-gray-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{explanation}</div>}
        </div>
      }
    />
  );
}
