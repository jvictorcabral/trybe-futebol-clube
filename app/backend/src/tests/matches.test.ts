import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjYyOTc0ODM1fQ.SfTYGUt-Jaxdd7nCYvzk9JFF3OKP-DiXxaEp9tD-yEU'

describe('Testando /matches', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('Rota do tipo GET', () => {
    it('Deve retornar o status 200 e um array com as partidas', async () => {
      const response = await chai
        .request(app)
        .get('/matches');

      expect(response.status).be.equal(200);
      expect(response.body).be.an('array');
    })

    it('Deve retornar um array com as propriedades corretas', async () => {
      const response = await chai
        .request(app)
        .get('/matches');

      expect(response.body[0].id).exist;
      expect(response.body[0].id).be.equal(1);

      expect(response.body[0].homeTeam).exist;
      expect(response.body[0].homeTeam).be.equal(16);

      expect(response.body[0].homeTeamGoals).exist;
      expect(response.body[0].homeTeamGoals).be.equal(1);

      expect(response.body[0].awayTeam).exist;
      expect(response.body[0].awayTeam).be.equal(8);

      expect(response.body[0].awayTeamGoals).exist;
      expect(response.body[0].awayTeamGoals).be.equal(1);

      expect(response.body[0].inProgress).exist;
      expect(response.body[0].inProgress).be.equal(false);

      expect(response.body[0].teamHome).exist;
      expect(response.body[0].teamHome).have.property('teamName');
      expect(response.body[0].teamHome.teamName).be.equal('São Paulo');

      expect(response.body[0].teamAway).exist;
      expect(response.body[0].teamAway).have.property('teamName');
      expect(response.body[0].teamAway.teamName).be.equal('Grêmio');
    });
  })

  describe('GET /matches?inProgress=true', () => {
    it('Deve retornar o status 200 e um array com as partidas em andamento', async () => {
      const response = await chai
        .request(app)
        .get('/matches?inProgress=true');

        expect(response.status).be.equal(200);
        expect(response.body).be.an('array');
    })

    it('Deve retornar um array com as propriedades corretas', async () => {
      const response = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(response.body[0].id).exist;
      expect(response.body[0].id).be.equal(41);

      expect(response.body[0].homeTeam).exist;
      expect(response.body[0].homeTeam).be.equal(16);

      expect(response.body[0].homeTeamGoals).exist;
      expect(response.body[0].homeTeamGoals).be.equal(2);

      expect(response.body[0].awayTeam).exist;
      expect(response.body[0].awayTeam).be.equal(9);

      expect(response.body[0].awayTeamGoals).exist;
      expect(response.body[0].awayTeamGoals).be.equal(0);

      expect(response.body[0].inProgress).exist;
      expect(response.body[0].inProgress).be.equal(true);

      expect(response.body[0].teamHome).exist;
      expect(response.body[0].teamHome).have.property('teamName');
      expect(response.body[0].teamHome.teamName).be.equal('São Paulo');

      expect(response.body[0].teamAway).exist;
      expect(response.body[0].teamAway).have.property('teamName');
      expect(response.body[0].teamAway.teamName).be.equal('Internacional');
    })
  })

  describe('GET /matches?inProgress=false', () => {
    it('Deve retornar o status 200 e um array com as partidas em andamento', async () => {
      const response = await chai
        .request(app)
        .get('/matches?inProgress=false');

        expect(response.status).be.equal(200);
        expect(response.body).be.an('array');
    })

    it('Deve retornar um array com as propriedades corretas', async () => {
      const response = await chai
        .request(app)
        .get('/matches?inProgress=false');

      expect(response.body[0].id).exist;
      expect(response.body[0].id).be.equal(1);

      expect(response.body[0].homeTeam).exist;
      expect(response.body[0].homeTeam).be.equal(16);

      expect(response.body[0].homeTeamGoals).exist;
      expect(response.body[0].homeTeamGoals).be.equal(1);

      expect(response.body[0].awayTeam).exist;
      expect(response.body[0].awayTeam).be.equal(8);

      expect(response.body[0].awayTeamGoals).exist;
      expect(response.body[0].awayTeamGoals).be.equal(1);

      expect(response.body[0].inProgress).exist;
      expect(response.body[0].inProgress).be.equal(false);

      expect(response.body[0].teamHome).exist;
      expect(response.body[0].teamHome).have.property('teamName');
      expect(response.body[0].teamHome.teamName).be.equal('São Paulo');

      expect(response.body[0].teamAway).exist;
      expect(response.body[0].teamAway).have.property('teamName');
      expect(response.body[0].teamAway.teamName).be.equal('Grêmio');
    })
  })

  describe('Rota do tipo POST', () => {
    it('Deve retornar o status 201 e um objeto', async () => {
      const match = {
        'homeTeam': 16,
        'awayTeam': 8,
        'homeTeamGoals': 99,
        'awayTeamGoals': 11,
      };
  
      const response = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', validToken)
          .send(match);

  
        expect(response.status).be.equal(201);
        expect(response.body).be.an('object');
    })
  })

  describe('PATCH /:id/finish', () => {

    it('Deve retornar o status 200 e uma menssagem', async () => {
      const response = await chai
        .request(app)
        .patch('/matches/1/finish')

      expect(response.status).be.equal(200);
      expect(response.body).have.property('message');
      expect(response.body.message).be.equal('Finished');
    })
  })

  describe('PATCH /:id', () => {
    it('Deve retornar o status 200 e um objeto', async () => {
      const response = await chai
        .request(app)
        .patch('/matches/2')
        .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1,
      });

      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.exist;
      expect(response.body.id).to.be.equal(2);
      expect(response.body.homeTeamGoals).to.exist;
      expect(response.body.homeTeamGoals).to.be.equal(3);
      expect(response.body.awayTeamGoals).to.exist;
      expect(response.body.awayTeamGoals).to.be.equal(1);
    });
  });
});