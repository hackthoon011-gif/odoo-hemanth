import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { Status } from "@/components/status";
import { quotations } from "@/lib/mock";

export const Route = createFileRoute("/app/quotations/history")({
  component: () => (
    <Page eyebrow="Quotation Module" title="Quotation History" description="Historical record of submitted, awarded and rejected quotations.">
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono w-24" },
            { key: "rfq", label: "RFQ", className: "font-mono w-28" },
            { key: "vendor", label: "Vendor" },
            { key: "total", label: "Total", className: "text-right font-mono w-28" },
            { key: "status", label: "Status", className: "w-28" },
          ]}
          rows={[...quotations, ...quotations.map(q => ({ ...q, id: q.id+"-A", status: "Awarded" })), ...quotations.map(q => ({ ...q, id: q.id+"-R", status: "Rejected" }))]}
          renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : c === "total" ? `$${(r.total as number).toLocaleString()}` : String(r[c as keyof typeof r])}
        />
      </Section>
    </Page>
  ),
});
