import React from 'react'
import { AssetAllocationItem } from '@/types/index'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)
function AssetAllocation({ allocation }: { allocation: AssetAllocationItem [] }){
  const chartData = {
  labels: allocation.map(a => a.label),
  datasets: [{
    data: allocation.map(a => a.percent),
    backgroundColor: allocation.map(a => a.color),
    borderWidth: 0,
    hoverOffset: 4,
  }]
}

const options = {
  responsive: true,
  cutout: '70%',
  plugins: { legend: { display: false } }
}

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-1">Asset Allocation</h2>
                <p className="text-sm text-white/50 mb-4">
                  Distribution across chains
                </p>
                {allocation.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-2">
                    <div className="w-20 h-20 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center">
                      <span className="text-xs text-white/30">NO ASSETS</span>
                    </div>
                    <div className="flex gap-6 mt-4 text-xs text-white/40">
                      <span>Stablecoins 0%</span>
                      <span>Altcoins 0%</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-6">
  <div className="w-32 h-32 shrink-0">
    <Doughnut data={chartData} options={options}  className='cursor-pointer'/>
  </div>
  <div className="flex flex-col gap-2 flex-1">
    {allocation.map(a => (
      <div key={a.label} className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: a.color }} />
          <span className="text-white/70">{a.label}</span>
        </div>
        <span className="font-medium">{a.percent}%</span>
      </div>
    ))}
  </div>
</div>
                  </div>
                )}
              </div>
  )
}

export default AssetAllocation