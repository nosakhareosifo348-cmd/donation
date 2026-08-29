import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.getMessages('?limit=50')
      .then(res => setMessages(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const openMessage = async (msg) => {
    setSelected(msg)
    if (!msg.isRead) {
      try {
        await api.markAsRead(msg._id)
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m))
      } catch (e) { console.error(e) }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary font-heading mb-6">Contact Messages</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden lg:col-span-1">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No messages yet.</div>
          ) : messages.map(m => (
            <button
              key={m._id}
              onClick={() => openMessage(m)}
              className={`w-full text-left px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${selected?._id === m._id ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-semibold ${!m.isRead ? 'text-secondary' : 'text-gray-500'}`}>{m.name}</span>
                {!m.isRead && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
              </div>
              <div className="text-xs text-gray-500 truncate">{m.subject}</div>
              <div className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleDateString()}</div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 lg:col-span-2">
          {selected ? (
            <>
              <h2 className="font-bold text-secondary font-heading text-lg mb-1">{selected.subject}</h2>
              <div className="text-sm text-gray-500 mb-1">From: <strong>{selected.name}</strong> ({selected.email})</div>
              <div className="text-xs text-gray-400 mb-5">{new Date(selected.createdAt).toLocaleString()}</div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm border-t border-gray-100 pt-5">{selected.message}</div>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary mt-6 inline-flex items-center gap-2 text-xs">
                Reply via Email
              </a>
            </>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              Select a message to read it
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
