// lib/mock/search.ts
import { mockMarkets } from "./markets";
import { mockTransactions } from "./transactions";
import { mockAlerts } from "./alert";

export function mockSearchResults(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { coins: [], transactions: [], alerts: [] };

  return {
    coins: mockMarkets.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q),
    ),
    transactions: mockTransactions.filter(
      (t) =>
        t.coin.toLowerCase().includes(q) || t.type.toLowerCase().includes(q),
    ),
    alerts: mockAlerts.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q),
    ),
  };
}
