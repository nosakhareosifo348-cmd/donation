const Subscriber = require('../models/Subscriber')

async function subscribe(req, res, next) {
  try {
    const email = req.body.email.trim().toLowerCase()
    const existing = await Subscriber.findOne({ email })
    if (existing) {
      if (existing.isActive) return res.status(409).json({ success: false, error: 'This email is already subscribed.' })
      existing.isActive = true
      existing.unsubscribedAt = undefined
      await existing.save()
      return res.json({ success: true, message: 'Welcome back! You have been re-subscribed.' })
    }
    const subscriber = await Subscriber.create({ email })
    res.status(201).json({ success: true, message: 'Thank you for subscribing!', data: { id: subscriber._id } })
  } catch (err) { next(err) }
}

async function unsubscribe(req, res, next) {
  try {
    const email = req.body.email.trim().toLowerCase()
    const subscriber = await Subscriber.findOne({ email })
    if (!subscriber || !subscriber.isActive) return res.status(404).json({ success: false, error: 'Email not found in subscriber list.' })
    subscriber.isActive = false
    subscriber.unsubscribedAt = new Date()
    await subscriber.save()
    res.json({ success: true, message: 'You have been unsubscribed.' })
  } catch (err) { next(err) }
}

async function getSubscribers(req, res, next) {
  try {
    const { page = 1, limit = 50 } = req.query
    const [subscribers, total] = await Promise.all([
      Subscriber.find({ isActive: true }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(+limit),
      Subscriber.countDocuments({ isActive: true }),
    ])
    res.json({ success: true, data: subscribers, pagination: { total, page: +page, limit: +limit, pages: Math.ceil(total / limit) } })
  } catch (err) { next(err) }
}

module.exports = { subscribe, unsubscribe, getSubscribers }
