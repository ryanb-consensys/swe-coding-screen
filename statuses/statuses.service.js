const { v4: uuidv4 } = require('uuid');

// in memory statuses
let statuses = [];

async function create ({ userId, statusMessage }) {
  const status = {
    _id: uuidv4(),
    userId,
    statusMessage
  };
  statuses.push(status);
  return status;
}

async function list (userId = null, limit = 10, offset = 0) {
  const list = userId ? statuses.filter(s=>s.userId === userId) : statuses;
  return list.reverse().slice(offset, limit);
}

module.exports = {
  create,
  list
}
