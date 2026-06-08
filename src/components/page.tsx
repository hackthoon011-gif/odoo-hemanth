import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrambleText } from "./scramble-text";

export function Page({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-full px-8 lg:px-14 py-10 lg:py-14 max-w-[1400px] mx-auto", className)}>
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-14">
        <div data-scramble-target className="space-y-3">
          {eyebrow ? (
            <div className="text-[11px] uppercase tracking-[0.22em] text-[oklch(0.78_0.16_55)] font-mono">
              <ScrambleText duration={500}>{eyebrow}</ScrambleText>
            </div>
          ) : null}
          <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-balance">
            <ScrambleText duration={700}>{title}</ScrambleText>
          </h1>
          {description ? (
            <p className="text-muted-foreground max-w-xl text-[14px] leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </header>
      <div className="space-y-8">{children}</div>
    </div>
  );
}

export function Section({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-5", className)}>
      {(title || actions) && (
        <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
          <div data-scramble-target>
            {title ? (
              <h2 className="text-[15px] font-medium tracking-tight text-[oklch(0.85_0.15_150)]">
                <ScrambleText duration={450}>{title}</ScrambleText>
              </h2>
            ) : null}
            {description ? (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex gap-2">{actions}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}

export function Panel({
  children,
  className,
  hoverable = true,
}: {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      data-scramble-target={hoverable ? "" : undefined}
      className={cn(
        "rounded-lg border border-border bg-card/40 p-5",
        hoverable && "transition-colors hover:border-white/25 hover:bg-card/60",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
}) {
  return (
    <Panel className="p-6">
      <div data-scramble-target className="text-[11px] uppercase tracking-[0.18em] text-[oklch(0.86_0.16_92)] font-mono">
        <ScrambleText duration={400}>{label}</ScrambleText>
      </div>
      <div className="mt-3 flex items-end gap-3">
        <div className="text-3xl font-medium tracking-tight">
          <ScrambleText duration={700}>{value}</ScrambleText>
        </div>
        {delta ? (
          <div className="text-xs text-muted-foreground pb-1.5 font-mono">{delta}</div>
        ) : null}
      </div>
      {hint ? <div className="mt-2 text-xs text-muted-foreground">{hint}</div> : null}
    </Panel>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  empty = "No records",
  renderCell,
}: {
  columns: { key: keyof T & string; label: string; className?: string }[];
  rows: T[];
  empty?: string;
  renderCell?: (col: string, row: T) => ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card/30">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.18em] text-[oklch(0.78_0.16_25)] font-mono">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-4 py-3 font-normal", c.className)}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td className="px-4 py-10 text-center text-muted-foreground" colSpan={columns.length}>{empty}</td></tr>
          ) : rows.map((row, i) => (
            <tr key={i} data-scramble-target className="border-b border-border/60 last:border-0 hover:bg-white/[0.025] transition-colors">
              {columns.map((c) => (
                <td key={c.key} className={cn("px-4 py-3 align-middle", c.className)}>
                  {renderCell ? renderCell(c.key, row) : String(row[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
