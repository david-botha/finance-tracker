'use client'

import { useState } from 'react'
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown } from 'lucide-react'

const BalanceSummary = () => {
  const [balance, setBalance] = useState(7456.3)
  const [monthlyIncome, setMonthlyIncome] = useState(2940.5)
  const [monthlyExpenses, setMonthlyExpenses] = useState(10806.75)

  const netChange = monthlyIncome - monthlyExpenses

  return (
    <div className="bg-[#fffeff] rounded-3xl p-8 transition-all duration-300 border-2 border-gray-200 shadow-sm m-8">
      {/* Main Balance */}
      <div className="text-left mb-12 pb-8 border-b-2 border-gray-200">
        <p className="text-gray-600 text-sm font-medium tracking-wide mb-3 uppercase">
          Current Balance
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-gray-600 text-xl font-medium">R</span>
          <h1 className="text-5xl font-semibold tracking-tight text-gray-700">
            {balance.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income */}
        <div className="group p-6 rounded-2xl border-2 border-green-200 bg-green-50 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
              <ArrowUpCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-700 text-sm font-semibold">Income</p>
          </div>
          <h2 className="text-2xl font-semibold text-green-600 tracking-tight">
            +R{monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
        </div>

        {/* Expenses */}
        <div className="group p-6 rounded-2xl border-2 border-red-200 bg-red-50 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
              <ArrowDownCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-gray-700 text-sm font-semibold">Expenses</p>
          </div>
          <h2 className="text-2xl font-semibold text-red-600 tracking-tight">
            -R{monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
        </div>

        {/* Net Change */}
        <div
          className={`group p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md
          ${
            netChange >= 0
              ? 'border-green-200 bg-green-50 hover:border-green-300'
              : 'border-red-200 bg-red-50 hover:border-red-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-full transition-colors
              ${
                netChange >= 0
                  ? 'bg-green-100 group-hover:bg-green-200'
                  : 'bg-red-100 group-hover:bg-red-200'
              }`}
            >
              {netChange >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
            <p className="text-gray-700 text-sm font-semibold">Net Change</p>
          </div>
          <h2
            className={`text-2xl font-semibold tracking-tight transition-colors
            ${netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {netChange >= 0 ? '+' : '-'}R
            {Math.abs(netChange).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default BalanceSummary
