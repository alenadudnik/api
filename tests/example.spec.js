const expect = require('chai').expect;
const strOfLength = require('../strLength');

describe('LENGTH OF STRING', function () {


    it('should return length of string', function () {
        expect(strOfLength('18')).eq(2)
    })

    it('should return length of string', function () {
        expect(strOfLength('Alena')).eq(5)
    })
})