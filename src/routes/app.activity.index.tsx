import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { activity } from "@/lib/mock";

export const Route = createFileRoute("/app/activity/")({
  component: () => (
    <Page eyebrow="Activity" title="Activity Timeline" description="Everything happening across your procurement workspace.">
      <Section>
        <Panel className="p-6">
          <ol className="relative border-l border-border ml-3 space-y-6">
            {[...activity, ...activity].map((a, i) => (
              <li key={i} data-scramble-target className="pl-6 relative">
                <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-white" />
                <div className="text-[11px] text-muted-foreground font-mono">{a.ts}</div>
                <div className="text-[13px] mt-0.5"><ScrambleText>{a.text}</ScrambleText></div>
                <div className="text-[11px] text-muted-foreground mt-0.5">by {a.actor}</div>
              </li>
            ))}
          </ol>
        </Panel>
      </Section>
    </Page>
  ),
});
