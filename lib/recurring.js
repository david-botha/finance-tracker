'use client'

const RECURRING_KEY = 'finance-tracker-recurring'

export const getRecurringTransactions = () => {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(RECURRING_KEY)

  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error parsing recurring transactions from localStorage: ', error)
    return []
  }
}

export const saveRecurringTransactions = transactions => {
  if (typeof window === 'undefined') return []

  try {
    localStorage.setItem(RECURRING_KEY, JSON.stringify(transactions))
  } catch (error) {
    console.error('Error saving recurring transactions to localStorage: ', error)
    return []
  }
}
