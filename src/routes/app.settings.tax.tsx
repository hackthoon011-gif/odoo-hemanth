import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";

export const Route = createFileRoute("/app/settings/tax")({
  component: () => (
    <Page eyebrow="Settings" title="Tax Settings" description="Configure tax codes and rates applied to POs and invoices."
      actions={<ScrambleButton variant="primary">Save</ScrambleButton>}>
      <Section>
        <Panel className="p-6 space-y-4">
          {[
            ["GST Standard", "18%"],
            ["GST Reduced", "12%"],
            ["GST Zero", "0%"],
            ["VAT EU", "20%"],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[1fr_120px] gap-4 items-center border-b border-border/60 pb-3 last:border-0">
              <input className="vb-input" defaultValue={k} />
              <input className="vb-input text-right font-mono" defaultValue={v} />
            </div>
          ))}
        </Panel>
      </Section>
    </Page>
  ),
});
