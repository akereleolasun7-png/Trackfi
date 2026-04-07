'use client'
import React from 'react'
import { useTransactions, useTransactionStats } from '@/lib/query/transactions'
import { TransactionFull } from '@/components/transactions/transactionFull'
import TransactionEmpty from '@/components/transactions/transactionEmpty'
import { DashboardSkeleton } from '@/components/common/skeleton'
import { toast } from 'sonner'
 
export default function TransactionsPage() {
  const { data: transactions = [], isLoading, isError } = useTransactions()
  const { data: stats, isLoading: statsLoading } = useTransactionStats()
 
  React.useEffect(() => {
    if (isError) toast.error('Failed to load transactions')
  }, [isError])
 
  if (isLoading || statsLoading) return <DashboardSkeleton />
 
  if (!transactions.length || !stats) return <TransactionEmpty />
 
  return <TransactionFull transactions={transactions} stats={stats} />
}
 