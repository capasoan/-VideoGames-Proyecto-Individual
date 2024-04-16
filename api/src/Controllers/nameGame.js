// RESPUESTA DE LA API
const axios = require('axios');

const nameGame = async(req, res)=>{

    const {nombre}= req.query
    
   
    try{
        const apiKey= '0f6459a142804a0896467813bd49a55c'
        const allVideogames =[];
        const firstPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`);
        const secondPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=2&page_size=40`);
        const thirdPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=3&page_size=40`);
        const fourthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=4&page_size=40`);
        const fifthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=5&page_size=40`);
        let allPetitions = await Promise.all([firstPagePetition, secondPagePetition, thirdPagePetition, fourthPagePetition, fifthPagePetition]);
        pageOne = allPetitions[0].data.results;
        pageTwo = allPetitions[1].data.results;
        pageThree = allPetitions[2].data.results;
        pageFour = allPetitions[3].data.results;
        pageFive = allPetitions[4].data.results;
        let games = pageOne.concat(pageTwo, pageThree, pageFour, pageFive)
        games.forEach((game) => {
            allVideogames.push({
                id: game.id,
                name: game.name,
                released: game.released,
                rating: game.rating,
                img: game.background_image,
                platforms: game.platforms.map(p => p.platform.name),
                requirements: game.platforms.map(platform => platform.requirements_en || platform.requirements_ru),
                genres: game.genres.map(g => g.name),
            })
        })

      // console.log('games:', games);
      const game = allVideogames.find(juego => juego.name.toLowerCase() === nombre.toLowerCase());

        console.log('game:', game);



        if(!game){
            res.status(400).json({error: "Juego no encontrado"})
        }else{
            return  res.status(200).json(game)
        }
    
    }catch(error){
        console.log("ERROR",error)
        res.status(500).json({error:"Error 500"})
    }

}

module.exports = nameGame;








// // RESPUESTA DE LA DB
// const { Videogame, Genre, GameGenre } = require('../db')


// const nameGame = async (req, res) => {
//     const { nombre } = req.query;

//     try {
//         const juegos = await Videogame.findAll({
//             where: {
//                 Nombre: nombre
//             },
//             attributes: ['Nombre', 'Descripcion', 'Plataformas', 'Imagen', 'Fechadelanzamiento', 'Rating', 'id'],
//             limit: 15
//         });

//         if (!juegos || juegos.length === 0) {
//             console.log('Juego no encontrado');
//             return res.status(404).json({ error: "Juego no encontrado" });
//         }

//         const juegosIds = juegos.map(conductor => conductor.id);

//         const gameGenreRs = await GameGenre.findAll({
//             where: { VideogamesId: juegosIds },
//         });

//         if (!gameGenreRs || gameGenreRs.length === 0) {
//             return res.status(404).json({ error: "El juego no está asociado a ningún genero" });
//         }

//         const generoJuegos = juegos.map(juego => {
//             const generos = gameGenreRs
//                 .filter(genreGame => genreGame.VideogamesId === juego.id)
//                 .map(genreGame => ({
//                     id: genreGame.GenreId,
//                     Nombre: ''
//                 }));
//             return {
//                 ...juegos,
//                 generos
//             };
//         });


//         for (let i = 0; i < generoJuegos.length; i++) {
//             for (let j = 0; j < generoJuegos[i].generos.length; j++) {
//                 const genero = await Genre.findByPk(generoJuegos[i].generos[j].id);
//                 generoJuegos[i].generos[j].Nombre = genero.Nombre;
//             }
//         }

//         res.status(200).json({ juegos: generoJuegos });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: "Error 500" });
//     }
// };

// module.exports = nameGame;



