'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTransactions } from '@/lib/storage'
import { Calendar, FileText, Tag, HandCoins, ArrowRight } from 'lucide-react'

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const loadedTransactions = getTransactions()
    setTransactions(loadedTransactions)
  }, [])

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="bg-[#fffeff] rounded-3xl p-8 transition-all duration-300 border-2 border-gray-200 shadow-sm m-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600 text-sm font-medium tracking-wide uppercase">
          Recent Transactions
        </p>
        <Link
          href="/transactions"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
        >
          View All
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-6 border-b-2 border-gray-200 font-semibold text-gray-700 bg-gray-50 rounded-t-xl select-none">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            Date
          </div>
          <div className="flex items-center gap-2">
            <FileText className="size-4" />
            Description
          </div>
          <div className="flex items-center gap-2">
            <Tag className="size-4" />
            Category
          </div>
          <div className="flex items-center gap-2">
            <HandCoins className="size-4" />
            Amount
          </div>
        </div>

        {/* Table Rows */}
        {recentTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`grid grid-cols-4 gap-4 p-6 items-center group transition-all duration-300 hover:bg-gray-50 ${
              index === recentTransactions.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100'
            }`}
          >
            <div className="text-gray-600 font-medium">
              {new Date(transaction.date).toISOString().split('T')[0]}
            </div>
            <div className="text-gray-700 font-medium">{transaction.description}</div>
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200">
                {transaction.category}
              </span>
            </div>
            <div
              className={`text-lg font-semibold tracking-tight ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}R{Math.abs(transaction.amount).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="size-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No transactions yet</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentTransactions
