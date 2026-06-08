import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { monthlySpend } from "@/lib/mock";

export const Route = createFileRoute("/app/reports/trends")({
  component: () => {
    const max = Math.max(...monthlySpend.map((m) => m.v));
    const min = Math.min(...monthlySpend.map((m) => m.v));
    const pts = monthlySpend.map((m, i) => {
      const x = (i / (monthlySpend.length - 1)) * 100;
      const y = 100 - ((m.v - min) / (max - min)) * 100;
      return `${x},${y}`;
    }).join(" ");
    return (
      <Page eyebrow="Reports" title="Monthly Trends" description="Spend trajectory over the last 7 months.">
        <Section>
          <Panel className="p-6">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-72">
              <polyline fill="none" stroke="white" strokeWidth="0.5" points={pts} />
              {monthlySpend.map((_, i) => {
                const [x, y] = pts.split(" ")[i].split(",");
                return <circle key={i} cx={x} cy={y} r="0.8" fill="white" />;
              })}
            </svg>
            <div className="flex justify-between mt-4 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {monthlySpend.map((m) => <div key={m.m} data-scramble-target><ScrambleText>{m.m}</ScrambleText></div>)}
            </div>
          </Panel>
        </Section>
      </Page>
    );
  },
});
