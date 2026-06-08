import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrambleButton } from "@/components/scramble-button";
import {
  ArrowRight,
  Lock,
  Hexagon,
  FileText,
  Search,
  GitCompare,
  ShieldCheck,
  ScrollText,
  Receipt,
  BarChart3,
  ChevronRight,
  Zap,
  Layers,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VendorBridge — Procurement Operating System" },
      { name: "description", content: "Run RFQs, compare quotations, approve POs and issue invoices in one Blackbox-inspired procurement platform." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col brand-top-glow">
      <header className="h-16 px-8 lg:px-14 flex items-center border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="size-6 rounded-sm bg-brand text-black grid place-items-center text-[12px] font-bold">VB</div>
          <span className="text-[14px] font-medium tracking-tight">VendorBridge</span>
          <span className="ml-3 hidden sm:inline-flex brand-pill">
            <Lock className="size-3" /> end-to-end
          </span>
        </div>
        <div className="flex-1" />
        <nav className="flex items-center gap-1">
          <Link to="/auth/login" className="px-3 h-9 inline-flex items-center text-[13px] text-foreground/75 hover:text-brand transition-colors rounded-md hover:bg-white/[0.04]">
            Sign In
          </Link>
          <Link to="/auth/signup">
            <ScrambleButton size="sm" variant="brand">Get Access</ScrambleButton>
          </Link>
        </nav>
      </header>

      <main className="flex-1 grid lg:grid-cols-[1.1fr_0.9fr] dot-grid">
        <section className="flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-24 border-r border-border bg-black">
          <div className="text-[11px] uppercase tracking-[0.3em] font-mono mb-6 flex items-center gap-3">
            <span className="brand-dot" />
            <span className="text-brand">Procurement</span>
            <span className="text-muted-foreground">/ Operating System / v3.0</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-balance">
            The procurement
            <br />
            workspace built
            <br />
            <span className="text-muted-foreground">for </span>
            <span className="text-brand">operators.</span>
          </h1>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Source vendors, run RFQs, compare quotations side by side, route approvals, and ship purchase orders and invoices — without leaving a single black canvas.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/auth/signup">
              <ScrambleButton size="lg" variant="brand" iconRight={<ArrowRight className="size-4" />}>
                Get Access
              </ScrambleButton>
            </Link>
            <Link to="/auth/login">
              <ScrambleButton size="lg" variant="outline">Sign In</ScrambleButton>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-10 max-w-lg">
            {[
              { k: "RFQs run", v: "12.4k", accent: "brand" as const },
              { k: "Vendors", v: "3,180", accent: "neutral" as const },
              { k: "Approvals/day", v: "742", accent: "ember" as const },
            ].map((s) => (
              <div key={s.k}>
                <div className={`text-2xl font-medium tracking-tight ${s.accent === "brand" ? "text-brand" : s.accent === "ember" ? "text-ember" : ""}`}>
                  {s.v}
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono mt-1">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="hidden lg:flex flex-col justify-center px-14 py-24 gap-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
              <Hexagon className="size-3 text-brand" />
              inference-path
            </div>
            <span className="brand-pill">
              <Lock className="size-3" /> live
            </span>
          </div>

          {[
            { l: "rfq.create({ items: 14, vendors: 6, deadline: '14d' })", tag: "encrypted", color: "brand" as const },
            { l: "quotation.compare(['QT-7781','QT-7782','QT-7783'])", tag: "ok", color: "brand" as const },
            { l: "approval.route(APR-330) → manager.queue", tag: "queued", color: "ember" as const },
            { l: "po.generate(PO-5582) ✓", tag: "shipped", color: "brand" as const },
            { l: "invoice.email(INV-9001) ✓", tag: "sent", color: "brand" as const },
          ].map((row, i) => (
            <div
              key={i}
              className="group font-mono text-[13px] text-foreground/75 hover:text-foreground transition-colors border border-border hover:border-brand/50 rounded-md px-4 py-3 bg-card/30 flex items-center gap-3"
            >
              <span className={`text-[11px] ${row.color === "ember" ? "text-ember" : "text-brand"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 truncate">{row.l}</span>
              <span className="flex-1 max-w-[80px] flow-line opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className={row.color === "ember" ? "ember-pill" : "brand-pill"}>{row.tag}</span>
            </div>
          ))}

          <div className="mt-6 text-center text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
            prompts · completions — <span className="text-brand">never readable by vendors</span>
          </div>
        </section>
      </main>

      <LifecycleSection />
      <CapabilitiesSection />
      <MetricsBand />
      <TestimonialSection />
      <CtaSection />

      <footer className="border-t border-border px-8 lg:px-14 h-14 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <span>© 2026 VendorBridge Systems</span>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><span className="brand-dot" /> status — operational</span>
          <span>build — <span className="text-brand">3.0.412</span></span>
        </div>
      </footer>
    </div>
  );
}

const LIFECYCLE = [
  { icon: FileText, title: "RFQ Creation", code: "01", desc: "Draft, line-item and dispatch requests in minutes.", tone: "brand" },
  { icon: Search, title: "Vendor Discovery", code: "02", desc: "Surface qualified vendors from a curated network.", tone: "neutral" },
  { icon: GitCompare, title: "Quotation Comparison", code: "03", desc: "Side-by-side scoring across price, lead & terms.", tone: "brand" },
  { icon: ShieldCheck, title: "Approval Workflow", code: "04", desc: "Routed signoffs with policy-aware thresholds.", tone: "ember" },
  { icon: ScrollText, title: "Purchase Order", code: "05", desc: "Generate, version and ship POs without leaving.", tone: "neutral" },
  { icon: Receipt, title: "Invoice Processing", code: "06", desc: "Match, validate and reconcile against the PO.", tone: "brand" },
  { icon: BarChart3, title: "Analytics", code: "07", desc: "Real-time spend, cycle-time and vendor scorecards.", tone: "ember" },
] as const;

function LifecycleSection() {
  return (
    <section className="border-t border-border bg-black px-8 lg:px-14 py-20 lg:py-28 dot-grid">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] font-mono mb-4 flex items-center gap-3">
              <span className="brand-dot" />
              <span className="text-brand">Lifecycle</span>
              <span className="text-muted-foreground">/ end-to-end / seven stages</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight max-w-2xl text-balance">
              The procurement lifecycle, <span className="text-brand">stitched together.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] text-muted-foreground leading-relaxed">
            One canvas, seven stages, zero context-switching. Every request flows from intent
            to invoice without leaving the workspace.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {LIFECYCLE.map((step, i) => {
            const Icon = step.icon;
            const accent =
              step.tone === "brand"
                ? "text-brand border-brand/40 hover:border-brand"
                : step.tone === "ember"
                ? "text-ember border-ember/40 hover:border-ember"
                : "text-foreground/80 border-border hover:border-white/40";
            return (
              <div key={step.code} className="relative group">
                <div
                  data-scramble-target
                  className={`relative rounded-md border bg-card/30 p-5 h-full transition-all duration-200 hover:bg-card/60 hover:-translate-y-1 ${accent}`}
                  style={{ animation: `fade-in 0.5s ease-out ${i * 80}ms both` }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <Icon className="size-5" />
                    <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">
                      {step.code}
                    </span>
                  </div>
                  <div className="text-[13px] font-medium tracking-tight text-foreground mb-2">
                    {step.title}
                  </div>
                  <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < LIFECYCLE.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 size-4 text-brand/60 z-10" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
          <span className="h-px w-12 bg-border" />
          intent <span className="text-brand">→</span> invoice
          <span className="h-px w-12 bg-border" />
        </div>
      </div>
    </section>
  );
}

const CAPABILITIES = [
  { icon: Layers, title: "Composable modules", desc: "Switch on RFQs, POs, invoicing or analytics independently. Adopt at your pace." },
  { icon: ShieldCheck, title: "Policy guardrails", desc: "Threshold-based approvals, audit trails and role-aware permissions baked in." },
  { icon: Zap, title: "Realtime collaboration", desc: "Vendors, requesters and approvers act on the same source of truth — live." },
  { icon: Eye, title: "Spend observability", desc: "Slice every dollar by vendor, category, cost-center or cycle-time." },
];

function CapabilitiesSection() {
  return (
    <section className="border-t border-border bg-black px-8 lg:px-14 py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] uppercase tracking-[0.3em] font-mono mb-4 flex items-center gap-3">
          <span className="brand-dot" />
          <span className="text-brand">Capabilities</span>
          <span className="text-muted-foreground">/ everything you'd build yourself</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-medium tracking-tight max-w-2xl text-balance mb-14">
          Built for the people who actually <span className="text-ember">run the buys.</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                data-scramble-target
                className="rounded-md border border-border bg-card/30 p-6 hover:border-brand/50 hover:bg-card/60 transition-all duration-200 hover:-translate-y-1"
                style={{ animation: `fade-in 0.5s ease-out ${i * 100}ms both` }}
              >
                <Icon className="size-5 text-brand mb-5" />
                <div className="text-[14px] font-medium tracking-tight mb-2">{c.title}</div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MetricsBand() {
  const metrics = [
    { v: "78%", k: "cycle-time reduction", tone: "brand" },
    { v: "12.4k", k: "RFQs orchestrated", tone: "neutral" },
    { v: "$420M", k: "spend under management", tone: "ember" },
    { v: "99.99%", k: "platform uptime", tone: "brand" },
  ] as const;
  return (
    <section className="border-t border-border bg-black px-8 lg:px-14 py-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m) => (
          <div key={m.k} data-scramble-target>
            <div
              className={`text-4xl lg:text-5xl font-medium tracking-tight ${
                m.tone === "brand" ? "text-brand" : m.tone === "ember" ? "text-ember" : "text-foreground"
              }`}
            >
              {m.v}
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
              {m.k}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="border-t border-border bg-black px-8 lg:px-14 py-20 lg:py-28 dot-grid">
      <div className="max-w-[1100px] mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] font-mono mb-6 text-muted-foreground">
          <span className="text-brand">— field report</span> / atlas industrial
        </div>
        <blockquote className="text-2xl lg:text-3xl font-medium tracking-tight leading-snug text-balance">
          "We collapsed four tools into VendorBridge. Our procurement cycle went from{" "}
          <span className="text-brand">14 days to 3</span>, and every approver finally
          works from the <span className="text-ember">same canvas.</span>"
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3 text-[12px] font-mono text-muted-foreground">
          <span className="size-8 rounded-full bg-brand/15 border border-brand/30 grid place-items-center text-brand text-[11px]">RK</span>
          Riya Kapoor — VP Operations, Atlas Industrial
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="border-t border-border bg-black px-8 lg:px-14 py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto rounded-lg border border-brand/40 bg-gradient-to-br from-card/60 via-card/30 to-transparent p-10 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] font-mono mb-4 text-brand">
              Ready when you are
            </div>
            <h2 className="text-3xl lg:text-5xl font-medium tracking-tight text-balance">
              Ship your first RFQ in the <span className="text-brand">next ten minutes.</span>
            </h2>
            <p className="mt-5 text-[14px] text-muted-foreground max-w-md leading-relaxed">
              Spin up a workspace, invite your first three vendors, and watch the lifecycle run.
              No card. No setup call. No friction.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link to="/auth/signup" className="w-full lg:w-auto">
              <ScrambleButton size="lg" variant="brand" iconRight={<ArrowRight className="size-4" />} className="w-full">
                Get Access
              </ScrambleButton>
            </Link>
            <Link to="/auth/login" className="w-full lg:w-auto">
              <ScrambleButton size="lg" variant="outline" className="w-full">Sign In</ScrambleButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
