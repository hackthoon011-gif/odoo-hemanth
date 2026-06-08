import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FilePlus2,
  UserPlus,
  Receipt,
  Search,
  FileText,
  Users,
  ClipboardList,
  ShoppingCart,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import {
  vendors,
  rfqs,
  quotations,
  purchaseOrders,
  invoices,
  approvals,
} from "@/lib/mock";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (to: string) => {
    onOpenChange(false);
    setQuery("");
    navigate({ to });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const match = (s: string) => s.toLowerCase().includes(q);
    return {
      vendors: vendors
        .filter((v) => match(v.name) || match(v.id) || match(v.category))
        .slice(0, 5),
      rfqs: rfqs.filter((r) => match(r.title) || match(r.id)).slice(0, 5),
      quotations: quotations
        .filter((q2) => match(q2.id) || match(q2.vendor) || match(q2.rfq))
        .slice(0, 5),
      pos: purchaseOrders
        .filter((p) => match(p.id) || match(p.vendor))
        .slice(0, 5),
      invoices: invoices
        .filter((i) => match(i.id) || match(i.vendor) || match(i.po))
        .slice(0, 5),
      approvals: approvals
        .filter((a) => match(a.id) || match(a.subject))
        .slice(0, 5),
    };
  }, [query]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search vendors, RFQs, quotations, invoices… or run a command"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[460px]">
        <CommandEmpty>No results found.</CommandEmpty>

        {!results && (
          <>
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => go("/app/rfqs/new")}>
                <FilePlus2 className="size-4" />
                <span>Create RFQ</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/vendors/new")}>
                <UserPlus className="size-4" />
                <span>Create Vendor</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/invoices/new")}>
                <Receipt className="size-4" />
                <span>Generate Invoice</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/purchase-orders/new")}>
                <ShoppingCart className="size-4" />
                <span>Create Purchase Order</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/quotations/submit")}>
                <FileText className="size-4" />
                <span>Submit Quotation</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigate">
              <CommandItem onSelect={() => go("/app/dashboard")}>
                <BarChart3 className="size-4" /> <span>Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/vendors")}>
                <Users className="size-4" /> <span>Vendors</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/rfqs")}>
                <ClipboardList className="size-4" /> <span>RFQs</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/quotations")}>
                <FileText className="size-4" /> <span>Quotations</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/approvals")}>
                <CheckCircle2 className="size-4" /> <span>Approvals</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/purchase-orders")}>
                <ShoppingCart className="size-4" /> <span>Purchase Orders</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/invoices")}>
                <Receipt className="size-4" /> <span>Invoices</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/app/reports")}>
                <BarChart3 className="size-4" /> <span>Reports</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {results && (
          <>
            {results.vendors.length > 0 && (
              <CommandGroup heading="Vendors">
                {results.vendors.map((v) => (
                  <CommandItem key={v.id} onSelect={() => go(`/app/vendors/${v.id}`)}>
                    <Users className="size-4" />
                    <span className="flex-1">{v.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{v.id}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.rfqs.length > 0 && (
              <CommandGroup heading="RFQs">
                {results.rfqs.map((r) => (
                  <CommandItem key={r.id} onSelect={() => go(`/app/rfqs/${r.id}`)}>
                    <ClipboardList className="size-4" />
                    <span className="flex-1">{r.title}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{r.id}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.quotations.length > 0 && (
              <CommandGroup heading="Quotations">
                {results.quotations.map((q2) => (
                  <CommandItem key={q2.id} onSelect={() => go(`/app/quotations/${q2.id}`)}>
                    <FileText className="size-4" />
                    <span className="flex-1">
                      {q2.vendor} · {q2.rfq}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{q2.id}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.pos.length > 0 && (
              <CommandGroup heading="Purchase Orders">
                {results.pos.map((p) => (
                  <CommandItem key={p.id} onSelect={() => go(`/app/purchase-orders/${p.id}`)}>
                    <ShoppingCart className="size-4" />
                    <span className="flex-1">{p.vendor}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{p.id}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.invoices.length > 0 && (
              <CommandGroup heading="Invoices">
                {results.invoices.map((i) => (
                  <CommandItem key={i.id} onSelect={() => go(`/app/invoices/${i.id}`)}>
                    <Receipt className="size-4" />
                    <span className="flex-1">{i.vendor}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{i.id}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.approvals.length > 0 && (
              <CommandGroup heading="Approvals">
                {results.approvals.map((a) => (
                  <CommandItem key={a.id} onSelect={() => go(`/app/approvals/${a.id}`)}>
                    <CheckCircle2 className="size-4" />
                    <span className="flex-1">{a.subject}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{a.id}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandSeparator />
            <CommandGroup heading="Search across ERP">
              <CommandItem onSelect={() => go(`/app/dashboard`)}>
                <Search className="size-4" />
                <span>Showing top results for "{query}"</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
