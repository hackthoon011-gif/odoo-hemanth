import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { addItem, nextId, useEntity } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/quotations/submit")({ component: SubmitQuote });

function SubmitQuote() {
    const nav = useNavigate();
    const quotations = useEntity("quotations");
    const [rfq, setRfq] = useState("RFQ-2041");
    const [vendor, setVendor] = useState("Northwind Industrial Supply");
    const [delivery, setDelivery] = useState("14");
    const [prices, setPrices] = useState<Record<string, string>>({});
    const items: Array<[string, string, number]> = [
      ["BR-6204-ZZ", "Sealed bearing 6204-ZZ", 500],
      ["CP-FLEX-08", "Flexible coupling, 8mm", 120],
      ["WS-22-SS", "Stainless washer, 22mm", 2000],
    ];
    const subtotal = items.reduce((s, [sku, , qty]) => s + (parseFloat(prices[sku] || "0") * qty), 0);
    const total = Math.round(subtotal * 1.18);

    function submit(e: React.FormEvent) {
      e.preventDefault();
      const id = nextId("QT", quotations);
      addItem("quotations", {
        id, rfq, vendor, total: total || 0, currency: "USD",
        delivery: `${delivery} days`, status: "Submitted", rating: 4.5,
      });
      toast.success(`${id} submitted`);
      nav({ to: "/app/quotations" });
    }
    return (
      <Page eyebrow="Quotation Module" title="Submit Quotation" description="Respond to an RFQ invitation with pricing and delivery timelines.">
        <form className="grid lg:grid-cols-[1.6fr_1fr] gap-6" onSubmit={submit}>
          <div className="space-y-6">
            <Section title="Invitation">
              <Panel className="grid md:grid-cols-2 gap-4 p-6">
                <Field label="RFQ"><select className="vb-input" value={rfq} onChange={(e) => setRfq(e.target.value)}><option value="RFQ-2041">RFQ-2041 — Quarterly bearings & couplings</option><option value="RFQ-2043">RFQ-2043 — Bulk corrugated packaging</option></select></Field>
                <Field label="Vendor"><input className="vb-input" value={vendor} onChange={(e) => setVendor(e.target.value)} /></Field>
              </Panel>
            </Section>
            <Section title="Pricing">
              <Panel className="p-6 space-y-3">
                {items.map(([sku, desc, qty]) => {
                  const unit = parseFloat(prices[sku] || "0");
                  const line = (unit * qty) || 0;
                  return (
                    <div key={sku} className="grid grid-cols-[140px_1fr_80px_120px_120px] gap-3 items-center text-[13px]">
                      <div className="font-mono text-muted-foreground">{sku}</div>
                      <div>{desc}</div>
                      <div className="text-right font-mono">{qty}</div>
                      <input className="vb-input" placeholder="Unit price" value={prices[sku] || ""} onChange={(e) => setPrices((p) => ({ ...p, [sku]: e.target.value }))} />
                      <input className="vb-input" placeholder="Total" value={line ? `$${line.toLocaleString()}` : ""} readOnly />
                    </div>
                  );
                })}
              </Panel>
            </Section>
            <Section title="Terms">
              <Panel className="grid md:grid-cols-2 gap-4 p-6">
                <Field label="Delivery (days)"><input className="vb-input" placeholder="14" value={delivery} onChange={(e) => setDelivery(e.target.value)} /></Field>
                <Field label="Validity (days)"><input className="vb-input" placeholder="30" /></Field>
                <Field label="Payment Terms"><select className="vb-input"><option>Net 30</option><option>Net 60</option><option>50% advance</option></select></Field>
                <Field label="Incoterms"><select className="vb-input"><option>FOB</option><option>CIF</option><option>DDP</option></select></Field>
                <div className="md:col-span-2"><Field label="Notes / Comments"><textarea className="vb-textarea" placeholder="Anything the buyer should know…" /></Field></div>
              </Panel>
            </Section>
          </div>
          <div className="space-y-6">
            <Section title="Summary">
              <Panel className="p-6 space-y-3 text-[13px]">
                <Row k="Subtotal" v={subtotal ? `$${subtotal.toLocaleString()}` : "$ —"} />
                <Row k="Tax (18%)" v={subtotal ? `$${Math.round(subtotal * 0.18).toLocaleString()}` : "$ —"} />
                <Row k="Shipping" v="$0" />
                <Row k="Total" v={<span className="text-foreground">{total ? `$${total.toLocaleString()}` : "$ —"}</span>} />
              </Panel>
            </Section>
            <Section title="Submit">
              <Panel className="p-6 space-y-3">
                <ScrambleButton type="submit" variant="primary" className="w-full">Submit Quotation</ScrambleButton>
                <ScrambleButton type="button" variant="outline" className="w-full" onClick={() => { toast("Draft saved"); nav({ to: "/app/quotations" }); }}>Save Draft</ScrambleButton>
              </Panel>
            </Section>
          </div>
        </form>
      </Page>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-1.5">{label}</div>
      {children}
    </label>
  );
}
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{k}</div>
      <div className="font-mono">{v}</div>
    </div>
  );
}
