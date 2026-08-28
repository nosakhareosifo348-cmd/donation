import { Link } from 'react-router-dom'
import { Heart, Globe, MessageCircle, Camera, Play, MapPin, Phone, Mail, Clock } from 'lucide-react'

const footerLinks = {
  'Quick Links': [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Our Causes', to: '/causes' },
    { label: 'Donate', to: '/donate' },
    { label: 'Contact Us', to: '/contact' },
  ],
  'Our Causes': [
    { label: 'Education For Children', to: '/causes' },
    { label: 'Medical Care', to: '/causes' },
    { label: 'Food & Nutrition', to: '/causes' },
    { label: 'Shelter & Clothing', to: '/causes' },
    { label: 'Child Protection', to: '/causes' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary opacity-5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white opacity-5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Newsletter */}
      <div className="bg-primary py-12 relative">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-1">Subscribe our newsletter</h3>
              <p className="text-white/80 text-sm">Get the latest news and other tips</p>
            </div>
            <form
              className="flex gap-0 w-full md:w-auto"
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-5 py-3.5 text-gray-800 text-sm focus:outline-none rounded-l-sm"
              />
              <button
                type="submit"
                className="bg-secondary px-6 py-3.5 text-white font-semibold text-sm uppercase tracking-wide hover:bg-secondary-dark transition-colors rounded-r-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm font-heading leading-tight">GiveHope</div>
                  <div className="text-primary text-xs font-semibold tracking-wider uppercase">Organization</div>
                </div>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                GiveHope Organization was established in 2014 to save orphaned, abandoned, and vulnerable children and provide them with shelter, education, and hope.
              </p>
              <div className="flex gap-3">
                {[Globe, MessageCircle, Camera, Play].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-white mb-6 text-base font-heading relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-white/70 text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors flex-shrink-0"/>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-6 text-base font-heading relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-white/70">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>123 Charity Lane, Suite 100<br/>New York, NY 10001, USA</span>
                </li>
                <li className="flex gap-3 text-sm text-white/70">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex gap-3 text-sm text-white/70">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>info@intlcharity.org</span>
                </li>
                <li className="flex gap-3 text-sm text-white/70">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Mon - Fri: 9:00am – 5:00pm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© 2014 GiveHope. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
