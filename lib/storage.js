const TRANSACTIONS_KEY = 'finance-tracker-transactions'

export const getOpeningBalance = () => {
  if (typeof window === 'undefined') return null

  const balance = localStorage.getItem('openingBalance')

  if (!balance) return null

  try {
    return JSON.parse(balance)
  } catch (error) {
    console.error('Error parsing balance from localStorage: ', error)
    return null
  }
}

export const setOpeningBalance = balance => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('openingBalance', JSON.stringify(balance))
  } catch (error) {
    console.error('Error setting balance in localStorage: ', error)
  }
}

export const getTransactions = () => {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(TRANSACTIONS_KEY)

  // If nothing is stored, return an empty array
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
    window.dispatchEvent(new Event('transactionsUpdated')) // Custom event to notify other components of a change
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error)
  }
}
