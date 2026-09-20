import React, { useState, useEffect } from "react";
import JsonEditor from "../JsonEditor";

export default function InputDataEditor({
  config,
  onChange,
}: {
  config: any;
  onChange: (cfg: any) => void;
}) {
  const [raw, setRaw] = useState(() => JSON.stringify(config, null, 2));
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setRaw(JSON.stringify(config, null, 2));
    setErrors([]);
  }, [config]);

  const handleRun = () => {
    try {
      const parsed = JSON.parse(raw);
      onChange(parsed);
      setErrors([]);
    } catch (e: any) {
      setErrors([e.message || "Invalid JSON"]);
    }
  };

  const handleReset = () => {
    setRaw(JSON.stringify(config, null, 2));
    onChange(config);
    setErrors([]);
  };

  return (
    <div className="space-y-3">
      <JsonEditor value={raw} onChange={(val) => { setRaw(val); try { const parsed = JSON.parse(val); onChange(parsed); setErrors([]); } catch (e: any) { setErrors([e.message || "Invalid JSON"]); } }} />
      {errors.length > 0 && (
        <div className="text-red-400 text-xs">
          {errors.map((e, i) => (
            <div key={i}>• {e}</div>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <button onClick={handleRun} className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">Apply</button>
        <button onClick={handleReset} className="px-4 py-2 text-sm font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Reset</button>
      </div>
    </div>
  );
}
