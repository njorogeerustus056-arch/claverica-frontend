// src/data/fiatPlatforms.ts
export const fiatPlatforms = [
  { id: "monzo", name: "Monzo", logo: "🦄", type: "bank" as const, balance: 3450.00, currency: "GBP", accountNumber: "****5678" },
  { id: "wise", name: "Wise", logo: "💳", type: "payment" as const, balance: 5230.00, currency: "USD", accountNumber: "****9012" },
  { id: "skrill", name: "Skrill", logo: "💰", type: "payment" as const, balance: 2100.00, currency: "EUR", accountNumber: "****3456" },
  { id: "revolut", name: "Revolut", logo: "🔄", type: "bank" as const, balance: 1850.00, currency: "USD", accountNumber: "****7890" },
];