import { Link } from "react-router-dom";




function Card({ game, idVideogame }) {

  // console.log("idVideogame:", idVideogame);
  // console.log("videoGames:", game);


  const { Nombre, released, rating, Imagen, platforms, requirements, Generos
  } = game;
  //console.log("videoGames:", game);


  return (
    <div className="tarjeta">

      <Link to={`/videogames/${idVideogame}`}>
        <div className="nombre">{Nombre}</div>
      </Link>
      <h2>{released}</h2>
      <h2>{rating}</h2>
      <img src={Imagen} alt="juego" style={{ width: '200px', height: 'auto' }} />
      <h2>{platforms}</h2>
      <h2>{requirements}</h2>
      <h2>Generos:</h2>
      {Generos
        && Generos.length > 0 && (
          <ul>
            {Generos.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        )}
    </div>
  );
}


export default Card;
