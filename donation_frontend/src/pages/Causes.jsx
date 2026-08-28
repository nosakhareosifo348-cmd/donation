import { Link } from 'react-router-dom'
import CausesSection from '../components/CausesSection'

function PageBanner({ title, breadcrumb }) {
  return (
    <div
      className="relative py-24 flex items-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-secondary/85" />
      <div className="container-custom relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">{title}</h1>
        <nav className="flex items-center gap-2 text-sm text-white/70">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>-</span>
          <span className="text-primary">{breadcrumb}</span>
        </nav>
      </div>
    </div>
  )
}

export default function Causes() {
  return (
    <>
      <PageBanner title="Our Causes" breadcrumb="Causes" />
      <CausesSection limit={0} />
    </>
  )
}
