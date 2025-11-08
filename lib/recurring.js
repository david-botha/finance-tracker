import { getTransactions, saveTransactions } from './storage'

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
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(RECURRING_KEY, JSON.stringify(transactions))
  } catch (error) {
    console.error('Error saving recurring transactions to localStorage: ', error)
    return
  }
}

// Takes the data from a recurring transaction and the last date it triggered
// Returns the next date that transaction will trigger
export const getNextOccurence = (recurringTransaction, lastOccurence) => {
  const { frequency, startDate, endDate } = recurringTransaction

  // If the transaction is new, start from the startDate
  let occurence = new Date(lastOccurence || startDate)

  switch (frequency) {
    case 'daily':
      occurence.setDate(occurence.getDate() + 1)
      break
    case 'weekly':
      occurence.setDate(occurence.getDate() + 7)
      break
    case 'monthly':
      occurence.setMonth(occurence.getMonth() + 1)
      break
    case 'quarterly':
      occurence.setMonth(occurence.getMonth() + 3)
      break
    case 'yearly':
      occurence.setFullYear(occurence.getFullYear() + 1)
      break
    default:
      console.error(`Unknown frequency: ${frequency}`)
      return null
  }

  // Does the newly calculated date exceed the end date?
  if (endDate && occurence > new Date(endDate)) {
    return null
  }

  return occurence.toISOString().split('T')[0]
}

// Takes the data from a recurring transaction, a start date, and an end date
// Returns an array of the transaction objects between the two dates
export const generateOccurences = (recurringTransaction, fromDate, toDate) => {
  const transactions = []
  let occurenceDate = recurringTransaction.startDate

  // 'Fast forward' through occurences before fromDate
  while (occurenceDate < fromDate) {
    occurenceDate = getNextOccurence(recurringTransaction, occurenceDate)
    if (!occurenceDate) return []
  }

  // Generate all occurences within the date range
  while (occurenceDate <= toDate) {
    transactions.push({
      id: Date.now(),
      date: occurenceDate,
      description: recurringTransaction.description,
      category: recurringTransaction.category,
      type: recurringTransaction.type,
      amount: recurringTransaction.amount,
    })

    occurenceDate = getNextOccurence(recurringTransaction, occurenceDate)

    if (!occurenceDate) break
  }

  return transactions
}

// Generate 'actual' transactions from recurring transactions
export const processRecurringTransactions = () => {
  const recurringTransactions = getRecurringTransactions()
  const existingTransactions = getTransactions()
  let generatedTransactions = []

  const toDate = new Date().toISOString().split('T')[0]

  recurringTransactions.forEach(transaction => {
    let fromDate = transaction.lastProcessed || transaction.startDate

    // If a recurring transaction hasn't started, don't process it
    if (transaction.startDate > toDate) return

    // Find the next occurence date after the one just processed
    if (transaction.lastProcessed) {
      fromDate = getNextOccurence(transaction, transaction.lastProcessed)
      if (!fromDate) return
    }

    // If the next occurence is in the future
    if (fromDate > toDate) return

    const newTransactions = generateOccurences(transaction, fromDate, toDate)

    // Only update lastProcessed if we generated new transactions
    if (newTransactions.length > 0) {
      const lastProcessedDate = newTransactions[newTransactions.length - 1].date
      transaction.lastProcessed = lastProcessedDate
      generatedTransactions = [...generatedTransactions, ...newTransactions]
    }
  })

  saveTransactions([...existingTransactions, ...generatedTransactions])
  saveRecurringTransactions(recurringTransactions)
}
