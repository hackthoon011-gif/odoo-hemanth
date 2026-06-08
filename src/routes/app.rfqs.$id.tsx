import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, Panel, DataTable, Stat } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { ScrambleText } from "@/components/scramble-text";
import { Status } from "@/components/status";
import { useEntity } from "@/lib/store";

const TABS = ["Overview", "Line Items", "Attachments", "Vendor Assignment", "Quotations"] as const;

export const Route = createFileRoute("/app/rfqs/$id")({ component: RFQDetail });

function RFQDetail() {
  const { id } = useParams({ from: "/app/rfqs/$id" });
  const rfqs = useEntity("rfqs");
  const quotations = useEntity("quotations");
  const rfq = rfqs.find((r) => r.id === id) ?? rfqs[0];
  const myQuotes = quotations.filter((q) => q.rfq === rfq.id);
  const [tab, setTab] = useState<typeof TABS[number]>("Overview");

  return (
    <Page
      eyebrow={rfq.id}
      title={rfq.title}
      description={`Owner: ${rfq.owner} · ${rfq.items} items · ${rfq.vendors} vendors invited`}
      actions={
        <>
          <Link to="/app/comparison"><ScrambleButton variant="outline">Compare Quotations</ScrambleButton></Link>
          <ScrambleButton variant="primary">Send Reminder</ScrambleButton>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Status" value={rfq.status} />
        <Stat label="Deadline" value={rfq.deadline} hint="In 12 days" />
        <Stat label="Quotations Received" value={String(myQuotes.length)} />
        <Stat label="Lowest Bid" value={myQuotes.length ? `$${Math.min(...myQuotes.map(q => q.total)).toLocaleString()}` : "—"} />
      </div>

      <Panel className="p-2 flex items-center gap-1 overflow-x-auto" hoverable={false}>
        {TABS.map((t) => (
          <button
            key={t}
            data-scramble-target
            onClick={() => setTab(t)}
            className={`h-9 px-4 rounded-md text-[12px] ${tab===t?"bg-white text-black":"text-muted-foreground hover:text-foreground"}`}
          >
            <ScrambleText>{t}</ScrambleText>
          </button>
        ))}
      </Panel>

      {tab === "Overview" && (
        <Section title="Summary">
          <Panel className="p-6 space-y-3 text-[13px]">
            <Row k="Title" v={rfq.title} />
            <Row k="Owner" v={rfq.owner} />
            <Row k="Items" v={String(rfq.items)} />
            <Row k="Vendors" v={String(rfq.vendors)} />
            <Row k="Deadline" v={rfq.deadline} />
            <Row k="Status" v={<Status value={rfq.status} />} />
          </Panel>
        </Section>
      )}

      {tab === "Line Items" && (
        <Section title="Line Items">
          <DataTable
            columns={[
              { key: "sku", label: "SKU", className: "font-mono w-40" },
              { key: "desc", label: "Description" },
              { key: "qty", label: "Qty", className: "text-right w-20 font-mono" },
              { key: "unit", label: "Unit", className: "w-20" },
            ]}
            rows={[
              { sku: "BR-6204-ZZ", desc: "Sealed bearing 6204-ZZ", qty: 500, unit: "ea" },
              { sku: "CP-FLEX-08", desc: "Flexible coupling, 8mm", qty: 120, unit: "ea" },
              { sku: "WS-22-SS", desc: "Stainless washer, 22mm", qty: 2000, unit: "ea" },
            ]}
          />
        </Section>
      )}

      {tab === "Attachments" && (
        <Section title="Attachments">
          <Panel className="p-6 space-y-3 font-mono text-[12px]">
            {["SPEC-bearings-2026.pdf", "commercial-terms.docx", "drawing-rev-B.dwg"].map((f) => (
              <div key={f} data-scramble-target className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                <ScrambleText>{f}</ScrambleText>
                <ScrambleButton size="sm" variant="ghost">Download</ScrambleButton>
              </div>
            ))}
          </Panel>
        </Section>
      )}

      {tab === "Vendor Assignment" && (
        <Section title="Vendor Assignment">
          <Panel className="p-6 space-y-3">
            {["Northwind Industrial Supply", "Helios Components Ltd", "Atlas Metalworks", "Borealis Packaging", "Meridian Chemicals"].map((v) => (
              <div key={v} data-scramble-target className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                <div className="text-[13px]"><ScrambleText>{v}</ScrambleText></div>
                <Status value={Math.random() > 0.4 ? "Submitted" : "Pending"} />
              </div>
            ))}
          </Panel>
        </Section>
      )}

      {tab === "Quotations" && (
        <Section title="Quotations Received">
          <DataTable
            columns={[
              { key: "id", label: "ID", className: "font-mono w-24" },
              { key: "vendor", label: "Vendor" },
              { key: "total", label: "Total", className: "text-right font-mono w-28" },
              { key: "delivery", label: "Delivery", className: "w-24" },
              { key: "rating", label: "Rating", className: "text-right font-mono w-20" },
              { key: "status", label: "Status", className: "w-28" },
            ]}
            rows={myQuotes}
            renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : c === "total" ? `$${(r.total as number).toLocaleString()}` : String(r[c as keyof typeof r])}
          />
        </Section>
      )}
    </Page>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{k}</div>
      <div className="text-[13px]">{v}</div>
    </div>
  );
}
