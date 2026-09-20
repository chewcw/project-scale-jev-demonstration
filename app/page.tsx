import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">SCALE AI Decision Demo</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">Demonstrating why an enterprise AI application should separate structured processing, decision AI (Jev), deterministic rules, generative AI, and human approval.</p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Link href="/tender" className="group block bg-gradient-to-br from-blue-950 to-blue-900 border border-blue-800 rounded-2xl p-6 shadow-xl hover:shadow-blue-900/30 transition-all hover:-translate-y-1">
          <h3 className="text-xl font-bold text-blue-200 mb-2">Tender Decision</h3>
          <p className="text-sm text-blue-100/80">Structured tender input → Jev decision → deterministic rules → LLM proposal draft.</p>
        </Link>
        <Link href="/engineering" className="group block bg-gradient-to-br from-cyan-950 to-cyan-900 border border-cyan-800 rounded-2xl p-6 shadow-xl hover:shadow-cyan-900/30 transition-all hover:-translate-y-1">
          <h3 className="text-xl font-bold text-cyan-200 mb-2">Engineering Cross-check</h3>
          <p className="text-sm text-cyan-100/80">Synthetic instrumentation data → match/mismatch/unclear → FAT generation.</p>
        </Link>
        <Link href="/procurement" className="group block bg-gradient-to-br from-amber-950 to-amber-900 border border-amber-800 rounded-2xl p-6 shadow-xl hover:shadow-amber-900/30 transition-all hover:-translate-y-1">
          <h3 className="text-xl font-bold text-amber-200 mb-2">Vendor Procurement</h3>
          <p className="text-sm text-amber-100/80">Vendor quotes → compliance/suitability → deterministic price/lead-time comparison.</p>
        </Link>
      </section>

      <section className="bg-scale-panel border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Architecture Overview</h2>
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs md:text-sm text-center">
          {["Extraction / Parsing", "Decision AI / Jev", "Generative AI / LLM", "Deterministic Rules", "Human Approval"].map((label, i) => (
            <React.Fragment key={label}>
              <span className="px-4 py-2 bg-gradient-to-r from-emerald-900 to-teal-900 border border-emerald-700 rounded-full font-medium text-emerald-200 shadow-lg shadow-emerald-900/20">{label}</span>
              {i < 4 && <span className="text-2xl text-gray-600">→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-800/30 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-emerald-200 mb-3">Live Decision Model Editor</h2>
        <p className="text-gray-300 mb-4">Every scenario includes a JSON editor for Jev questions. Change the decision model at runtime and see results change immediately</p>
        <div className="text-xs text-emerald-300 font-mono bg-black/30 p-3 rounded-lg border border-emerald-800/40 overflow-x-auto">
          {`{"questions":{"technicalFit":{"id":"technicalFit","type":"choice","question":"How well does the company technically fit this tender?","options":["FIT","PARTIAL_FIT","NO_FIT","UNCLEAR"]}}}`}
        </div>
      </section>
    </div>
  );
}
