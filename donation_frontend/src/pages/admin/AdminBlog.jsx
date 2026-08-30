import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react'
import api from '../../services/api'

const empty = { title: '', excerpt: '', content: '', imageUrl: '', status: 'draft' }

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = () => api.getPosts().then(r => setPosts(r.data)).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(empty); setError(''); setModal(true) }
  const openEdit = async (post) => {
    const full = await api.getPostById(post._id)
    setEditing(full.data); setForm(full.data); setError(''); setModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      if (editing) await api.updatePost(editing._id, form)
      else await api.createPost(form)
      setModal(false)
      load()
    } catch (err) { setError(err.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return
    await api.deletePost(id)
    load()
  }

  const togglePublish = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    await api.updatePost(post._id, { ...post, status: newStatus })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-secondary font-heading">Blog / News</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No posts yet. Click "New Post" to write one.</div>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-sm shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
              <div className="flex gap-4 items-start">
                {post.imageUrl && <img src={post.imageUrl} alt="" className="w-16 h-16 object-cover rounded-sm flex-shrink-0" />}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-secondary font-heading">{post.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {post.status}
                    </span>
                  </div>
                  {post.excerpt && <p className="text-gray-600 text-sm line-clamp-2 mb-2">{post.excerpt}</p>}
                  <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0 items-center">
                <button onClick={() => togglePublish(post)}
                  className={`text-xs px-3 py-1.5 rounded-sm border font-medium transition-colors ${post.status === 'published' ? 'border-yellow-300 text-yellow-600 hover:bg-yellow-50' : 'border-green-300 text-green-600 hover:bg-green-50'}`}>
                  {post.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => openEdit(post)} className="p-2 text-gray-400 hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(post._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-secondary font-heading">{editing ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt (short summary)</label>
                <input type="text" value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="Brief description shown in the list" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image URL</label>
                <input type="url" value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Content *</label>
                <textarea rows={10} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} required
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none font-mono"
                  placeholder="Write your post content here..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
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
