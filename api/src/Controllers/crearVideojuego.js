
const { Videogame, Genre, GameGenre} = require('../db')

const { v4: uuidv4 } = require('uuid');

const createVideoGame = async (req, res) => {
    const { gameData, genreData } = req.body;
//    console.log("Datos del front:", req.body);

    try {
        transaction = await Videogame.sequelize.transaction();

        const id = uuidv4();

        const gameDataWithId = { ...gameData, id };
        const videogame = await Videogame.create(gameDataWithId, { transaction });
        let genre = await Genre.findOne({ where: { Nombre: genreData.Nombre } });

        if (!genre) {
            throw new Error("El género no existe");
        }

        await GameGenre.create(
            {
                VideogamesId: videogame.id,
                GenreId: genre.id,
            },
            { transaction }
        );
        await transaction.commit();

        res.status(201).json({ message: "Juego creado exitosamente" });
    } catch (error) {
        if (transaction) await transaction.rollback();

        console.error("Error al crear juego:", error);
        res.status(500).json({ error: "Error al crear juego" });
    }
};

module.exports = createVideoGame;
