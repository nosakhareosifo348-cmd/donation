import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Mail, Phone, Heart, Search, Menu, X } from 'lucide-react'
import { FacebookIcon, TelegramIcon, InstagramIcon } from './SocialIcons'
import { useSettings } from '../context/SettingsContext'
import Logo from './Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/causes', label: 'Causes' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const settings = useSettings()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="top-bar text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            {settings.email && (
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                {settings.email}
              </span>
            )}
            {settings.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                {settings.phone}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, url: settings.facebookUrl },
                { Icon: TelegramIcon, url: settings.telegramUrl },
                { Icon: InstagramIcon, url: settings.instagramUrl },
              ].map(({ Icon, url }, i) =>
                url ? (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span key={i} className="opacity-40 cursor-default">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''} bg-white`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive && !link.disabled ? 'text-primary' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex w-10 h-10 items-center justify-center text-secondary hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/donate" className="btn-primary text-xs hidden sm:inline-block">
                Donate Now
              </Link>
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6 text-secondary" /> : <Menu className="w-6 h-6 text-secondary" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="py-3 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 pr-12 text-sm focus:outline-none focus:border-primary"
                  autoFocus
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container-custom py-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 border-b border-gray-50 text-sm font-medium uppercase tracking-wide ${isActive ? 'text-primary' : 'text-gray-700'} hover:text-primary transition-colors`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/donate" className="btn-primary mt-4 text-center w-full block" onClick={() => setMobileOpen(false)}>
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
