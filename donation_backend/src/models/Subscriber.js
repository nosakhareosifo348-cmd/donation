const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  isActive: { type: Boolean, default: true },
  unsubscribedAt: { type: Date },
}, { timestamps: true })

subscriberSchema.index({ isActive: 1 })

module.exports = mongoose.model('Subscriber', subscriberSchema)

