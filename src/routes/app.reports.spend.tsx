import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";

const cats = [
  { name: "Industrial", v: 1.2 },
  { name: "Raw Materials", v: 2.1 },
  { name: "Electronics", v: 0.88 },
  { name: "Packaging", v: 0.39 },
  { name: "Logistics", v: 0.61 },
  { name: "Office", v: 0.096 },
];

export const Route = createFileRoute("/app/reports/spend")({
  component: () => {
    const total = cats.reduce((a, b) => a + b.v, 0);
    return (
      <Page eyebrow="Reports" title="Spend Analysis" description="Category-level spend distribution.">
        <Section>
          <Panel className="p-6 space-y-4">
            {cats.map((c) => (
              <div key={c.name} data-scramble-target className="grid grid-cols-[180px_1fr_100px] gap-4 items-center">
                <div className="text-[13px]"><ScrambleText>{c.name}</ScrambleText></div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden"><div className="h-full bg-white" style={{ width: `${(c.v/total)*100}%` }} /></div>
                <div className="text-right font-mono text-[13px]">${c.v.toFixed(2)}M</div>
              </div>
            ))}
          </Panel>
        </Section>
      </Page>
    );
  },
});
