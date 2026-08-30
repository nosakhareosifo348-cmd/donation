const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const protect = require('../middleware/protect')
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router()

const eventRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('location').optional().trim(),
  body('imageUrl').optional().trim(),
  body('status').optional().isIn(['upcoming', 'past']),
]

router.get('/', getEvents)
router.get('/:id', getEventById)
router.post('/', protect, eventRules, validate, createEvent)
router.put('/:id', protect, eventRules, validate, updateEvent)
router.delete('/:id', protect, deleteEvent)

module.exports = router
