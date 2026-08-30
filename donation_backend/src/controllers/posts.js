const Post = require('../models/Post')

async function getPosts(req, res, next) {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}
    const posts = await Post.find(filter).sort({ createdAt: -1 }).select('-content')
    res.json({ success: true, data: posts })
  } catch (err) { next(err) }
}

async function getPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' })
    res.json({ success: true, data: post })
  } catch (err) { next(err) }
}

async function createPost(req, res, next) {
  try {
    const post = await Post.create(req.body)
    res.status(201).json({ success: true, data: post })
  } catch (err) { next(err) }
}

async function updatePost(req, res, next) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' })
    res.json({ success: true, data: post })
  } catch (err) { next(err) }
}

async function deletePost(req, res, next) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' })
    res.json({ success: true, message: 'Post deleted.' })
  } catch (err) { next(err) }
}

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost }
