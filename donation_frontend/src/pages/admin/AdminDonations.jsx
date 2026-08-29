import { useEffect, useState } from 'react'
import api from '../../services/api'

const STATUS_COLORS = {
  COMPLETED: 'bg-green-100 text-green-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  FAILED: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-600',
}

export default function AdminDonations() {
  const [donations, setDonations] = useState([])
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getDonations(`?page=${page}&limit=15`)
      .then(res => { setDonations(res.data); setPagination(res.pagination) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page])

  const markCompleted = async (id) => {
    try {
      await api.updateDonationStatus(id, { status: 'COMPLETED' })
      setDonations(prev => prev.map(d => d._id === id ? { ...d, status: 'COMPLETED' } : d))
    } catch (e) { console.error(e) }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary font-heading mb-6">Donations</h1>
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Email', 'Amount', 'Message', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : donations.map(d => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-secondary whitespace-nowrap">{d.name}</td>
                  <td className="px-5 py-4 text-gray-500">{d.email}</td>
                  <td className="px-5 py-4 font-bold text-primary whitespace-nowrap">${d.amount.toLocaleString()} {d.currency}</td>
                  <td className="px-5 py-4 text-gray-500 max-w-[180px] truncate">{d.message || '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    {d.status === 'PENDING' && (
                      <button onClick={() => markCompleted(d._id)} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors font-semibold">
                        Mark Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && donations.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">No donations yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Page {pagination.page} of {pagination.pages} — {pagination.total} total</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 text-sm border rounded-sm disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <button disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 text-sm border rounded-sm disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
