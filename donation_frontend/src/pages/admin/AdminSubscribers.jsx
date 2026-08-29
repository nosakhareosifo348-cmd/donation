import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getSubscribers()
      .then(res => { setSubscribers(res.data); setPagination(res.pagination) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary font-heading">Newsletter Subscribers</h1>
        {pagination.total > 0 && (
          <span className="text-sm text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-sm">
            {pagination.total} active subscribers
          </span>
        )}
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['#', 'Email', 'Subscribed On', 'Status'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : subscribers.map((s, i) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-secondary">{s.email}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.isActive ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                </tr>
              ))}
              {!loading && subscribers.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No subscribers yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
