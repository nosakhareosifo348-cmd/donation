const { Router } = require('express')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const protect = require('../middleware/protect')
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/posts')

const router = Router()

const postRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('excerpt').optional().trim(),
  body('imageUrl').optional().trim(),
  body('status').optional().isIn(['draft', 'published']),
]

router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', protect, postRules, validate, createPost)
router.put('/:id', protect, postRules, validate, updatePost)
router.delete('/:id', protect, deletePost)

module.exports = router
