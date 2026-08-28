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
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
        </div>
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
