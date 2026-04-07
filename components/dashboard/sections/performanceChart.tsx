import React from "react";
import { EmptyChart } from "./emptyChart";

import { PortfolioStats } from "@/types";
import { PriceChart } from "@/components/common/priceChart";
function PerformanceCharts({ isEmpty, stats }: PortfolioStats) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Portfolio Performance</h2>
          <p className="text-sm text-white/50">Growth over the last 30 days</p>
        </div>
        <div className="flex gap-2 text-sm">
          {["1D", "1M", "1Y"].map((t) => (
            <button
              key={t}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-primary hover:text-black transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      {isEmpty ? (
        <EmptyChart />
      ) : (
          <PriceChart
            labels={stats?.chartData.map((d) => d.date) || []}
            values={stats?.chartData.map((d) => d.value) || []}
          />
        
      )}
    </div>
  );
}

export default PerformanceCharts;
