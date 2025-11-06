'use client'

import { useState, useEffect } from 'react'
import { getOpeningBalance } from '@/lib/storage'
import WelcomeScreen from '@/components/onboarding/WelcomeScreen'
import BalanceSummary from '@/components/dashboard/BalanceSummary'
import RecentTransactions from '@/components/dashboard/RecentTransactions'

const Home = () => {
  const [hasBalance, setHasBalance] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for opening balance after component mounts
  useEffect(() => {
    setHasBalance(getOpeningBalance() !== null)
    setIsLoading(false)
  }, [])

  // Prevent hydration error by returning nothing until the client-side check is done
  if (isLoading) {
    return null
  }

  if (!hasBalance) {
    return <WelcomeScreen onComplete={() => setHasBalance(true)} />
  }

  return (
    <div>
      <BalanceSummary />
      <RecentTransactions />
    </div>
  )
}

export default Home
