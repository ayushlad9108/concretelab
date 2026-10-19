export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="9" className="fill-primary" />
      <path d="M9 25 L18 9 L27 25 Z" fill="none" className="stroke-navy-fg" strokeWidth="1.6" />
      <path d="M13.5 17 H22.5 M11.2 21 H24.8" className="stroke-navy-muted" strokeWidth="1.2" />
      <circle cx="18" cy="9" r="2.2" className="fill-accent" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight ${dark ? "text-navy-fg" : "text-primary"}`}>
          ConcreteLab
        </span>
        <span className={`block text-[11px] font-medium ${dark ? "text-navy-muted" : "text-muted-foreground"}`}>
          Concrete Analysis &amp; Verification
        </span>
      </span>
    </span>
  );
}
