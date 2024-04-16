import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { obtenerDetallesJuego } from "../../redux/actions";

const Detail = ({ game, obtenerDetallesJuego }) => {
  const { idVideogame } = useParams();


  useEffect(() => {
    obtenerDetallesJuego(idVideogame);
  }, [idVideogame, obtenerDetallesJuego]);

  if (!game) {
    return <div>Cargando...</div>;
  }

  const {  name, released, rating, img, platforms, requirements, genres, id} = game;

  //console.log(game)
  return (
    <div>
      <h2>ID: {id}</h2>
      <h2>Nombre: {name}</h2>
      <h2>Fecha de lanzamiento: {released}</h2>
      <h2>Rating: {rating}</h2>
      <img src={img} alt="Videogames" />
      <h2>Plataformas: {platforms}</h2>
      <h2>Descripción:</h2>
      <ul>
        {requirements.map((requirement, index) => (
          <li key={index}>
            {requirement ? (
              <>
                <strong>Minimum:</strong> {requirement.minimum}<br />
                <strong>Recommended:</strong> {requirement.recommended}
              </>
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
  );
  
  
}

const mapStateToProps = (state) => ({
  game: state.detalleDelJuego,
});

export default connect(mapStateToProps, { obtenerDetallesJuego })(Detail);

