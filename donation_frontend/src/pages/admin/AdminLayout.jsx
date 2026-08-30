import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { Heart, LayoutDashboard, DollarSign, MessageSquare, Mail, LogOut, Menu, X, Settings, Calendar, BookOpen } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/gh-control/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/gh-control/donations', icon: DollarSign, label: 'Donations' },
  { to: '/gh-control/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/gh-control/subscribers', icon: Mail, label: 'Subscribers' },
  { to: '/gh-control/events', icon: Calendar, label: 'Events' },
  { to: '/gh-control/blog', icon: BookOpen, label: 'Blog' },
  { to: '/gh-control/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('gh_token')
    navigate('/gh-control/login')
  }

  const Sidebar = () => (
    <aside className="w-64 bg-secondary text-white flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <div className="font-bold text-sm font-heading">GiveHope</div>
            <div className="text-white/50 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                isActive ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-sm text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col flex-shrink-0"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between md:justify-end">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-secondary" />
          </button>
          <span className="text-sm text-gray-500">GiveHope Admin Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
