import { BUSCAR_JUEGO, OBTENER_DETALLES_JUEGO, FILTRAR_POR_GENERO, ORDENAR_POR_NOMBRE_DES, ORDENAR_POR_NOMBRE_AS, ORDENAR_POR_RATING_DES, ORDENAR_POR_RATING_AS, ACTUALIZAR_DATOS_FORMULARIO, ACTUALIZAR_DATOS_VALIDACIONES } from "./action-types.js";

const initialState = {
  videoGames: [],
  detalleDelJuego: null,
  juegosFiltradosPorGenero: [],
  formData: {
    name: '',
    released: '',
    rating: '',
    img: '',
    platforms: '',
    requirements: ''
  },
  validations: {
    name: '',
    released: '',
    rating: '',
    img: '',
    platforms: '',
    requirements: ''
  }

};

const rootReducer = (state = initialState, action) => {

  //console.log('Acción:', action.type); 
  //console.log('Payload:', action.payload); 
  //console.log('Estado antes de la acción:', state);

  switch (action.type) {

    case BUSCAR_JUEGO:
      return {
        ...state,
        videoGames: [...state.videoGames, action.payload]
      };

    case OBTENER_DETALLES_JUEGO:
      return {
        ...state,
        detalleDelJuego: action.payload
      };

    case FILTRAR_POR_GENERO:
      const nombreGenero = action.payload.toLowerCase();
      const juegosFiltrados = state.videoGames.flatMap(array =>
        array.filter(juego =>
          juego.genres && Array.isArray(juego.genres) && juego.genres.some(genero =>
            genero.toLowerCase() === nombreGenero
          )
        ));
      // console.log('nombreGenero',nombreGenero)
      // console.log('juegosFiltrados',juegosFiltrados)
      return {
        ...state,
        juegosFiltradosPorGenero: juegosFiltrados
      };

    case ORDENAR_POR_NOMBRE_AS:

      const allGamesAs = state.videoGames.flat();

      const sortedGamesByNameAsc = [...allGamesAs].sort((a, b) => a.name.localeCompare(b.name));

      return {
        ...state,
        videoGames: [sortedGamesByNameAsc]
      };

    case ORDENAR_POR_NOMBRE_DES:
      const allGamesDes = state.videoGames.flat();
      const sortedGamesByNameDesc = [...allGamesDes].sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        videoGames: [sortedGamesByNameDesc]
      };

    case ORDENAR_POR_RATING_AS:

      const allGamesRas = state.videoGames.flat();
      const sortedGamesByRatingAsc = [...allGamesRas].sort((a, b) => a.rating - b.rating);
      return {
        ...state,
        videoGames: [sortedGamesByRatingAsc]
      };

    case ORDENAR_POR_RATING_DES:
      const allGamesRdes = state.videoGames.flat();
      const sortedGamesByRatingDesc = [...allGamesRdes].sort((a, b) => b.rating - a.rating);
      return {
        ...state,
        videoGames: [sortedGamesByRatingDesc]
      };


    case ACTUALIZAR_DATOS_FORMULARIO:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        }
      };

    case ACTUALIZAR_DATOS_VALIDACIONES:
      return {
        ...state,
        validations: {
          ...state.validations,
          ...action.payload,
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
