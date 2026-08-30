import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import api from '../../services/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.login(form)
      localStorage.setItem('gh_token', res.token)
      navigate('/gh-control/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 shadow-lg rounded-full">
            <circle cx="32" cy="32" r="32" fill="#1a3c5e"/>
            <path d="M10 42 C10 36 14 32 20 30 L20 44 C16 46 12 46 10 42Z" fill="white" opacity="0.9"/>
            <path d="M54 42 C54 36 50 32 44 30 L44 44 C48 46 52 46 54 42Z" fill="white" opacity="0.9"/>
            <path d="M18 38 Q32 50 46 38 L46 44 Q32 56 18 44 Z" fill="white" opacity="0.9"/>
            <path d="M32 36 C32 36 22 28 22 22 C22 18 25 16 28 16 C30 16 32 18 32 18 C32 18 34 16 36 16 C39 16 42 18 42 22 C42 28 32 36 32 36Z" fill="#e8532a"/>
          </svg>
          <h1 className="text-2xl font-bold text-secondary font-heading">GiveHope Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your dashboard</p>
        </div>

        <div className="bg-white rounded-sm shadow-xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
                placeholder="Your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
