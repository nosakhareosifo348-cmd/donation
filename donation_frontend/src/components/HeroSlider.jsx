import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    subtitle: 'Save The Children',
    title: 'Education\nFor Every Child',
    description:
      'Giving offers us the opportunity to reshape our destiny. When you give, you are reshaping your destiny. By providing means for quality education.',
    bg: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80',
    primaryBtn: { label: 'Donate Now', to: '/donate' },
    secondaryBtn: { label: 'Learn More', to: '/about-us' },
  },
  {
    id: 2,
    subtitle: 'Save The Children',
    title: 'No Child Should\nBe Left Behind',
    description:
      'To provide a safe, caring and loving environment for children who are vulnerable, orphaned or abandoned.',
    bg: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80',
    primaryBtn: { label: 'Make a Donation', to: '/donate' },
    secondaryBtn: { label: 'Our Causes', to: '/causes' },
  },
  {
    id: 3,
    subtitle: 'Save The Children',
    title: 'Your Donations Have\nChanged Lives',
    description:
      'Through the support of our donors, we have been implementing projects to cater to children\'s various needs. Helping the less privileged rise out of poverty.',
    bg: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80',
    primaryBtn: { label: 'Donate Now', to: '/donate' },
    secondaryBtn: { label: 'About Us', to: '/about-us' },
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => setAnimating(false), 800)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.bg}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ${i === current ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div
              key={current}
              className=""
            >
              <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 rounded-sm hero-content-enter">
                {slide.subtitle}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-heading whitespace-pre-line hero-content-enter-delay-1">
                {slide.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl leading-relaxed hero-content-enter-delay-2">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4 hero-content-enter-delay-3">
                <Link to={slide.primaryBtn.to} className="btn-primary text-sm">
                  {slide.primaryBtn.label}
                </Link>
                <Link to={slide.secondaryBtn.to} className="btn-outline text-sm">
                  {slide.secondaryBtn.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-primary flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-primary flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-3 bg-primary'
                : 'w-3 h-3 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-8 z-20 text-white/60 text-sm font-semibold hidden md:block">
        <span className="text-primary text-lg font-bold">{String(current + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        {String(slides.length).padStart(2, '0')}
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          key={current}
          className="h-full bg-primary"
          style={{ animation: 'progress 6s linear' }}
        />
      </div>
    </section>
  )
}
