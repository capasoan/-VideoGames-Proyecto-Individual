const { Genre } = require('../db.js');

const allGenres = async (req, res) => {

      try {
        const genres = await Genre.findAll();
        if (!genres) {
          res.status(404).json({ error: "Lista no encontrada" });
        } else {
          res.status(200).json(genres);
        }
      } catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ error: "Error 500"});
      }
    }
    
    module.exports = allGenres;


















// const axios = require('axios'); 

// const allGenres = async (req, res) => {
//     try {
// const nombresUnicos= [];
// const apiKey= '0f6459a142804a0896467813bd49a55c'
// const allGenres =[];
//         const firstPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`);
//         const secondPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=2&page_size=40`);
//         const thirdPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=3&page_size=40`);
//         const fourthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=4&page_size=40`);
//         const fifthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=5&page_size=40`);
//         let allPetitions = await Promise.all([firstPagePetition, secondPagePetition, thirdPagePetition, fourthPagePetition, fifthPagePetition]);
//         pageOne = allPetitions[0].data.results;
//         pageTwo = allPetitions[1].data.results;
//         pageThree = allPetitions[2].data.results;
//         pageFour = allPetitions[3].data.results;
//         pageFive = allPetitions[4].data.results;
//         let games = pageOne.concat(pageTwo, pageThree, pageFour, pageFive)
//         games.forEach((game) => {
//           allGenres.push({
//             id: game.id,
//             genres: game.genres.map(g => g.name),
//             })
//         })


//         console.log('games:', allGenres);
//         allGenres.forEach((genres)=> {
//             if (genres.genres !== undefined && genres.genres !== null) {
//                 genres.genres.forEach((genre) =>{ 
//                     nombresUnicos[genre.trim()] = true; 
//                 });
//             }
//         });
//         const nombresUnicosArray = Object.keys(nombresUnicos);
//         res.status(200).json(nombresUnicosArray);
//     } catch(error) {
//         console.log("ERROR", error)
//         res.status(500).json({error: "Error 500"})
//     }
// }

// module.exports = allGenres;
