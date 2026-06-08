import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";

export const Route = createFileRoute("/app/settings/")({
  component: () => (
    <Page eyebrow="Settings" title="Organization" description="Workspace identity, address, tax registration and branding."
      actions={<ScrambleButton variant="primary">Save Changes</ScrambleButton>}>
      <Section title="Identity">
        <Panel className="grid md:grid-cols-2 gap-4 p-6">
          <F label="Workspace Name"><input className="vb-input" defaultValue="VendorBridge Systems" /></F>
          <F label="Trading Name"><input className="vb-input" defaultValue="VendorBridge" /></F>
          <F label="GST / VAT"><input className="vb-input" defaultValue="29AABCV1234F1Z5" /></F>
          <F label="Registered Country"><input className="vb-input" defaultValue="United States" /></F>
          <div className="md:col-span-2"><F label="Registered Address"><textarea className="vb-textarea" defaultValue="1 Market Street, Suite 4200, San Francisco, CA 94105" /></F></div>
        </Panel>
      </Section>
    </Page>
  ),
});
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-1.5">{label}</div>{children}</label>;
}
