const currencySymbols: Record<string, string> = {
  usd: "$",
  eur: "€",
  gbp: "£",
  jpy: "¥",
  aud: "A$",
};

export function formatCurrency(
  value: number,
  currency: string = "usd",
): string {
  if (value == null || isNaN(value)) return "—";
  const symbol = currencySymbols[currency.toLowerCase()] ?? "$";
  if (value >= 1_000_000) return `${symbol}${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${symbol}${(value / 1_000).toFixed(2)}K`;
  return `${symbol}${value.toLocaleString()}`;
}

export function formatCrypto(value?: number): string {
  if (value === undefined) return "N/A";
  if (value >= 1000)
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (value >= 1) return value.toFixed(4);
  return value.toFixed(6);
}
