
const axios = require('axios');
const { Videogame, Genre, GameGenre} = require('../db');

const gameDetail = async (req, res) => {
    const { idVideogame } = req.params;

    try {
        if (idVideogame.length > 10) {

            const gameDB = await Videogame.findByPk(idVideogame);

            if (!gameDB) {
                return res.status(404).json({ error: 'Juego no encontrado en la base de dato' });
            }

            const juegoGeneros = await GameGenre.findAll({ where: { VideogamesId: idVideogame } });
            const genreId = juegoGeneros.map(juegoGenero => juegoGenero.GenreId);
            const genre = await Genre.findAll({ where: { id: genreId } });

            return res.status(200).json({ game: gameDB, genre });
        } else {
            
            const apiKey= '0f6459a142804a0896467813bd49a55c';
            const allVideogames = [];
            const firstPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`);
            const secondPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=2&page_size=40`);
            const thirdPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=3&page_size=40`);
            const fourthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=4&page_size=40`);
            const fifthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=5&page_size=40`);
            let allPetitions = await Promise.all([firstPagePetition, secondPagePetition, thirdPagePetition, fourthPagePetition, fifthPagePetition]);
            const pageOne = allPetitions[0].data.results;
            const pageTwo = allPetitions[1].data.results;
            const pageThree = allPetitions[2].data.results;
            const pageFour = allPetitions[3].data.results;
            const pageFive = allPetitions[4].data.results;
            let games = pageOne.concat(pageTwo, pageThree, pageFour, pageFive);
            games.forEach((game) => {
                allVideogames.push({
                    id: game.id.toString(), 
                    name: game.name,
                    released: game.released,
                    rating: game.rating,
                    img: game.background_image,
                    platforms: game.platforms.map(p => p.platform.name),
                    requirements: game.platforms.map(platform => platform.requirements_en || platform.requirements_ru),
                    genres: game.genres.map(g => g.name),
                })
            })

            const gameAPI = allVideogames.find(juego => juego.id === idVideogame);

            if (!gameAPI) {
                return res.status(400).json({ error: "Juego no encontrado en la API" });
            } else {
                return res.status(200).json(gameAPI);
            }
        }
    } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json({ error: "Error 500" });
    }
}

module.exports = gameDetail;

























// // //RESULTADO DE LA BASE DE DATOS

// const { Videogame, Genre, GameGenre} = require('../db')
// const gameDetail = async(req, res)=>{
// try {
//     const { idVideogame } = req.params;

//     const game = await Videogame.findByPk(idVideogame);

//     if (!game) {
//       return res.status(404).json({ error: 'Juego no encontrado' });
//     }

//     const juegoGeneros = await GameGenre.findAll({ where: { VideogamesId: idVideogame } });
// //console.log("juegoGeneros",juegoGeneros)
//     const genreId = juegoGeneros.map(juegoGenero => juegoGenero.GenreId);
//     //console.log("genreId",genreId)
//     const genre = await Genre.findAll({ where: { id: genreId } });
//    // console.log("genre",genre)

//     res.status(200).json({ game, genre });

//   } catch (error) {
//     res.status(500).json({ error: 'Error 500' });
//   }
// }
// module.exports = gameDetail;


// //RESULTADO DE LA API
// const axios = require('axios');

// const gameDetail = async(req, res)=>{

//     const {idVideogame}= req.params
    
//     try{
//         const apiKey= '0f6459a142804a0896467813bd49a55c'
//         const allVideogames =[];
//                 const firstPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`);
//                 const secondPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=2&page_size=40`);
//                 const thirdPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=3&page_size=40`);
//                 const fourthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=4&page_size=40`);
//                 const fifthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=5&page_size=40`);
//                 let allPetitions = await Promise.all([firstPagePetition, secondPagePetition, thirdPagePetition, fourthPagePetition, fifthPagePetition]);
//                 pageOne = allPetitions[0].data.results;
//                 pageTwo = allPetitions[1].data.results;
//                 pageThree = allPetitions[2].data.results;
//                 pageFour = allPetitions[3].data.results;
//                 pageFive = allPetitions[4].data.results;
//                 let games = pageOne.concat(pageTwo, pageThree, pageFour, pageFive);
//                 games.forEach((game) => {
//                     allVideogames.push({
//                         id: game.id,
//                         name: game.name,
//                         released: game.released,
//                         rating: game.rating,
//                         img: game.background_image,
//                         platforms: game.platforms.map(p => p.platform.name),
//                         requirements: game.platforms.map(platform => platform.requirements_en || platform.requirements_ru),
//                         genres: game.genres.map(g => g.name),
//                     })
//                 })
        
//         console.log('games:', allVideogames);
//         const game = allVideogames.find(juego => juego.id === parseInt(idVideogame));



//         if(!game){
//             res.status(400).json({error: "Juego no encontrado"})
//         }else{
//             return  res.status(200).json(game)
//         }
    
//     }catch(error){
//         console.log("ERROR",error)
//         res.status(500).json({error:"Error 500"})
//     }

// }

// module.exports = gameDetail;