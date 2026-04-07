"use client";
// components/transactions/TransactionFull.tsx
import React, { useState } from "react";
import { Download, Plus } from "lucide-react";
import { Transaction, TransactionStats } from "@/types/index";
import { TransactionStatsSection } from "./transactionStats";
import { TransactionTable } from "./transactionTable";
import { exportTransactionsToCSV } from "@/lib/helpers/transactionExport";
import Link from "next/link";
interface TransactionFullProps {
  transactions: Transaction[];
  stats: TransactionStats;
}

export function TransactionFull({ transactions, stats }: TransactionFullProps) {
  const [period, setPeriod] = useState("30");

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Transactions</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <p className="text-white/50 text-sm">
              Live ledger monitoring active
            </p>
          </div>
        </div>
        <button
          onClick={() => exportTransactionsToCSV(transactions)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats */}
      <TransactionStatsSection
        stats={stats}
        period={period}
        onPeriodChange={setPeriod}
      />

      {/* Table */}
      <TransactionTable transactions={transactions} />

      {/* FAB */}
      <Link href={'/settings/integrations'}>
        <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-black flex items-center justify-center shadow-lg transition-colors z-20 cursor-pointer">
          <Plus className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
}
