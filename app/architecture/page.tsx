"use client";

import React from "react";

export default function ArchitecturePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-white">Architecture</h1>
      <p className="text-gray-400">The SCALE AI architecture separates structured processing, decision AI (Jev), deterministic rules, generative AI, and human approval.</p>

      <div className="bg-scale-panel border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-4">Conceptual Flow</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-center">
          {["User / Engineer", "SCALE Workflow", "Extraction / Parsing", "Decision AI / Jev", "Generative AI / LLM", "Deterministic Rules", "Human Approval"].map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <div className="w-28 h-16 bg-gradient-to-br from-emerald-900 to-teal-900 border border-emerald-700 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-300 shadow-lg shadow-emerald-900/30">
                  {label}
                </div>
              </div>
              {i < 6 && <span className="text-2xl text-gray-600">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "Understand", desc: "Structured data extraction and parsing from tender, engineering, or vendor inputs.", color: "from-blue-900 to-indigo-900", border: "border-blue-700", text: "text-blue-300" },
          { title: "Decide", desc: "Bounded decision questions answered by Jev (TypeSafe System One) with typed results and probabilities.", color: "from-emerald-900 to-teal-900", border: "border-emerald-700", text: "text-emerald-300" },
          { title: "Generate", desc: "LLM produces explanations, proposal paragraphs, or test descriptions from structured facts — not decisions.", color: "from-violet-900 to-purple-900", border: "border-violet-700", text: "text-violet-300" },
        ].map((card) => (
          <div key={card.title} className={`bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-5 shadow-xl`}>
            <h3 className={`text-xl font-extrabold ${card.text} mb-2`}>{card.title}</h3>
            <p className="text-sm text-gray-300">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-scale-panel border border-gray-800 rounded-2xl p-6 shadow-xl space-y-3">
        <h2 className="text-lg font-bold text-white">Design Principle</h2>
        <blockquote className="text-xl font-medium text-emerald-300 border-l-4 border-emerald-500 pl-4">Generative models generate. Decision models decide. Deterministic software enforces. Humans approve exceptions and technical meaning.</blockquote>
        <p className="text-sm text-gray-400">The demo answers: "Why should we use the same LLM for everything?" By showing that structured processing, bounded decisions, arithmetic, and language generation each have appropriate roles.</p>
      </div>
    </div>
  );
}
