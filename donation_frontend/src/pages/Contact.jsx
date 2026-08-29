import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react'
import api from '../services/api'
import { useSettings } from '../context/SettingsContext'

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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const settings = useSettings()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.submitContact(form)
      setSent(true)
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageBanner title="Contact Us" breadcrumb="Contact" />

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div>
              <p className="section-subtitle">Get In Touch</p>
              <h2 className="text-2xl font-bold text-secondary font-heading mb-6">We'd Love to Hear From You</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                Whether you'd like to donate, volunteer, partner with us, or simply learn more about our work — we are always ready to connect.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: 'Our Location',
                    value: settings.address,
                  },
                  {
                    icon: <Phone className="w-6 h-6" />,
                    title: 'Phone Number',
                    value: settings.phone,
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: 'Email Address',
                    value: settings.email,
                  },

                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-secondary text-sm mb-0.5">{item.title}</div>
                      <div className="text-gray-600 text-sm whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-sm shadow-xl p-8 md:p-10">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary font-heading mb-3">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="btn-primary">Send Another Message</button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-secondary font-heading mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                        <input
                          required
                          type="text"
                          value={form.subject}
                          onChange={e => setForm({ ...form, subject: e.target.value })}
                          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
                          placeholder="How can we help?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                        <textarea
                          required
                          rows={6}
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                          placeholder="Write your message here..."
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full text-center">
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-80 bg-gray-200 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80"
          alt="Map"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-sm shadow-xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <p className="font-semibold text-secondary text-sm">GiveHope Organization</p>
            <p className="text-gray-500 text-xs">123 Charity Lane, New York, NY 10001</p>
          </div>
        </div>
      </div>
    </>
  )
}
