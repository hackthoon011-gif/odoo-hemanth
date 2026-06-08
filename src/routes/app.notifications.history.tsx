import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { notifications } from "@/lib/mock";

export const Route = createFileRoute("/app/notifications/history")({
  component: () => (
    <Page eyebrow="Notifications" title="Notification History" description="Past alerts and digest summaries.">
      <Section>
        <DataTable
          columns={[
            { key: "id", label: "ID", className: "font-mono w-24" },
            { key: "title", label: "Title" },
            { key: "body", label: "Body" },
            { key: "ts", label: "When", className: "font-mono w-32" },
          ]}
          rows={[...notifications, ...notifications.map((n) => ({ ...n, id: n.id + "-x", ts: "Last week" }))]}
        />
      </Section>
    </Page>
  ),
});
