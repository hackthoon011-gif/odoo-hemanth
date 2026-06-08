// Auth removed — stubbed so every screen behaves as if signed in.
export type Role = "admin" | "procurement" | "vendor" | "manager";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Administrator",
  procurement: "Procurement Officer",
  vendor: "Vendor",
  manager: "Manager",
};

const DEFAULT_USER: AuthUser = {
  name: "Sana Patel",
  email: "sana@vendorbridge.io",
  role: "admin",
};

export async function signOut() { /* no-op */ }

export function useAuthState(): { user: AuthUser; loading: false } {
  return { user: DEFAULT_USER, loading: false };
}

export function useAuth(): AuthUser { return DEFAULT_USER; }
