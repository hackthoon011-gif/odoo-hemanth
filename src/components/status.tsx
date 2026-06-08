import { cn } from "@/lib/utils";

type Tone = "approved" | "pending" | "rejected" | "neutral" | "info";

const tones: Record<Tone, string> = {
  approved: "text-[color:var(--color-success)] border-[color:var(--color-success)]/30 bg-[color:var(--color-success)]/[0.06]",
  pending: "text-[color:var(--color-warning)] border-[color:var(--color-warning)]/30 bg-[color:var(--color-warning)]/[0.06]",
  rejected: "text-destructive border-destructive/30 bg-destructive/[0.06]",
  neutral: "text-foreground/70 border-border bg-white/[0.03]",
  info: "text-foreground/80 border-white/20 bg-white/[0.04]",
};

const map: Record<string, Tone> = {
  Approved: "approved", Active: "approved", Fulfilled: "approved", Paid: "approved", Awarded: "approved", Open: "approved", Submitted: "approved",
  Pending: "pending", Draft: "pending", Invited: "pending", Processing: "pending",
  Rejected: "rejected", Cancelled: "rejected", Failed: "rejected", Overdue: "rejected",
  Closed: "neutral",
};

export function Status({ value, tone }: { value: string; tone?: Tone }) {
  const t = tone ?? map[value] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium tracking-wide uppercase",
        tones[t],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}
