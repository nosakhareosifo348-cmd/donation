import { Link } from 'react-router-dom'
import { Home, HeartHandshake } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        {/* Illustration */}
        <div className="relative inline-block mb-8">
          <div className="text-[140px] font-bold text-gray-100 font-heading leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <HeartHandshake className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-secondary font-heading mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track to helping children in need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link to="/donate" className="btn-secondary flex items-center justify-center gap-2">
            <HeartHandshake className="w-4 h-4" />
            Make a Donation
          </Link>
        </div>
      </div>
    </div>
  )
}
