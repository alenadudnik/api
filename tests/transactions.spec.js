import UsersHelper from '../helpers/users.helper';
import TransactionHelper from "../helpers/transactions.helper";
import {expect} from "chai";


describe('TRANSACTIONS', function () {
  let transactionHelper = new TransactionHelper();
  let userHelper = new UsersHelper();
  let oneUserID;
  let twoUserID;
  let oneAmount = Math.floor(Math.random() * 100)

  before(async function() {
	  await userHelper.create()
	  oneUserID = userHelper.response.body.id
	  await userHelper.create()
	  twoUserID = userHelper.response.body.id
  })

	describe('successful transaction creation', function() {
		before(async function() {
			await transactionHelper.create(oneUserID, twoUserID, oneAmount)
		})

		it('response status code is 200', function() {
			expect(transactionHelper.response.statusCode).to.eq(200)
		})

		it('response body contains ID', function() {
			expect(transactionHelper.response.body.id).not.to.be.undefined
		})

		it('response body contains FROM', function() {
			expect(transactionHelper.response.body.from).not.to.be.undefined
		})

		it('response body contains TO', function() {
			expect(transactionHelper.response.body.to).not.to.be.undefined
		})

		it('response body contains AMOUNT', function() {
			expect(transactionHelper.response.body.amount).not.to.be.undefined
		})

		it('value FROM is equal value ID in response create oneUser', function() {
			expect(transactionHelper.response.body.from).to.be.eq(oneUserID)
		})

		it('value TO is equal value ID in response create twoUser', function() {
			expect(transactionHelper.response.body.to).to.be.eq(twoUserID)
		})

		it('value AMOUNT has correct value ', function() {
			expect(transactionHelper.response.body.amount).to.be.eq(oneAmount)
		})
	})

	describe('unsuccessful transaction creation, invalid credential of oneUsedID', function() {
		before(async function() {
			await transactionHelper.create(12345, twoUserID, oneAmount)
		})

		it('response status code is 400', function() {
			expect(transactionHelper.response.statusCode).to.eq(400)
		})

		it('response body contains success message', function () {
			expect(transactionHelper.response.body.message).to.eq('Sender not found.');
		});
	})

	describe('unsuccessful transaction creation, invalid credential of twoUsedID', function() {
		before(async function() {
			await transactionHelper.create(oneUserID, 6789, oneAmount)
		})

		it('response status code is 400', function() {
			expect(transactionHelper.response.statusCode).to.eq(400)
		})

		it('response body contains success message', function () {
			expect(transactionHelper.response.body.message).to.eq('Receiver not found.');
		});
	})

// 	describe('get all transactions', function() {
// 		before(async function() {
// 			await
// 		})
// 	})
});
