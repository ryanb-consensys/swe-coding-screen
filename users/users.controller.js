const express = require('express');
const users = require('./users.service');
const router = express.Router();

async function create(req, res, next) {
   try {
    const user = await users.create();
    res.json(user);
   } catch (error) {
    next(error);
   }
}

// routes
router.post('/', create);

module.exports = router;