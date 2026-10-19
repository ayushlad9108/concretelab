// Illustrative sample data only — not results from the calculator.
const rows = [
  { id: "S-01", c: 412, w: 0.42, fa: 718, actual: 38.2, pred: 37.4 },
  { id: "S-02", c: 365, w: 0.48, fa: 742, actual: 33.1, pred: 34.0 },
  { id: "S-03", c: 450, w: 0.38, fa: 690, actual: 42.6, pred: 41.9 },
  { id: "S-04", c: 330, w: 0.52, fa: 760, actual: 29.8, pred: 30.9 },
];

const pts: [number, number][] = [
  [29.8, 30.9], [31.2, 30.6], [33.1, 34.0], [34.5, 33.6], [36.0, 36.8],
  [38.2, 37.4], [39.4, 40.1], [41.0, 40.2], [42.6, 41.9], [44.1, 44.8],
];

export function ScatterChart({ height = 150 }: { height?: number }) {
  const min = 28, max = 46, W = 260, H = height, p = 22;
  const x = (v: number) => p + ((v - min) / (max - min)) * (W - p - 6);
  const y = (v: number) => H - p - ((v - min) / (max - min)) * (H - p - 6);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Illustrative predicted versus actual scatter chart">
      {[30, 34, 38, 42, 46].map((t) => (
        <g key={t}>
          <line x1={p} x2={W - 6} y1={y(t)} y2={y(t)} className="stroke-border" strokeWidth="0.6" />
          <line y1={6} y2={H - p} x1={x(t)} x2={x(t)} className="stroke-border" strokeWidth="0.6" />
          <text x={p - 4} y={y(t) + 3} textAnchor="end" className="fill-muted-foreground font-mono" fontSize="7">{t}</text>
          <text x={x(t)} y={H - p + 10} textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="7">{t}</text>
        </g>
      ))}
      <line x1={x(min)} y1={y(min)} x2={x(max)} y2={y(max)} className="stroke-secondary" strokeDasharray="3 3" strokeWidth="0.9" />
      {pts.map(([a, b], i) => (
        <circle key={i} cx={x(a)} cy={y(b)} r="3" className="fill-accent stroke-card" strokeWidth="1" />
      ))}
    </svg>
  );
}

function Win({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-card ${className}`}>
      <div className="border-b border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export function SampleTag() {
  return (
    <span className="rounded border border-warning/40 bg-warning/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground">
      Illustrative sample data
    </span>
  );
}

export function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-panel">
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground">concretelab / analysis</span>
        </div>
        <SampleTag />
      </div>
      <div className="grid gap-3 p-3 sm:grid-cols-5">
        <Win title="Component inputs" className="sm:col-span-3">
          <table className="w-full font-mono text-[10px]">
            <thead className="text-muted-foreground">
              <tr className="text-left"><th className="pb-1.5 font-medium">ID</th><th className="font-medium">Cement</th><th className="font-medium">w/c</th><th className="font-medium">FA</th><th className="text-right font-medium">Pred K</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="py-1.5 font-semibold text-primary">{r.id}</td><td>{r.c}</td><td>{r.w}</td><td>{r.fa}</td><td className="text-right text-accent">{r.pred.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Win>
        <Win title="Validation metrics" className="sm:col-span-2">
          <dl className="space-y-2 font-mono text-[11px]">
            {[["MAE", "0.74"], ["RMSE", "0.82"], ["R²", "0.97"], ["n", "10"]].map(([k, v]) => (
              <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold text-primary">{v}</dd></div>
            ))}
          </dl>
        </Win>
        <Win title="Predicted vs actual" className="sm:col-span-3"><ScatterChart /></Win>
        <div className="space-y-3 sm:col-span-2">
          <Win title="Matrix check">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-semibold text-primary">Symmetric</span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">max |A−Aᵀ| = 0.0e+0</p>
          </Win>
          <Win title="Recent analysis">
            <p className="text-[11px] font-semibold text-primary">Batch_A.xlsx</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">10 specimens · 4 components</p>
          </Win>
        </div>
      </div>
    </div>
  );
}
