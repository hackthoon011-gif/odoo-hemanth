import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { ScrambleText } from "@/components/scramble-text";

const exports = [
  "Procurement Summary — CSV",
  "Vendor Master — XLSX",
  "Spend Analysis — PDF",
  "Approval Trail — CSV",
  "Invoices — XLSX",
  "Audit Log — JSON",
];

export const Route = createFileRoute("/app/reports/export")({
  component: () => (
    <Page eyebrow="Reports" title="Export Center" description="Generate exports for finance, audit and BI tooling.">
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exports.map((e) => (
            <Panel key={e} className="p-6 flex flex-col gap-4">
              <div data-scramble-target className="text-[13px] font-medium"><ScrambleText>{e}</ScrambleText></div>
              <div className="text-[11px] text-muted-foreground font-mono">Last generated 2026-06-04 · 1.8 MB</div>
              <ScrambleButton variant="outline" className="mt-auto">Generate Export</ScrambleButton>
            </Panel>
          ))}
        </div>
      </Section>
    </Page>
  ),
});
