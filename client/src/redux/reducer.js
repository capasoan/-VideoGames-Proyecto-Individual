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
      return {
        ...state,
        videoGames: state.videoGames.map(subArray =>
          subArray.slice().sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        )
      }

    case ORDENAR_POR_NOMBRE_DES:
      return {
        ...state,
        videoGames: state.videoGames.map(subArray =>
          subArray.slice().sort((a, b) => b.name.localeCompare(a.name)))
      };

    case ORDENAR_POR_RATING_AS:
      return {
        ...state,
        videoGames: state.videoGames.map(subArray =>
          subArray.slice().sort((a, b) => a.rating - b.rating))
      };

    case ORDENAR_POR_RATING_DES:
      return {
        ...state,
        videoGames: state.videoGames.map(subArray =>
          subArray.slice().sort((a, b) => b.rating - a.rating))
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
