import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { Status } from "@/components/status";
import { approvals } from "@/lib/mock";

export const Route = createFileRoute("/app/approvals/history")({
  component: () => (
    <Page eyebrow="Approvals" title="Approval History" description="Closed approval requests across all modules.">
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono w-24" },
            { key: "subject", label: "Subject" },
            { key: "requester", label: "Requester", className: "w-32" },
            { key: "amount", label: "Amount", className: "text-right font-mono w-28" },
            { key: "submitted", label: "Decided", className: "font-mono w-32" },
            { key: "status", label: "Outcome", className: "w-28" },
          ]}
          rows={approvals.filter((a) => a.status !== "Pending")}
          renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : c === "amount" ? `$${(r.amount as number).toLocaleString()}` : String(r[c as keyof typeof r])}
        />
      </Section>
    </Page>
  ),
});
