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
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', anonymous: false })
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
      const name = form.anonymous ? 'Anonymous' : `${form.firstName} ${form.lastName}`.trim()
      await api.createDonation({ name, email: form.anonymous ? 'anonymous@givehope.it.com' : form.email, amount: finalAmount, currency: 'USD' })
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

      {submitted ? (
        <section className="py-24 bg-gray-50">
          <div className="container-custom max-w-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-secondary font-heading mb-3">Thank You!</h3>
            <p className="text-gray-600 mb-6">Your donation of <strong className="text-primary">${finalAmount.toLocaleString()}</strong> has been received. We will send a confirmation to your email.</p>
            <button onClick={() => { setSubmitted(false); setStep(1) }} className="btn-primary">Make Another Donation</button>
          </div>
        </section>

      ) : step === 1 ? (
        /* ── STEP 1: Amount Selection ── */
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="section-subtitle">Make A Donation</p>
              <p className="text-gray-500 text-sm">In order to make an offline donation we ask that you please follow any of these instructions:</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left info panel */}
              <div className="lg:col-span-2 bg-secondary rounded-sm p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 border-b border-white/20 pb-3 mb-6">Payment information</p>
                <h2 className="text-3xl font-bold font-heading mb-4">We Need Donations</h2>
                <p className="text-white/75 text-sm leading-relaxed mb-8">Every donation counts. Join hands with us to address urgent needs and create a positive impact on a global scale.</p>
                <div className="bg-white/10 rounded-sm p-5">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="text-2xl font-bold text-white font-heading">$75,000.00</div>
                      <div className="text-xs text-white/60">Raised 117% of $63,971.86</div>
                    </div>
                    <span className="text-primary font-bold text-lg">117%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="lg:col-span-3 bg-white rounded-sm shadow-lg p-8">
                <p className="text-primary text-sm font-medium mb-1">Empowering Change Through Giving</p>
                <h3 className="text-2xl font-bold text-secondary font-heading mb-1 uppercase tracking-wide">Amount To Donate</h3>
                <p className="text-gray-500 text-sm mb-6">Transforming Crypto and Local Currencies into Global Good</p>

                <div className="flex flex-wrap gap-3 mb-5">
                  {amounts.map(amt => (
                    <button key={amt}
                      onClick={() => { setSelected(amt); setIsCustom(false); setCustom('') }}
                      className={`px-5 py-2.5 rounded-sm border-2 font-bold text-sm transition-all ${
                        !isCustom && selected === amt ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                      }`}>
                      ${amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="relative mb-5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                  <input type="number" min="1"
                    value={isCustom ? custom : selected}
                    onChange={e => { setIsCustom(true); setCustom(e.target.value) }}
                    onFocus={() => setIsCustom(true)}
                    placeholder="Enter amount"
                    className="w-full border-2 border-gray-200 rounded-sm pl-8 pr-4 py-3 text-secondary font-bold focus:outline-none focus:border-primary" />
                </div>

                {finalAmount > 0 && (
                  <p className="text-sm text-gray-500 mb-5">
                    Donation Amount: <strong className="text-primary">${finalAmount.toLocaleString()}</strong>
                  </p>
                )}

                <button onClick={() => finalAmount > 0 && setStep(2)} disabled={finalAmount <= 0}
                  className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed">
                  DONATE NOW
                </button>

                <p className="text-center text-gray-500 text-xs mt-5">Every donation counts. Join hands with us to address urgent needs and create a positive impact on a global scale.</p>
              </div>
            </div>
          </div>
        </section>

      ) : (
        /* ── STEP 2: Complete the Donation Process ── */
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-secondary font-heading mb-2">Complete the Donation Process</h2>
              <p className="text-primary text-sm">In order to make a donation we ask that you please follow any of these instructions:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left — Donation Summary + Crypto Wallets */}
              <div className="space-y-4">
                <div className="bg-white rounded-sm border border-gray-200 p-5 shadow-sm">
                  <h4 className="font-semibold text-secondary mb-4 pb-2 border-b border-gray-100">Donation summary</h4>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Amount</span>
                    <span className="font-bold text-secondary">$ {finalAmount.toLocaleString()}.00</span>
                  </div>
                </div>

                {[
                  { key: 'btc', label: 'Bitcoin (BTC)', color: 'bg-orange-500', addr: settings?.btcAddress },
                  { key: 'eth', label: 'Ethereum (ETH)', color: 'bg-blue-500', addr: settings?.ethAddress },
                  { key: 'usdt', label: 'USDT Tether (TRC20)', color: 'bg-green-500', addr: settings?.usdtAddress },
                ].map(({ key, label, color, addr }) => addr ? (
                  <div key={key} className="bg-white rounded-sm border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-3 h-3 rounded-full ${color}`} />
                      <span className="font-semibold text-secondary text-sm">{label}</span>
                    </div>
                    <div className="bg-gray-50 rounded-sm px-3 py-2 mb-3">
                      <p className="text-xs text-gray-600 font-mono break-all">{addr}</p>
                    </div>
                    <button type="button" onClick={() => copyAddress(addr, key)}
                      className="w-full bg-primary text-white text-sm font-semibold py-2.5 rounded-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors">
                      {copied === key ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Click to Copy Wallet Address</>}
                    </button>
                  </div>
                ) : null)}

                {!settings?.btcAddress && !settings?.ethAddress && !settings?.usdtAddress && (
                  <div className="bg-white rounded-sm border border-gray-200 p-5 text-center text-gray-400 text-sm">
                    Crypto wallet addresses not set yet.
                  </div>
                )}
              </div>

              {/* Right — Billing Details */}
              <div className="bg-white rounded-sm border border-gray-200 p-6 shadow-sm">
                <h4 className="font-semibold text-secondary mb-5 pb-2 border-b border-gray-100">Billing details</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">First name *</label>
                      <input required={!form.anonymous} disabled={form.anonymous} type="text"
                        value={form.anonymous ? '' : form.firstName}
                        onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                        placeholder="First Name"
                        className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary disabled:bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Last name *</label>
                      <input required={!form.anonymous} disabled={form.anonymous} type="text"
                        value={form.anonymous ? '' : form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        placeholder="Last Name"
                        className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary disabled:bg-gray-100" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input required={!form.anonymous} disabled={form.anonymous} type="email"
                      value={form.anonymous ? '' : form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="Email"
                      className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary disabled:bg-gray-100" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.anonymous}
                      onChange={e => setForm(f => ({ ...f, anonymous: e.target.checked }))}
                      className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-gray-600">Make this an anonymous donation. 🔒</span>
                  </label>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? 'Processing...' : 'DONATE NOW'}
                  </button>
                  <button type="button" onClick={() => setStep(1)}
                    className="w-full text-sm text-gray-500 hover:text-primary transition-colors text-center py-1">
                    ← Back
                  </button>
                </form>
              </div>
            </div>

            {/* Support / Guidelines section */}
            <div className="bg-white rounded-sm border border-gray-200 p-6 shadow-sm">
              <h4 className="font-semibold text-secondary text-center mb-4">Support Our Cause with an Offline Donation</h4>
              <div className="border border-primary/20 rounded-sm p-5 bg-primary/5">
                <h5 className="font-semibold text-secondary text-sm mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                  Donation Guidelines
                </h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="text-primary font-bold">→</span> Ensure your donation reaches us by sending the exact amount to our official Crypto Wallet Address</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">→</span> After sending your donation, kindly provide your transaction receipt and full details to GiveHope Organization.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">→</span> Once we confirm successful transactions, you can proceed by clicking the <strong>"DONATE NOW"</strong> button.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
