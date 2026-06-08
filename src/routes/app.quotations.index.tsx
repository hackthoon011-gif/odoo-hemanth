import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { useEntity } from "@/lib/store";

export const Route = createFileRoute("/app/quotations/")({
  component: QuotationList,
});

function QuotationList() {
  const quotations = useEntity("quotations");
  return (
    <Page eyebrow="Quotation Module" title="Quotation List" description="All quotations submitted against active RFQs."
      actions={<Link to="/app/quotations/submit"><ScrambleButton variant="primary">Submit Quotation</ScrambleButton></Link>}>
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono w-24" },
            { key: "rfq", label: "RFQ", className: "font-mono w-28" },
            { key: "vendor", label: "Vendor" },
            { key: "total", label: "Total", className: "text-right font-mono w-28" },
            { key: "delivery", label: "Delivery", className: "w-24" },
            { key: "status", label: "Status", className: "w-28" },
          ]}
          rows={quotations}
          renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> :
            c === "total" ? `$${(r.total as number).toLocaleString()}` :
            c === "id" ? <Link to="/app/quotations/$id" params={{ id: r.id }} data-scramble-target className="hover:underline">{r.id}</Link> :
            String(r[c as keyof typeof r])}
        />
      </Section>
    </Page>
  );
}
