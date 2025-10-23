'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

const TransactionForm = ({ addTransaction, onClose }) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')

  const handleDateChange = e => setDate(e.target.value)
  const handleDescriptionChange = e => setDescription(e.target.value)
  const handleCategoryChange = e => setCategory(e.target.value)
  const handleTypeChange = e => setType(e.target.value)
  const handleAmountChange = e => {
    const value = e.target.value

    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!date || !description || !category || !amount) return

    const newTransaction = {
      id: Date.now(),
      date,
      description,
      category,
      type,
      amount: type === 'expense' ? -parseFloat(amount) : parseFloat(amount),
    }

    addTransaction(newTransaction)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date */}
      <div className="space-y-1">
        <label htmlFor="date" className="text-sm font-medium block">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={handleDateChange}
          autoComplete="off"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium block">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          autoComplete="off"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label htmlFor="category" className="text-sm font-medium block">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            -- Select a category --
          </option>
          <option value="Income">Income</option>
          <option value="Utilities">Utilities</option>
          <option value="Housing">Housing</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Debt">Debt</option>
          <option value="Insurance">Insurance</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Income or Expense */}
      <div className="space-y-1">
        <span className="text-sm font-medium block">Type</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              id="income"
              type="radio"
              name="transactionType"
              value="income"
              checked={type === 'income'}
              onChange={handleTypeChange}
            />
            <label htmlFor="income" className="text-sm cursor-pointer">
              Income
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="expense"
              type="radio"
              name="transactionType"
              value="expense"
              checked={type === 'expense'}
              onChange={handleTypeChange}
            />
            <label htmlFor="expense" className="text-sm cursor-pointer">
              Expense
            </label>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <label htmlFor="amount" className="text-sm font-medium block">
          Amount
        </label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          autoComplete="off"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
      </div>

      <Button type="submit" className="w-full">
        Add
      </Button>
    </form>
  )
}

export default TransactionForm
