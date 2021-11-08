const request = require('supertest');
const createServer = require('./server');

const app = createServer();
const agent = request.agent(app);

// Test helpers
const createUser = () => {
  return agent.post('/users').then((res) => {
    return res.body;
  });
};

// POST /user tests
describe('POST /users', () => {
  it('should create a new user and return { userId, userSecret }', () => {
    return agent
      .post('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('userId');
        expect(res.body).toHaveProperty('userSecret');
      });
  });
});

// POST /statuses tests
describe('POST /statuses', () => {
  it('should create a new status from the userId and statusMessage values specified in the POST json body', () => {
    return expect(
      createUser().then(({ userId, userSecret }) => {
        const statusMessage = 'This is a test status';
        return agent
          .post('/statuses')
          .auth(userId, userSecret)
          .send({ userId, statusMessage })
          .expect('Content-Type', /json/)
          .expect(200);
      })
    ).resolves.toBeTruthy();
  });
});

// GET /statuses(/:userId)? tests
describe('GET /statuses', () => {
  const DEFAULT_NUM_RESULTS = 10;
  let FILTER_USER_ID;

  beforeAll(async () => {
    // create 2 users
    const users = await Promise.all([createUser(), createUser()]);

    FILTER_USER_ID = users[0].userId;

    // create NUM_STATUS_MESSAGES status messages for each user, sequentially
    for (let i = 0; i < users.length; i++) {
      const { userId, userSecret } = users[i];

      for (let j = 0; j < DEFAULT_NUM_RESULTS; j++) {
        await agent
          .post('/statuses')
          .auth(userId, userSecret)
          .send({ userId, statusMessage: j });
      }
    }
  });

  it(`should return the last ${DEFAULT_NUM_RESULTS} statuses by default, in descending order created`, () => {
    return agent
      .get('/statuses')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const statuses = res.body;

        // check length
        expect(statuses.length).toEqual(DEFAULT_NUM_RESULTS);

        // check reserve order
        for (let i = 0; i < DEFAULT_NUM_RESULTS; i++) {
          const { statusMessage } = statuses[i];
          expect(statusMessage).toEqual(DEFAULT_NUM_RESULTS - i - 1);
        }
      });
  });

  it('should support the limit get parameter', () => {
    const limit = Math.floor(DEFAULT_NUM_RESULTS / 2);
    return agent
      .get(`/statuses?limit=${limit}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const statuses = res.body;
        expect(statuses.length).toEqual(limit);
      });
  });

  it('should support the offset get parameter', () => {
    const offset = Math.floor(DEFAULT_NUM_RESULTS / 2);
    return agent
      .get(`/statuses?offset=${offset}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const statuses = res.body;
        const { statusMessage } = statuses[0];
        expect(statusMessage).toEqual(DEFAULT_NUM_RESULTS - offset - 1);
      });
  });

  it('should support returning statuses for the specified userId', () => {
    return agent
      .get(`/statuses/${FILTER_USER_ID}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const statuses = res.body;
        expect(statuses.length).toEqual(DEFAULT_NUM_RESULTS);
        const nonmatchingStatuses = statuses.filter(
          ({ userId }) => userId !== FILTER_USER_ID
        );
        expect(nonmatchingStatuses).toEqual([]);
      });
  });
});
