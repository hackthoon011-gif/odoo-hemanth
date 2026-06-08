import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { Status } from "@/components/status";
import { ScrambleButton } from "@/components/scramble-button";
import { approvals } from "@/lib/mock";

export const Route = createFileRoute("/app/approvals/")({
  component: () => (
    <Page eyebrow="Approvals" title="Approval Queue" description="Pending requests routed to your role.">
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono w-24" },
            { key: "subject", label: "Subject" },
            { key: "requester", label: "Requester", className: "w-32" },
            { key: "amount", label: "Amount", className: "text-right font-mono w-28" },
            { key: "submitted", label: "Submitted", className: "font-mono w-32" },
            { key: "status", label: "Status", className: "w-28" },
            { key: "id" as const, label: "", className: "w-40 text-right" },
          ]}
          rows={approvals}
          renderCell={(c, r, ) => {
            if (c === "status") return <Status value={String(r[c])} />;
            if (c === "amount") return r.amount ? `$${(r.amount as number).toLocaleString()}` : "—";
            if (c === "id" && Object.is(c, "id")) {
              // last id column → actions
              return (
                <div className="flex justify-end gap-1.5">
                  <Link to="/app/approvals/$id" params={{ id: r.id }}><ScrambleButton size="sm" variant="ghost">View</ScrambleButton></Link>
                </div>
              );
            }
            return String(r[c as keyof typeof r]);
          }}
        />
      </Section>
    </Page>
  ),
});
