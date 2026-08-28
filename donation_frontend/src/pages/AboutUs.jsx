import { Link } from 'react-router-dom'
import { Lightbulb, Eye, Target, CheckCircle } from 'lucide-react'

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

export default function AboutUs() {
  return (
    <>
      <PageBanner title="About Us" breadcrumb="About Us" />

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=700&q=80"
                alt="About Us"
                className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-sm shadow-xl w-44">
                <div className="text-5xl font-bold font-heading">10+</div>
                <div className="text-xs uppercase tracking-wide mt-1 text-white/80">Years Serving</div>
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-secondary/10 rounded-sm" />
            </div>
            <div>
              <p className="section-subtitle">Know About GiveHope Organization</p>
              <h2 className="section-title mb-6">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                GiveHope Organization stands as a beacon of compassion and empowerment. With a mission to transform lives globally, we accept donations in both cryptocurrency and local currency, ensuring a seamless giving experience.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                GiveHope Organization is a non-governmental, non-profit organization which was established in 2014 out of the desire to provide shelter, succor, clothing, emotional care and hope for a better future for the motherless, abandoned, underprivileged and the poorest of the poor children in our society.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                It was established by Molay Mercuray, as a fulfillment of our divine nature as Christians. Every contribution, whether big or small, fuels our efforts to address urgent needs, provide relief, and create lasting impact.
              </p>
              <Link to="/donate" className="btn-primary">Support Our Mission</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Belief Vision Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="section-subtitle">Our Foundation</p>
            <h2 className="section-title">Belief, Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="w-10 h-10 text-primary" />,
                title: 'Our Belief',
                content: 'At GiveHope Organization, we believe every orphan child should have the same education, opportunity and basic amenity as children with parents. We exist to ensure that the orphans are adequately catered for.',
              },
              {
                icon: <Eye className="w-10 h-10 text-primary" />,
                title: 'Our Vision',
                content: 'To provide succor for the abandoned, orphaned and vulnerable children until they are either given up for adoption, guardianship or are equipped to live an independent life in society.',
              },
              {
                icon: <Target className="w-10 h-10 text-primary" />,
                title: 'Our Mission',
                content: 'To save orphans, abandoned and vulnerable children and to render marital counseling services to young persons, envisaging an enlightened society with maximum drop in the rate of child abandonment.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white p-8 rounded-sm shadow-md border-t-4 border-primary text-center hover:shadow-xl transition-shadow">
                <div className="mb-5 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-secondary font-heading mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle">What We Do</p>
              <h2 className="section-title mb-6">There's a lot more We can do, together</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                One of our goals at the Foundation is to ensure that our children get quality education. This goal is continually being achieved. Five of our children have graduated from the University.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                As part of our effort to equip our children with the necessary skills to grow and become independent, responsible adults, we organize vocational training skills and workshops for them.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Rehabilitating vulnerable children',
                  'Reforming children through education and talent development',
                  'Promoting the rights of children under care & protection',
                  'Re-integrating children through adoption and fostering',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/causes" className="btn-primary">Explore Our Causes</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80" alt="" className="w-full h-56 object-cover rounded-sm" />
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80" alt="" className="w-full h-56 object-cover rounded-sm mt-8" />
              <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=80" alt="" className="w-full h-56 object-cover rounded-sm -mt-8" />
              <img src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&q=80" alt="" className="w-full h-56 object-cover rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #e8532a 0%, #c94520 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-custom relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Ready to Make a Difference?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Your donation, however small, transforms a child's life. Join thousands of donors who have already made a lasting impact.
          </p>
          <Link to="/donate" className="btn-outline">Donate Now</Link>
        </div>
      </section>
    </>
  )
}
