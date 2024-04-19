import Card from "../Card/Card";

function Cards({ videoGames }) {
//console.log("CardS", videoGames);

if (Array.isArray(videoGames) ) {

  videoGames = videoGames.flat();
} else if (!videoGames) {
  return null;
}

  return (
    <div>
      {videoGames.map((game) => (
        <Card
          key={game.id}
          game={{
            Nombre: game.name,
            Imagen: game.img,
            Generos: game.genres
          }} 
          idVideogame={game.id}
          
          
        />
      ))}
    </div>
  );
}

export default Cards;
