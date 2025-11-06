'use client'

import { useState } from 'react'
import { Wallet, Sparkles } from 'lucide-react'
import { setOpeningBalance } from '@/lib/storage'

const WelcomeScreen = ({ onComplete }) => {
  const [balance, setBalance] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setError('')

    const parsedBalance = parseFloat(balance)

    if (isNaN(parsedBalance)) {
      setError('Please enter a valid number')
      return
    }

    if (parsedBalance < 0) {
      setError('Balance cannot be negative')
      return
    }

    setOpeningBalance(parsedBalance)

    // Once submitted, trigger 'setHasBalance(true)' in the parent
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-12 max-w-2xl w-full">
        {/* Header*/}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg">
            <Wallet className="size-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            Welcome to Finance Tracker
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Set your starting balance to begin
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Input */}
          <div>
            <label
              htmlFor="opening-balance"
              className="block text-gray-700 text-sm font-semibold mb-3 uppercase tracking-wide"
            >
              Opening Balance
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-2xl font-semibold">
                R
              </span>
              <input
                id="opening-balance"
                type="number"
                step="0.01"
                value={balance}
                onChange={e => setBalance(e.target.value)}
                placeholder="0.00"
                className={`w-full pl-14 pr-6 py-4 text-2xl font-semibold rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
                  error
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
                autoFocus
              />
            </div>
            {/* If there's an error, show it */}
            {error && (
              <p className="mt-2 text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="inline-block size-1 rounded-full bg-red-600"></span>
                {error}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
}

export default WelcomeScreen
