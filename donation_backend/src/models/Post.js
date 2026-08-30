const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, trim: true },
  content: { type: String, required: true },
  imageUrl: { type: String, trim: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: { type: Date },
}, { timestamps: true })

// Auto-set publishedAt when status changes to published
postSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

module.exports = mongoose.model('Post', postSchema)
