'use client'

import { useState } from 'react'
import { Edit3, Trash2, Calendar, Tag, FileText, HandCoins, Wrench, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'

const TransactionList = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2025-10-12',
      description: 'Grocery Shopping',
      category: 'Food',
      amount: -245.75,
    },
    {
      id: 2,
      date: '2025-10-10',
      description: 'Salary Deposit',
      category: 'Income',
      amount: 2940.5,
    },
    {
      id: 3,
      date: '2025-10-01',
      description: 'Electricity Bill',
      category: 'Utilities',
      amount: -156.3,
    },
    {
      id: 4,
      date: '2025-10-01',
      description: 'Freelance Work',
      category: 'Income',
      amount: 850.0,
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-[#fffeff] rounded-3xl p-8 transition-all duration-300 border-2 border-gray-200 shadow-sm m-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-gray-800 font-semibold">Transactions</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="size-5" />
          Add Transaction
        </Button>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 p-6 border-b-2 border-gray-200 font-semibold text-gray-700 bg-gray-50 rounded-t-xl">
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
          <div className="flex items-center gap-2">
            <Wrench className="size-4" />
            Actions
          </div>
        </div>

        {/* Rows */}
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`grid grid-cols-5 gap-4 p-6 items-center group transition-all duration-300 hover:bg-gray-50 ${
              index === transactions.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100'
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
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.amount > 0 ? '+' : '-'}R{Math.abs(transaction.amount).toFixed(2)}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="edit" aria-label="Edit transaction">
                <Edit3 className="size-4" />
              </Button>
              <Button variant="delete" aria-label="Delete transaction">
                <Trash2 className="size-4" />
              </Button>
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
            <p className="text-gray-500">Add your first transaction to get started</p>
          </div>
        )}
      </div>

      {/* Modal for Adding Transactions */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Transaction"
      ></Modal>
    </div>
  )
}

export default TransactionList
