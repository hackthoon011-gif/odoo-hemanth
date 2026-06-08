import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { useEntity } from "@/lib/store";

export const Route = createFileRoute("/app/invoices/")({ component: InvoiceList });

function InvoiceList() {
  const invoices = useEntity("invoices");
  return (
    <Page eyebrow="Invoices" title="Invoice List" description="All invoices generated from purchase orders."
      actions={<Link to="/app/invoices/new"><ScrambleButton variant="primary">Generate Invoice</ScrambleButton></Link>}>
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "Invoice #", className: "font-mono w-24" },
            { key: "po", label: "PO", className: "font-mono w-24" },
            { key: "vendor", label: "Vendor" },
            { key: "issued", label: "Issued", className: "font-mono w-32" },
            { key: "due", label: "Due", className: "font-mono w-32" },
            { key: "total", label: "Total", className: "text-right font-mono w-28" },
            { key: "status", label: "Status", className: "w-24" },
          ]}
          rows={invoices}
          renderCell={(c, r) =>
            c === "status" ? <Status value={String(r[c])} /> :
            c === "total" ? `$${(r.total as number).toLocaleString()}` :
            c === "id" ? <Link to="/app/invoices/$id" params={{ id: r.id }} data-scramble-target className="hover:underline">{r.id}</Link> :
            String(r[c as keyof typeof r])
          }
        />
      </Section>
    </Page>
  );
}
