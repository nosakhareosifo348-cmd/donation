const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { subscribe, unsubscribe, getSubscribers } = require('../controllers/newsletter')

const router = Router()

const emailRule = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
]

router.post('/subscribe', emailRule, validate, subscribe)
router.post('/unsubscribe', emailRule, validate, unsubscribe)
router.get('/subscribers', getSubscribers)

module.exports = router
