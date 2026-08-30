import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Loader2 } from 'lucide-react'
import api from '../services/api'
import Reveal from '../components/Reveal'

function PageBanner({ title, breadcrumb }) {
  return (
    <div className="relative py-24 flex items-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getPosts('?status=published')
      .then(r => setPosts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageBanner title="News & Updates" breadcrumb="Blog" />

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No posts yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for news and updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post._id} direction="up" delay={i * 80}>
                  <Link to={`/blog/${post._id}`} className="block group">
                    <div className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {post.imageUrl ? (
                        <div className="overflow-hidden h-52">
                          <img src={post.imageUrl} alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="h-52 bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
                          <span className="text-white/30 text-5xl font-bold font-heading">{post.title[0]}</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h3 className="font-bold text-secondary font-heading text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                        {post.excerpt && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>}
                        <p className="text-primary text-sm font-semibold mt-4">Read More →</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
