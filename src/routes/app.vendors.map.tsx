import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Section, Panel, Stat } from "@/components/page";
import { vendors } from "@/lib/mock";
import { Status } from "@/components/status";

export const Route = createFileRoute("/app/vendors/map")({ component: VendorMap });

// Approximate vendor locations — free, no API. Add a city per vendor for visual spread.
const vendorLocations: Record<string, { city: string; lat: number; lng: number }> = {
  "VEN-1042": { city: "Chicago, US", lat: 41.88, lng: -87.63 },
  "VEN-1043": { city: "Berlin, DE", lat: 52.52, lng: 13.41 },
  "VEN-1044": { city: "Hyderabad, IN", lat: 17.39, lng: 78.49 },
  "VEN-1045": { city: "Tokyo, JP", lat: 35.68, lng: 139.69 },
  "VEN-1046": { city: "Stockholm, SE", lat: 59.33, lng: 18.07 },
  "VEN-1047": { city: "Toronto, CA", lat: 43.65, lng: -79.38 },
  "VEN-1048": { city: "Singapore, SG", lat: 1.35, lng: 103.82 },
};

// Extra showcase cities requested
const focusCities = [
  { name: "Hyderabad", lat: 17.39, lng: 78.49 },
  { name: "Bangalore", lat: 12.97, lng: 77.59 },
  { name: "Chennai", lat: 13.08, lng: 80.27 },
  { name: "Mumbai", lat: 19.08, lng: 72.88 },
];

// Equirectangular projection into a 1000x500 viewBox
function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
}

function VendorMap() {
  const [active, setActive] = useState<string | null>(null);

  const points = useMemo(() => {
    return vendors.map((v) => {
      const loc = vendorLocations[v.id] ?? { city: v.country, lat: 0, lng: 0 };
      const { x, y } = project(loc.lat, loc.lng);
      return { ...v, city: loc.city, x, y };
    });
  }, []);

  const focus = focusCities.map((c) => ({ ...c, ...project(c.lat, c.lng) }));

  const byCountry = vendors.reduce<Record<string, number>>((acc, v) => {
    acc[v.country] = (acc[v.country] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Page
      eyebrow="Vendor Module"
      title="Vendor Map"
      description="Approximate geographic distribution of vendors. Hover or click a marker to inspect."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Mapped Vendors" value={vendors.length.toString()} />
        <Stat label="Countries" value={Object.keys(byCountry).length.toString()} />
        <Stat label="Focus Region" value="India" hint="Hyderabad · Bangalore · Chennai · Mumbai" />
        <Stat label="Coverage" value="Global" hint="NA · EU · APAC" />
      </div>

      <Section title="Geographic Distribution">
        <Panel className="p-4">
          <div className="relative w-full overflow-hidden rounded-md border border-border bg-[oklch(0.18_0.02_240)]">
            <svg viewBox="0 0 1000 500" className="w-full h-auto block">
              {/* Subtle dot-grid world silhouette: graticule lines + continent blobs */}
              <defs>
                <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.78 0.16 55)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="oklch(0.78 0.16 55)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Graticule */}
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`v${i}`} x1={(i * 1000) / 12} y1={0} x2={(i * 1000) / 12} y2={500} stroke="white" strokeOpacity="0.04" />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`h${i}`} x1={0} y1={(i * 500) / 6} x2={1000} y2={(i * 500) / 6} stroke="white" strokeOpacity="0.04" />
              ))}

              {/* Approximate continent blobs (decorative; free, no tiles) */}
              <g fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.18" strokeWidth="0.6">
                {/* North America */}
                <path d="M120,120 Q180,90 240,110 Q300,100 320,150 Q330,200 290,240 Q250,260 220,250 Q180,260 160,230 Q120,210 110,170 Z" />
                {/* South America */}
                <path d="M280,290 Q310,280 320,320 Q330,380 300,430 Q280,460 270,430 Q255,380 265,330 Z" />
                {/* Europe */}
                <path d="M470,130 Q510,115 540,135 Q560,160 540,180 Q505,195 480,180 Q460,160 470,140 Z" />
                {/* Africa */}
                <path d="M490,210 Q540,200 560,240 Q565,310 540,360 Q515,400 495,370 Q475,320 480,260 Z" />
                {/* Asia */}
                <path d="M560,120 Q650,100 760,130 Q820,160 830,210 Q800,250 720,250 Q640,245 590,225 Q555,195 555,150 Z" />
                {/* India subcontinent */}
                <path d="M680,225 Q705,225 715,255 Q710,290 690,300 Q672,285 670,255 Z" />
                {/* Australia */}
                <path d="M790,350 Q850,340 880,360 Q890,390 855,405 Q810,400 790,380 Z" />
              </g>

              {/* Focus cities ring (India region) */}
              {focus.map((c) => (
                <g key={c.name}>
                  <circle cx={c.x} cy={c.y} r="14" fill="url(#pulse)" />
                  <circle cx={c.x} cy={c.y} r="2" fill="oklch(0.78 0.16 55)" />
                </g>
              ))}

              {/* Vendor markers */}
              {points.map((p) => {
                const isActive = active === p.id;
                return (
                  <g key={p.id} onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)} style={{ cursor: "pointer" }}>
                    <circle cx={p.x} cy={p.y} r={isActive ? 16 : 10} fill="url(#pulse)" />
                    <circle cx={p.x} cy={p.y} r="3.5" fill="oklch(0.85 0.15 150)" stroke="white" strokeWidth="0.8" />
                    {isActive && (
                      <g>
                        <rect x={p.x + 8} y={p.y - 28} width={Math.max(120, p.name.length * 6)} height="38" rx="4" fill="oklch(0.14 0.02 240)" stroke="white" strokeOpacity="0.25" />
                        <text x={p.x + 14} y={p.y - 14} fill="white" fontSize="11" fontFamily="ui-monospace, monospace">{p.name}</text>
                        <text x={p.x + 14} y={p.y - 2} fill="white" fillOpacity="0.6" fontSize="9.5" fontFamily="ui-monospace, monospace">{p.city} · ★ {p.rating}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground font-mono">
            Approximate equirectangular projection · free offline rendering · no map provider required.
          </div>
        </Panel>
      </Section>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <Section title="Vendor Locations">
          <Panel className="p-0 overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.18em] text-[oklch(0.78_0.16_25)] font-mono">
                  <th className="px-4 py-3 font-normal w-28">ID</th>
                  <th className="px-4 py-3 font-normal">Vendor</th>
                  <th className="px-4 py-3 font-normal w-44">City</th>
                  <th className="px-4 py-3 font-normal w-32">Country</th>
                  <th className="px-4 py-3 font-normal w-24">Status</th>
                </tr>
              </thead>
              <tbody>
                {points.map((p) => (
                  <tr key={p.id} onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)} className="border-b border-border/60 last:border-0 hover:bg-white/[0.025]">
                    <td className="px-4 py-3 font-mono text-muted-foreground">{p.id}</td>
                    <td className="px-4 py-3"><Link to="/app/vendors/$id" params={{ id: p.id }} className="hover:underline underline-offset-4">{p.name}</Link></td>
                    <td className="px-4 py-3 font-mono text-[12px]">{p.city}</td>
                    <td className="px-4 py-3">{p.country}</td>
                    <td className="px-4 py-3"><Status value={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </Section>

        <Section title="By Country">
          <Panel className="p-6 space-y-3">
            {Object.entries(byCountry).sort((a,b) => b[1]-a[1]).map(([country, count]) => (
              <div key={country} className="flex items-center gap-3">
                <div className="flex-1 text-[13px]">{country}</div>
                <div className="w-40 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${(count / vendors.length) * 100}%` }} />
                </div>
                <div className="w-6 text-right font-mono text-[12px]">{count}</div>
              </div>
            ))}
          </Panel>
        </Section>
      </div>
    </Page>
  );
}
