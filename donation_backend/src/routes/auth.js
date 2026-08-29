const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const protect = require('../middleware/protect')
const { login, getMe, changePassword } = require('../controllers/auth')

const router = Router()

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
], validate, login)

router.get('/me', protect, getMe)

router.post('/change-password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
], validate, changePassword)

module.exports = router
