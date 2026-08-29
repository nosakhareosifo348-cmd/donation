import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Loader2, Copy, Check } from 'lucide-react'
import api from '../services/api'
import { useSettings } from '../context/SettingsContext'

const amounts = [500, 1000, 2500, 5000]

function PageBanner({ title, breadcrumb }) {
  return (
    <div
      className="relative py-24 flex items-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-secondary/85" />
      <div className="container-custom relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">{title}</h1>
        <nav className="flex items-center gap-2 text-sm text-white/70">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>-</span>
          <span className="text-primary">{breadcrumb}</span>
        </nav>
      </div>
    </div>
  )
}

export default function Donate() {
  const [selected, setSelected] = useState(1000)
  const [custom, setCustom] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', address: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')
  const settings = useSettings()

  const copyAddress = (addr, key) => {
    navigator.clipboard.writeText(addr)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const finalAmount = isCustom ? (parseFloat(custom) || 0) : selected

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.createDonation({ ...form, amount: finalAmount, currency: 'USD' })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageBanner title="Donation" breadcrumb="Donation" />

      {/* Main Donate Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — Info */}
            <div className="lg:col-span-2">
              <p className="section-subtitle">Make A Donation</p>
              <h2 className="section-title mb-6">We Need Donations</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every donation counts. Join hands with us to address urgent needs and create a positive impact on a global scale. Your generosity transforms lives.
              </p>

              {/* Progress */}
              <div className="bg-white rounded-sm p-6 shadow-md mb-8">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-3xl font-bold text-secondary font-heading">$75,000</div>
                    <div className="text-sm text-gray-500">Total Raised</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">117%</div>
                    <div className="text-sm text-gray-500">of $63,971 goal</div>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center font-medium text-primary">Goal Exceeded! Thank you to all our donors.</p>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-sm p-6 shadow-md">
                <h4 className="font-bold text-secondary font-heading mb-4 text-lg">Crypto Donations</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Send crypto directly to any of these wallet addresses:
                </p>
                <div className="space-y-3">
                  {[
                    { key: 'btc', label: 'Bitcoin (BTC)', color: 'bg-orange-500', addr: settings?.btcAddress },
                    { key: 'eth', label: 'Ethereum (ETH)', color: 'bg-blue-500', addr: settings?.ethAddress },
                    { key: 'usdt', label: 'USDT Tether (TRC20)', color: 'bg-green-500', addr: settings?.usdtAddress },
                  ].map(({ key, label, color, addr }) => addr ? (
                    <div key={key} className="border border-gray-100 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-3 h-3 rounded-full ${color}`} />
                        <span className="font-semibold text-secondary text-sm">{label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-mono break-all flex-1">{addr}</span>
                        <button
                          onClick={() => copyAddress(addr, key)}
                          className="flex-shrink-0 text-gray-400 hover:text-primary transition-colors"
                          title="Copy address"
                        >
                          {copied === key ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ) : null)}
                  {!settings?.btcAddress && !settings?.ethAddress && !settings?.usdtAddress && (
                    <p className="text-xs text-gray-400 italic">Crypto addresses coming soon.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right — Donation Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-sm shadow-xl p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary font-heading mb-3">Thank You!</h3>
                    <p className="text-gray-600 mb-6">Your donation of <strong className="text-primary">${finalAmount.toLocaleString()}</strong> has been received. We will send a confirmation to your email.</p>
                    <button onClick={() => { setSubmitted(false); setStep(1) }} className="btn-primary">
                      Make Another Donation
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-secondary font-heading mb-2">Empowering Change Through Giving</h3>
                    <p className="text-gray-600 text-sm mb-8">Transforming contributions into global good</p>

                    {/* Steps */}
                    <div className="flex items-center gap-3 mb-8">
                      {[1, 2].map(s => (
                        <div key={s} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {s}
                          </div>
                          <span className={`text-sm font-medium ${step >= s ? 'text-secondary' : 'text-gray-400'}`}>
                            {s === 1 ? 'Amount' : 'Details'}
                          </span>
                          {s < 2 && <div className={`w-16 h-0.5 ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />}
                        </div>
                      ))}
                    </div>

                    {step === 1 ? (
                      <div>
                        <p className="font-semibold text-secondary mb-4 text-sm uppercase tracking-wide">Amount to Donate</p>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {amounts.map(amt => (
                            <button
                              key={amt}
                              onClick={() => { setSelected(amt); setIsCustom(false); setCustom('') }}
                              className={`px-6 py-3 rounded-sm border-2 font-bold text-sm transition-all ${
                                !isCustom && selected === amt
                                  ? 'bg-primary border-primary text-white'
                                  : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                              }`}
                            >
                              ${amt.toLocaleString()}
                            </button>
                          ))}
                        </div>

                        {/* Amount input always visible */}
                        <div className="relative mb-4">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                          <input
                            type="number"
                            value={isCustom ? custom : selected}
                            onChange={e => { setIsCustom(true); setCustom(e.target.value) }}
                            onFocus={() => setIsCustom(true)}
                            placeholder="Enter or select amount"
                            className="w-full border-2 border-primary rounded-sm pl-8 pr-4 py-3 text-secondary font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            min="1"
                          />
                        </div>

                        {finalAmount > 0 && (
                          <div className="bg-gray-50 rounded-sm p-4 mb-6 flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Donation Amount:</span>
                            <span className="text-2xl font-bold text-primary font-heading">${finalAmount.toLocaleString()}</span>
                          </div>
                        )}

                        <button
                          onClick={() => finalAmount > 0 && setStep(2)}
                          disabled={finalAmount <= 0}
                          className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue →
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="bg-primary/5 rounded-sm p-4 flex justify-between items-center mb-6">
                          <span className="text-sm text-gray-600">Donating:</span>
                          <span className="text-xl font-bold text-primary">${finalAmount.toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                            <input
                              required
                              type="text"
                              value={form.name}
                              onChange={e => setForm({ ...form, name: e.target.value })}
                              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                            <input
                              required
                              type="email"
                              value={form.email}
                              onChange={e => setForm({ ...form, email: e.target.value })}
                              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                          <input
                            type="text"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
                            placeholder="123 Main St, City, Country"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                          <textarea
                            rows={3}
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                            placeholder="Leave a message of encouragement..."
                          />
                        </div>
                        <div className="flex gap-4">
                          <button type="button" onClick={() => setStep(1)} className="btn-outline border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-700 flex-1 text-center">
                            ← Back
                          </button>
                          <button type="submit" className="btn-primary flex-1 text-center">
                            Donate Now
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
