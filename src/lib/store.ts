// Frontend-only reactive store, persisted to localStorage.
// Seeded from src/lib/mock.ts on first load.
import { useSyncExternalStore } from "react";
import {
  rfqs as seedRfqs,
  vendors as seedVendors,
  quotations as seedQuotations,
  purchaseOrders as seedPOs,
  invoices as seedInvoices,
  approvals as seedApprovals,
  notifications as seedNotifications,
} from "./mock";

type Entity =
  | "rfqs"
  | "vendors"
  | "quotations"
  | "purchaseOrders"
  | "invoices"
  | "approvals"
  | "notifications";

type Seeds = {
  rfqs: typeof seedRfqs;
  vendors: typeof seedVendors;
  quotations: typeof seedQuotations;
  purchaseOrders: typeof seedPOs;
  invoices: typeof seedInvoices;
  approvals: typeof seedApprovals;
  notifications: typeof seedNotifications;
};

const SEEDS: Seeds = {
  rfqs: seedRfqs,
  vendors: seedVendors,
  quotations: seedQuotations,
  purchaseOrders: seedPOs,
  invoices: seedInvoices,
  approvals: seedApprovals,
  notifications: seedNotifications,
};

const KEY = "vb-store-v1";

type State = Seeds;

function load(): State {
  if (typeof window === "undefined") return { ...SEEDS };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...SEEDS };
    const parsed = JSON.parse(raw) as Partial<State>;
    return {
      rfqs: parsed.rfqs ?? SEEDS.rfqs,
      vendors: parsed.vendors ?? SEEDS.vendors,
      quotations: parsed.quotations ?? SEEDS.quotations,
      purchaseOrders: parsed.purchaseOrders ?? SEEDS.purchaseOrders,
      invoices: parsed.invoices ?? SEEDS.invoices,
      approvals: parsed.approvals ?? SEEDS.approvals,
      notifications: parsed.notifications ?? SEEDS.notifications,
    };
  } catch {
    return { ...SEEDS };
  }
}

let state: State = load();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
}
function emit() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); }

export function useEntity<K extends Entity>(key: K): State[K] {
  return useSyncExternalStore(
    subscribe,
    () => state[key],
    () => SEEDS[key],
  );
}

export function addItem<K extends Entity>(key: K, item: State[K][number]) {
  state = { ...state, [key]: [item, ...state[key]] as State[K] };
  persist();
  emit();
}

export function resetStore() {
  state = { ...SEEDS };
  persist();
  emit();
}

// ID helpers
export function nextId(prefix: string, existing: { id: string }[]): string {
  const nums = existing
    .map((e) => parseInt(e.id.replace(/[^0-9]/g, ""), 10))
    .filter((n) => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 1000) + 1;
  return `${prefix}-${next}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}