import "./globals.css";
import Nav from "@/components/shared/Nav";
import React from "react";

export const metadata = {
  title: "SCALE AI Decision Demo",
  description: "Demonstrating separation of structured processing, decision AI (Jev), deterministic rules, generative AI, and human approval.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-scale-dark text-slate-800">
      <body className="min-h-screen antialiased">
        <Nav />
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-xs text-gray-400">
          SCALE AI Decision Demo — TypeSafe / Jev · Deterministic Rules · Vercel AI SDK · Human Approval
        </footer>
      </body>
    </html>
  );
}
