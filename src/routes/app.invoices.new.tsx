import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { addItem, nextId, todayISO, useEntity } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/invoices/new")({ component: NewInvoice });

function NewInvoice() {
    const nav = useNavigate();
    const invoices = useEntity("invoices");
    const [po, setPo] = useState("PO-5582");
    const [vendor, setVendor] = useState("Helios Components Ltd");
    const [issued, setIssued] = useState(todayISO());
    const [due, setDue] = useState("2026-07-06");

    function submit(e: React.FormEvent) {
      e.preventDefault();
      const id = nextId("INV", invoices);
      addItem("invoices", { id, po, vendor, total: 96500, status: "Pending", issued, due });
      toast.success(`${id} generated`);
      nav({ to: "/app/invoices" });
    }
    return (
      <Page eyebrow="Invoices" title="Generate Invoice" description="Create an invoice from an existing purchase order.">
        <form onSubmit={submit} className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          <div className="space-y-6">
            <Section title="Source">
              <Panel className="grid md:grid-cols-2 gap-4 p-6">
                <F label="Purchase Order">
                  <select className="vb-input" value={po} onChange={(e) => { const v = e.target.value; setPo(v); setVendor(v === "PO-5582" ? "Helios Components Ltd" : "Northwind Industrial Supply"); }}>
                    <option value="PO-5582">PO-5582 — Helios Components</option>
                    <option value="PO-5581">PO-5581 — Northwind</option>
                  </select>
                </F>
                <F label="Invoice #"><input className="vb-input" value={nextId("INV", invoices)} disabled /></F>
                <F label="Issue Date"><input className="vb-input" type="date" value={issued} onChange={(e) => setIssued(e.target.value)} /></F>
                <F label="Due Date"><input className="vb-input" type="date" value={due} onChange={(e) => setDue(e.target.value)} /></F>
              </Panel>
            </Section>
          </div>
          <div className="space-y-6">
            <Section title="Totals">
              <Panel className="p-6 space-y-3 text-[13px] font-mono">
                <R k="Subtotal" v="$81,777" />
                <R k="Tax 18%" v="$14,723" />
                <R k="Total Due" v="$96,500" />
              </Panel>
            </Section>
            <Section title="Issue">
              <Panel className="p-6 space-y-3">
                <ScrambleButton type="submit" variant="primary" className="w-full">Generate Invoice</ScrambleButton>
                <ScrambleButton type="button" variant="outline" className="w-full" onClick={() => { toast("Draft saved"); nav({ to: "/app/invoices" }); }}>Save Draft</ScrambleButton>
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
