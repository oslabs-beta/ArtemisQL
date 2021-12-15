const request = require('supertest');
// const app = require('../server/server');
describe('Server Tests', () => {
  describe('/', () => {
    describe('GET - root endpoint', () => {
      const server = 'http://localhost:3000';
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-type', /text\/html/)
          .expect(200);
      });
    });
  });
  // describe('Route integration', () => {
  // describe('/', () => { 
  //   describe('GET', () => {
  //     it('responds with 200 status and text/html content type', () => {
  //       return request(server)
  //         .get('/')
  //         .expect('Content-Type', /text\/html/)
  //         .expect(200);
  //     });
  //   });
  // });

  // describe('/', () => { 
  //   it('responds with 200 status and text/html content type', () => {
  //     return request(server)
  //       .get('/')
  //       .expect('Content-Type', /text\/html/)
  //       .expect(200);
  //   });
  // });
  // describe('/submit', () => {
  //   describe('GET', () => {
  //     it('responds with 200 status', () => {
  //       return request(server)
  //         .get('/submit')
  //         .send()
  //         .expect(200);
  //     });
  //   });

  //   describe('/login', () => {
  //     describe('POST', () => {
  //       it('responds with 200 status', () => {
  //         return request(server)
  //           .post('/login')
  //           .send({ userInfo: { username: 'test', password: 'testtest' } })
  //           .expect(200);
  //       });
  //     });
  //   });
  // });
});