// components/common/PriceChart.tsx
'use client'
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

interface PriceChartProps {
  labels: string[]
  values: number[]
  color?: string       
  height?: string       
}

export function PriceChart({ labels, values, color = '#ff9062', height = 'h-56' }: PriceChartProps) {
  
  return (
    <div className={`${height} w-full min-w-0`}>
      <Line
        data={{
          labels,
          datasets: [{
            data: values,
            borderColor: color,
            backgroundColor: `${color}0d`,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: color,
            borderWidth: 2,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1a1919',
              titleColor: '#ffffff',
              bodyColor: color,
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              callbacks: {
                label: (ctx) => `$${(ctx.parsed.y ?? 0).toLocaleString()}`
              }
            }
          },
          scales: {
            x: {
              display: true,
              grid: { display: false },
              ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 11 }, maxTicksLimit: 6 }
            },
            y: {
              display: true,
              position: 'left' as const,
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
  )
}