import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, DataTable } from "@/components/page";
import { vendors } from "@/lib/mock";

export const Route = createFileRoute("/app/reports/vendors")({
  component: () => (
    <Page eyebrow="Reports" title="Vendor Reports" description="Aggregated performance & spend per vendor.">
      <Section>
        <DataTable
          columns={[
            { key: "name", label: "Vendor" },
            { key: "category", label: "Category", className: "w-32" },
            { key: "orders", label: "Orders", className: "text-right font-mono w-20" },
            { key: "rating", label: "Rating", className: "text-right font-mono w-20" },
            { key: "country", label: "Country", className: "w-32" },
          ]}
          rows={vendors}
        />
      </Section>
    </Page>
  ),
});
