import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel, Stat } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { vendors } from "@/lib/mock";

export const Route = createFileRoute("/app/vendors/performance")({
  component: () => (
    <Page eyebrow="Vendor Module" title="Vendor Performance" description="Quality, delivery and responsiveness across the vendor base.">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="On-time Delivery" value="92.4%" delta="+1.2%" />
        <Stat label="Quality Pass Rate" value="98.1%" delta="+0.3%" />
        <Stat label="Avg Response" value="6.4h" delta="-1.1h" />
        <Stat label="Disputes" value="3" delta="-2 wk" />
      </div>
      <Section title="Top Performing Vendors">
        <Panel className="p-6 space-y-4">
          {[...vendors].sort((a,b) => b.rating - a.rating).slice(0, 5).map((v, i) => (
            <div key={v.id} data-scramble-target className="flex items-center gap-4">
              <div className="w-6 text-muted-foreground font-mono text-[12px]">#{i+1}</div>
              <div className="flex-1">
                <div className="text-[13px]"><ScrambleText>{v.name}</ScrambleText></div>
                <div className="text-[11px] text-muted-foreground font-mono">{v.category} · {v.orders} orders</div>
              </div>
              <div className="w-72 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-white" style={{ width: `${(v.rating/5)*100}%` }} />
              </div>
              <div className="w-12 text-right font-mono text-[13px]">{v.rating.toFixed(1)}</div>
            </div>
          ))}
        </Panel>
      </Section>
    </Page>
  ),
});
