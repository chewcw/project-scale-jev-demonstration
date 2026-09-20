import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">SCALE AI Decision Demo</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">Demonstrating why an enterprise AI application should separate structured processing, decision AI (Jev), deterministic rules, generative AI, and human approval.</p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Link href="/tender" className="group block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-xl hover:shadow-blue-200/40 transition-all hover:-translate-y-1">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Tender Decision</h3>
          <p className="text-sm text-blue-800/80">Structured tender input → Jev decision → deterministic rules → LLM proposal draft.</p>
        </Link>
        <Link href="/engineering" className="group block bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-2xl p-6 shadow-xl hover:shadow-cyan-200/40 transition-all hover:-translate-y-1">
          <h3 className="text-xl font-bold text-cyan-700 mb-2">Engineering Cross-check</h3>
          <p className="text-sm text-cyan-800/80">Synthetic instrumentation data → match/mismatch/unclear → FAT generation.</p>
        </Link>
        <Link href="/procurement" className="group block bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6 shadow-xl hover:shadow-amber-200/40 transition-all hover:-translate-y-1">
          <h3 className="text-xl font-bold text-amber-700 mb-2">Vendor Procurement</h3>
          <p className="text-sm text-amber-800/80">Vendor quotes → compliance/suitability → deterministic price/lead-time comparison.</p>
        </Link>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture Overview</h2>
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs md:text-sm text-center">
          {["Extraction / Parsing", "Decision AI / Jev", "Generative AI / LLM", "Deterministic Rules", "Human Approval"].map((label, i) => (
            <React.Fragment key={label}>
              <span className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full font-medium text-emerald-800 shadow-lg shadow-emerald-50">{label}</span>
              {i < 4 && <span className="text-2xl text-gray-400">→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border border-emerald-200/40 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-emerald-700 mb-3">Live Decision Model Editor</h2>
        <p className="text-slate-700 mb-4">Every scenario includes a JSON editor for Jev questions. Change the decision model at runtime and see results change immediately</p>
        <div className="text-xs text-emerald-800 font-mono bg-emerald-50/60 p-3 rounded-lg border border-emerald-200/60 overflow-x-auto">
          {`{"questions":{"technicalFit":{"id":"technicalFit","type":"choice","question":"How well does the company technically fit this tender?","options":["FIT","PARTIAL_FIT","NO_FIT","UNCLEAR"]}}}`}
        </div>
      </section>
    </div>
  );
}
