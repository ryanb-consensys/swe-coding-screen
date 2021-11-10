const express = require('express');
const authentication = require("./_helpers/authentication");
const errorHandler = require('./_helpers/errorHandler');

const createServer = () => {
  const app = express()

  /* User solution goes here*/
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  app.use(authentication);

  // routes
  app.use('/users', require('./users/users.controller'));
  app.use('/statuses', require('./statuses/statuses.controller'));

  app.use(errorHandler)
  /* End user solution goes here*/

  return app
}

module.exports = createServer
