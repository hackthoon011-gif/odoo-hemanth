import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { vendors } from "@/lib/mock";

export const Route = createFileRoute("/app/comparison/evaluation")({
  component: () => (
    <Page eyebrow="Comparison" title="Vendor Evaluation" description="Score vendors against weighted criteria — price, delivery, quality, compliance.">
      <Section title="Scorecard">
        <Panel className="p-6 space-y-4">
          {vendors.slice(0,5).map((v) => (
            <div key={v.id} data-scramble-target className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_80px] gap-4 items-center text-[13px] border-b border-border/60 pb-3 last:border-0">
              <div><ScrambleText>{v.name}</ScrambleText><div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{v.category}</div></div>
              {["Price", "Delivery", "Quality", "Compliance"].map((k, i) => (
                <div key={k}>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{k}</div>
                  <div className="font-mono">{(v.rating - 0.1*i).toFixed(1)} / 5</div>
                </div>
              ))}
              <div className="text-right font-mono text-[14px]">{(v.rating*0.96).toFixed(2)}</div>
            </div>
          ))}
        </Panel>
      </Section>
    </Page>
  ),
});
