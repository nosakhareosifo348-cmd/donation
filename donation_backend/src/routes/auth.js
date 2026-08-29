const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const protect = require('../middleware/protect')
const { login, getMe } = require('../controllers/auth')

const router = Router()

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
], validate, login)

router.get('/me', protect, getMe)

module.exports = router
