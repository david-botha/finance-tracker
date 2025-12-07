'use client'

import { useState } from 'react'
import { Calendar, RefreshCw, Tag, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import RecurringTransactionForm from './RecurringTransactionForm'

const RecurringTransactionList = ({ recurringTransactions, addTransaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="bg-[#fffeff] rounded-3xl p-8 transition-all duration-300 border-2 border-gray-200 shadow-sm m-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-gray-800 font-semibold">Recurring Transactions</h1>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="size-5" />
          Add Recurring Transaction
        </Button>
      </div>

      {recurringTransactions.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {recurringTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300"
            >
              {/* Header - Description and Amount */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {transaction.description}
                </h3>
                <div
                  className={`text-2xl font-bold tracking-tight ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}R
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-gray-500" />
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    {transaction.category}
                  </span>
                </div>

                {/* Frequency */}
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">
                    {transaction.frequency.charAt(0).toUpperCase() + transaction.frequency.slice(1)}
                  </span>
                </div>

                {/* Start Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-gray-500" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Start: </span>
                    {new Date(transaction.startDate).toISOString().split('T')[0]}
                  </div>
                </div>

                {/* End Date */}
                {transaction.endDate && (
                  <div className="flex items-center gap-2 pl-6">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">End: </span>
                      {new Date(transaction.endDate).toISOString().split('T')[0]}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <RefreshCw className="size-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No recurring transactions yet
            </h3>
            <p className="text-gray-500">
              Add your first recurring transaction to automate regular income or expenses
            </p>
          </div>
        </div>
      )}

      {/* Modal for Adding Recurring Transactions */}
      <Modal isOpen={isModalOpen} onClose={handleClose} title="Add Recurring Transaction">
        <RecurringTransactionForm addTransaction={addTransaction} onClose={handleClose} />
      </Modal>
    </div>
  )
}

export default RecurringTransactionList
