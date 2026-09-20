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
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-2 text-slate-500 max-w-2xl">{description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <button
            onClick={() => setInputOpen(!inputOpen)}
            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            aria-expanded={inputOpen}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Input Data</h2>
            <span className="text-gray-400 text-xs select-none">{inputOpen ? "−" : "+"}</span>
          </button>
          {inputOpen && (
            <div className="px-5 pb-5">{leftPanel}</div>
          )}
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            aria-expanded={modelOpen}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Decision Model</h2>
            <span className="text-gray-400 text-xs select-none">{modelOpen ? "−" : "+"}</span>
          </button>
          {modelOpen && (
            <div className="px-5 pb-5 space-y-4">
              {rightPanel}
              {actionBar && <div className="pt-4 border-t border-gray-200/60">{actionBar}</div>}
            </div>
          )}
        </section>
      </div>

      {resultPanel && (
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Decision Result</h2>
          {resultPanel}
        </section>
      )}

      {llmPanel && (
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">LLM Explanation</h2>
          {llmPanel}
        </section>
      )}
    </div>
  );
}
