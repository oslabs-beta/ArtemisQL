const request = require('supertest');

const server = 'http://localhost:3000';
/**************************** Route Integration testing *********************/

// Test if main route successfully serves our html file
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and serves static html file', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});

// const { json } = require('express');
// const supertest = require('supertest');
// const fs = require('fs');
// const path = require('path');

// const app = require('../server/server.ts');
// const request = supertest(app);

// const server = 'http://localhost:3000';

// Note that we return the evaluation of `request` here! It evaluates to
// a promise, so Jest knows not to say this test passes until that
// promise resolves. See https://jestjs.io/docs/en/asynchronous

// describe('Route integration', () => {
//   describe('/', () => {
//     describe('GET', () => {
//       it('responds with 200 status and serves static html file', () => {
//         return request(server)
//           .get('/')
//           .expect('Content-Type', /text\/html/)
//           .expect(200);
//       });
//     });
//   });
// });
// describe('Route integration', () => {

//   describe('/', () => {

//     describe('GET', () => {
 
//       it('responds with 200 status and text/html content type', async () => {

//         const response = await request.get('/');
//         expect(response.status).toBe(200);

//         // return request(server)
//         //   .get('/')
//         //   .expect('Content-Type', /text\/html/)
//         //   .expect(200);
//       });

//     });

//   });

// });

//   describe('/markets', () => {
//     describe('GET', () => {
//       it('responds with 200 status and application/json content type', () => {
//         return request(server)
//           .get('/markets')
//           .expect('Content-Type', /json/)
//           .expect(200);
//       });
//       // For this test, you'll need to inspect the body of the response and
//       // ensure it contains the markets list. Check the markets.dev.json file
//       // in the dev database to get an idea of what shape you're expecting.
//       it('markets from "DB" json are in body of response', () => {
//         return request(server)
//           .get('/markets')
//           .expect((res) => {
//             console.log('RESPONSE BODY: ', res.body);
//             expect(res.body).toEqual(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../server/db/markets.test.json'), 'UTF-8')));
//           });
//       });
//     });

//     describe('PUT', () => {
//       it('responds with 200 status and application/json content type', () => {
//         return request(server)
//           .put('/markets')
//           .send([{
//             location: 'poo',
//             cards: 1,
//           }])
//           .expect('Content-Type', /json/)
//           .expect(200);
//       });

//       it('responds with the updated market list', () => {
//         return request(server)
//           .put('/markets')
//           .send([{
//             location: 'poopoo',
//             cards: 1,
//           }])
//           .expect((res) => {
//             console.log('RESPONSE BODY: ', res.body);
//             expect(res.body).toEqual(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../server/db/markets.test.json'), 'UTF-8')));
//           });
//       });

//       it('responds to invalid request with 400 status and error message in body', () => {
//         return request(server)
//           .put('/markets')
//           .expect(400)
//           .expect(res => expect(res.body).toEqual({ error: {} }));
//       });
//     });
//   });
// });
