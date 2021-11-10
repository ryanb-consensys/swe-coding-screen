const express = require('express')
const users = require('../users/users.service')
const statuses = require('./statuses.service')
const router = express.Router()

async function create (req, res, next) {
  try {
    const {
      user: { userId: _userId }
    } = req
    const { userId, statusMessage } = req.body
    if (_userId !== userId) {
      res.status(400).json({ message: 'User not valid' })
    } else {
      const index = (await users.getAll()).findIndex(u => u.userId === userId)
      if (index <= 0) {
        res.status(400).json({ message: 'User not valid' })
      } else {
        const status = await statuses.create({ userId, statusMessage })
        res.json(status)
      }
    }
  } catch (error) {
    next(error)
  }
}

async function list (req, res, next) {
  try {
    const { userId } = req.params
    const { limit, offset } = req.query
    const list = await statuses.list(userId, limit || 10, offset || 0)
    res.json(list)
  } catch (error) {
    next(error)
  }
}

// routes
router.post('/', create)
router.get('/:userId*?', list)

module.exports = router
