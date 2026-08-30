import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Loader2, Heart, BookOpen, Stethoscope, Utensils, Home, Settings } from 'lucide-react'
import api from '../services/api'

const interests = ['Education', 'Healthcare', 'Food', 'Shelter', 'Administration', 'Other']
const availabilities = ['Weekdays', 'Weekends', 'Both', 'Flexible']

const interestIcons = { Education: BookOpen, Healthcare: Stethoscope, Food: Utensils, Shelter: Home, Administration: Settings, Other: Heart }

function PageBanner({ title, breadcrumb }) {
  return (
    <div className="relative py-24 flex items-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

export default function Volunteer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', availability: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await api.applyVolunteer(form)
      setSubmitted(true)
    } catch (err) { setError(err.message || 'Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <>
      <PageBanner title="Volunteer" breadcrumb="Volunteer" />

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Info */}
            <div>
              <p className="section-subtitle">Join Our Mission</p>
              <h2 className="section-title mb-6">Make a Difference With Your Time</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Volunteering with GiveHope is one of the most meaningful ways to support our mission. Whether you have a few hours a week or can commit to a long-term role, your skills and compassion are needed.
              </p>
              <p className="text-gray-600 leading-relaxed mb-10">
                Our volunteers work alongside our team in education, healthcare, food distribution, shelter support, and administration. No prior experience is required — just a willing heart.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {interests.map(area => {
                  const Icon = interestIcons[area]
                  return (
                    <div key={area} className="bg-white rounded-sm p-4 border border-gray-100 flex items-center gap-3 shadow-sm">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-secondary">{area}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-sm shadow-xl p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary font-heading mb-3">Application Received!</h3>
                  <p className="text-gray-600 mb-6">Thank you for your interest in volunteering. We will contact you within 48 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary">Apply Again</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-secondary font-heading mb-6">Volunteer Application</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                        <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                          placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                        <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                          placeholder="Your email address" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                        placeholder="Your phone number" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Area of Interest *</label>
                      <select required value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-white">
                        <option value="">Select an area...</option>
                        {interests.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Availability *</label>
                      <select required value={form.availability} onChange={e => setForm(f => ({ ...f, availability: e.target.value }))}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-white">
                        <option value="">Select availability...</option>
                        {availabilities.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                      <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                        placeholder="Tell us about your skills and why you want to volunteer..." />
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
