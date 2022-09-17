// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando /leaderboard', () => {
  describe('Rota /home', () => {
    it('Deve retornar os dados corretos', async () => {
      const response = await chai
        .request(app)
        .get('/leaderboard/home');

        expect(response.body[0].name).exist;
        expect(response.body[0].name).be.equal('Santos');
  
        expect(response.body[0].totalPoints).exist;
        expect(response.body[0].totalPoints).be.equal(9);

        expect(response.body[0].totalGames).exist;
        expect(response.body[0].totalGames).be.equal(3);

        expect(response.body[0].totalVictories).exist;
        expect(response.body[0].totalVictories).be.equal(3);

        expect(response.body[0].totalDraws).exist;
        expect(response.body[0].totalDraws).be.equal(0);
        
        expect(response.body[0].totalLosses).exist;
        expect(response.body[0].totalLosses).be.equal(0);

        expect(response.body[0].goalsFavor).exist;
        expect(response.body[0].goalsFavor).be.equal(9);

        expect(response.body[0].goalsOwn).exist;
        expect(response.body[0].goalsOwn).be.equal(3);

        expect(response.body[0].goalsBalance).exist;
        expect(response.body[0].goalsBalance).be.equal(6);

        expect(response.body[0].efficiency).exist;
        expect(response.body[0].efficiency).be.equal('100.00');
    });
  });

  describe('Rota /away', () => {
    it('Deve retornar os dados corretos', async () => {
      const response = await chai
        .request(app)
        .get('/leaderboard/away');

        expect(response.body[0].name).exist;
        expect(response.body[0].name).be.equal('Palmeiras');
  
        expect(response.body[0].totalPoints).exist;
        expect(response.body[0].totalPoints).be.equal(6);

        expect(response.body[0].totalGames).exist;
        expect(response.body[0].totalGames).be.equal(2);

        expect(response.body[0].totalVictories).exist;
        expect(response.body[0].totalVictories).be.equal(2);

        expect(response.body[0].totalDraws).exist;
        expect(response.body[0].totalDraws).be.equal(0);
        
        expect(response.body[0].totalLosses).exist;
        expect(response.body[0].totalLosses).be.equal(0);

        expect(response.body[0].goalsFavor).exist;
        expect(response.body[0].goalsFavor).be.equal(7);

        expect(response.body[0].goalsOwn).exist;
        expect(response.body[0].goalsOwn).be.equal(0);

        expect(response.body[0].goalsBalance).exist;
        expect(response.body[0].goalsBalance).be.equal(7);

        expect(response.body[0].efficiency).exist;
        expect(response.body[0].efficiency).be.equal('100.00');
    });
  });
});