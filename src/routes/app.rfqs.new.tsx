import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { ScrambleText } from "@/components/scramble-text";
import { Paperclip, Plus, Trash2 } from "lucide-react";
import { addItem, nextId, useEntity } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/rfqs/new")({ component: NewRFQ });

const STEPS = ["Details", "Line Items", "Attachments", "Vendors", "Review"] as const;

function NewRFQ() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const rfqs = useEntity("rfqs");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("2026-06-22");
  const [vendorsSel, setVendorsSel] = useState<string[]>([
    "Northwind Industrial Supply", "Helios Components Ltd", "Atlas Metalworks", "Borealis Packaging", "Meridian Chemicals",
  ]);
  const [lines, setLines] = useState([
    { sku: "BR-6204-ZZ", desc: "Sealed bearing 6204-ZZ", qty: 500, unit: "ea" },
    { sku: "CP-FLEX-08", desc: "Flexible coupling, 8mm", qty: 120, unit: "ea" },
  ]);

  function publish() {
    const id = nextId("RFQ", rfqs);
    addItem("rfqs", {
      id,
      title: title.trim() || "Untitled RFQ",
      status: "Open",
      deadline,
      vendors: vendorsSel.length,
      items: lines.length,
      owner: "S. Patel",
    });
    toast.success(`${id} published`);
    nav({ to: "/app/rfqs" });
  }

  function toggleVendor(v: string) {
    setVendorsSel((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  }

  return (
    <Page eyebrow="RFQ Module" title="Create RFQ" description="Define scope, attach specs and invite vendors to bid."
      actions={<ScrambleButton variant="ghost" onClick={() => nav({ to: "/app/rfqs" })}>Cancel</ScrambleButton>}>
      <Panel className="p-2 flex items-center gap-1 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button
            key={s}
            data-scramble-target
            onClick={() => setStep(i)}
            className={`h-9 px-4 rounded-md text-[12px] font-mono ${i===step?"bg-white text-black":"text-muted-foreground hover:text-foreground"}`}
          >
            <span className="opacity-50 mr-2">{String(i+1).padStart(2,"0")}</span>
            <ScrambleText>{s}</ScrambleText>
          </button>
        ))}
      </Panel>

      {step === 0 && (
        <Section title="Details">
          <Panel className="grid md:grid-cols-2 gap-4 p-6">
            <Labeled label="RFQ Title"><input className="vb-input" placeholder="Quarterly bearings & couplings" value={title} onChange={(e) => setTitle(e.target.value)} /></Labeled>
            <Labeled label="RFQ Reference"><input className="vb-input" placeholder="Auto-generated" disabled defaultValue="RFQ-2046" /></Labeled>
            <Labeled label="Category"><select className="vb-input"><option>Industrial</option><option>Electronics</option><option>Packaging</option></select></Labeled>
            <Labeled label="Deadline"><input className="vb-input" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></Labeled>
            <Labeled label="Budget Cap (USD)"><input className="vb-input" placeholder="200000" /></Labeled>
            <Labeled label="Currency"><select className="vb-input"><option>USD</option><option>EUR</option><option>INR</option></select></Labeled>
            <div className="md:col-span-2">
              <Labeled label="Scope / Notes"><textarea className="vb-textarea" placeholder="Brief description, quality requirements, delivery terms…" /></Labeled>
            </div>
          </Panel>
        </Section>
      )}

      {step === 1 && (
        <Section title="Line Items" actions={
          <ScrambleButton size="sm" variant="outline" icon={<Plus className="size-3.5" />}
            onClick={() => setLines((l) => [...l, { sku: "", desc: "", qty: 1, unit: "ea" }])}>
            Add Line
          </ScrambleButton>
        }>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 font-normal w-40">SKU</th>
                  <th className="text-left px-4 py-3 font-normal">Description</th>
                  <th className="text-right px-4 py-3 font-normal w-24">Qty</th>
                  <th className="text-left px-4 py-3 font-normal w-20">Unit</th>
                  <th className="w-12" />
                </tr>
              </thead>
              <tbody>
                {lines.map((l, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0">
                    <td className="px-2 py-1.5"><input className="vb-input" defaultValue={l.sku} /></td>
                    <td className="px-2 py-1.5"><input className="vb-input" defaultValue={l.desc} /></td>
                    <td className="px-2 py-1.5"><input className="vb-input text-right" defaultValue={l.qty} /></td>
                    <td className="px-2 py-1.5"><input className="vb-input" defaultValue={l.unit} /></td>
                    <td className="px-2 py-1.5 text-center">
                      <button data-scramble-target onClick={() => setLines((x) => x.filter((_, j) => j !== i))}
                        className="size-8 grid place-items-center text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {step === 2 && (
        <Section title="Attachments">
          <Panel className="p-10 border-dashed flex flex-col items-center text-center gap-2">
            <Paperclip className="size-5 text-muted-foreground" />
            <div className="text-[14px]"><ScrambleText>Drop files here or click to browse</ScrambleText></div>
            <div className="text-[11px] text-muted-foreground">PDF, DOCX, XLSX up to 25MB each</div>
          </Panel>
          <ul className="mt-4 text-[12px] text-muted-foreground space-y-1 font-mono">
            <li data-scramble-target><ScrambleText>SPEC-bearings-2026.pdf — 1.4 MB</ScrambleText></li>
            <li data-scramble-target><ScrambleText>commercial-terms.docx — 86 KB</ScrambleText></li>
          </ul>
        </Section>
      )}

      {step === 3 && (
        <Section title="Invite Vendors">
          <Panel className="p-6 space-y-3">
            {["Northwind Industrial Supply", "Helios Components Ltd", "Atlas Metalworks", "Borealis Packaging", "Meridian Chemicals"].map((v) => (
              <label key={v} data-scramble-target className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={vendorsSel.includes(v)} onChange={() => toggleVendor(v)} className="accent-white" />
                <div className="text-[13px]"><ScrambleText>{v}</ScrambleText></div>
              </label>
            ))}
          </Panel>
        </Section>
      )}

      {step === 4 && (
        <Section title="Review & Send">
          <Panel className="p-6 space-y-3 text-[13px]">
            <Row k="Title" v={title || "Untitled RFQ"} />
            <Row k="Lines" v={`${lines.length} items`} />
            <Row k="Vendors invited" v={String(vendorsSel.length)} />
            <Row k="Deadline" v={deadline} />
            <Row k="Attachments" v="2 files" />
          </Panel>
        </Section>
      )}

      <div className="flex justify-between gap-2 pt-4">
        <ScrambleButton variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>← Back</ScrambleButton>
        {step < STEPS.length - 1 ? (
          <ScrambleButton variant="primary" onClick={() => setStep((s) => s + 1)}>Continue →</ScrambleButton>
        ) : (
          <ScrambleButton variant="primary" onClick={publish}>Publish RFQ</ScrambleButton>
        )}
      </div>
    </Page>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-1.5">{label}</div>
      {children}
    </label>
  );
}
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{k}</div>
      <div className="font-mono text-[12px]">{v}</div>
    </div>
  );
}
