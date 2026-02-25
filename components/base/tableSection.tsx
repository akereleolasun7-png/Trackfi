'use client';

import React from 'react';
import Link from 'next/link';
import { QrCode, ArrowRight } from 'lucide-react';
import { tables } from '@/lib/constants/landing';
import { useGsapFadeUp, useGsapScaleFade } from '@/hooks/useGsapAnimation';
const DEMO_TABLES = [
  { id: 1, number: '01', status: 'occupied' },
  { id: 2, number: '02', status: 'active' },
  { id: 3, number: '03', status: 'vacant' },
  { id: 4, number: '04', status: 'vacant' },
  { id: 5, number: '05', status: 'occupied' },
  { id: 6, number: '06', status: 'vacant' },
];

const STATUS_COLORS = {
  occupied: 'bg-gray-300',
  active: 'bg-[#16A34A]',
  vacant: 'bg-gray-200',
};

export default function TablesSection() {
  const headerRef = useGsapFadeUp();
  const cardRef = useGsapScaleFade({ delay: 0.2 });
  return (
    <section id="tables" className="py-10 px-4 bg-white">
      <div className="max-w-sm mx-auto lg:max-w-2xl">

        {/* Header */}
         <div ref={headerRef} className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tables.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">Interactive tables connecting guests to the kitchen instantly.</p>
          </div>
          <Link
            href="/tables"
            className="text-xs font-semibold text-[#16A34A] hover:underline flex items-center gap-1"
          >
            Live View <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Table grid card */}
        <div ref={cardRef} className="bg-gray-50 rounded-3xl border border-gray-200 p-6 shadow-sm">

          {/* Static grid - no click */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {DEMO_TABLES.map((table) => (
              <div
                key={table.id}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 bg-white ${
                  table.status === 'active'
                    ? 'border-[#16A34A] shadow-[0_0_12px_rgba(22,163,74,0.3)]'
                    : 'border-gray-200'
                }`}
              >
                <span className="text-xs text-gray-400 font-medium mb-2">{table.number}</span>
                <div className={`w-8 h-8 rounded-full ${STATUS_COLORS[table.status as keyof typeof STATUS_COLORS]} flex items-center justify-center`}>
                  {table.status === 'active' && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Static active table detail */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-gray-900 rounded-xl p-3 flex items-center justify-center shrink-0">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Table 02 Menu</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">{tables.tableName}</p>
            </div>
            <Link
              href="/tables"
              className="shrink-0 w-9 h-9 rounded-full bg-[#16A34A] flex items-center justify-center hover:bg-[#15803D] transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 justify-center">
            {['occupied', 'vacant', 'active'].map((status) => (
              <div key={status} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}`} />
                <span className="text-xs text-gray-400 capitalize">{status}</span>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}