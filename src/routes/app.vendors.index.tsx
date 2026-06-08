import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, DataTable, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { useEntity } from "@/lib/store";
import { Search, Filter } from "lucide-react";

export const Route = createFileRoute("/app/vendors/")({ component: VendorList });

function VendorList() {
  const vendors = useEntity("vendors");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const filtered = vendors.filter((v) =>
    (status === "all" || v.status.toLowerCase() === status) &&
    (q === "" || v.name.toLowerCase().includes(q.toLowerCase()) || v.id.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <Page
      eyebrow="Vendor Module"
      title="Vendor List"
      description="Search, filter and manage every vendor across categories."
      actions={
        <>
          <Link to="/app/vendors/new"><ScrambleButton variant="primary">Register Vendor</ScrambleButton></Link>
          <Link to="/app/vendors/categories"><ScrambleButton variant="outline">Categories</ScrambleButton></Link>
        </>
      }
    >
      <Panel className="p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 px-3 h-10 rounded-md border border-border bg-white/[0.02] flex-1 min-w-[240px]">
          <Search className="size-3.5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or ID…" className="bg-transparent outline-none flex-1 text-[13px]" />
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-mono">
          <Filter className="size-3.5 text-muted-foreground mr-1" />
          {["all", "approved", "pending", "rejected"].map((s) => (
            <button key={s} data-scramble-target onClick={() => setStatus(s)} className={`h-9 px-3 rounded border ${status===s?"border-white":"border-border text-muted-foreground hover:text-foreground"}`}>
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </Panel>

      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono text-muted-foreground w-28" },
            { key: "name", label: "Vendor" },
            { key: "category", label: "Category", className: "w-32" },
            { key: "country", label: "Country", className: "w-32" },
            { key: "rating", label: "Rating", className: "w-20 text-right font-mono" },
            { key: "orders", label: "Orders", className: "w-20 text-right font-mono" },
            { key: "status", label: "Status", className: "w-28" },
          ]}
          rows={filtered}
          renderCell={(c, r) => {
            if (c === "status") return <Status value={String(r[c])} />;
            if (c === "name") return <Link to="/app/vendors/$id" params={{ id: r.id }} data-scramble-target className="hover:underline underline-offset-4">{r.name}</Link>;
            return String(r[c as keyof typeof r]);
          }}
        />
      </Section>
    </Page>
  );
}
