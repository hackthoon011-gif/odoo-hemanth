import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { useEntity } from "@/lib/store";

export const Route = createFileRoute("/app/purchase-orders/")({
  component: POList,
});

function POList() {
  const purchaseOrders = useEntity("purchaseOrders");
  return (
    <Page eyebrow="Purchase Orders" title="PO List" description="All purchase orders generated from awarded quotations."
      actions={<Link to="/app/purchase-orders/new"><ScrambleButton variant="primary">Generate PO</ScrambleButton></Link>}>
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "PO #", className: "font-mono w-24" },
            { key: "vendor", label: "Vendor" },
            { key: "issued", label: "Issued", className: "font-mono w-32" },
            { key: "lines", label: "Lines", className: "text-right w-20" },
            { key: "total", label: "Total", className: "text-right font-mono w-28" },
            { key: "status", label: "Status", className: "w-28" },
          ]}
          rows={purchaseOrders}
          renderCell={(c, r) =>
            c === "status" ? <Status value={String(r[c])} /> :
            c === "total" ? `$${(r.total as number).toLocaleString()}` :
            c === "id" ? <Link to="/app/purchase-orders/$id" params={{ id: r.id }} data-scramble-target className="hover:underline">{r.id}</Link> :
            String(r[c as keyof typeof r])
          }
        />
      </Section>
    </Page>
  );
}
