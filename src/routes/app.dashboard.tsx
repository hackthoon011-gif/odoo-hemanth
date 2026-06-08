import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Panel, Section, Stat, DataTable } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { ScrambleText } from "@/components/scramble-text";
import { Status } from "@/components/status";
import { activity, approvals, invoices, monthlySpend, purchaseOrders, rfqs } from "@/lib/mock";
import { useAuth, ROLE_LABEL } from "@/lib/auth";

export const Route = createFileRoute("/app/dashboard")({ component: Dashboard });

function Dashboard() {
  const user = useAuth();
  const max = Math.max(...monthlySpend.map((m) => m.v));

  return (
    <Page
      eyebrow={`Signed in as ${user ? ROLE_LABEL[user.role] : "—"}`}
      title="Dashboard"
      description="Live procurement signal across RFQs, approvals, orders, invoices."
      actions={
        <>
          <Link to="/app/rfqs/new"><ScrambleButton variant="primary">Create RFQ</ScrambleButton></Link>
          <Link to="/app/vendors/new"><ScrambleButton variant="outline">Onboard Vendor</ScrambleButton></Link>
          <Link to="/app/reports"><ScrambleButton variant="ghost">View Reports</ScrambleButton></Link>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Pending Approvals" value="14" delta="+3 today" hint="2 over 48h SLA" />
        <Stat label="Active RFQs" value="27" delta="+5 wk" hint="6 closing this week" />
        <Stat label="Open Purchase Orders" value="42" delta="$1.84M" hint="3 partially fulfilled" />
        <Stat label="Invoices Outstanding" value="$182,420" delta="9 invoices" hint="2 nearing due" />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <Panel className="p-6">
          <div className="flex items-end justify-between mb-6">
            <div data-scramble-target>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                <ScrambleText>Monthly Spend / USD</ScrambleText>
              </div>
              <div className="text-2xl mt-2 font-medium tracking-tight">
                <ScrambleText duration={700}>$3.10M</ScrambleText>
              </div>
            </div>
            <div className="flex gap-1.5 text-[11px] font-mono">
              {["6M", "1Y", "ALL"].map((p, i) => (
                <button key={p} data-scramble-target className={`h-7 px-2 rounded border ${i===0?"border-white text-foreground":"border-border text-muted-foreground hover:text-foreground"}`}>
                  <ScrambleText>{p}</ScrambleText>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-4 h-44">
            {monthlySpend.map((m) => (
              <div key={m.m} data-scramble-target className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-white/15 group-hover:bg-white transition-colors rounded-sm"
                  style={{ height: `${(m.v / max) * 100}%` }}
                />
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  <ScrambleText>{m.m}</ScrambleText>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <div data-scramble-target className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono mb-4">
            <ScrambleText>Quick Actions</ScrambleText>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { to: "/app/rfqs/new", label: "New RFQ" },
              { to: "/app/quotations/submit", label: "Submit Quotation" },
              { to: "/app/comparison", label: "Compare Bids" },
              { to: "/app/approvals", label: "Approval Queue" },
              { to: "/app/purchase-orders/new", label: "Generate PO" },
              { to: "/app/invoices/new", label: "Generate Invoice" },
            ].map((a) => (
              <Link to={a.to} key={a.to} className="block">
                <ScrambleButton variant="secondary" className="w-full justify-between">
                  {a.label}
                </ScrambleButton>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-border">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono mb-3">Today</div>
            <ul className="space-y-3 text-[12px]">
              {activity.slice(0, 4).map((a, i) => (
                <li key={i} data-scramble-target className="flex gap-3">
                  <span className="text-muted-foreground font-mono shrink-0">{a.ts.slice(11)}</span>
                  <span><ScrambleText>{a.text}</ScrambleText></span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <Section title="Recent RFQs" actions={<Link to="/app/rfqs"><ScrambleButton size="sm" variant="ghost">View all →</ScrambleButton></Link>}>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono text-muted-foreground w-28" },
            { key: "title", label: "Title" },
            { key: "owner", label: "Owner", className: "w-32" },
            { key: "vendors", label: "Vendors", className: "w-20 text-right" },
            { key: "deadline", label: "Deadline", className: "w-32 font-mono" },
            { key: "status", label: "Status", className: "w-32" },
          ]}
          rows={rfqs}
          renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : String(r[c as keyof typeof r])}
        />
      </Section>

      <div className="grid lg:grid-cols-2 gap-4">
        <Section title="Pending Approvals" actions={<Link to="/app/approvals"><ScrambleButton size="sm" variant="ghost">Queue →</ScrambleButton></Link>}>
          <DataTable
            columns={[
              { key: "id", label: "ID", className: "font-mono text-muted-foreground w-24" },
              { key: "subject", label: "Subject" },
              { key: "amount", label: "Amount", className: "w-28 text-right font-mono" },
              { key: "status", label: "Status", className: "w-28" },
            ]}
            rows={approvals.slice(0, 4)}
            renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : c === "amount" ? `$${(r.amount as number).toLocaleString()}` : String(r[c as keyof typeof r])}
          />
        </Section>

        <Section title="Recent Invoices" actions={<Link to="/app/invoices"><ScrambleButton size="sm" variant="ghost">All invoices →</ScrambleButton></Link>}>
          <DataTable
            columns={[
              { key: "id", label: "ID", className: "font-mono text-muted-foreground w-24" },
              { key: "vendor", label: "Vendor" },
              { key: "total", label: "Total", className: "w-28 text-right font-mono" },
              { key: "status", label: "Status", className: "w-28" },
            ]}
            rows={invoices}
            renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : c === "total" ? `$${(r.total as number).toLocaleString()}` : String(r[c as keyof typeof r])}
          />
        </Section>
      </div>

      <Section title="Recent Purchase Orders" actions={<Link to="/app/purchase-orders"><ScrambleButton size="sm" variant="ghost">All POs →</ScrambleButton></Link>}>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono text-muted-foreground w-24" },
            { key: "vendor", label: "Vendor" },
            { key: "issued", label: "Issued", className: "font-mono w-32" },
            { key: "lines", label: "Lines", className: "text-right w-20" },
            { key: "total", label: "Total", className: "w-28 text-right font-mono" },
            { key: "status", label: "Status", className: "w-28" },
          ]}
          rows={purchaseOrders}
          renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : c === "total" ? `$${(r.total as number).toLocaleString()}` : String(r[c as keyof typeof r])}
        />
      </Section>
    </Page>
  );
}
