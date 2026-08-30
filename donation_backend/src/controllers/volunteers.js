const Volunteer = require('../models/Volunteer')

async function apply(req, res, next) {
  try {
    const { name, email, phone, interest, availability, message } = req.body
    const volunteer = await Volunteer.create({ name, email, phone, interest, availability, message })
    res.status(201).json({ success: true, message: 'Thank you for your interest! We will contact you soon.', data: { id: volunteer._id } })
  } catch (err) { next(err) }
}

async function getVolunteers(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = status ? { status } : {}
    const [volunteers, total] = await Promise.all([
      Volunteer.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(+limit),
      Volunteer.countDocuments(filter),
    ])
    res.json({ success: true, data: volunteers, pagination: { total, page: +page, limit: +limit, pages: Math.ceil(total / limit) } })
  } catch (err) { next(err) }
}

async function updateStatus(req, res, next) {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    if (!volunteer) return res.status(404).json({ success: false, error: 'Not found' })
    res.json({ success: true, data: volunteer })
  } catch (err) { next(err) }
}

module.exports = { apply, getVolunteers, updateStatus }
