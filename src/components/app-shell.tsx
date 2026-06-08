import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bell, LogOut, Search } from "lucide-react";
import { ROLE_LABEL, signOut, useAuthState } from "@/lib/auth";
import { navForRole } from "@/lib/navigation";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleButton } from "@/components/scramble-button";
import { CommandPalette } from "@/components/command-palette";
import { cn } from "@/lib/utils";

const SECTION_ACCENT: Record<string, string> = {
  Overview: "#9ca3af",
  Vendors: "#7dd3fc",
  RFQ: "#fcd34d",
  Quotations: "#c4b5fd",
  Comparison: "#f9a8d4",
  Approvals: "#fda4af",
  "Purchase Orders": "#86efac",
  Orders: "#86efac",
  Invoices: "#fdba74",
  Notifications: "#f0abfc",
  Activity: "#67e8f9",
  Reports: "#a5b4fc",
  Settings: "#94a3b8",
};

export function AppShell() {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [paletteOpen, setPaletteOpen] = useState(false);

  const sections = useMemo(() => navForRole(user.role), [user]);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-[248px] shrink-0 border-r border-border bg-black flex flex-col sticky top-0 h-screen">
        <Link to="/app/dashboard" data-scramble-target className="px-5 h-16 flex items-center gap-2.5 border-b border-border">
          <div className="size-6 rounded-sm bg-brand text-black grid place-items-center text-[12px] font-bold">VB</div>
          <div className="text-[14px] tracking-tight font-medium">
            <ScrambleText duration={500}>VendorBridge</ScrambleText>
          </div>
        </Link>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {sections.map((section) => {
            const accent = SECTION_ACCENT[section.label] ?? "#a3a3a3";
            return (
              <div key={section.label}>
                <div
                  className="px-3 mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono"
                  style={{ color: accent }}
                >
                  <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ background: accent, boxShadow: `0 0 6px ${accent}80` }}
                  />
                  {section.label}
                </div>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.to || pathname.startsWith(item.to + "/");
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          data-scramble-target
                          className={cn(
                            "block px-3 py-1.5 rounded-md text-[13px] transition-colors relative",
                            active
                              ? "bg-white/[0.06] text-foreground before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:rounded-full"
                              : "text-foreground/65 hover:text-foreground hover:bg-white/[0.04]",
                          )}
                          style={active ? ({ ["--tw-before-bg" as never]: accent } as never) : undefined}
                        >
                          {active && (
                            <span
                              className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                              style={{ background: accent }}
                            />
                          )}
                          <ScrambleText duration={400}>{item.label}</ScrambleText>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-3 flex items-center gap-3">
          <div className="size-8 rounded-full bg-white/10 grid place-items-center text-[12px]">
            {user.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] truncate">{user.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{ROLE_LABEL[user.role]}</div>
          </div>
          <button
            data-scramble-target
            onClick={() => { signOut(); navigate({ to: "/" }); }}
            className="size-8 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="size-3.5" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 sticky top-0 z-30 border-b border-border bg-black/85 backdrop-blur flex items-center px-6 lg:px-10 gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-[12px] font-mono">
            <ScrambleText duration={400}>vendorbridge</ScrambleText>
            <span>/</span>
            <ScrambleText duration={400}>{pathname.replace(/^\/app\/?/, "") || "dashboard"}</ScrambleText>
          </div>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 h-9 rounded-md border border-border bg-white/[0.03] text-[12px] text-muted-foreground w-72 hover:bg-white/[0.06] hover:text-foreground transition-colors text-left"
          >
            <Search className="size-3.5" />
            <span className="flex-1 truncate">Search vendors, RFQs, POs…</span>
            <kbd className="text-[10px] font-mono opacity-60 border border-border rounded px-1 py-px">⌘K</kbd>
          </button>
          <Link to="/app/notifications" className="size-9 grid place-items-center rounded-md hover:bg-white/[0.06] text-muted-foreground hover:text-foreground relative">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-brand shadow-[0_0_8px_oklch(0.72_0.18_50/0.8)]" />
          </Link>
          <ScrambleButton size="sm" variant="brand" onClick={() => navigate({ to: "/app/rfqs/new" })}>
            New RFQ
          </ScrambleButton>
        </header>

        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </main>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
