import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleLink } from "@/components/scramble-link";
import { ArrowLeft, Lock, Monitor, Hexagon, Cpu } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-[0.9fr_1.1fr] bg-black text-foreground">
      <aside className="hidden lg:flex flex-col justify-between border-r border-border p-12 dot-grid relative overflow-hidden">
        <Link to="/" data-scramble-target className="flex items-center gap-2.5 w-fit">
          <div className="size-6 rounded-sm bg-white text-black grid place-items-center text-[12px] font-bold">VB</div>
          <ScrambleText className="text-[14px] font-medium tracking-tight">VendorBridge</ScrambleText>
        </Link>

        <InferencePath />

        <ScrambleLink to="/" icon={<ArrowLeft className="size-3.5" />}>Back to home</ScrambleLink>
      </aside>

      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function InferencePath() {
  return (
    <div className="relative w-full rounded-lg border border-border bg-black/60 backdrop-blur-sm overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 h-9 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[oklch(0.62_0.21_25)]" />
          <span className="size-2 rounded-full bg-[oklch(0.78_0.17_65)]" />
          <span className="size-2 rounded-full bg-[oklch(0.72_0.17_152)]" />
          <span className="ml-3 text-[10.5px] tracking-[0.22em] font-mono text-muted-foreground uppercase">Inference-Path</span>
        </div>
        <span className="brand-pill"><Lock className="size-3" /> end-to-end</span>
      </div>

      {/* scene */}
      <div className="relative px-6 py-10">
        <div className="grid grid-cols-[1fr_auto_1.2fr_auto_1fr] items-center gap-3">
          {/* device */}
          <Node icon={<Monitor className="size-5 text-foreground/80" />} title="YOUR DEVICE" subtitle="Client" />

          {/* link 1 */}
          <Link1 />

          {/* blackbox */}
          <Node
            highlight
            icon={<Hexagon className="size-5 text-brand" />}
            title="VENDORBRIDGE"
            subtitle="Zero-knowledge proxy"
          />

          {/* link 2 */}
          <Link1 reverse />

          {/* models */}
          <Node icon={<Cpu className="size-5 text-foreground/80" />} title="EVERY VENDOR" subtitle="+24" />
        </div>

        <p className="mt-8 text-center text-[10.5px] tracking-[0.22em] uppercase font-mono text-muted-foreground">
          Quotes · Approvals — never readable by third parties
        </p>
      </div>

      {/* soft glow */}
      <div className="pointer-events-none absolute inset-x-0 top-9 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.18_50/0.6)] to-transparent" />
    </div>
  );
}

function Node({ icon, title, subtitle, highlight = false }: { icon: React.ReactNode; title: string; subtitle: string; highlight?: boolean }) {
  return (
    <div className={`relative rounded-md border ${highlight ? "border-brand bg-[oklch(0.72_0.18_50/0.05)]" : "border-border bg-white/[0.02]"} px-4 py-5 text-center`}>
      <div className="flex justify-center mb-3">{icon}</div>
      <div className={`text-[10.5px] tracking-[0.22em] font-mono uppercase ${highlight ? "text-brand" : "text-foreground"}`}>{title}</div>
      <div className="text-[10.5px] text-muted-foreground mt-1">{subtitle}</div>
      {highlight && <div className="absolute -inset-px rounded-md ring-1 ring-brand/40 pointer-events-none" />}
    </div>
  );
}

function Link1({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative w-full min-w-[90px] flex items-center">
      <div className="flow-line w-full" style={reverse ? { animationDirection: "reverse" } : undefined} />
      <span className="absolute left-1/2 -translate-x-1/2 brand-pill whitespace-nowrap">
        <Lock className="size-3" /> Encrypted
      </span>
    </div>
  );
}
