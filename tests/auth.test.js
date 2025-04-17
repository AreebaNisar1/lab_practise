// ================ STEP 8: TESTING ================
// tests/auth.test.js
const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  it('registers a user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'test', email: 'test@test.com', password: '123456' });
    expect(res.statusCode).toBe(201);
  });
});

// jest.config.js
module.exports = {
  testEnvironment: 'node'
};
