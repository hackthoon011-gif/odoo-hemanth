import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { vendors } from "@/lib/mock";

export const Route = createFileRoute("/app/comparison/ranking")({
  component: () => {
    const ranked = [...vendors].sort((a,b) => b.rating - a.rating);
    return (
      <Page eyebrow="Comparison" title="Vendor Ranking" description="Composite rank across active categories.">
        <Section>
          <Panel className="p-2">
            {ranked.map((v, i) => (
              <div key={v.id} data-scramble-target className="grid grid-cols-[60px_1fr_120px_100px_80px] gap-4 items-center px-4 py-3 border-b border-border/60 last:border-0 hover:bg-white/[0.02]">
                <div className="font-mono text-muted-foreground">#{String(i+1).padStart(2,"0")}</div>
                <div className="text-[13px]"><ScrambleText>{v.name}</ScrambleText></div>
                <div className="text-[12px] text-muted-foreground">{v.category}</div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"><div className="h-full bg-white" style={{ width: `${(v.rating/5)*100}%` }} /></div>
                <div className="text-right font-mono text-[13px]">{v.rating.toFixed(1)}</div>
              </div>
            ))}
          </Panel>
        </Section>
      </Page>
    );
  },
});
