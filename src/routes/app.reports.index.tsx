import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Stat, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { monthlySpend } from "@/lib/mock";

export const Route = createFileRoute("/app/reports/")({
  component: () => {
    const max = Math.max(...monthlySpend.map((m) => m.v));
    return (
      <Page eyebrow="Reports" title="Procurement Reports" description="Snapshot of procurement activity across the period.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Total Spend" value="$3.10M" delta="+12% YoY" />
          <Stat label="POs Issued" value="184" delta="+8 wk" />
          <Stat label="Invoices Paid" value="156" />
          <Stat label="Cycle Time" value="6.2d" delta="-0.4d" />
        </div>
        <Section title="Spend by Month">
          <Panel className="p-6">
            <div className="flex items-end gap-4 h-56">
              {monthlySpend.map((m) => (
                <div key={m.m} data-scramble-target className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-mono text-muted-foreground">${(m.v/1000).toFixed(0)}k</div>
                  <div className="w-full bg-white/15 group-hover:bg-white transition-colors rounded-sm" style={{ height: `${(m.v/max)*100}%` }} />
                  <div className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground"><ScrambleText>{m.m}</ScrambleText></div>
                </div>
              ))}
            </div>
          </Panel>
        </Section>
      </Page>
    );
  },
});
