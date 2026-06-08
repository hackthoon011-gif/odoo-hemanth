import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { useEntity } from "@/lib/store";

export const Route = createFileRoute("/app/rfqs/")({
  component: RFQList,
});

function RFQList() {
  const rfqs = useEntity("rfqs");
  return (
    <Page eyebrow="RFQ Module" title="Request for Quotation" description="All RFQs your team has created, with deadlines and invited vendors."
      actions={<Link to="/app/rfqs/new"><ScrambleButton variant="primary">Create RFQ</ScrambleButton></Link>}>
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono text-muted-foreground w-24" },
            { key: "title", label: "Title" },
            { key: "owner", label: "Owner", className: "w-32" },
            { key: "items", label: "Items", className: "text-right w-20" },
            { key: "vendors", label: "Vendors", className: "text-right w-20" },
            { key: "deadline", label: "Deadline", className: "font-mono w-32" },
            { key: "status", label: "Status", className: "w-24" },
          ]}
          rows={rfqs}
          renderCell={(c, r) => {
            if (c === "status") return <Status value={String(r[c])} />;
            if (c === "title") return <Link to="/app/rfqs/$id" params={{ id: r.id }} data-scramble-target className="hover:underline underline-offset-4">{r.title}</Link>;
            return String(r[c as keyof typeof r]);
          }}
        />
      </Section>
    </Page>
  );
}
