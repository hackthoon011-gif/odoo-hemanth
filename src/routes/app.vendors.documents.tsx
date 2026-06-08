import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { Status } from "@/components/status";
import { ScrambleButton } from "@/components/scramble-button";

const docs = [
  { id: "DOC-2201", vendor: "Northwind Industrial Supply", type: "GST Certificate", expires: "2027-04-12", status: "Approved" },
  { id: "DOC-2202", vendor: "Helios Components Ltd", type: "ISO 9001", expires: "2026-12-09", status: "Pending" },
  { id: "DOC-2203", vendor: "Atlas Metalworks", type: "Trade License", expires: "2028-01-22", status: "Approved" },
  { id: "DOC-2204", vendor: "Kuro Logistics", type: "Insurance", expires: "2026-09-15", status: "Rejected" },
  { id: "DOC-2205", vendor: "Borealis Packaging", type: "FSC Cert.", expires: "2027-03-04", status: "Approved" },
];

export const Route = createFileRoute("/app/vendors/documents")({
  component: () => (
    <Page eyebrow="Vendor Module" title="Vendor Documents" description="Track compliance documents, certifications and expirations."
      actions={<ScrambleButton variant="primary">Upload Document</ScrambleButton>}>
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono text-muted-foreground w-28" },
            { key: "vendor", label: "Vendor" },
            { key: "type", label: "Type", className: "w-40" },
            { key: "expires", label: "Expires", className: "font-mono w-32" },
            { key: "status", label: "Status", className: "w-28" },
          ]}
          rows={docs}
          renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : String(r[c as keyof typeof r])}
        />
      </Section>
    </Page>
  ),
});
