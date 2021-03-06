import supertest from 'supertest';
import { expect } from 'chai';
import 'dotenv/config';

describe('AUTH LOG IN', function () {
  const request = supertest(process.env.BASE_URL);

  describe('SUCCESSFUL LOG IN', function () {
    let result;

    before(async function () {
      await request
        .post('/auth')
        .send({ login: process.env.LOGIN, password: process.env.PASSWORD })
        .then((res) => {
          result = res;
        });
    });

    it('response status code is 200', function () {
      expect(result.statusCode).to.eq(200);
    });

    it('response body contains authorization token', function () {
      expect(result.body.token).not.to.be.undefined;
    });
  });

  describe('UNSUCCESSFUL LOG IN', function () {
    let result;

    before(async function () {
      await request
        .post('/auth')
        .send({ login: 'invalid', password: 'invalid' })
        .then((res) => {
          result = res;
        });
    });

    it('response status code is 404', function () {
      expect(result.statusCode).to.eq(404);
    });

    it('response body contains error message', function () {
      expect(result.body.message).to.eq('Wrong login or password.');
    });
  });
});
