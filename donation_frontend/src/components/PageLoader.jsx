import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHiding(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <svg width="56" height="56" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="shadow-lg rounded-full">
          <circle cx="32" cy="32" r="32" fill="#1a3c5e"/>
          <path d="M10 42 C10 36 14 32 20 30 L20 44 C16 46 12 46 10 42Z" fill="white" opacity="0.9"/>
          <path d="M54 42 C54 36 50 32 44 30 L44 44 C48 46 52 46 54 42Z" fill="white" opacity="0.9"/>
          <path d="M18 38 Q32 50 46 38 L46 44 Q32 56 18 44 Z" fill="white" opacity="0.9"/>
          <path d="M32 36 C32 36 22 28 22 22 C22 18 25 16 28 16 C30 16 32 18 32 18 C32 18 34 16 36 16 C39 16 42 18 42 22 C42 28 32 36 32 36Z" fill="#e8532a"/>
        </svg>
        <div>
          <div className="font-bold text-secondary text-base leading-tight font-heading">GiveHope</div>
          <div className="text-primary text-xs font-semibold tracking-wider uppercase">Organization</div>
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary"
            style={{
              animation: `loaderBounce 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loaderBounce {
          from { transform: translateY(0); opacity: 0.4; }
          to   { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
