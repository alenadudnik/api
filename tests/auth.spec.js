import supertest from 'supertest'
import { expect } from "chai";

describe('AUTH LOG IN', function () {
    const request = supertest('http://paysis.herokuapp.com')

    it('should successful log in', function () {
        request
            .post('/auth')
            .send({login: 'adminius', password: 'supers3cret'})
            .end(function (err, res) {
                expect(res.statusCode).to.eq(200)
                expect(res.body.token).not.to.be.undefined
            })
    });

    it('should unsuccessful log in', function () {
        request
            .post('/auth')
            .send({login: 'invalid', password: 'invalid'})
            .end(function (err, res) {
                expect(res.statusCode).to.eq(404)
                expect(res.body.message).to.eq('Wrong login or password.')
            })
    });
})