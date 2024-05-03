require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Videogames = require('./models/Videogames.js');
const Genres = require('./models/Genres.js')
const GameGenres = require('./models/GameGenres.js')
const axios = require('axios');
//const { v4: uuidv4 } = require('uuid');



const { DB_USER, DB_PASSWORD, DB_HOST, } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


Videogames(sequelize);
Genres(sequelize);
GameGenres(sequelize);

const { Videogame, Genre, GameGenre } = sequelize.models;

Videogame.belongsToMany(Genre, { through: GameGenre, foreignKey: 'VideogamesId', otherKey: 'GenreId', });
Genre.belongsToMany(Videogame, { through: GameGenre, foreignKey: 'GenreId', otherKey: 'VideogamesId', });


// const cargarRelaciones = async () => {
//   try {
//     const response = await axios.get('https://api.rawg.io/api/games?key=0f6459a142804a0896467813bd49a55c');
//     const juegos = response.data.results.map(game => {
//       return {
//         id: game.id,
//         Nombre: game.name,
//         rating: game.rating,
//         genres: game.genres.map(genre => genre.name),
//       };
//     });
//     //console.log(juegos)
//     const games = await Videogame.findAll();
//     //console.log(games)

//     const relacionesGenrosdeJuegos = [];

//     for (const game of games) {
//       const generodejuegos = juegos.find(data => {
//         const namesMatch = data.Nombre === game.Nombre;
//         const ratingMatch = data.rating === game.Rating;
//         return namesMatch && ratingMatch;

//       });
//       //console.log(generodejuegos)


//       if (generodejuegos) {
//         if (generodejuegos.genres) {
//           const juegosGenero = generodejuegos.genres.map(genre => genre.trim());
//           //console.log(juegosGenero)


//           for (const juegosG of juegosGenero) {
//             const matchingGenres = await Genre.findOne({ where: { Nombre: juegosG } });
//             //console.log(matchingGenres)

//             if (matchingGenres) {
//               relacionesGenrosdeJuegos.push({
//                 VideogamesId: game.id,
//                 GenreId: matchingGenres.id
//               });

//             } else {
//               // console.log(`No se encontró el equipo "${teamName}" en la base de datos.`);
//             }
//           }
//         } else {
//           //console.log(`El conductor ${driver.Nombre} ${driver.Apellido} en el archivo JSON no tiene equipos asociados.`);
//         }
//       } else {
//         // console.log(`No se encontró el conductor ${driver.Nombre} ${driver.Apellido} en el archivo JSON.`);
//       }
//     }

//     //console.log(relacionesGenrosdeJuegos);

//     await GameGenre.bulkCreate(relacionesGenrosdeJuegos);

//   } catch (error) {
//     console.error('Error al cargar los datos:', error);
//   }
// }

// cargarRelaciones();


// const cargarGeneros = async () => {
//   try {

//     const nombresUnicos = [];

//     const apiKey = '0f6459a142804a0896467813bd49a55c'

//     let contador = 1;
//     const generos = [];
//     const generosUnicos = [];

//     const firstPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`);
//     const secondPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=2&page_size=40`);
//     const thirdPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=3&page_size=40`);
//     const fourthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=4&page_size=40`);
//     const fifthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=5&page_size=40`);
//     let allPetitions = await Promise.all([firstPagePetition, secondPagePetition, thirdPagePetition, fourthPagePetition, fifthPagePetition]);
    
//     pageOne = allPetitions[0].data.results;
//     pageTwo = allPetitions[1].data.results;
//     pageThree = allPetitions[2].data.results;
//     pageFour = allPetitions[3].data.results;
//     pageFive = allPetitions[4].data.results;
    
//     let games = pageOne.concat(pageTwo, pageThree, pageFour, pageFive)
    
//     games.forEach((game) => {
  
//       generosUnicos.push({
//         id: game.id,
//         genres: game.genres.map(g => g.name),
//       })
//     })
//     // console.log('games:', generosUnicos);

//     generosUnicos.forEach((juego) => {
//       if (juego.genres) {
//         juego.genres.forEach((genero) => {
//           const generoExistente = generos.find(item => item.Nombre === genero);
//           if (!generoExistente) {
//             generos.push({ id: contador++, Nombre: genero });
//           }
//         });
//       }
//     });

//     console.log("Aqui:", generos);

//     await Genre.bulkCreate(generos);

//     console.log('Datos cargados exitosamente en la base de datos');
//   } catch (error) {
//     console.error('Error al cargar los datos:', error);
//   }
// };

// cargarGeneros();




// const cargarGames = async () => {
//   try {
//     const response = await axios.get('https://api.rawg.io/api/games?key=0f6459a142804a0896467813bd49a55c');

//     const games = response.data.results.map(game => {
//       const requirements = game.platforms.map(platform => ({
//         minimum: platform.requirements_en?.minimum || null,
//         recommended: platform.requirements_en?.recommended || null
//       }));

//       return {
//         id: uuidv4(),
//         Nombre: game.name,
//         Descripcion: {
//           minimum: requirements.length > 0 ? requirements[0]?.minimum || null : null,
//           recommended: requirements.length > 0 ? requirements[0]?.recommended || null : null
//         },
//         Plataformas: game.platforms.map(platform => platform.platform.name),
//         Imagen: game.background_image,
//         Fechadelanzamiento: game.released,
//         Rating: game.rating,
//       };
//     });

//     //console.log('Videogame', games);

//     await Videogame.bulkCreate(games);

//   } catch (error) {
//     console.error('Error al cargar los datos:', error);
//   }
// }

// cargarGames();


module.exports = {
  Videogame,
  Genre,
  GameGenre,
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};



