import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Section, Panel } from "@/components/page";
import { ScrambleButton } from "@/components/scramble-button";
import { addItem, nextId, useEntity } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/vendors/new")({ component: NewVendor });

function NewVendor() {
  const nav = useNavigate();
  const vendors = useEntity("vendors");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Industrial");
  const [country, setCountry] = useState("United States");
  const [gst, setGst] = useState("");
  const [contact, setContact] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = nextId("VEN", vendors);
    addItem("vendors", {
      id,
      name: name.trim() || "New Vendor",
      category,
      status: "Pending",
      gst: gst || "—",
      rating: 0,
      orders: 0,
      contact: contact || "—",
      country,
    });
    toast.success(`${id} registered`);
    nav({ to: "/app/vendors" });
  }

  return (
    <Page eyebrow="Vendor Module" title="Register Vendor" description="Onboard a new vendor with company, contact and tax details.">
      <form className="grid lg:grid-cols-3 gap-6" onSubmit={submit}>
        <div className="lg:col-span-2 space-y-6">
          <Section title="Company">
            <Panel className="grid md:grid-cols-2 gap-4 p-6">
              <Labeled label="Legal Name"><input className="vb-input" placeholder="Northwind Industrial Supply Inc." value={name} onChange={(e) => setName(e.target.value)} /></Labeled>
              <Labeled label="Trading Name"><input className="vb-input" placeholder="Northwind" /></Labeled>
              <Labeled label="Category">
                <select className="vb-input" value={category} onChange={(e) => setCategory(e.target.value)}><option>Industrial</option><option>Electronics</option><option>Logistics</option><option>Packaging</option><option>Chemicals</option><option>Office</option></select>
              </Labeled>
              <Labeled label="Country"><input className="vb-input" placeholder="United States" value={country} onChange={(e) => setCountry(e.target.value)} /></Labeled>
              <Labeled label="Website"><input className="vb-input" placeholder="https://" /></Labeled>
              <Labeled label="Year Established"><input className="vb-input" placeholder="2009" /></Labeled>
            </Panel>
          </Section>

          <Section title="Tax & Compliance">
            <Panel className="grid md:grid-cols-2 gap-4 p-6">
              <Labeled label="GST / VAT Number"><input className="vb-input" placeholder="29ABCDE1234F1Z5" value={gst} onChange={(e) => setGst(e.target.value)} /></Labeled>
              <Labeled label="PAN / Tax ID"><input className="vb-input" placeholder="ABCDE1234F" /></Labeled>
              <Labeled label="Compliance Tier">
                <select className="vb-input"><option>Tier 1 — Audited</option><option>Tier 2 — Verified</option><option>Tier 3 — Self-declared</option></select>
              </Labeled>
              <Labeled label="MSME Certificate"><input className="vb-input" placeholder="UDYAM-XX-00-0000000" /></Labeled>
            </Panel>
          </Section>

          <Section title="Primary Contact">
            <Panel className="grid md:grid-cols-2 gap-4 p-6">
              <Labeled label="Full Name"><input className="vb-input" placeholder="Avery Cole" /></Labeled>
              <Labeled label="Role"><input className="vb-input" placeholder="Account Manager" /></Labeled>
              <Labeled label="Email"><input className="vb-input" placeholder="avery@northwind.co" value={contact} onChange={(e) => setContact(e.target.value)} /></Labeled>
              <Labeled label="Phone"><input className="vb-input" placeholder="+1 555 0144" /></Labeled>
            </Panel>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Status">
            <Panel className="p-6 space-y-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Approval Mode</div>
              <select className="vb-input"><option>Send for manager approval</option><option>Auto-approve (admin)</option></select>
              <div className="text-[11px] text-muted-foreground">Created vendors enter the registry as Pending until a Manager approves.</div>
            </Panel>
          </Section>
          <Section title="Submit">
            <Panel className="p-6 space-y-3">
              <ScrambleButton type="submit" variant="primary" className="w-full">Register Vendor</ScrambleButton>
              <ScrambleButton type="button" variant="outline" className="w-full" onClick={() => nav({ to: "/app/vendors" })}>Cancel</ScrambleButton>
            </Panel>
          </Section>
        </div>
      </form>
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
