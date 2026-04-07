import { mockMarkets } from "@/lib/mock/markets";
import { mockCoinDetails } from "@/lib/mock/marketDetails";
// swap these for real fetch calls when backend is ready
export async function fetchMarketlist() {
  // const res = await fetch('/api/markets')
  // if (!res.ok) throw new Error('Failed to fetch market list')
  // return res.json()
  return mockMarkets;
}

export async function fetchCoinDetail(id: string) {
  // const res = await fetch(`/api/markets/${id}`)
  // if (!res.ok) throw new Error('Failed to fetch coin detail')
  // return res.json()
  return mockCoinDetails[id] || null;
}

export async function toggleMarketStar(coinId: string, starred: boolean) {
  // const res = await fetch(`/api/watchlist/${coinId}/star`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ starred }),
  // })
  // if (!res.ok) throw new Error('Failed to toggle watchlist star')
  // return res.json()
  console.log(`Toggled star for ${coinId}: ${starred}`);
}

export async function toggleMarketAlert(
  coinId: string,
  alert: { type: "price" | "percentage"; value: number } | null,
) {
  // const res = await fetch(`/api/watchlist/${coinId}/alert`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(alert),
  // })
  // if (!res.ok) throw new Error('Failed to toggle watchlist alert')
  // return res.json()
  console.log(
    `Toggled alert for ${coinId}: ${alert ? `${alert.type} ${alert.value}` : "none"}`,
  );
}
