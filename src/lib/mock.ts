export const vendors = [
  { id: "VEN-1042", name: "Northwind Industrial Supply", category: "Industrial", status: "Approved", gst: "29ABCDE1234F1Z5", rating: 4.7, orders: 184, contact: "ops@northwind.co", country: "United States" },
  { id: "VEN-1043", name: "Helios Components Ltd", category: "Electronics", status: "Pending", gst: "07AAACH7409R1Z2", rating: 4.2, orders: 92, contact: "trade@helios.io", country: "Germany" },
  { id: "VEN-1044", name: "Atlas Metalworks", category: "Raw Materials", status: "Approved", gst: "33AABCA1234L1Z9", rating: 4.5, orders: 311, contact: "sales@atlasmetal.com", country: "India" },
  { id: "VEN-1045", name: "Kuro Logistics", category: "Logistics", status: "Rejected", gst: "—", rating: 3.1, orders: 12, contact: "ops@kuro.jp", country: "Japan" },
  { id: "VEN-1046", name: "Borealis Packaging", category: "Packaging", status: "Approved", gst: "27ABCDE9999K1Z0", rating: 4.6, orders: 220, contact: "hello@borealis.eu", country: "Sweden" },
  { id: "VEN-1047", name: "Meridian Chemicals", category: "Chemicals", status: "Pending", gst: "06AABCM5566N1Z3", rating: 4.0, orders: 67, contact: "supply@meridianchem.com", country: "Canada" },
  { id: "VEN-1048", name: "Solace Office Goods", category: "Office", status: "Approved", gst: "24AAACS3344Q1Z8", rating: 4.3, orders: 410, contact: "b2b@solace.shop", country: "Singapore" },
];

export const rfqs = [
  { id: "RFQ-2041", title: "Quarterly bearings & couplings", status: "Open", deadline: "2026-06-22", vendors: 6, items: 14, owner: "S. Patel" },
  { id: "RFQ-2042", title: "Industrial-grade circuit boards", status: "Closed", deadline: "2026-05-30", vendors: 4, items: 8, owner: "M. Okafor" },
  { id: "RFQ-2043", title: "Bulk corrugated packaging", status: "Open", deadline: "2026-06-18", vendors: 9, items: 5, owner: "J. Romero" },
  { id: "RFQ-2044", title: "Annual office consumables", status: "Draft", deadline: "2026-07-05", vendors: 0, items: 27, owner: "A. Whitfield" },
  { id: "RFQ-2045", title: "Stainless steel sheets, 4mm", status: "Open", deadline: "2026-06-15", vendors: 5, items: 3, owner: "S. Patel" },
];

export const quotations = [
  { id: "QT-7781", rfq: "RFQ-2041", vendor: "Northwind Industrial Supply", total: 184320, currency: "USD", delivery: "14 days", status: "Submitted", rating: 4.7 },
  { id: "QT-7782", rfq: "RFQ-2041", vendor: "Atlas Metalworks", total: 178990, currency: "USD", delivery: "18 days", status: "Submitted", rating: 4.5 },
  { id: "QT-7783", rfq: "RFQ-2041", vendor: "Helios Components Ltd", total: 191220, currency: "USD", delivery: "11 days", status: "Submitted", rating: 4.2 },
  { id: "QT-7784", rfq: "RFQ-2043", vendor: "Borealis Packaging", total: 42100, currency: "USD", delivery: "9 days", status: "Submitted", rating: 4.6 },
  { id: "QT-7785", rfq: "RFQ-2042", vendor: "Helios Components Ltd", total: 96500, currency: "USD", delivery: "21 days", status: "Awarded", rating: 4.2 },
];

export const approvals = [
  { id: "APR-330", subject: "Award QT-7782 to Atlas Metalworks", requester: "S. Patel", amount: 178990, status: "Pending", submitted: "2026-06-04" },
  { id: "APR-331", subject: "RFQ-2044 budget allocation", requester: "A. Whitfield", amount: 22000, status: "Pending", submitted: "2026-06-03" },
  { id: "APR-329", subject: "Award QT-7785 to Helios Components", requester: "M. Okafor", amount: 96500, status: "Approved", submitted: "2026-05-30" },
  { id: "APR-328", subject: "Vendor onboarding: Kuro Logistics", requester: "Admin", amount: 0, status: "Rejected", submitted: "2026-05-28" },
];

export const purchaseOrders = [
  { id: "PO-5582", vendor: "Helios Components Ltd", total: 96500, status: "Open", issued: "2026-05-31", lines: 8 },
  { id: "PO-5581", vendor: "Northwind Industrial Supply", total: 184320, status: "Fulfilled", issued: "2026-05-22", lines: 14 },
  { id: "PO-5580", vendor: "Borealis Packaging", total: 42100, status: "Open", issued: "2026-05-18", lines: 5 },
  { id: "PO-5579", vendor: "Atlas Metalworks", total: 21800, status: "Cancelled", issued: "2026-05-04", lines: 2 },
];

export const invoices = [
  { id: "INV-9001", po: "PO-5581", vendor: "Northwind Industrial Supply", total: 184320, status: "Paid", issued: "2026-05-25", due: "2026-06-25" },
  { id: "INV-9002", po: "PO-5582", vendor: "Helios Components Ltd", total: 96500, status: "Pending", issued: "2026-06-02", due: "2026-07-02" },
  { id: "INV-9003", po: "PO-5580", vendor: "Borealis Packaging", total: 42100, status: "Pending", issued: "2026-06-04", due: "2026-07-04" },
];

export const activity = [
  { ts: "2026-06-06 09:21", actor: "M. Okafor", text: "Approved APR-329 — award to Helios Components" },
  { ts: "2026-06-06 08:44", actor: "System", text: "Generated INV-9003 from PO-5580" },
  { ts: "2026-06-05 17:02", actor: "S. Patel", text: "Created RFQ-2041 and invited 6 vendors" },
  { ts: "2026-06-05 14:11", actor: "Helios Components Ltd", text: "Submitted quotation QT-7783 against RFQ-2041" },
  { ts: "2026-06-05 11:30", actor: "Admin", text: "Updated tax rates: GST 18%" },
  { ts: "2026-06-04 16:48", actor: "A. Whitfield", text: "Drafted RFQ-2044" },
];

export const notifications = [
  { id: "N-501", title: "New quotation received", body: "Atlas Metalworks submitted QT-7782 against RFQ-2041.", ts: "12 min ago", kind: "info" },
  { id: "N-502", title: "Approval requested", body: "S. Patel needs your approval on APR-330.", ts: "1 hr ago", kind: "warn" },
  { id: "N-503", title: "Invoice INV-9001 paid", body: "Payment of $184,320 cleared.", ts: "Yesterday", kind: "success" },
  { id: "N-504", title: "Vendor rejected", body: "Kuro Logistics onboarding was rejected.", ts: "2 days ago", kind: "danger" },
];

export const monthlySpend = [
  { m: "Dec", v: 412000 }, { m: "Jan", v: 388000 }, { m: "Feb", v: 451000 },
  { m: "Mar", v: 502000 }, { m: "Apr", v: 478000 }, { m: "May", v: 561000 }, { m: "Jun", v: 312000 },
];

export const users = [
  { name: "Sana Patel", email: "sana@vendorbridge.io", role: "Procurement Officer", status: "Active" },
  { name: "Miles Okafor", email: "miles@vendorbridge.io", role: "Manager", status: "Active" },
  { name: "Aiko Whitfield", email: "aiko@vendorbridge.io", role: "Procurement Officer", status: "Active" },
  { name: "Jonas Romero", email: "jonas@vendorbridge.io", role: "Procurement Officer", status: "Invited" },
  { name: "Root Admin", email: "admin@vendorbridge.io", role: "Administrator", status: "Active" },
];
