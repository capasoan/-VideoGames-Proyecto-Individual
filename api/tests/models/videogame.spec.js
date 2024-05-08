const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Super Mario Bros' });
      });
    });
  });
});


describe('Rating validation', () => {
  it('should throw an error if rating is negative', (done) => {
    Videogame.create({ name: 'Super Mario Bros', rating: -1 })
      .then(() => done(new Error('Negative ratings should not be allowed')))
      .catch(() => done());
  });

  it('should work when rating is a valid number', () => {
    Videogame.create({ name: 'Super Mario Bros', rating: 8.5 });
  });
});