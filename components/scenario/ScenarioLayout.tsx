import React from "react";

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">{title}</h1>
        {description && <p className="mt-2 text-gray-400 max-w-2xl">{description}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 bg-scale-panel border border-gray-800 rounded-2xl p-5 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Input Data</h2>
          {leftPanel}
        </section>

        <section className="lg:col-span-2 bg-scale-panel border border-gray-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Decision Model</h2>
          {rightPanel}
          {actionBar && <div className="pt-4 border-t border-gray-700/50">{actionBar}</div>}
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
