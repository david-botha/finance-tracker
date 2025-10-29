'use client'

import { useState, useEffect, useMemo } from 'react'
import TransactionList from '@/components/transactions/TransactionList'
import { getTransactions, saveTransactions } from '@/lib/storage'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    setTransactions(getTransactions())
  }, [])

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }, [transactions])

  const addTransaction = transaction => {
    const newTransaction = { ...transaction, id: Date.now().toString() }
    setTransactions(prevTransactions => [...prevTransactions, newTransaction])
  }

  const deleteTransaction = id => {
    setTransactions(prevTransactions =>
      prevTransactions.filter(transaction => transaction.id !== id)
    )
  }

  return (
    <div>
      <TransactionList
        transactions={sortedTransactions}
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
      />
    </div>
  )
}

export default Transactions
