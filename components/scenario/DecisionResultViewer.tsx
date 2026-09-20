import React from "react";
import type { DecisionResult, WorkflowDecision, DeterministicCheck } from "@/lib/decision/types";

function renderAnswer(key: string, val: unknown): React.ReactNode {
  if (val && typeof val === "object" && val !== null) {
    const obj = val as Record<string, unknown>;
    const type = (obj.type as string) || "";
    if (type === "choice") {
      return (
        <div key={key} className="col-span-2 border-b border-gray-200 py-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 capitalize font-medium">{key}</span>
            <span className="font-bold text-emerald-600">{`${obj.choice ?? "—"}`}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>confidence: {`${obj.confidence ?? "—"}`}</span>
          </div>
          {obj.probabilities && typeof obj.probabilities === "object" ? (
            <div className="flex gap-2 mt-1 flex-wrap">
              {Object.entries(obj.probabilities as Record<string, unknown>).map(([label, p]) => (
                <span key={label} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
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
        <div key={key} className="col-span-2 border-b border-gray-200 py-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 capitalize font-medium">{key}</span>
            <span className="font-bold text-emerald-600">{`${obj.noul ?? "—"}`}</span>
          </div>
        </div>
      );
    }
    if (type === "score") {
      return (
        <div key={key} className="col-span-2 border-b border-gray-200 py-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 capitalize font-medium">{key}</span>
            <span className="font-bold text-emerald-600">{`${obj.score ?? "—"}`}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>confidence: {`${obj.confidence ?? "—"}`}</span>
          </div>
        </div>
      );
    }
  }
  return (
    <div key={key} className="flex justify-between border-b border-gray-200 py-1">
      <span className="text-slate-700 capitalize">{key}</span>
      <span className="font-mono text-slate-900">{`${val}`}</span>
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
  if (!result) return <div className="text-slate-400 text-sm">No decision result yet. Click &quot;Run Decision&quot;.</div>;

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-xl p-4 bg-slate-50/60">
        <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">AI Decision (Jev)</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {Object.entries(result.answers || {}).map(([key, val]) => renderAnswer(key, val))}
        </div>
      </div>

      {checks && checks.length > 0 && (
        <div className="border border-gray-200 rounded-xl p-4 bg-slate-50/60">
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Deterministic Checks</h3>
          <div className="space-y-2">
            {checks.map((c, i) => (
              <div key={i} className={`flex justify-between items-center text-sm px-2 py-1 rounded ${c.status === "PASS" ? "bg-emerald-50 text-emerald-700" : c.status === "FAIL" ? "bg-rose-50 text-rose-700" : c.status === "UNCLEAR" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                <span className="font-mono text-xs">{c.rule}</span>
                <span className="font-bold text-xs">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {nextAction && (
        <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/40">
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Workflow Action</h3>
          <p className="text-sm text-amber-800 font-medium">{nextAction}</p>
        </div>
      )}
    </div>
  );
}
