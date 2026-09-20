import React, { useState } from "react";
import JsonEditor from "../JsonEditor";

export default function DecisionModelEditor({
  config,
  onChange,
}: {
  config: any;
  onChange: (cfg: any) => void;
}) {
  const [raw, setRaw] = useState(() => JSON.stringify(config, null, 2));
  const [errors, setErrors] = useState<string[]>([]);

  const handleReset = () => {
    const defaultCfg = {
      questions: {
        decision: { id: "decision", type: "choice", question: "What is the decision?", options: ["YES", "NO", "UNCLEAR"] },
      },
    };
    setRaw(JSON.stringify(defaultCfg, null, 2));
    onChange(defaultCfg);
    setErrors([]);
  };

  return (
    <div className="space-y-3">
      <JsonEditor value={raw} onChange={(val) => { setRaw(val); try { const parsed = JSON.parse(val); onChange(parsed); setErrors([]); } catch (err: any) { setErrors([err.message || "Invalid JSON"]); } }} />
      {errors.length > 0 && (
        <div className="text-red-400 text-xs">
          {errors.map((e, i) => (
            <div key={i}>• {e}</div>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <button onClick={handleReset} className="px-4 py-2 text-sm font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Reset</button>
      </div>
    </div>
  );
}
