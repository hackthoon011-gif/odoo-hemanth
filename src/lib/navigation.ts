import type { Role } from "./auth";

export interface NavItem { label: string; to: string; }
export interface NavSection { label: string; items: NavItem[]; }

const DASHBOARD: NavSection = {
  label: "Overview",
  items: [{ label: "Dashboard", to: "/app/dashboard" }],
};

const VENDOR_MOD: NavSection = {
  label: "Vendors",
  items: [
    { label: "Vendor List", to: "/app/vendors" },
    { label: "Vendor Map", to: "/app/vendors/map" },
    { label: "Register Vendor", to: "/app/vendors/new" },
    { label: "Categories", to: "/app/vendors/categories" },
    { label: "Documents", to: "/app/vendors/documents" },
    { label: "Performance", to: "/app/vendors/performance" },
  ],
};

const RISK_MOD: NavSection = {
  label: "Risk",
  items: [{ label: "Risk Detection", to: "/app/risk" }],
};

const RFQ_MOD: NavSection = {
  label: "RFQ",
  items: [
    { label: "RFQ List", to: "/app/rfqs" },
    { label: "Create RFQ", to: "/app/rfqs/new" },
  ],
};

const QUOTATION_MOD: NavSection = {
  label: "Quotations",
  items: [
    { label: "Quotation List", to: "/app/quotations" },
    { label: "Submit Quotation", to: "/app/quotations/submit" },
    { label: "History", to: "/app/quotations/history" },
  ],
};

const COMPARISON_MOD: NavSection = {
  label: "Comparison",
  items: [
    { label: "Side by Side", to: "/app/comparison" },
    { label: "Vendor Evaluation", to: "/app/comparison/evaluation" },
    { label: "Vendor Ranking", to: "/app/comparison/ranking" },
  ],
};

const APPROVAL_MOD: NavSection = {
  label: "Approvals",
  items: [
    { label: "Approval Queue", to: "/app/approvals" },
    { label: "Timeline", to: "/app/approvals/timeline" },
    { label: "History", to: "/app/approvals/history" },
  ],
};

const PO_MOD: NavSection = {
  label: "Purchase Orders",
  items: [
    { label: "PO List", to: "/app/purchase-orders" },
    { label: "Generate PO", to: "/app/purchase-orders/new" },
  ],
};

const INVOICE_MOD: NavSection = {
  label: "Invoices",
  items: [
    { label: "Invoice List", to: "/app/invoices" },
    { label: "Generate Invoice", to: "/app/invoices/new" },
  ],
};

const NOTIF_MOD: NavSection = {
  label: "Notifications",
  items: [
    { label: "Notification Center", to: "/app/notifications" },
    { label: "History", to: "/app/notifications/history" },
  ],
};

const ACTIVITY_MOD: NavSection = {
  label: "Activity",
  items: [
    { label: "Timeline", to: "/app/activity" },
    { label: "Audit Logs", to: "/app/activity/audit" },
  ],
};

const REPORTS_MOD: NavSection = {
  label: "Reports",
  items: [
    { label: "Procurement Reports", to: "/app/reports" },
    { label: "Vendor Reports", to: "/app/reports/vendors" },
    { label: "Spend Analysis", to: "/app/reports/spend" },
    { label: "Monthly Trends", to: "/app/reports/trends" },
    { label: "Export Center", to: "/app/reports/export" },
  ],
};

const SETTINGS_MOD: NavSection = {
  label: "Settings",
  items: [
    { label: "Organization", to: "/app/settings" },
    { label: "User Management", to: "/app/settings/users" },
    { label: "Role Management", to: "/app/settings/roles" },
    { label: "Tax Settings", to: "/app/settings/tax" },
    { label: "Approval Rules", to: "/app/settings/approval-rules" },
    { label: "Notifications", to: "/app/settings/notifications" },
  ],
};

export function navForRole(role: Role): NavSection[] {
  switch (role) {
    case "admin":
      return [DASHBOARD, VENDOR_MOD, RFQ_MOD, QUOTATION_MOD, COMPARISON_MOD, APPROVAL_MOD, PO_MOD, INVOICE_MOD, RISK_MOD, NOTIF_MOD, ACTIVITY_MOD, REPORTS_MOD, SETTINGS_MOD];
    case "procurement":
      return [DASHBOARD, VENDOR_MOD, RFQ_MOD, QUOTATION_MOD, COMPARISON_MOD, PO_MOD, INVOICE_MOD, RISK_MOD, NOTIF_MOD, ACTIVITY_MOD, REPORTS_MOD];
    case "manager":
      return [DASHBOARD, APPROVAL_MOD, RFQ_MOD, QUOTATION_MOD, PO_MOD, INVOICE_MOD, RISK_MOD, NOTIF_MOD, ACTIVITY_MOD, REPORTS_MOD];
    case "vendor":
      return [
        DASHBOARD,
        { label: "RFQ", items: [{ label: "Invited RFQs", to: "/app/rfqs" }] },
        { label: "Quotations", items: [
          { label: "My Quotations", to: "/app/quotations" },
          { label: "Submit Quotation", to: "/app/quotations/submit" },
          { label: "History", to: "/app/quotations/history" },
        ]},
        { label: "Orders", items: [
          { label: "Purchase Orders", to: "/app/purchase-orders" },
          { label: "Invoices", to: "/app/invoices" },
        ]},
        NOTIF_MOD,
      ];
  }
}
