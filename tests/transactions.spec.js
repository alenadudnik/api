import UsersHelper from '../helpers/users.helper';
import TransactionHelper from "../helpers/transactions.helper";
import {expect} from "chai";
import {getRandomItem} from "../helpers/common.helper";


describe('TRANSACTIONS', function () {
  let transactionsHelper = new TransactionHelper();
  let userHelper = new UsersHelper();
  let senderID;
  let receiverID;
  let amount = Math.floor(Math.random() * 100)
	let transactionId

  before(async function() {
	  await userHelper.create()
	  senderID = userHelper.response.body.id
	  await userHelper.create()
	  receiverID = userHelper.response.body.id
	  await transactionsHelper.create()
	  transactionId = transactionsHelper.response.body.id
  })

	describe('SUCCESSFUL CREATION TRANSACTION', function() {
		before(async function() {
			await transactionsHelper.create(senderID, receiverID, amount)
		})

		it('response status code is 200', function() {
			expect(transactionsHelper.response.statusCode).to.eq(200)
		})

		it('response body contains ID', function() {
			expect(transactionsHelper.response.body.id).not.to.be.undefined
		})

		it('response body contains FROM', function() {
			expect(transactionsHelper.response.body.from).not.to.be.undefined
		})

		it('response body contains TO', function() {
			expect(transactionsHelper.response.body.to).not.to.be.undefined
		})

		it('response body contains AMOUNT', function() {
			expect(transactionsHelper.response.body.amount).not.to.be.undefined
		})

		it('value FROM is equal value ID in response create oneUser', function() {
			expect(transactionsHelper.response.body.from).to.be.eq(senderID)
		})

		it('value TO is equal value ID in response create twoUser', function() {
			expect(transactionsHelper.response.body.to).to.be.eq(receiverID)
		})

		it('value AMOUNT has correct value ', function() {
			expect(transactionsHelper.response.body.amount).to.be.eq(amount)
		})
	})

	describe('UNSUCCESSFUL CREATION TRANSACTION, invalid credential of senderID', function() {
		before(async function() {
			await transactionsHelper.create(12345, receiverID, amount)
		})

		it('response status code is 400', function() {
			expect(transactionsHelper.response.statusCode).to.eq(400)
		})

		it('response body contains success message', function () {
			expect(transactionsHelper.response.body.message).to.eq('Sender not found.');
		});
	})

	describe('UNSUCCESSFUL CREATION TRANSACTION, invalid credential of receiverID', function() {
		before(async function() {
			await transactionsHelper.create(senderID, 6789, amount)
		})

		it('response status code is 400', function() {
			expect(transactionsHelper.response.statusCode).to.eq(400)
		})

		it('response body contains success message', function () {
			expect(transactionsHelper.response.body.message).to.eq('Receiver not found.');
		});
	})

	describe('GET ALL TRANSACTION', function() {
		before(async function() {
			await transactionsHelper.create(senderID, receiverID, amount)
			await transactionsHelper.getAll()
		})

		it('response status code is 200', function() {
			expect(transactionsHelper.response.statusCode).to.eq(200)
		})

		it('response body contains list of 2 or more items', function() {
			expect(transactionsHelper.response.body.length).to.eq(2)
		})

		it('response body array items contains transaction ID', function() {
			expect(getRandomItem(transactionsHelper.response.body).id).not.to.be.undefined
		})

		it('response body array items contains sender ID', function() {
			expect(getRandomItem(transactionsHelper.response.body).from).not.to.be.undefined
		})

		it('response body array items contains receiver ID', function() {
			expect(getRandomItem(transactionsHelper.response.body).to).not.to.be.undefined
		})
	})
});
