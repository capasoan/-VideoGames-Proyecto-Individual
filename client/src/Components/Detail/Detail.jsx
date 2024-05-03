import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { obtenerDetallesJuego } from "../../redux/actions";
import { Link } from 'react-router-dom';

const Detail = ({ game, obtenerDetallesJuego }) => {
  const { idVideogame } = useParams();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    setCargando(true);

    const obetenerData = async () => {
      try {
        await obtenerDetallesJuego(idVideogame);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener detalles del juego:', error);
        setCargando(false);
      }
    };

    obetenerData();
  }, [idVideogame, obtenerDetallesJuego]);

  if (cargando) {
    return <div className='cargando'></div>;
  }


  if (!game) {
    return <div>No se encontraron detalles del juego.</div>;
  }

  const { name, released, rating, img, platforms, requirements, genres, id } = game;
 // console.log('game', game)

  return (
    <div className='contenedor'>
      <div className='contenedorDetail'>
   
        <div className='contenedorImg'>
          <div className='contenedorInfo'>
            <h2>{name}</h2>
            <h2>Fecha de lanzamiento: {released}</h2>
            <h2>Rating: {rating}</h2>
            <h2>Plataformas: {platforms}</h2>
          </div>
          <img src={img} alt="juego" className="imgDetail" />
        </div>

        <div className='detail' key={game.id}>
        <button className="close-button">
          <Link className='closeLink' to="/homepage"></Link>
        </button>

          <h2>Descripción:</h2>
          <ul>
            {requirements.map((requirement, index) => (
              <li key={index}>
                {requirement ? (
                  typeof requirement === 'object' ? (
                    requirement.minimum !== undefined ? (
                      <>
                        <strong>Minimum:</strong> {requirement.minimum}<br />
                        <strong>Recommended:</strong> {requirement.recommended || "No hay recomendaciones disponibles"}
                      </>
                    ) : (
                      "No hay requisitos disponibles"
                    )
                  ) : (
                    requirement
                  )
                ) : (
                  "No hay requisitos disponibles"
                )}
              </li>
            ))}
          </ul>
          <h2>Géneros:</h2>
          <ul>
            {genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );


}

const mapStateToProps = (state) => ({
  game: state.detalleDelJuego,
});

export default connect(mapStateToProps, { obtenerDetallesJuego })(Detail);

