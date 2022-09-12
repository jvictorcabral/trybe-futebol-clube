import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /teams', () => {
  describe('Rota do tipo GET', () => {
    it('Deve retornar o status 200 e um array de times', async () => {
      const response = await chai
        .request(app)
        .get('/teams');

      expect(response.status).be.equal(200);
      expect(response.body).be.an('array');
    });

    it('Deve retornar um array com o time correto', async () => {
      const response = await chai
      .request(app)
      .get('/teams');

      expect(response.body[0].id).exist;
      expect(response.body[0].id).be.equal(1);
      expect(response.body[0].teamName).exist;
      expect(response.body[0].teamName).be.string;
      expect(response.body[0].teamName).to.be.equal('Avaí/Kindermann');
    })
  })
})