import { createFileRoute } from "@tanstack/react-router";
import { Page, Panel, Section } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";

export const Route = createFileRoute("/app/vendors/categories")({ component: Categories });

const CATS = [
  { name: "Industrial", count: 84, spend: "$1.2M" },
  { name: "Electronics", count: 51, spend: "$880k" },
  { name: "Raw Materials", count: 38, spend: "$2.1M" },
  { name: "Packaging", count: 27, spend: "$390k" },
  { name: "Logistics", count: 19, spend: "$610k" },
  { name: "Chemicals", count: 14, spend: "$240k" },
  { name: "Office", count: 22, spend: "$96k" },
  { name: "IT Services", count: 11, spend: "$310k" },
];

function Categories() {
  return (
    <Page eyebrow="Vendor Module" title="Vendor Categories" description="Organize vendors by sourcing category and monitor category-level spend.">
      <Section title="Categories">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATS.map((c) => (
            <Panel key={c.name} className="p-5">
              <div data-scramble-target className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                <ScrambleText>{c.name}</ScrambleText>
              </div>
              <div className="text-3xl font-medium mt-2 tracking-tight">
                <ScrambleText>{c.count.toString()}</ScrambleText>
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">vendors · {c.spend} ytd</div>
            </Panel>
          ))}
        </div>
      </Section>
    </Page>
  );
}
