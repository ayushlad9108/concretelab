import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CALCULATOR_URL } from "@/lib/config";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#methodology", label: "Methodology" },
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main">
        <a href="#top" aria-label="ConcreteLab home"><Logo /></a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
          <a href={CALCULATOR_URL} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary">
            Open Calculator
          </a>
        </div>
        <button
          className="rounded-md p-2 text-primary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-card px-5 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-foreground">
              {l.label}
            </a>
          ))}
          <a href={CALCULATOR_URL} className="mt-3 block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
            Open Calculator
          </a>
        </div>
      )}
    </header>
  );
}
