import Link from "next/link";
import React from "react";

export default function Nav() {
  const items = [
    { label: "Overview", href: "/" },
    { label: "Tender", href: "/tender" },
    { label: "Engineering", href: "/engineering" },
    { label: "Procurement", href: "/procurement" },
    { label: "Architecture", href: "/architecture" },
  ];
  return (
    <nav className="border-b border-gray-800 bg-scale-dark/80 backdrop-blur px-6 py-3">
      <div className="mx-auto max-w-6xl flex items-center gap-6">
        <span className="font-bold text-xl text-white tracking-tight">SCALE AI Demo</span>
        <div className="flex gap-4 text-sm text-gray-300">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="hover:text-white hover:underline transition-colors">
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
