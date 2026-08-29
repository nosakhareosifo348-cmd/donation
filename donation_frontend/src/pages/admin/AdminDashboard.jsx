import { useEffect, useState } from 'react'
import { DollarSign, MessageSquare, Mail, TrendingUp } from 'lucide-react'
import api from '../../services/api'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-secondary font-heading">{value ?? '—'}</div>
        <div className="text-gray-500 text-sm">{label}</div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentDonations, setRecentDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.getDonationStats(), api.getDonations('?limit=5')])
      .then(([s, d]) => { setStats(s.data); setRecentDonations(d.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary font-heading mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={TrendingUp} label="Total Raised" value={`$${stats?.totalRaised?.toLocaleString() ?? 0}`} color="bg-primary" />
        <StatCard icon={DollarSign} label="Total Donations" value={stats?.totalDonations} color="bg-secondary" />
        <StatCard icon={DollarSign} label="Completed" value={stats?.completedDonations} color="bg-green-500" />
        <StatCard icon={Mail} label="Pending" value={(stats?.totalDonations || 0) - (stats?.completedDonations || 0)} color="bg-accent" />
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-secondary font-heading">Recent Donations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Email', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentDonations.map(d => (
                <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-secondary">{d.name}</td>
                  <td className="px-6 py-4 text-gray-500">{d.email}</td>
                  <td className="px-6 py-4 font-bold text-primary">${d.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      d.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      d.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{d.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentDonations.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No donations yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
