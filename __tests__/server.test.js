const request = require('supertest');

const server = 'http://localhost:3000';
//const app = require('../server/server');

describe('Route Integration Tests', () => {
  describe('/', () => {
    describe('GET', () => {
      // const server = 'http://localhost:3000';
      xit('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/submit', () => {
    describe('GET', () => {
      xit('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/submit')
          .send('postgres://nhiumazy:oys61uE526v3wjfIhANYXURgyoo-ty28@fanny.db.elephantsql.com/nhiumazy')
          .expect('Content-type', 'application/json; charset=utf-8')
          .expect(200);
      });
    });
  });

  describe('/nonexistentendpoint', () => {
    describe('GET', () => {
      xit('responds with 400 status', () => {
        return request(server)
          .get('/doesnotexist')
          .expect(400);
      });
    });
  });

  describe('/schema', () => {
    describe('GET', () => {
      xit('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/schema')
          .expect('Content-type', /text\/html/)
          .expect(200);
      });
    });
  });
});