# Decrypt SWE Coding Screen

Thank you for your time and interest in our open software engineering role at Decrypt!

We've put together this coding exercise as a simple exercise in API design and implementation. 

The goal is to build a simple Node.js server for creating and reading status messages for users.

Keep it simple to start. You'll have roughly 2 hours to complete the following spec.

Please make sure to get all tests passing before adding any additional functionality. Completing the spec should be your top priority. If you are able to finish an implementation of the spec before the time limit is up and get all tests passing, please consider additional functionality you'd like to add and how you would do so. You will be invited to discuss your ideas with us in the review.

We are most familiar with ExpressJS, but feel free to use another framework if you prefer. You may need to edit index.js and the test suite accordingly.

## Dependencies

You'll need:

* [Docker Compose](https://docs.docker.com/compose/install/)
* [NPM](https://www.npmjs.com/)
* [Git](https://git-scm.com/)
* A Github account

## The API spec

POST `/users`

  -  should create a new user and return `{ userId, userSecret }`

POST `/statuses`

  -  should create a new status using the `userId` and `statusMessage` values 
     specified in the POST json body. Authentication is optional but this test spec uses the [Superagent Basic `auth` method](https://visionmedia.github.io/superagent/#authentication)

GET `/statuses(/:userId)?`

  - should return the last 10 statuses by default, in descending order created
  - should support the `limit` get parameter
  - should support the `offset` get parameter
  - should support returning statuses for the specified userId

## Helper scripts

There is a test suite included in this repo, which you can run with `npm test`.

You can run a local development server with `docker-compose up`. Nodemon is used
to restart the node server each time you edit the source files. Feel free to use
node instead of nodemon if you find this behavior annoying.

## Submitting your response

Create a submission branch and open a PR in the Github repo. This will be used for the code review with the interview team. 

If you want to experiment with alternative features or implementations but keep a reference to your original working implementation, feel free to open multiple PRs.
