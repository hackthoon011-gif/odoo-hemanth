import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Section, Panel, DataTable, Stat } from "@/components/page";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { quotations } from "@/lib/mock";

export const Route = createFileRoute("/app/comparison/")({
  component: () => {
    const rows = quotations.filter((q) => q.rfq === "RFQ-2041");
    const minPrice = Math.min(...rows.map((r) => r.total));
    return (
      <Page eyebrow="Comparison" title="Quotation Comparison" description="Side-by-side comparison for RFQ-2041 — Quarterly bearings & couplings."
        actions={<Link to="/app/approvals"><ScrambleButton variant="primary">Send for Approval</ScrambleButton></Link>}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Bids Received" value={String(rows.length)} />
          <Stat label="Lowest Price" value={`$${minPrice.toLocaleString()}`} />
          <Stat label="Avg Delivery" value="14 days" />
          <Stat label="Spread" value={`$${(Math.max(...rows.map(r=>r.total)) - minPrice).toLocaleString()}`} />
        </div>
        <Section title="Side by Side">
          <div className="grid md:grid-cols-3 gap-4">
            {rows.map((r) => {
              const best = r.total === minPrice;
              return (
                <Panel key={r.id} className={best ? "p-6 border-[color:var(--color-success)]/40" : "p-6"}>
                  <div data-scramble-target className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                    <ScrambleText>{r.vendor}</ScrambleText>
                  </div>
                  <div className="text-3xl mt-2 font-medium tracking-tight">
                    <ScrambleText>{`$${r.total.toLocaleString()}`}</ScrambleText>
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-muted-foreground">{r.id} · {r.delivery} · ★ {r.rating}</div>
                  {best && <div className="mt-4"><Status value="Lowest" tone="approved" /></div>}
                  <ScrambleButton variant={best ? "primary" : "outline"} className="w-full mt-5">{best ? "Award" : "Compare"}</ScrambleButton>
                </Panel>
              );
            })}
          </div>
        </Section>
        <Section title="Matrix">
          <DataTable
            columns={[
              { key: "vendor", label: "Vendor" },
              { key: "total", label: "Total", className: "text-right font-mono w-28" },
              { key: "delivery", label: "Delivery", className: "w-24" },
              { key: "rating", label: "Rating", className: "text-right font-mono w-20" },
              { key: "status", label: "Status", className: "w-28" },
            ]}
            rows={rows}
            renderCell={(c, r) => c === "status" ? <Status value={r.total === minPrice ? "Lowest" : String(r[c])} tone={r.total===minPrice?"approved":undefined} /> : c === "total" ? `$${(r.total as number).toLocaleString()}` : String(r[c as keyof typeof r])}
          />
        </Section>
      </Page>
    );
  },
});
