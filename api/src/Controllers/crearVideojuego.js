const { Videogame, Genre, GameGenre } = require('../db');
const { v4: uuidv4 } = require('uuid');

const createVideoGame = async (req, res) => {
    const { gameData, genreData } = req.body;

    try {
        const transaction = await Videogame.sequelize.transaction();

        const id = uuidv4();

        const gameDataWithId = { ...gameData, id };
        const videogame = await Videogame.create(gameDataWithId, { transaction });

        if (Array.isArray(genreData)) {
            for (const genre of genreData) {
                let genreName = genre.Nombre || genre; 
                let foundGenre = await Genre.findOne({ where: { Nombre: genreName } });
                if (!foundGenre) {
                    throw new Error(`El género '${genreName}' no existe`);
                }
                await GameGenre.create(
                    {
                        VideogamesId: videogame.id,
                        GenreId: foundGenre.id,
                    },
                    { transaction }
                );
            }
        } else {
            let genreName = genreData.Nombre || genreData; // Permite manejar tanto objetos de género como solo nombres de género
            let foundGenre = await Genre.findOne({ where: { Nombre: genreName } });
            if (!foundGenre) {
                throw new Error(`El género '${genreName}' no existe`);
            }
            await GameGenre.create(
                {
                    VideogamesId: videogame.id,
                    GenreId: foundGenre.id,
                },
                { transaction }
            );
        }

        await transaction.commit();

        res.status(201).json({ message: "Juego creado exitosamente" });
    } catch (error) {
        console.error("Error al crear juego:", error);
        if (transaction) await transaction.rollback();
        res.status(500).json({ error: "Error al crear juego" });
    }
};

module.exports = createVideoGame;
