import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { activity } from "@/lib/mock";

export const Route = createFileRoute("/app/activity/audit")({
  component: () => (
    <Page eyebrow="Activity" title="Audit Logs" description="Immutable per-actor audit trail for compliance.">
      <Section>
        <DataTable
          columns={[
            { key: "ts", label: "Timestamp", className: "font-mono w-44" },
            { key: "actor", label: "Actor", className: "w-44" },
            { key: "text", label: "Event" },
          ]}
          rows={activity}
        />
      </Section>
    </Page>
  ),
});
