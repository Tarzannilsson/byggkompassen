"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/bibliotek", label: "Tjänster" },
  { href: "/matcha", label: "Guidad matchning" },
  { href: "/om", label: "Så funkar det" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ backgroundColor: "var(--navy-950)" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          Bygg<span style={{ color: "var(--copper-400)" }}>kompassen</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname.startsWith(l.href)
                  ? "text-white font-medium"
                  : "text-white/60 hover:text-white transition-colors"
              }
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/matcha"
            className="px-4 py-2 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--copper-500)" }}
          >
            Hitta mitt verktyg
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Meny"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4"
          style={{ backgroundColor: "var(--navy-950)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/matcha"
            className="px-4 py-2 rounded-lg text-white font-medium text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--copper-500)" }}
            onClick={() => setOpen(false)}
          >
            Hitta mitt verktyg
          </Link>
        </div>
      )}
    </header>
  );
}
