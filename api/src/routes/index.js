const { Router } = require('express');
const router = Router();

const nameGame = require('../Controllers/nameGame');
const allGames = require('../Controllers/allGames');
const gameDetail = require ('../Controllers/gameDetail');
const createVideoGame = require('../Controllers/crearVideojuego')
const allGenres = require('../Controllers/allGenres')

router.get("/videogames/name", nameGame);
router.get("/allGames", allGames );
router.get("/videogames/:idVideogame", gameDetail);
router.post("/videogames/create", createVideoGame );
router.get("/genres",allGenres )




module.exports = router;
