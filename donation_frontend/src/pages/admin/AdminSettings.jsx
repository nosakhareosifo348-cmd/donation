import { useState, useEffect } from 'react'
import { Save, Phone, Bitcoin, Loader2, Lock } from 'lucide-react'
import { FacebookIcon, TelegramIcon, InstagramIcon } from '../../components/SocialIcons'
import api from '../../services/api'

export default function AdminSettings() {
  const [form, setForm] = useState({
    phone: '', email: '', address: '',
    btcAddress: '', ethAddress: '', usdtAddress: '',
    facebookUrl: '', telegramUrl: '', instagramUrl: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwSuccess, setPwSuccess] = useState(false)
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    api.getSettings()
      .then(res => setForm(res.data))
      .catch(() => setError('Failed to load settings'))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError('')
    try {
      await api.updateSettings(form)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary font-heading mb-8">Settings</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">

        {/* Contact Info */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-secondary font-heading mb-5 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" /> Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="+1 (800) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="info@givehope.it.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Physical Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={2}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                placeholder="123 Charity Lane, New York, NY 10001, USA" />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-secondary font-heading mb-1 flex items-center gap-2">
            <FacebookIcon className="w-5 h-5 text-primary" /> Social Media Links
          </h2>
          <p className="text-xs text-gray-500 mb-5">These appear in the header and footer of your website.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <FacebookIcon className="w-4 h-4 text-blue-600" /> Facebook URL
              </label>
              <input name="facebookUrl" value={form.facebookUrl} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="https://facebook.com/yourpage" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <TelegramIcon className="w-4 h-4 text-sky-500" /> Telegram URL
              </label>
              <input name="telegramUrl" value={form.telegramUrl} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="https://t.me/yourchannel" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <InstagramIcon className="w-4 h-4 text-pink-500" /> Instagram URL
              </label>
              <input name="instagramUrl" value={form.instagramUrl} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="https://instagram.com/yourprofile" />
            </div>
          </div>
        </div>

        {/* Crypto Wallets */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-secondary font-heading mb-1 flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-primary" /> Crypto Wallet Addresses
          </h2>
          <p className="text-xs text-gray-500 mb-5">These will appear on the Donate page for crypto donations.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 bg-orange-500 rounded-full inline-block" /> Bitcoin (BTC)
              </label>
              <input name="btcAddress" value={form.btcAddress} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary"
                placeholder="bc1q..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 bg-blue-500 rounded-full inline-block" /> Ethereum (ETH)
              </label>
              <input name="ethAddress" value={form.ethAddress} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary"
                placeholder="0x..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 bg-green-500 rounded-full inline-block" /> USDT Tether (TRC20)
              </label>
              <input name="usdtAddress" value={form.usdtAddress} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary"
                placeholder="T... or 0x..." />
            </div>
          </div>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm text-sm">
            ✅ Settings saved successfully.
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
            {error}
          </div>
        )}

        <button type="submit" disabled={saving}
          className="btn-primary flex items-center gap-2 disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={async e => {
        e.preventDefault()
        if (pwForm.newPassword !== pwForm.confirm) { setPwError('Passwords do not match'); return }
        setPwSaving(true); setPwError(''); setPwSuccess(false)
        try {
          await api.post('/auth/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
          setPwSuccess(true)
          setPwForm({ currentPassword: '', newPassword: '', confirm: '' })
          setTimeout(() => setPwSuccess(false), 3000)
        } catch (err) { setPwError(err.message || 'Failed to change password') }
        finally { setPwSaving(false) }
      }} className="max-w-2xl mt-6">
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-secondary font-heading mb-5 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" /> Change Password
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
              <input type="password" value={pwForm.currentPassword} onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="Enter current password" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
              <input type="password" value={pwForm.newPassword} onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="Enter new password (min 8 characters)" required minLength={8} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" value={pwForm.confirm} onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="Repeat new password" required />
            </div>
          </div>
          {pwSuccess && <p className="text-green-600 text-sm mt-3">✅ Password changed successfully.</p>}
          {pwError && <p className="text-red-600 text-sm mt-3">{pwError}</p>}
          <button type="submit" disabled={pwSaving} className="btn-primary flex items-center gap-2 mt-5 disabled:opacity-60">
            {pwSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {pwSaving ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  )
}
