import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react'
import api from '../services/api'

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    api.getPostById(id)
      .then(r => setPost(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  if (notFound || !post) return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-bold text-secondary font-heading mb-4">Post not found</h2>
      <Link to="/blog" className="btn-primary">← Back to Blog</Link>
    </div>
  )

  return (
    <article className="py-16 bg-white">
      <div className="container-custom max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title}
            className="w-full h-72 md:h-96 object-cover rounded-sm shadow-md mb-8" />
        )}

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Calendar className="w-4 h-4" />
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-secondary font-heading mb-6">{post.title}</h1>

        {post.excerpt && (
          <p className="text-lg text-gray-600 border-l-4 border-primary pl-4 mb-8 italic">{post.excerpt}</p>
        )}

        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </article>
  )
}
