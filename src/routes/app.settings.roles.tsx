import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";

const roles = [
  { name: "Administrator", perms: ["Manage Users", "Manage Vendors", "Manage Roles", "All Analytics", "Settings"] },
  { name: "Procurement Officer", perms: ["Create RFQ", "Compare Quotations", "Generate PO", "Generate Invoice"] },
  { name: "Manager", perms: ["Approve", "Reject", "Monitor Procurement"] },
  { name: "Vendor", perms: ["Submit Quotation", "Track RFQ", "View PO"] },
];

export const Route = createFileRoute("/app/settings/roles")({
  component: () => (
    <Page eyebrow="Settings" title="Role Management" description="Define what each role in your workspace can do.">
      <Section>
        <div className="grid md:grid-cols-2 gap-4">
          {roles.map((r) => (
            <Panel key={r.name} className="p-6">
              <div data-scramble-target className="text-[13px] font-medium mb-3"><ScrambleText>{r.name}</ScrambleText></div>
              <ul className="space-y-1.5 text-[12px] text-muted-foreground">
                {r.perms.map((p) => (
                  <li key={p} data-scramble-target className="flex items-center gap-2"><span className="size-1 rounded-full bg-white/60" /><ScrambleText>{p}</ScrambleText></li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </Section>
    </Page>
  ),
});
