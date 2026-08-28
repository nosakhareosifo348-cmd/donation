import { Link } from 'react-router-dom'
import { BookOpen, Heart, ShieldCheck, Home, Soup, Users } from 'lucide-react'
import Reveal from './Reveal'

const features = [
  {
    icon: <BookOpen className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Education Support',
    description: 'We provide quality education to orphaned and vulnerable children, ensuring no child is left behind in their academic journey.',
  },
  {
    icon: <Heart className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Donor Friendly',
    description: 'We accept donations in cryptocurrency and local currency, making it simple and seamless for anyone to contribute globally.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Medical Care',
    description: 'Every child under our care receives comprehensive medical attention, regular health check-ups, and necessary treatments.',
  },
  {
    icon: <Home className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Safe Shelter',
    description: 'We provide a safe, nurturing home environment where children feel loved, protected, and cared for around the clock.',
  },
  {
    icon: <Soup className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Healthy Food',
    description: 'Nutritious, balanced meals are provided daily to support the healthy growth and development of every child in our care.',
  },
  {
    icon: <Users className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Community Support',
    description: 'We build strong community networks to support children and families, fostering long-term sustainable change.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <Reveal direction="up">
        <div className="text-center mb-14">
          <p className="section-subtitle">Make a difference today!</p>
          <h2 className="section-title mb-4">There's a lot more We can do, together</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            There are many variations to our outreach causes that one can get involved in; from donations to volunteering in outreach activities and social publicizing of events.
          </p>
        </div>
        </Reveal>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, i) => (
            <Reveal key={feature.title} direction="up" delay={i * 80}>
            <div className="feature-box text-center p-8 border border-gray-100 rounded-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-bold text-secondary text-lg font-heading mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom banner */}
        <div
          className="rounded-sm p-10 md:p-14 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a3c5e 0%, #0f2840 100%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3">
                Helped fund <span className="text-primary">$2,500,000</span>
              </h3>
              <p className="text-white/70 max-w-lg">
                20+ missions completed — 10,000+ children educated. Your donations have transformed lives and created a lasting impact across communities.
              </p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <Link to="/donate" className="btn-primary whitespace-nowrap">
                Donate Now
              </Link>
              <Link to="/about-us" className="btn-outline whitespace-nowrap">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
