'use client'

import { useState, useEffect, useMemo } from 'react'
import { getTransactions, saveTransactions } from '@/lib/storage'
import TransactionList from '@/components/transactions/TransactionList'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    setTransactions(getTransactions())
    setIsInitialLoad(false)
  }, [])

  useEffect(() => {
    if (!isInitialLoad) {
      saveTransactions(transactions)
    }
  }, [transactions, isInitialLoad])

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

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
      )
    )
  }

  return (
    <div>
      <TransactionList
        transactions={sortedTransactions}
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    </div>
  )
}

export default Transactions
