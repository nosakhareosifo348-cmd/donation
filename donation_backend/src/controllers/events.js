const Event = require('../models/Event')

async function getEvents(req, res, next) {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}
    const events = await Event.find(filter).sort({ date: 1 })
    res.json({ success: true, data: events })
  } catch (err) { next(err) }
}

async function getEventById(req, res, next) {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' })
    res.json({ success: true, data: event })
  } catch (err) { next(err) }
}

async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body)
    res.status(201).json({ success: true, data: event })
  } catch (err) { next(err) }
}

async function updateEvent(req, res, next) {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' })
    res.json({ success: true, data: event })
  } catch (err) { next(err) }
}

async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' })
    res.json({ success: true, message: 'Event deleted.' })
  } catch (err) { next(err) }
}

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent }
