import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const validUser = {
  email: 'user@user.com',
  password: 'secret_user',
};

const invalidUser1 = {
  email: '',
  password: 'secret_user',
};

const invalidUser2 = {
  email: 'user@user.com',
  password: '',
};

const invalidUser3 = {
  email: 'invalid@email.com',
  password: 'secret_user',
}

const invalidUser4 = {
  email: 'user@user.com',
  password: 'invalidPassword',
}

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjYyOTc0ODM1fQ.SfTYGUt-Jaxdd7nCYvzk9JFF3OKP-DiXxaEp9tD-yEU'

const invalidToken = 'invalidToken'

describe('Testando /login', () => {
  
  afterEach(() => {
    sinon.restore();
  });

  describe('Rota do tipo POST', () => {
    it('deve retornar o status 200 e o token', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(validUser);

        expect(response.status).be.equal(200);
        expect(response.body).have.property('token');
    })

    it('deve retornar o status 400 e a mensagem', async () => {
      const errMessage = 'All fields must be filled';

      const response = await chai
        .request(app)
        .post('/login')
        .send(invalidUser1);

      expect(response.status).be.equal(400);
      expect(response.body).have.property('message');
      expect(response.body.message).be.equal(errMessage);

      const response2 = await chai
        .request(app)
        .post('/login')
        .send(invalidUser2);

      expect(response2.status).be.equal(400);
      expect(response2.body).have.property('message');
      expect(response2.body.message).be.equal(errMessage);
    });

    it('deve retornar o status 401 e a mensagem', async () => {
      const errMessage = 'Incorrect email or password';

      const response = await chai
        .request(app)
        .post('/login')
        .send(invalidUser3);

      expect(response.status).be.equal(401);
      expect(response.body).have.property('message');
      expect(response.body.message).be.equal(errMessage);

      const response2 = await chai
        .request(app)
        .post('/login')
        .send(invalidUser4);

      expect(response2.status).be.equal(401);
      expect(response2.body).have.property('message');
      expect(response2.body.message).be.equal(errMessage);
    });    
  })

  describe('Rota do tipo GET', () => {
    it('deve retornar o status 200 e a role do user', async () => {
      const response = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', validToken)

      expect(response.status).be.equal(200);
      expect(response.body).have.property('role');
      expect(response.body.role).be.equal('user');
    })

    it('deve retornar o status 401 e a role do user', async () => {
      const errMessage = 'Token must be a valid token'

      const response = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', invalidToken)

      expect(response.status).be.equal(401);
      expect(response.body).have.property('message');
      expect(response.body.message).be.equal(errMessage);
    })
  })
});
