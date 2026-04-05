import React from "react";
import { EmptyChart } from "./emptyChart";
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)
import { PortfolioStats } from "@/types";
function PerformanceCharts({isEmpty, stats}: PortfolioStats) {

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
  <div className="h-56 w-full flex items-center justify-center text-white/30 text-sm">
    <Line
    
  data={{
    labels: stats!.chartData.map(d => 
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [{
      data: stats!.chartData.map(d => d.value),
      borderColor: '#ff9062',
      backgroundColor: 'rgba(255, 144, 98, 0.05)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff9062',
      borderWidth: 2,
    }]
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1919',
        titleColor: '#ffffff',
        bodyColor: '#ff9062',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `$${(ctx.parsed.y?? 0).toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          color: 'rgba(255,255,255,0.3)',
          font: { size: 11 },
          maxTicksLimit: 6,
        }
      },
      y: {
        display: true,
        position: 'left',
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: {
          color: 'rgba(255,255,255,0.3)',
          font: { size: 11 },
          callback: (val) => `$${Number(val).toLocaleString()}`
        }
      }
    }
  }}
/>
  </div>
)}
    </div>
  );
}

export default PerformanceCharts;
