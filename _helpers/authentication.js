const users = require('../users/users.service')

async function authentication (req, res, next) {
  // endpoint to create users is public
  if (req.method === 'POST' && req.path === '/users') {
    return next()
  }

  // validate auth headers
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf('Basic ') === -1
  ) {
    return res.status(401).json({ message: 'Missing Authorization Header' })
  }

  // validate credentials
  const base64Credentials = req.headers.authorization.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [userId, userSecret] = credentials.split(':')
  const user = await users.authenticate({ userId, userSecret })
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Invalid Authentication Credentials' })
  }

  // set the user to request object
  req.user = user

  next()
}

module.exports = authentication
