import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Page, Section, Panel, Stat } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { ScrambleText } from "@/components/scramble-text";
import { Status } from "@/components/status";
import { purchaseOrders } from "@/lib/mock";

export const Route = createFileRoute("/app/purchase-orders/$id")({
  component: () => {
    const { id } = useParams({ from: "/app/purchase-orders/$id" });
    const po = purchaseOrders.find((p) => p.id === id) ?? purchaseOrders[0];
    return (
      <Page eyebrow={po.id} title={`Purchase Order ${po.id}`} description={`Issued to ${po.vendor} on ${po.issued}`}
        actions={
          <>
            <ScrambleButton variant="outline">Download PDF</ScrambleButton>
            <ScrambleButton variant="outline">Print</ScrambleButton>
            <Link to="/app/invoices/new"><ScrambleButton variant="primary">Generate Invoice</ScrambleButton></Link>
          </>
        }>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Total" value={`$${po.total.toLocaleString()}`} />
          <Stat label="Lines" value={String(po.lines)} />
          <Stat label="Issued" value={po.issued} />
          <Stat label="Status" value={po.status} />
        </div>

        <Section title="PDF Preview">
          <Panel className="p-10 bg-white text-black rounded-lg" hoverable={false}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em]">Purchase Order</div>
                <div className="text-2xl font-medium mt-1"><ScrambleText>{po.id}</ScrambleText></div>
              </div>
              <div className="text-right">
                <div className="font-bold">VendorBridge Systems</div>
                <div className="text-xs">1 Market St · San Francisco</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-[12px] mb-6">
              <div><div className="uppercase tracking-wider text-black/60 text-[10px] mb-1">Vendor</div>{po.vendor}</div>
              <div><div className="uppercase tracking-wider text-black/60 text-[10px] mb-1">Issued</div>{po.issued}</div>
            </div>
            <table className="w-full text-[12px] border-t border-black/10">
              <thead><tr className="text-left text-black/60 text-[10px] uppercase tracking-wider">
                <th className="py-2">SKU</th><th>Description</th><th className="text-right">Qty</th><th className="text-right">Unit</th><th className="text-right">Total</th>
              </tr></thead>
              <tbody>
                {[["BR-6204-ZZ","Sealed bearing 6204-ZZ",500,"$0.84"],["CP-FLEX-08","Flexible coupling, 8mm",120,"$11.20"]].map((r,i) => (
                  <tr key={i} className="border-t border-black/10"><td className="py-2">{r[0]}</td><td>{r[1]}</td><td className="text-right">{r[2]}</td><td className="text-right">{r[3]}</td><td className="text-right">${(Number(r[2])*parseFloat((r[3] as string).slice(1))).toFixed(2)}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <div className="w-64 text-[12px] space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>${(po.total*0.847).toFixed(0)}</span></div>
                <div className="flex justify-between"><span>Tax 18%</span><span>${(po.total*0.153).toFixed(0)}</span></div>
                <div className="flex justify-between font-bold border-t border-black/30 pt-2 mt-2"><span>Total</span><span>${po.total.toLocaleString()}</span></div>
              </div>
            </div>
          </Panel>
        </Section>

        <Section title="Status">
          <Panel className="p-6"><Status value={po.status} /></Panel>
        </Section>
      </Page>
    );
  },
});
