const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

// in memory users
let users = [];

async function authenticate ({ userId, userSecret }) {
  const user = users.find(
    u => u.userId === userId && u.userSecret === userSecret
  );
  if (user) {
    return { userId };
  }
}

async function create () {
  const user = {
    userId: uuidv4(),
    userSecret: crypto.randomBytes(32).toString('base64')
  };
  users.push(user);
  return user;
}

async function getAll () {
    return users;
  }

module.exports = {
  authenticate,
  create,
  getAll
}
