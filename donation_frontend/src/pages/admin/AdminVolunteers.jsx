import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import api from '../../services/api'

const statusColors = { pending: 'bg-yellow-100 text-yellow-700', approved: 'bg-green-100 text-green-700', declined: 'bg-red-100 text-red-600' }

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const load = () => api.getVolunteers(filter !== 'all' ? `?status=${filter}` : '').then(r => setVolunteers(r.data)).finally(() => setLoading(false))

  useEffect(() => { load() }, [filter])

  const changeStatus = async (id, status) => {
    await api.updateVolunteerStatus(id, status)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-secondary font-heading">Volunteers</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'declined'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : volunteers.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No volunteer applications yet.</div>
      ) : (
        <div className="grid gap-4">
          {volunteers.map(v => (
            <div key={v._id} className="bg-white rounded-sm shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-secondary font-heading">{v.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[v.status]}`}>{v.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{v.email} {v.phone && `• ${v.phone}`}</p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{v.interest}</span>
                    <span>{v.availability}</span>
                    <span>{new Date(v.createdAt).toLocaleDateString()}</span>
                  </div>
                  {v.message && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{v.message}</p>}
                </div>
                {v.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => changeStatus(v._id, 'approved')}
                      className="px-3 py-1.5 text-xs font-semibold bg-green-100 text-green-700 rounded-sm hover:bg-green-200 transition-colors">
                      Approve
                    </button>
                    <button onClick={() => changeStatus(v._id, 'declined')}
                      className="px-3 py-1.5 text-xs font-semibold bg-red-100 text-red-600 rounded-sm hover:bg-red-200 transition-colors">
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
