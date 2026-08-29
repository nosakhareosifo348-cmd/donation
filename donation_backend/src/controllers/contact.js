const Contact = require('../models/Contact')

async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body
    const contact = await Contact.create({ name, email, subject, message })
    res.status(201).json({ success: true, message: 'Message received. We will reply within 24 hours.', data: { id: contact._id } })
  } catch (err) { next(err) }
}

async function getMessages(req, res, next) {
  try {
    const { isRead, page = 1, limit = 20 } = req.query
    const filter = isRead !== undefined ? { isRead: isRead === 'true' } : {}
    const [messages, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(+limit),
      Contact.countDocuments(filter),
    ])
    res.json({ success: true, data: messages, pagination: { total, page: +page, limit: +limit, pages: Math.ceil(total / limit) } })
  } catch (err) { next(err) }
}

async function markAsRead(req, res, next) {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })
    if (!contact) return res.status(404).json({ success: false, error: 'Message not found' })
    res.json({ success: true, data: contact })
  } catch (err) { next(err) }
}

module.exports = { submitContact, getMessages, markAsRead }
