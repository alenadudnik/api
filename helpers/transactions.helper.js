import supertest from 'supertest';

class TransactionsHelper {
  response;

  async create(oneUserID, twoUserID, amount) {
    await supertest(process.env.BASE_URL)
      .post('/transactions')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send({ from: oneUserID, to: twoUserID, amount: amount })
      .then((res) => {
        this.response = res;
      });
  }

//   async getAll() {
//     await supertest(process.env.BASE_URL)
//       .post('/transactions')
//       .set('Authorization', `Bearer ${process.env.TOKEN}`)
//       .then((res) => {
//         this.response = res;
//       });
//   }
}

export default TransactionsHelper;
