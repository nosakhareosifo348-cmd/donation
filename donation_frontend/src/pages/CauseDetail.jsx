import { Link, useParams } from 'react-router-dom'
import { causes } from '../components/CausesSection'
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
          <Link to="/causes" className="hover:text-primary transition-colors">Causes</Link>
          <span>-</span>
          <span className="text-primary">{breadcrumb}</span>
        </nav>
      </div>
    </div>
  )
}

export default function CauseDetail() {
  const { id } = useParams()
  const cause = causes.find(c => c.id === parseInt(id))

  if (!cause) return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-bold text-secondary font-heading mb-4">Cause not found</h2>
      <Link to="/causes" className="btn-primary">← Back to Causes</Link>
    </div>
  )

  const pct = Math.round((cause.raised / cause.goal) * 100)

  return (
    <>
      <PageBanner title={cause.title} breadcrumb={cause.category} />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Reveal direction="up">
                <img src={cause.image} alt={cause.title}
                  className="w-full h-80 object-cover rounded-sm shadow-md mb-8" />
                <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">
                  {cause.category}
                </span>
                <h2 className="text-3xl font-bold text-secondary font-heading mb-4">{cause.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{cause.description}</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Your contribution, however small, makes a real difference in the life of a child. Every dollar donated goes directly towards supporting vulnerable children with the resources they need to thrive — from education and healthcare to safe shelter and nutritious food.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Together we can change lives, restore hope, and build a brighter future for the next generation. Join thousands of donors who have already made a lasting impact through GiveHope Organization.
                </p>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Reveal direction="right" delay={150}>
                {/* Donation progress */}
                <div className="bg-gray-50 rounded-sm p-6 border border-gray-100">
                  <h3 className="font-bold text-secondary font-heading mb-4">Fundraising Progress</h3>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Raised</span>
                    <span className="font-bold text-primary">${cause.raised.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500">Goal</span>
                    <span className="font-bold text-secondary">${cause.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{cause.donors} donors</span>
                    <span>{pct}% funded</span>
                  </div>
                </div>

                {/* Donate CTA */}
                <div className="bg-secondary rounded-sm p-6 text-white text-center">
                  <h3 className="font-bold font-heading text-xl mb-3">Make a Difference</h3>
                  <p className="text-white/70 text-sm mb-5">Your donation directly supports this cause and transforms a child's life.</p>
                  <Link to="/donate" className="btn-primary w-full block text-center">
                    Donate Now
                  </Link>
                </div>

                {/* Other causes */}
                <div className="bg-gray-50 rounded-sm p-6 border border-gray-100">
                  <h3 className="font-bold text-secondary font-heading mb-4">Other Causes</h3>
                  <ul className="space-y-3">
                    {causes.filter(c => c.id !== cause.id).slice(0, 3).map(c => (
                      <li key={c.id}>
                        <Link to={`/causes/${c.id}`}
                          className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors group">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary flex-shrink-0" />
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/causes" className="text-primary text-xs font-semibold mt-4 inline-block hover:underline">
                    View All Causes →
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
