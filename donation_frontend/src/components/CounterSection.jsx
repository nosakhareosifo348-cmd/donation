import { useState, useEffect, useRef } from 'react'

const counters = [
  { label: 'Raised Since 2014', value: 2500000, prefix: '$', suffix: '+', format: true },
  { label: 'Missions Completed', value: 20, prefix: '', suffix: '+', format: false },
  { label: 'Children Educated', value: 10000, prefix: '', suffix: '+', format: true },
  { label: 'Volunteers Worldwide', value: 500, prefix: '', suffix: '+', format: false },
]

function useCounter(target, active, format) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [active, target])

  if (format && count >= 1000) {
    return (count >= 1000000 ? (count / 1000000).toFixed(1) + 'M' : (count / 1000).toFixed(0) + 'K')
  }
  return count.toLocaleString()
}

function CounterItem({ item, active }) {
  const val = useCounter(item.value, active, item.format)
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white font-heading mb-2">
        {item.prefix}{val}{item.suffix}
      </div>
      <div className="text-white/60 text-sm uppercase tracking-widest font-medium">{item.label}</div>
    </div>
  )
}

export default function CounterSection() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-secondary/90" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {counters.map(item => (
            <CounterItem key={item.label} item={item} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
