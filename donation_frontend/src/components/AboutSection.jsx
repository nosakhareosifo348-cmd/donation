import { Link } from 'react-router-dom'
import { BookOpen, Stethoscope, Home, Utensils } from 'lucide-react'
import Reveal from './Reveal'

export default function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <Reveal direction="left">
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80"
                alt="Children in need"
                className="w-full h-96 object-cover rounded-sm shadow-2xl"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 z-20 bg-primary text-white p-6 rounded-sm shadow-xl w-48">
              <div className="text-4xl font-bold font-heading">10+</div>
              <div className="text-xs font-semibold uppercase tracking-wide mt-1 text-white/80">Years of Experience</div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-sm z-0" />
            <div className="absolute top-1/2 -left-4 w-3 h-32 bg-primary rounded-full z-0" />
          </div>
          </Reveal>

          {/* Content */}
          <Reveal direction="right" delay={100}>
          <div>
            <p className="section-subtitle">Know About Us</p>
            <h2 className="section-title mb-6">
              GiveHope<br />Organization
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              GiveHope Organization was established with the goal to save the orphans, abandoned, vulnerable children and to render marital counseling services to young persons. We envisage an enlightened society with maximum drop in the rate of child abandonment.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We accept donations in both cryptocurrency and local currency, ensuring a seamless giving experience. Every contribution, whether big or small, fuels our efforts to address urgent needs, provide relief, and create lasting impact.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: <BookOpen className="w-5 h-5 text-primary" />, label: 'Education Support' },
                { icon: <Stethoscope className="w-5 h-5 text-primary" />, label: 'Medical Care' },
                { icon: <Home className="w-5 h-5 text-primary" />, label: 'Safe Shelter' },
                { icon: <Utensils className="w-5 h-5 text-primary" />, label: 'Food & Nutrition' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            <Link to="/about-us" className="btn-primary">
              Learn About Us
            </Link>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
