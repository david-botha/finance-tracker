import BalanceSummary from '@/components/dashboard/BalanceSummary'
import RecentTransactions from '@/components/dashboard/RecentTransactions'

const Home = () => {
  return (
    <div>
      <BalanceSummary />
      <RecentTransactions />
    </div>
  )
}

export default Home
