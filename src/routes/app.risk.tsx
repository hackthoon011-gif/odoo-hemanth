import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Section, Panel, Stat, DataTable } from "@/components/page";
import { Status } from "@/components/status";
import { quotations, vendors } from "@/lib/mock";
import { AlertTriangle, Clock, FileWarning, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/risk")({ component: RiskCenter });

type Flag = { id: string; entity: string; type: string; severity: "high" | "medium" | "low"; reason: string; link?: string };

function parseDays(s: string) {
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : 0;
}

function buildFlags(): Flag[] {
  const flags: Flag[] = [];

  // Group quotations by RFQ to compute average price & delivery
  const byRfq = new Map<string, typeof quotations>();
  quotations.forEach((q) => {
    const arr = byRfq.get(q.rfq) ?? [];
    arr.push(q);
    byRfq.set(q.rfq, arr);
  });

  byRfq.forEach((qs) => {
    const avgPrice = qs.reduce((s, q) => s + q.total, 0) / qs.length;
    const avgDays = qs.reduce((s, q) => s + parseDays(q.delivery), 0) / qs.length;
    qs.forEach((q) => {
      // Very expensive: > 7% above avg
      if (q.total > avgPrice * 1.07) {
        flags.push({
          id: q.id,
          entity: `${q.id} · ${q.vendor}`,
          type: "Expensive Quotation",
          severity: q.total > avgPrice * 1.12 ? "high" : "medium",
          reason: `$${q.total.toLocaleString()} is ${(((q.total - avgPrice) / avgPrice) * 100).toFixed(1)}% above RFQ average ($${avgPrice.toLocaleString(undefined,{maximumFractionDigits:0})}).`,
          link: `/app/quotations/${q.id}`,
        });
      }
      // Unrealistic delivery: > 40% slower than avg OR < 60% (too good to be true)
      const days = parseDays(q.delivery);
      if (days > avgDays * 1.4) {
        flags.push({
          id: q.id + "-d",
          entity: `${q.id} · ${q.vendor}`,
          type: "Slow Delivery Estimate",
          severity: "medium",
          reason: `${days} days vs. RFQ average ${avgDays.toFixed(0)} days.`,
          link: `/app/quotations/${q.id}`,
        });
      } else if (days > 0 && days < avgDays * 0.6) {
        flags.push({
          id: q.id + "-u",
          entity: `${q.id} · ${q.vendor}`,
          type: "Unrealistic Delivery",
          severity: "high",
          reason: `${days} days quoted — significantly faster than peers (${avgDays.toFixed(0)} days). Verify capacity.`,
          link: `/app/quotations/${q.id}`,
        });
      }
    });
  });

  // Poor vendor history: rating < 4.0 or rejected
  vendors.forEach((v) => {
    if (v.status === "Rejected" || v.rating < 4.0) {
      flags.push({
        id: v.id + "-h",
        entity: `${v.id} · ${v.name}`,
        type: "Poor Vendor History",
        severity: v.rating < 3.5 || v.status === "Rejected" ? "high" : "low",
        reason: `Rating ${v.rating.toFixed(1)} / 5 across ${v.orders} orders · status ${v.status}.`,
        link: `/app/vendors/${v.id}`,
      });
    }
    // Missing GST
    if (!v.gst || v.gst === "—") {
      flags.push({
        id: v.id + "-g",
        entity: `${v.id} · ${v.name}`,
        type: "Missing GST / Tax ID",
        severity: "high",
        reason: "No GST/VAT number on file. Required for compliant invoicing.",
        link: `/app/vendors/${v.id}`,
      });
    }
  });

  // Expiring documents (mock list mirrors vendors.documents page)
  const docs = [
    { vendor: "Helios Components Ltd", type: "ISO 9001", expires: "2026-12-09" },
    { vendor: "Kuro Logistics", type: "Insurance", expires: "2026-09-15" },
    { vendor: "Northwind Industrial Supply", type: "GST Certificate", expires: "2027-04-12" },
  ];
  const today = new Date("2026-06-08");
  docs.forEach((d, i) => {
    const exp = new Date(d.expires);
    const daysLeft = Math.round((exp.getTime() - today.getTime()) / 86_400_000);
    if (daysLeft < 180) {
      flags.push({
        id: `DOC-${i}`,
        entity: `${d.vendor} · ${d.type}`,
        type: "Expiring Document",
        severity: daysLeft < 90 ? "high" : "medium",
        reason: `Expires ${d.expires} (${daysLeft} days remaining).`,
        link: `/app/vendors/documents`,
      });
    }
  });

  return flags;
}

function RiskCenter() {
  const flags = buildFlags();
  const high = flags.filter((f) => f.severity === "high");
  const med = flags.filter((f) => f.severity === "medium");
  const low = flags.filter((f) => f.severity === "low");

  return (
    <Page
      eyebrow="Risk Module"
      title="Risk Detection"
      description="Automated flags across quotations, vendors and compliance documents."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Flags" value={flags.length.toString()} hint="Across all modules" />
        <Stat label="High Severity" value={high.length.toString()} hint="Requires immediate review" />
        <Stat label="Medium" value={med.length.toString()} />
        <Stat label="Low" value={low.length.toString()} />
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        <RiskCard icon={<AlertTriangle className="size-4" />} label="Expensive Quotes" count={flags.filter((f) => f.type === "Expensive Quotation").length} />
        <RiskCard icon={<Clock className="size-4" />} label="Delivery Anomalies" count={flags.filter((f) => f.type.includes("Delivery")).length} />
        <RiskCard icon={<ShieldAlert className="size-4" />} label="Vendor History" count={flags.filter((f) => f.type === "Poor Vendor History").length} />
        <RiskCard icon={<FileWarning className="size-4" />} label="Document / GST" count={flags.filter((f) => f.type.includes("Document") || f.type.includes("GST")).length} />
      </div>

      <Section title="All Risk Flags" description="Sorted by severity. Click any entity to investigate.">
        <DataTable
          columns={[
            { key: "severity", label: "Severity", className: "w-24" },
            { key: "type", label: "Type", className: "w-44" },
            { key: "entity", label: "Entity" },
            { key: "reason", label: "Reason" },
          ]}
          rows={[...flags].sort((a, b) => sev(b.severity) - sev(a.severity))}
          renderCell={(c, r) => {
            if (c === "severity") return <Status value={r.severity.toUpperCase()} tone={r.severity === "high" ? "rejected" : r.severity === "medium" ? "pending" : "neutral"} />;
            if (c === "entity") return r.link ? <Link to={r.link} className="hover:underline underline-offset-4">{r.entity}</Link> : r.entity;
            return String(r[c as keyof Flag]);
          }}
        />
      </Section>
    </Page>
  );
}

function sev(s: Flag["severity"]) { return s === "high" ? 3 : s === "medium" ? 2 : 1; }

function RiskCard({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) {
  return (
    <Panel className="p-5 flex items-center gap-4">
      <div className="size-10 rounded-md border border-border flex items-center justify-center text-[color:var(--color-warning)]">{icon}</div>
      <div className="flex-1">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</div>
        <div className="text-2xl font-medium mt-0.5">{count}</div>
      </div>
    </Panel>
  );
}
