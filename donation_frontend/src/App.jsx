import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { SettingsProvider } from './context/SettingsContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Donate from './pages/Donate'
import Causes from './pages/Causes'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import PageLoader from './components/PageLoader'
import ReadingProgress from './components/ReadingProgress'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDonations from './pages/admin/AdminDonations'
import AdminMessages from './pages/admin/AdminMessages'
import AdminSubscribers from './pages/admin/AdminSubscribers'
import AdminSettings from './pages/admin/AdminSettings'
import AdminEvents from './pages/admin/AdminEvents'
import AdminBlog from './pages/admin/AdminBlog'

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t) }, [])

  return (
    <Router>
      <SettingsProvider>
      <ScrollToTop />
      {loading && <PageLoader />}

      <Routes>
        {/* Admin routes — no header/footer */}
        <Route path="/gh-control/login" element={<AdminLogin />} />
        <Route path="/gh-control" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/gh-control/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Public routes — with header/footer */}
        <Route path="/*" element={
          <>
            <ReadingProgress />
            <div className="flex flex-col min-h-screen overflow-x-hidden">
              <Header />
              <main className="flex-grow pt-20 md:pt-[116px]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/causes" element={<Causes />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <BackToTop />
          </>
        } />
      </Routes>
      </SettingsProvider>
    </Router>
  )
}
