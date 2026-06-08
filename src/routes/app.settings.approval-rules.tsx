import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";

const rules = [
  { threshold: "$0 – $5,000", who: "Procurement Officer", auto: true },
  { threshold: "$5,001 – $50,000", who: "Manager", auto: false },
  { threshold: "$50,001 – $500,000", who: "Manager + Finance", auto: false },
  { threshold: "$500,001+", who: "Manager + Finance + Admin", auto: false },
];

export const Route = createFileRoute("/app/settings/approval-rules")({
  component: () => (
    <Page eyebrow="Settings" title="Approval Rules" description="Tiered approval routing by amount.">
      <Section>
        <Panel className="p-2">
          <div className="grid grid-cols-[1.4fr_1.4fr_120px] gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono border-b border-border">
            <div>Threshold</div><div>Approvers</div><div className="text-right">Auto-Approve</div>
          </div>
          {rules.map((r) => (
            <div key={r.threshold} data-scramble-target className="grid grid-cols-[1.4fr_1.4fr_120px] gap-4 px-4 py-3 text-[13px] border-b border-border/60 last:border-0">
              <div className="font-mono"><ScrambleText>{r.threshold}</ScrambleText></div>
              <div><ScrambleText>{r.who}</ScrambleText></div>
              <div className="text-right font-mono text-muted-foreground">{r.auto ? "ON" : "OFF"}</div>
            </div>
          ))}
        </Panel>
      </Section>
    </Page>
  ),
});
