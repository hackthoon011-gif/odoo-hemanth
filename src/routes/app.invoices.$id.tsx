import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, Panel, Stat } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { ScrambleText } from "@/components/scramble-text";
import { Status } from "@/components/status";
import { invoices } from "@/lib/mock";
import { Download, Mail, Printer } from "lucide-react";

export const Route = createFileRoute("/app/invoices/$id")({
  component: () => {
    const { id } = useParams({ from: "/app/invoices/$id" });
    const inv = invoices.find((i) => i.id === id) ?? invoices[0];
    const [emailing, setEmailing] = useState(false);

    return (
      <Page eyebrow={inv.id} title={`Invoice ${inv.id}`} description={`From ${inv.vendor} · Due ${inv.due}`}
        actions={
          <>
            <ScrambleButton variant="outline" icon={<Download className="size-3.5" />}>Download PDF</ScrambleButton>
            <ScrambleButton variant="outline" icon={<Printer className="size-3.5" />} onClick={() => typeof window !== "undefined" && window.print()}>Print</ScrambleButton>
            <ScrambleButton variant="primary" icon={<Mail className="size-3.5" />} onClick={() => setEmailing((e) => !e)}>Email Invoice</ScrambleButton>
          </>
        }>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Total" value={`$${inv.total.toLocaleString()}`} />
          <Stat label="PO" value={inv.po} />
          <Stat label="Issued" value={inv.issued} />
          <Stat label="Status" value={inv.status} />
        </div>

        {emailing && (
          <Section title="Send by Email">
            <Panel className="p-6 grid md:grid-cols-2 gap-4">
              <label><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-1.5">To</div><input className="vb-input" defaultValue={`ap@${inv.vendor.split(" ").join("").toLowerCase()}.com`} /></label>
              <label><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-1.5">Subject</div><input className="vb-input" defaultValue={`VendorBridge Invoice ${inv.id}`} /></label>
              <div className="md:col-span-2"><label><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-1.5">Message</div><textarea className="vb-textarea" defaultValue={`Hi,\n\nPlease find attached invoice ${inv.id} for $${inv.total.toLocaleString()}. Payment is due by ${inv.due}.\n\n— VendorBridge`} /></label></div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <ScrambleButton variant="outline" onClick={() => setEmailing(false)}>Cancel</ScrambleButton>
                <ScrambleButton variant="primary" onClick={() => setEmailing(false)}>Send Email</ScrambleButton>
              </div>
            </Panel>
          </Section>
        )}

        <Section title="Invoice Preview">
          <Panel className="p-10 bg-white text-black rounded-lg" hoverable={false}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em]">Tax Invoice</div>
                <div className="text-2xl font-medium mt-1"><ScrambleText>{inv.id}</ScrambleText></div>
                <div className="text-[11px] text-black/60 mt-1">Against {inv.po}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">VendorBridge Systems</div>
                <div className="text-xs">GST: 29AABCV1234F1Z5</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-[12px] mb-6">
              <div><div className="uppercase tracking-wider text-black/60 text-[10px] mb-1">Bill To</div>{inv.vendor}</div>
              <div><div className="uppercase tracking-wider text-black/60 text-[10px] mb-1">Issued</div>{inv.issued}</div>
              <div><div className="uppercase tracking-wider text-black/60 text-[10px] mb-1">Due</div>{inv.due}</div>
            </div>
            <table className="w-full text-[12px]">
              <thead><tr className="text-left text-black/60 text-[10px] uppercase tracking-wider border-y border-black/10">
                <th className="py-2">Description</th><th className="text-right">Qty</th><th className="text-right">Unit</th><th className="text-right">Total</th>
              </tr></thead>
              <tbody>
                <tr className="border-b border-black/10"><td className="py-2">Awarded line items per {inv.po}</td><td className="text-right">1</td><td className="text-right">${(inv.total*0.847).toFixed(2)}</td><td className="text-right">${(inv.total*0.847).toFixed(2)}</td></tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <div className="w-64 text-[12px] space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>${(inv.total*0.847).toFixed(0)}</span></div>
                <div className="flex justify-between"><span>GST 18%</span><span>${(inv.total*0.153).toFixed(0)}</span></div>
                <div className="flex justify-between font-bold border-t border-black/30 pt-2 mt-2"><span>Total Due</span><span>${inv.total.toLocaleString()}</span></div>
              </div>
            </div>
          </Panel>
        </Section>

        <Section title="Status"><Panel className="p-6"><Status value={inv.status} /></Panel></Section>
      </Page>
    );
  },
});
