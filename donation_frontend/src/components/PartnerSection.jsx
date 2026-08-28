import { Link } from 'react-router-dom'
import { BookOpen, Home, Stethoscope, Utensils, CheckCircle } from 'lucide-react'
import Reveal from './Reveal'

const stats = [
  { label: 'Raised For Education', icon: <BookOpen className="w-7 h-7 text-primary" />, amount: '$45,000+' },
  { label: 'Shelter & Clothing', icon: <Home className="w-7 h-7 text-primary" />, amount: '$30,000+' },
  { label: 'Medical Facilities', icon: <Stethoscope className="w-7 h-7 text-primary" />, amount: '$25,000+' },
  { label: 'Food & Nutrition', icon: <Utensils className="w-7 h-7 text-primary" />, amount: '$20,000+' },
]

export default function PartnerSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a3c5e 0%, #0f2840 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <Reveal direction="left">
          <div>
            <p className="section-subtitle text-primary">Partner With Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6 font-heading">
              GiveHope Organization will like to partner with you to give children a great future
            </h2>
            <p className="text-white/70 leading-relaxed mb-10">
              Together we can fund a future for children in need and help them rise out of poverty. Your partnership makes a real difference in the lives of vulnerable children worldwide.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-sm p-5 border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-primary font-bold text-lg mb-1">{stat.amount}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          {/* Right */}
          <Reveal direction="right" delay={150}>
          <div className="text-center lg:text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-sm p-10 border border-white/10">
              <div className="text-6xl font-bold text-white font-heading mb-2">
                120,000<span className="text-primary">+</span>
              </div>
              <p className="text-white/70 text-lg mb-2">Since 2014, we've granted more than</p>
              <p className="text-primary font-semibold text-xl mb-8">in support for children worldwide</p>

              <div className="space-y-4 text-left mb-10">
                {[
                  'Rehabilitating vulnerable children',
                  'Reforming through education',
                  'Promoting rights of children',
                  'Re-integrating through adoption',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link to="/about-us" className="btn-primary">
                Learn About Us
              </Link>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
