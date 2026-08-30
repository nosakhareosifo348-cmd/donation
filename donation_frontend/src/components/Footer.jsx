import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FacebookIcon, TelegramIcon, InstagramIcon } from './SocialIcons'
import { useSettings } from '../context/SettingsContext'
import Logo from './Logo'
import api from '../services/api'

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
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('')
  const settings = useSettings()

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      await api.subscribe(email)
      setSubStatus('success')
      setEmail('')
    } catch {
      setSubStatus('error')
    }
  }
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
              className="flex gap-0 w-full md:w-auto flex-col sm:flex-row"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-5 py-3.5 text-gray-800 text-sm focus:outline-none rounded-l-sm"
              />
              <button
                type="submit"
                className="bg-secondary px-6 py-3.5 text-white font-semibold text-sm uppercase tracking-wide hover:bg-secondary-dark transition-colors rounded-r-sm whitespace-nowrap"
              >
                Subscribe
              </button>
              {subStatus === 'success' && <p className="text-white text-xs mt-2 sm:mt-0 sm:ml-3 self-center">✅ Subscribed!</p>}
              {subStatus === 'error' && <p className="text-white/70 text-xs mt-2 sm:mt-0 sm:ml-3 self-center">Already subscribed or invalid email.</p>}
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
              <Logo dark size={12} />
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                GiveHope Organization was established in 2014 to save orphaned, abandoned, and vulnerable children and provide them with shelter, education, and hope.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: FacebookIcon, url: settings.facebookUrl },
                  { Icon: TelegramIcon, url: settings.telegramUrl },
                  { Icon: InstagramIcon, url: settings.instagramUrl },
                ].map(({ Icon, url }, i) =>
                  url ? (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ) : (
                    <span key={i} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center opacity-40 cursor-default">
                      <Icon className="w-4 h-4" />
                    </span>
                  )
                )}
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
                  <span style={{ whiteSpace: 'pre-line' }}>{settings.address}</span>
                </li>
                <li className="flex gap-3 text-sm text-white/70">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{settings.phone}</span>
                </li>
                <li className="flex gap-3 text-sm text-white/70">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{settings.email}</span>
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
