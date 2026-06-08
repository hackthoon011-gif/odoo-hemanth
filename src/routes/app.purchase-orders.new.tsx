import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { addItem, nextId, todayISO, useEntity } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/purchase-orders/new")({
  component: NewPO,
});

function NewPO() {
    const nav = useNavigate();
    const pos = useEntity("purchaseOrders");
    const [vendor, setVendor] = useState("Atlas Metalworks");
    const [issued, setIssued] = useState(todayISO());

    function submit(e: React.FormEvent) {
      e.preventDefault();
      const id = nextId("PO", pos);
      addItem("purchaseOrders", {
        id, vendor, total: 178990, status: "Open", issued, lines: 6,
      });
      toast.success(`${id} generated`);
      nav({ to: "/app/purchase-orders" });
    }
    return (
      <Page eyebrow="Purchase Orders" title="Generate Purchase Order" description="Convert an awarded quotation into a numbered PO.">
        <form onSubmit={submit} className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          <div className="space-y-6">
            <Section title="From Awarded Quotation">
              <Panel className="grid md:grid-cols-2 gap-4 p-6">
                <F label="Quotation">
                  <select className="vb-input" value={vendor} onChange={(e) => setVendor(e.target.value)}>
                    <option value="Atlas Metalworks">QT-7782 — Atlas Metalworks</option>
                    <option value="Helios Components Ltd">QT-7785 — Helios Components</option>
                  </select>
                </F>
                <F label="PO Number"><input className="vb-input" value={nextId("PO", pos)} disabled /></F>
                <F label="Issue Date"><input className="vb-input" type="date" value={issued} onChange={(e) => setIssued(e.target.value)} /></F>
                <F label="Expected Delivery"><input className="vb-input" type="date" defaultValue="2026-06-24" /></F>
              </Panel>
            </Section>
            <Section title="Terms">
              <Panel className="grid md:grid-cols-2 gap-4 p-6">
                <F label="Payment Terms"><select className="vb-input"><option>Net 30</option><option>Net 60</option></select></F>
                <F label="Shipping"><select className="vb-input"><option>FOB Origin</option><option>CIF Destination</option></select></F>
                <div className="md:col-span-2"><F label="Notes"><textarea className="vb-textarea" placeholder="Notes for vendor / accounting…" /></F></div>
              </Panel>
            </Section>
          </div>
          <div className="space-y-6">
            <Section title="Summary">
              <Panel className="p-6 space-y-3 text-[13px] font-mono">
                <R k="Subtotal" v="$151,517" />
                <R k="Tax (18%)" v="$27,273" />
                <R k="Shipping" v="$200" />
                <R k="Total" v="$178,990" />
              </Panel>
            </Section>
            <Section title="Issue">
              <Panel className="p-6 space-y-3">
                <ScrambleButton type="submit" variant="primary" className="w-full">Generate PO</ScrambleButton>
                <ScrambleButton type="button" variant="outline" className="w-full" onClick={() => { toast("Draft saved"); nav({ to: "/app/purchase-orders" }); }}>Save Draft</ScrambleButton>
              </Panel>
            </Section>
          </div>
        </form>
      </Page>
    );
}
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-1.5">{label}</div>{children}</label>;
}
function R({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0"><div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div><div>{v}</div></div>;
}
