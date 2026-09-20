import React from "react";
import type { DecisionResult, WorkflowDecision, DeterministicCheck } from "@/lib/decision/types";

function renderAnswer(key: string, val: unknown): React.ReactNode {
  if (val && typeof val === "object" && val !== null) {
    const obj = val as Record<string, unknown>;
    const type = (obj.type as string) || "";
    if (type === "choice") {
      return (
        <div key={key} className="col-span-2 border-b border-gray-700/30 py-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 capitalize font-medium">{key}</span>
            <span className="font-bold text-emerald-300">{`${obj.choice ?? "—"}`}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>confidence: {`${obj.confidence ?? "—"}`}</span>
          </div>
          {obj.probabilities && typeof obj.probabilities === "object" ? (
            <div className="flex gap-2 mt-1 flex-wrap">
              {Object.entries(obj.probabilities as Record<string, unknown>).map(([label, p]) => (
                <span key={label} className="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">
                  {label}: {typeof p === "number" ? p.toFixed(2) : `${p}`}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      );
    }
    if (type === "noul") {
      return (
        <div key={key} className="col-span-2 border-b border-gray-700/30 py-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 capitalize font-medium">{key}</span>
            <span className="font-bold text-emerald-300">{`${obj.noul ?? "—"}`}</span>
          </div>
        </div>
      );
    }
    if (type === "score") {
      return (
        <div key={key} className="col-span-2 border-b border-gray-700/30 py-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 capitalize font-medium">{key}</span>
            <span className="font-bold text-emerald-300">{`${obj.score ?? "—"}`}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>confidence: {`${obj.confidence ?? "—"}`}</span>
          </div>
        </div>
      );
    }
  }
  return (
    <div key={key} className="flex justify-between border-b border-gray-700/30 py-1">
      <span className="text-gray-300 capitalize">{key}</span>
      <span className="font-mono text-white">{`${val}`}</span>
    </div>
  );
}

export default function DecisionResultViewer({
  result,
  checks,
  nextAction,
}: {
  result?: DecisionResult;
  checks?: DeterministicCheck[];
  nextAction?: string;
}) {
  if (!result) return <div className="text-gray-500 text-sm">No decision result yet. Click "Run Decision".</div>;

  return (
    <div className="space-y-6">
      <div className="border border-gray-700/50 rounded-xl p-4 bg-black/20">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">AI Decision (Jev)</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {Object.entries(result.answers || {}).map(([key, val]) => renderAnswer(key, val))}
        </div>
      </div>

      {checks && checks.length > 0 && (
        <div className="border border-gray-700/50 rounded-xl p-4 bg-black/20">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Deterministic Checks</h3>
          <div className="space-y-2">
            {checks.map((c, i) => (
              <div key={i} className={`flex justify-between items-center text-sm px-2 py-1 rounded ${c.status === "PASS" ? "bg-emerald-900/20 text-emerald-300" : c.status === "FAIL" ? "bg-rose-900/20 text-rose-300" : c.status === "UNCLEAR" ? "bg-amber-900/20 text-amber-300" : "bg-gray-800/50 text-gray-300"}`}>
                <span className="font-mono text-xs">{c.rule}</span>
                <span className="font-bold text-xs">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {nextAction && (
        <div className="border border-amber-500/30 rounded-xl p-4 bg-amber-900/10">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Workflow Action</h3>
          <p className="text-sm text-amber-100 font-medium">{nextAction}</p>
        </div>
      )}
    </div>
  );
}
