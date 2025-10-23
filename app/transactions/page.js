'use client'

import { useState, useMemo } from 'react'
import TransactionList from '@/components/transactions/TransactionList'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }, [transactions])

  const addTransaction = newTransaction => {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction])
  }

  return (
    <div>
      <TransactionList transactions={sortedTransactions} addTransaction={addTransaction} />
    </div>
  )
}

export default Transactions
