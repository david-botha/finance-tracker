'use client'

import { useState, useEffect, useMemo } from 'react'
import { getRecurringTransactions, saveRecurringTransactions } from '@/lib/recurring'
import RecurringTransactionList from '@/components/recurring/RecurringTransactionList'

const RecurringTransactions = () => {
  const [recurringTransactions, setRecurringTransactions] = useState([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    setRecurringTransactions(getRecurringTransactions())
    setIsInitialLoad(false)
  }, [])

  useEffect(() => {
    if (!isInitialLoad) {
      saveRecurringTransactions(recurringTransactions)
    }
  }, [recurringTransactions, isInitialLoad])

  const sortedTransactions = useMemo(() => {
    return [...recurringTransactions].sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate)
    })
  }, [recurringTransactions])

  const addTransaction = transaction => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() }
    setRecurringTransactions(prevTransactions => [...prevTransactions, newTransaction])
  }

  return (
    <div>
      <RecurringTransactionList recurringTransactions={sortedTransactions} addTransaction={addTransaction} />
    </div>
  )
}

export default RecurringTransactions
