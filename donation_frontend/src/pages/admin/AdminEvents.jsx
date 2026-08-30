import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Loader2, X, Calendar, MapPin } from 'lucide-react'
import api from '../../services/api'

const empty = { title: '', description: '', date: '', location: '', imageUrl: '', status: 'upcoming' }

export default function AdminEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = () => api.getEvents().then(r => setEvents(r.data)).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(empty); setError(''); setModal(true) }
  const openEdit = (ev) => { setEditing(ev); setForm({ ...ev, date: ev.date?.slice(0, 10) }); setError(''); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      if (editing) await api.updateEvent(editing._id, form)
      else await api.createEvent(form)
      setModal(false)
      load()
    } catch (err) { setError(err.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return
    await api.deleteEvent(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-secondary font-heading">Events</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No events yet. Click "Add Event" to create one.</div>
      ) : (
        <div className="grid gap-4">
          {events.map(ev => (
            <div key={ev._id} className="bg-white rounded-sm shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
              <div className="flex gap-4 items-start">
                {ev.imageUrl && <img src={ev.imageUrl} alt="" className="w-16 h-16 object-cover rounded-sm flex-shrink-0" />}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-secondary font-heading">{ev.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ev.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {ev.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{ev.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    {ev.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(ev.date).toLocaleDateString()}</span>}
                    {ev.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(ev)} className="p-2 text-gray-400 hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(ev._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-secondary font-heading">{editing ? 'Edit Event' : 'New Event'}</h2>
              <button onClick={() => setModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {[
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'date', label: 'Date', type: 'date', required: true },
                { name: 'location', label: 'Location', type: 'text' },
                { name: 'imageUrl', label: 'Image URL', type: 'url' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}{f.required && ' *'}</label>
                  <input type={f.type} value={form[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    required={f.required}
                    className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 text-center text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm disabled:opacity-60">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
