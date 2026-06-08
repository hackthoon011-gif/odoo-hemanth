import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { notifications } from "@/lib/mock";

export const Route = createFileRoute("/app/notifications/")({
  component: () => (
    <Page eyebrow="Notifications" title="Notification Center" description="Real-time alerts across RFQs, approvals and invoices.">
      <Section>
        <Panel className="p-2">
          {notifications.map((n) => (
            <div key={n.id} data-scramble-target className="flex items-start gap-4 px-4 py-4 border-b border-border/60 last:border-0 hover:bg-white/[0.02]">
              <div className={`size-2 mt-2 rounded-full shrink-0 ${
                n.kind === "success" ? "bg-[color:var(--color-success)]" :
                n.kind === "warn" ? "bg-[color:var(--color-warning)]" :
                n.kind === "danger" ? "bg-destructive" : "bg-white/60"
              }`} />
              <div className="flex-1">
                <div className="text-[13px] font-medium"><ScrambleText>{n.title}</ScrambleText></div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{n.body}</div>
              </div>
              <div className="text-[11px] text-muted-foreground font-mono">{n.ts}</div>
            </div>
          ))}
        </Panel>
      </Section>
    </Page>
  ),
});
