import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const gallery = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80',
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
  'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&q=80',
]

export default function TeamGallerySection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <Reveal direction="up">
          <div className="text-center mb-14">
            <p className="section-subtitle">Our Gallery</p>
            <h2 className="section-title mb-4">Moments That Matter</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Glimpses of the meaningful work we do every day to transform the lives of vulnerable children.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, i) => (
            <Reveal key={i} direction="scale" delay={i * 60}>
              <div className="gallery-item relative rounded-sm overflow-hidden aspect-square">
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/causes" className="btn-secondary">View All Photos</Link>
        </div>
      </div>
    </section>
  )
}
