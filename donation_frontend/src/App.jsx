import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <ScrollToTop />
      {loading && <PageLoader />}
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
    </Router>
  )
}
