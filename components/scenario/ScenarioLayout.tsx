import React, { useState } from "react";

export default function ScenarioLayout({
  title,
  description,
  leftPanel,
  rightPanel,
  actionBar,
  resultPanel,
  llmPanel,
}: {
  title: string;
  description?: string;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  actionBar?: React.ReactNode;
  resultPanel?: React.ReactNode;
  llmPanel?: React.ReactNode;
}) {
  const [inputOpen, setInputOpen] = useState(true);
  const [modelOpen, setModelOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">{title}</h1>
        {description && <p className="mt-2 text-gray-400 max-w-2xl">{description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-scale-panel border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <button
            onClick={() => setInputOpen(!inputOpen)}
            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-800/40 transition-colors"
            aria-expanded={inputOpen}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Input Data</h2>
            <span className="text-gray-500 text-xs select-none">{inputOpen ? "−" : "+"}</span>
          </button>
          {inputOpen && (
            <div className="px-5 pb-5">{leftPanel}</div>
          )}
        </section>

        <section className="bg-scale-panel border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-800/40 transition-colors"
            aria-expanded={modelOpen}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Decision Model</h2>
            <span className="text-gray-500 text-xs select-none">{modelOpen ? "−" : "+"}</span>
          </button>
          {modelOpen && (
            <div className="px-5 pb-5 space-y-4">
              {rightPanel}
              {actionBar && <div className="pt-4 border-t border-gray-700/50">{actionBar}</div>}
            </div>
          )}
        </section>
      </div>

      {resultPanel && (
        <section className="bg-scale-panel border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Decision Result</h2>
          {resultPanel}
        </section>
      )}

      {llmPanel && (
        <section className="bg-scale-panel border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">LLM Explanation</h2>
          {llmPanel}
        </section>
      )}
    </div>
  );
}
