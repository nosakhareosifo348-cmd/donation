const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const protect = require('../middleware/protect')
const { apply, getVolunteers, updateStatus } = require('../controllers/volunteers')

const router = Router()

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').optional().trim(),
  body('interest').isIn(['Education', 'Healthcare', 'Food', 'Shelter', 'Administration', 'Other']).withMessage('Select an area of interest'),
  body('availability').isIn(['Weekdays', 'Weekends', 'Both', 'Flexible']).withMessage('Select availability'),
  body('message').optional().trim(),
], validate, apply)

router.get('/', protect, getVolunteers)
router.patch('/:id/status', protect, [
  body('status').isIn(['pending', 'approved', 'declined']),
], validate, updateStatus)

module.exports = router
