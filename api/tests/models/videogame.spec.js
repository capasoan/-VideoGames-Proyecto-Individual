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



describe('Unique name validation', () => {
  beforeEach(async () => {
    await Videogame.sync({ force: true }); // Reinicia la base de datos para cada prueba
  });

  it('should not allow duplicate names', async () => {
    const uniqueName = 'Zelda';

    // Crear primer videojuego
    await Videogame.create({ 
      id: '12345678',
      nombre: uniqueName,
      plataformas: ['Nintendo Switch'],
      fechadelanzamiento: new Date(),
      rating: 9.0
    });

    // Intentar crear segundo videojuego con el mismo nombre
    try {
      await Videogame.create({ 
        id: '87654321',
        nombre: uniqueName,
        plataformas: ['Nintendo Switch'],
        fechadelanzamiento: new Date(),
        rating: 9.0
      });
      throw new Error('Should have thrown an error but did not');
    } catch (error) {
      expect(error.message).to.include('Validation error');
    }
  });
});