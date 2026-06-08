import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { Status } from "@/components/status";
import { users } from "@/lib/mock";

export const Route = createFileRoute("/app/settings/users")({
  component: () => (
    <Page eyebrow="Settings" title="User Management" description="Invite, deactivate and assign roles."
      actions={<ScrambleButton variant="primary">Invite User</ScrambleButton>}>
      <Section>
        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email", className: "font-mono w-64" },
            { key: "role", label: "Role", className: "w-44" },
            { key: "status", label: "Status", className: "w-28" },
          ]}
          rows={users}
          renderCell={(c, r) => c === "status" ? <Status value={String(r[c])} /> : String(r[c as keyof typeof r])}
        />
      </Section>
    </Page>
  ),
});
