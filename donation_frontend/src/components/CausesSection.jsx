import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const causes = [
  {
    id: 1,
    title: 'Education For Every Child',
    description: 'Providing quality education to orphaned and vulnerable children, giving them the tools they need to build a better future.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80',
    raised: 45000,
    goal: 60000,
    donors: 234,
    category: 'Education',
  },
  {
    id: 2,
    title: 'Medical Care & Health',
    description: 'Ensuring every child has access to proper healthcare, vaccinations, and medical treatment regardless of their background.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
    raised: 32000,
    goal: 50000,
    donors: 187,
    category: 'Healthcare',
  },
  {
    id: 3,
    title: 'Shelter & Safe Housing',
    description: 'Building and maintaining safe homes for orphaned and abandoned children, providing them with a secure environment to thrive.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    raised: 28000,
    goal: 45000,
    donors: 156,
    category: 'Shelter',
  },
  {
    id: 4,
    title: 'Food & Nutrition Program',
    description: 'Feeding vulnerable children daily nutritious meals to support their growth, development, and overall well-being.',
    image: 'https://images.unsplash.com/photo-1541802645635-11f2286a7482?w=600&q=80',
    raised: 21000,
    goal: 35000,
    donors: 312,
    category: 'Food',
  },
  {
    id: 5,
    title: 'Child Protection',
    description: 'Advocating for and protecting the rights of vulnerable, abandoned, and orphaned children from exploitation and abuse.',
    image: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=600&q=80',
    raised: 18000,
    goal: 30000,
    donors: 143,
    category: 'Protection',
  },
  {
    id: 6,
    title: 'Vocational Training',
    description: 'Teaching older children practical skills and trades to help them become independent, productive members of society.',
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&q=80',
    raised: 15000,
    goal: 25000,
    donors: 98,
    category: 'Skills',
  },
]

function CauseCard({ cause, showStats = true }) {
  const pct = Math.round((cause.raised / cause.goal) * 100)
  return (
    <div className="cause-card bg-white rounded-sm overflow-hidden shadow-md border border-gray-100">
      <Link to={`/causes/${cause.id}`} className="block">
      <div className="relative overflow-hidden h-52">
        <img
          src={cause.image}
          alt={cause.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
          {cause.category}
        </span>
      </div>
      </Link>
      <div className="p-6">
        <Link to={`/causes/${cause.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-bold text-secondary text-lg font-heading mb-3 line-clamp-1">{cause.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">{cause.description}</p>

        {/* Progress */}
        {showStats && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Raised: <strong className="text-primary">${cause.raised.toLocaleString()}</strong></span>
            <span>Goal: <strong className="text-secondary">${cause.goal.toLocaleString()}</strong></span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">{pct}%</div>
        </div>
        )}

        <div className="flex items-center justify-between">
          {showStats ? (
            <span className="text-xs text-gray-500"><strong className="text-secondary">{cause.donors}</strong> Donors</span>
          ) : <span />}
          <Link to="/donate" className="btn-primary text-xs px-5 py-2">
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CausesSection({ limit = 3, showStats = true }) {
  const displayed = limit ? causes.slice(0, limit) : causes

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <Reveal direction="up">
        <div className="text-center mb-14">
          <p className="section-subtitle">Begin giving to them</p>
          <h2 className="section-title mb-4">Explore These Causes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            There are many ways to get involved — from donations to volunteering in outreach activities. Choose a cause that speaks to your heart.
          </p>
        </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map((cause, i) => (
            <Reveal key={cause.id} direction="up" delay={i * 100}>
              <CauseCard cause={cause} showStats={showStats} />
            </Reveal>
          ))}
        </div>

        {limit && (
          <div className="text-center mt-12">
            <Link to="/causes" className="btn-secondary">
              View All Causes
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export { causes }
