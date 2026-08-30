import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Loader2 } from 'lucide-react'
import api from '../services/api'
import Reveal from '../components/Reveal'

function PageBanner({ title, breadcrumb }) {
  return (
    <div className="relative py-24 flex items-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.getEvents()
      .then(r => setEvents(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? events : events.filter(e => e.status === filter)

  return (
    <>
      <PageBanner title="Events" breadcrumb="Events" />

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {/* Filter tabs */}
          <Reveal direction="up">
            <div className="flex items-center gap-3 mb-12 flex-wrap">
              {['all', 'upcoming', 'past'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-sm text-sm font-semibold capitalize transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}>
                  {f === 'all' ? 'All Events' : f}
                </button>
              ))}
            </div>
          </Reveal>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No events found.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for upcoming events.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((event, i) => (
                <Reveal key={event._id} direction="up" delay={i * 80}>
                  <div className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    {event.imageUrl ? (
                      <div className="overflow-hidden h-52">
                        <img src={event.imageUrl} alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-52 bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {event.status}
                        </span>
                        {event.date && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-secondary font-heading text-lg mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{event.description}</p>
                      {event.location && (
                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
