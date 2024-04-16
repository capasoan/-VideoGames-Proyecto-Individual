// const { Videogame } = require('../db.js');

// const allGames = async (req, res) => {

//       try {
//         const Videogames = await Videogame.findAll();
//         if (!Videogames) {
//           res.status(404).json({ error: "Lista no encontrada" });
//         } else {
//           res.status(200).json(Videogames);
//         }
//       } catch (error) {
//         console.error("ERROR:", error);
//         res.status(500).json({ error: error.message });
//       }
//     }
    
//     module.exports = allGames;




















const axios = require('axios');

const allGames = async (req, res) => {
    try {
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


        
       console.log('games:', allVideogames);
        res.status(200).json(allVideogames);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Games not found" });
    }
}

module.exports = allGames;