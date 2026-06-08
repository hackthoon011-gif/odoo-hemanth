import { createFileRoute, useParams } from "@tanstack/react-router";
import { Page, Section, Panel, Stat } from "@/components/page";
import { Status } from "@/components/status";
import { quotations } from "@/lib/mock";

export const Route = createFileRoute("/app/quotations/$id")({
  component: () => {
    const { id } = useParams({ from: "/app/quotations/$id" });
    const q = quotations.find((x) => x.id === id) ?? quotations[0];
    return (
      <Page eyebrow={q.id} title={`Quotation from ${q.vendor}`} description={`Against ${q.rfq} · submitted via VendorBridge`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Total" value={`$${q.total.toLocaleString()}`} />
          <Stat label="Delivery" value={q.delivery} />
          <Stat label="Vendor Rating" value={q.rating.toFixed(1)} />
          <Stat label="Status" value={q.status} />
        </div>
        <Section title="Breakdown">
          <Panel className="p-6 space-y-3 text-[13px]">
            <Row k="RFQ" v={q.rfq} />
            <Row k="Vendor" v={q.vendor} />
            <Row k="Currency" v={q.currency} />
            <Row k="Subtotal" v={`$${(q.total*0.847).toFixed(0)}`} />
            <Row k="Tax (18%)" v={`$${(q.total*0.153).toFixed(0)}`} />
            <Row k="Total" v={<span className="text-foreground">${q.total.toLocaleString()}</span>} />
            <Row k="Status" v={<Status value={q.status} />} />
          </Panel>
        </Section>
      </Page>
    );
  },
});

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{k}</div>
      <div className="font-mono">{v}</div>
    </div>
  );
}
