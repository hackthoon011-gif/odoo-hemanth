import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";

const prefs = [
  ["New RFQ assigned", true],
  ["Quotation received", true],
  ["Approval requested", true],
  ["Approval decision", true],
  ["Invoice paid", false],
  ["Vendor onboarding", true],
] as const;

export const Route = createFileRoute("/app/settings/notifications")({
  component: () => (
    <Page eyebrow="Settings" title="Notification Settings" description="Choose which events generate in-app and email alerts.">
      <Section>
        <Panel className="p-2">
          {prefs.map(([label, on]) => (
            <div key={label} data-scramble-target className="grid grid-cols-[1fr_100px_100px] gap-4 px-4 py-3 border-b border-border/60 last:border-0 text-[13px]">
              <div><ScrambleText>{label}</ScrambleText></div>
              <div className="text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{on ? "IN-APP ✓" : "—"}</div>
              <div className="text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{on ? "EMAIL ✓" : "—"}</div>
            </div>
          ))}
        </Panel>
      </Section>
    </Page>
  ),
});
