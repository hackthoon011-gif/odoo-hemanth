import { createFileRoute, useParams } from "@tanstack/react-router";
import { Page, Section, Panel, Stat } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { ScrambleText } from "@/components/scramble-text";
import { Status } from "@/components/status";
import { approvals } from "@/lib/mock";

export const Route = createFileRoute("/app/approvals/$id")({
  component: () => {
    const { id } = useParams({ from: "/app/approvals/$id" });
    const a = approvals.find((x) => x.id === id) ?? approvals[0];
    return (
      <Page eyebrow={a.id} title={a.subject} description={`Raised by ${a.requester} · ${a.submitted}`}
        actions={
          <>
            <ScrambleButton variant="outline">Request Changes</ScrambleButton>
            <ScrambleButton variant="danger">Reject</ScrambleButton>
            <ScrambleButton variant="primary">Approve</ScrambleButton>
          </>
        }>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Amount" value={`$${a.amount.toLocaleString()}`} />
          <Stat label="Requester" value={a.requester} />
          <Stat label="Submitted" value={a.submitted} />
          <Stat label="Status" value={a.status} />
        </div>

        <Section title="Approval Trail">
          <Panel className="p-6 space-y-5">
            {[
              { who: a.requester, when: a.submitted, what: "Submitted for approval" },
              { who: "System", when: a.submitted, what: "Routed to Manager queue" },
              { who: "Manager", when: "—", what: "Awaiting decision" },
            ].map((s, i) => (
              <div key={i} data-scramble-target className="flex gap-4 items-start">
                <div className="size-7 rounded-full grid place-items-center bg-white/10 text-[11px] font-mono shrink-0">{i+1}</div>
                <div className="flex-1">
                  <div className="text-[13px]"><ScrambleText>{s.what}</ScrambleText></div>
                  <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{s.who} · {s.when}</div>
                </div>
              </div>
            ))}
          </Panel>
        </Section>

        <Section title="Remarks">
          <Panel className="p-6 space-y-3">
            <textarea className="vb-textarea" placeholder="Add an approval remark for the record…" />
            <div className="flex gap-2 justify-end">
              <ScrambleButton variant="outline">Save Draft</ScrambleButton>
              <ScrambleButton variant="primary">Submit Remark</ScrambleButton>
            </div>
            <div className="pt-2"><Status value={a.status} /></div>
          </Panel>
        </Section>
      </Page>
    );
  },
});
