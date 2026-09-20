"use client";

import React, { useState } from "react";
import ScenarioLayout from "@/components/scenario/ScenarioLayout";
import DecisionModelEditor from "@/components/scenario/DecisionModelEditor";
import DecisionResultViewer from "@/components/scenario/DecisionResultViewer";
import { engineeringScenario } from "@/lib/scenarios/engineering";
import { validateDecisionModel } from "@/lib/decision/validation";
import { evaluateEngineeringRules, engineeringNextAction } from "@/lib/deterministic/engineering";

export default function EngineeringPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [model, setModel] = useState<any>(engineeringScenario.defaultDecisionModel);
  const [result, setResult] = useState<any>(null);
  const [checks, setChecks] = useState<any[]>([]);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");

  const record = engineeringScenario.records[selectedIndex];

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
          <h3 className="font-semibold text-white">Sample Records</h3>
          <div className="flex gap-2 mb-3">
            {engineeringScenario.records.map((r, i) => (
              <button
                key={r.tag}
                onClick={() => setSelectedIndex(i)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${i === selectedIndex ? "bg-blue-600 border-blue-500 text-white" : "bg-gray-800 border-gray-700 text-gray-300 hover:text-white"}`}
              >
                {r.tag}
              </button>
            ))}
          </div>
          <pre className="bg-black/40 text-xs p-3 rounded border border-gray-700 overflow-auto text-gray-300">{JSON.stringify(record, null, 2)}</pre>
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
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-white shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50"
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
