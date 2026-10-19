import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, FileSpreadsheet, LineChart, Grid3x3, Download, Upload, ShieldCheck, Play, ClipboardCheck, Check, Info,
} from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Logo } from "@/components/landing/Logo";
import { DashboardPreview, ScatterChart, SampleTag } from "@/components/landing/Preview";
import { CALCULATOR_URL } from "@/lib/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ConcreteLab — Concrete Lab K Analysis & Verification" },
      { name: "description", content: "Analyze concrete component inputs, generate Lab K estimates, review prediction errors and inspect calculation matrices." },
      { property: "og:title", content: "ConcreteLab — Concrete Lab K Analysis & Verification" },
      { property: "og:description", content: "An engineering workflow for concrete component data, Lab K prediction and numerical verification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:pt-24">
        <div>
          <p className="eyebrow">Concrete Materials Analysis Platform</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-5xl">
            Analyze Concrete Components. <span className="text-accent">Validate Lab K.</span> Make Informed Decisions.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            An engineering-focused platform for analyzing concrete component inputs, generating Lab K estimates, evaluating prediction errors, and examining calculation matrices through a structured verification workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={CALCULATOR_URL} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-secondary">
              Open Calculator <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#workflow" className="inline-flex items-center rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent">
              Explore the Workflow
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Excel-Based Inputs", "Prediction & Validation", "Matrix Diagnostics"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" />{t}</li>
            ))}
          </ul>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}

const overview = [
  { n: "01", icon: FileSpreadsheet, title: "Component Data Processing", items: ["Import component inputs from Excel.", "Associate specimen IDs with corresponding observations.", "Validate input structure and identify missing or invalid values."] },
  { n: "02", icon: LineChart, title: "Lab K Prediction", items: ["Analyze component-based inputs.", "Generate estimates using the existing calculator's implemented model.", "Compare predicted and observed values where reference observations are available."] },
  { n: "03", icon: Grid3x3, title: "Numerical Verification", items: ["Inspect calculation matrices and numerical diagnostics.", "Evaluate prediction errors using relevant validation metrics.", "Export available analysis results for further review."] },
];

function Overview() {
  return (
    <section id="overview" className="border-t border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead eyebrow="Overview" title="A Structured Approach to Concrete Analysis" text="Bring component data, prediction results, and numerical verification into a single workflow." />
        <div className="mt-14 grid overflow-hidden rounded-2xl border border-border md:grid-cols-3">
          {overview.map((o, i) => (
            <div key={o.n} className={`p-8 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""} ${i === 1 ? "bg-muted" : "bg-card"}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-accent">{o.n}</span>
                <o.icon className="h-5 w-5 text-secondary" strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 text-lg font-bold text-primary">{o.title}</h3>
              <ul className="mt-4 space-y-3">
                {o.items.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1 w-3 shrink-0 rounded bg-accent" />{t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const specimens = ["S-01", "S-02", "S-03", "S-04", "S-05"];
  const points = ["Specimen selection and component data", "Prediction results", "Actual-versus-predicted visualization", "Error metrics such as MAE and RMSE", "Matrix diagnostics", "Exportable results"];
  return (
    <section id="features" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-blueprint" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div className="order-2 overflow-hidden rounded-2xl border border-border bg-card shadow-panel lg:order-1">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="text-xs font-semibold text-primary">Analysis workspace</span><SampleTag />
          </div>
          <div className="grid sm:grid-cols-[150px_1fr]">
            <aside className="border-b border-border p-4 sm:border-b-0 sm:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Specimens</p>
              <ul className="mt-3 flex gap-1 font-mono text-xs sm:flex-col">
                {specimens.map((s, i) => (
                  <li key={s} className={`rounded-md px-2 py-1.5 ${i === 2 ? "bg-accent-soft font-semibold text-primary" : "text-muted-foreground"}`}>{s}</li>
                ))}
              </ul>
            </aside>
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-3 gap-3">
                {[["Predicted K", "41.9"], ["MAE", "0.74"], ["RMSE", "0.82"]].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-border p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className="mt-1 font-mono text-lg font-semibold text-primary">{v}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Actual vs predicted</p>
                <ScatterChart height={170} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3 text-xs">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /><span className="font-mono text-muted-foreground">Matrix: symmetric · cond ≈ 1.8e+2</span></span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-semibold text-primary-foreground"><Download className="h-3.5 w-3.5" />Export</span>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHead eyebrow="Product" title="From Raw Inputs to Interpretable Results" text="Each stage of an analysis stays visible — from the specimen data you supplied to the predictions, errors and numerical checks behind them." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium text-foreground"><Check className="h-4 w-4 shrink-0 text-accent" />{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: Upload, title: "Upload Data", text: "Import the component-input workbook and the Lab K workbook." },
  { icon: ShieldCheck, title: "Validate Inputs", text: "Check specimen matching, component values, and input consistency." },
  { icon: Play, title: "Run Analysis", text: "Execute the calculation and prediction methods supported by the existing application." },
  { icon: ClipboardCheck, title: "Review and Export", text: "Examine available predictions, validation metrics, diagnostics, and downloadable outputs." },
];

function Workflow() {
  return (
    <section id="workflow" className="border-y border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead center eyebrow="Workflow" title="A Clear, Step-by-Step Workflow" />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-border md:block" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 top-6 w-px bg-border md:hidden" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 md:block">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-card">
                <s.icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
              </div>
              <div className="md:mt-6">
                <p className="font-mono text-xs font-semibold text-muted-foreground">Step {i + 1}</p>
                <h3 className="mt-1 text-base font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const caps = [
  { icon: FileSpreadsheet, title: "Excel Integration", text: "Work with structured engineering data." },
  { icon: LineChart, title: "Prediction Analysis", text: "Review calculated estimates and comparisons." },
  { icon: Grid3x3, title: "Numerical Diagnostics", text: "Examine matrix properties and computational checks." },
  { icon: Download, title: "Results Export", text: "Download supported analysis outputs for documentation and review." },
];

function Capabilities() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <SectionHead eyebrow="Capabilities" title="Designed for Transparent Engineering Workflows" text="Tools that keep the data, the estimate and the checks behind it open to review." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {caps.map((c) => (
            <div key={c.title} className="bg-card p-7 transition-colors hover:bg-muted">
              <c.icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
              <h3 className="mt-4 font-bold text-primary">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  const principles = [
    "Input data should be checked before analysis.",
    "Prediction errors should be reviewed alongside the predicted values.",
    "Numerical diagnostics should be interpreted in the context of the underlying calculation method.",
  ];
  return (
    <section id="methodology" className="border-t border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead eyebrow="Methodology & limitations" title="Engineering Results Should Be Inspectable" text="Predictions depend on the supplied data, the model's assumptions and the validation procedure used. ConcreteLab is built so each of these can be examined rather than taken on trust." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <div key={p} className="rounded-xl border border-border bg-background p-6">
              <span className="font-mono text-xs font-semibold text-accent">Principle {i + 1}</span>
              <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">{p}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 flex max-w-3xl gap-3 rounded-lg border-l-2 border-accent bg-accent-soft px-4 py-3 text-sm text-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          Model estimates are analytical outputs and should not be treated as a substitute for required laboratory testing or independent engineering verification.
        </p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div className="absolute inset-0 bg-blueprint-dark" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy-fg sm:text-4xl">Ready to Explore Your Concrete Data?</h2>
        <p className="mt-4 text-lg text-navy-muted">Start with your component and Lab K workbooks, then review the available analysis and verification outputs.</p>
        <a href={CALCULATOR_URL} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">
          Launch ConcreteLab <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-navy-line bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="max-w-sm">
          <Logo dark />
          <p className="mt-4 text-sm leading-relaxed text-navy-muted">Analyze concrete component inputs, estimate Lab K and review the numerical checks behind every result.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <a href="#overview" className="text-navy-muted hover:text-navy-fg">Overview</a>
          <a href="#features" className="text-navy-muted hover:text-navy-fg">Features</a>
          <a href="#methodology" className="text-navy-muted hover:text-navy-fg">Methodology</a>
          <a href={CALCULATOR_URL} className="text-navy-muted hover:text-navy-fg">Calculator</a>
        </nav>
      </div>
      <div className="border-t border-navy-line">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-navy-muted lg:px-8">
          © {new Date().getFullYear()} ConcreteLab · Concrete analysis and calculation verification platform.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Showcase />
        <Workflow />
        <Capabilities />
        <Methodology />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
