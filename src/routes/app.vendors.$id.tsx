import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Page, Section, Panel, DataTable, Stat } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { quotations, vendors } from "@/lib/mock";

export const Route = createFileRoute("/app/vendors/$id")({ component: VendorProfile });

function VendorProfile() {
  const { id } = useParams({ from: "/app/vendors/$id" });
  const v = vendors.find((x) => x.id === id) ?? vendors[0];
  const myQuotes = quotations.filter((q) => q.vendor === v.name);

  return (
    <Page
      eyebrow={v.id}
      title={v.name}
      description={`${v.category} · ${v.country}`}
      actions={
        <>
          <Link to="/app/rfqs/new"><ScrambleButton variant="outline">Invite to RFQ</ScrambleButton></Link>
          <ScrambleButton variant="primary">Edit Vendor</ScrambleButton>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Rating" value={v.rating.toFixed(1)} hint="Across 18 closed POs" />
        <Stat label="Orders Lifetime" value={v.orders.toString()} hint="92% fulfilled on-time" />
        <Stat label="Active Quotations" value={myQuotes.length.toString()} hint="Last submitted 2h ago" />
        <Stat label="Compliance" value="Tier 2" hint="GST verified · MSME" />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <Section title="Quotations">
          <DataTable
            columns={[
              { key: "id", label: "ID", className: "font-mono text-muted-foreground w-24" },
              { key: "rfq", label: "RFQ", className: "font-mono w-28" },
              { key: "total", label: "Total", className: "text-right font-mono w-28" },
              { key: "delivery", label: "Delivery", className: "w-24" },
              { key: "status", label: "Status", className: "w-28" },
            ]}
            rows={myQuotes}
            renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : c === "total" ? `$${(r.total as number).toLocaleString()}` : String(r[c as keyof typeof r])}
          />
        </Section>

        <Section title="Profile">
          <Panel className="p-6 space-y-3 text-[13px]">
            <Row k="Vendor ID" v={v.id} />
            <Row k="Category" v={v.category} />
            <Row k="GST / Tax" v={v.gst} />
            <Row k="Contact" v={v.contact} />
            <Row k="Country" v={v.country} />
            <Row k="Status" v={<Status value={v.status} />} />
          </Panel>
        </Section>
      </div>
    </Page>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{k}</div>
      <div className="font-mono text-[12px]">{v}</div>
    </div>
  );
}
