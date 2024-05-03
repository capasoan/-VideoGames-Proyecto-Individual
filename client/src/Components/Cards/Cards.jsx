import Card from "../Card/Card";


function Cards({ videoGames }) {
//console.log("CardS", videoGames);

if (Array.isArray(videoGames) ) {

  videoGames = videoGames.flat();
} else if (!videoGames) {
  return null;
}

  return (
    <div className="tarjetas">
      {videoGames.map((game) => (
        <div >
          <Card 
          key={game.id}
          game={{
            Nombre: game.Nombre || game.name,
            Imagen: game.Imagen || game.img, 
            Generos: game.generos || game.genres
          }} 
          idVideogame={game.id}
              
        />
        </div>
      
      ))}
    </div>
  );
}

export default Cards;
