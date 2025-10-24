'use client'

const TRANSACTIONS_KEY = 'finance-tracker-transactions'

export const getTransactions = () => {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(TRANSACTIONS_KEY)

  // If nothing is stored, return empty array
  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error parsing transactions from localStorage:', error)
    return []
  }
}

export const saveTransactions = transactions => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error)
  }
}
