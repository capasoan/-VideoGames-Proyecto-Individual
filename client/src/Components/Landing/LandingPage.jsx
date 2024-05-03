import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";



function LandingPage({ idVideogame }) {
    const [games, setGames] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/allGames')
            .then(response => {
                setGames(response.data.slice(110, 130));
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }, []);


    const openPopup = (game) => {
        setSelectedGame(game);
        setShowPopup(true);
    }

    const closePopup = () => {
        setSelectedGame(null);
        setShowPopup(false);
    }


    return (
        <div>
            <div className="backgroundStyle">
                <div className="botones">
                    <NavLink to="/homepage">
                        <button className="button">GAME NEWS STATION</button>
                    </NavLink>

                    <NavLink to="/Form">
                        <button className='button'>CREAR NUEVO VIDEO JUEGO</button>
                    </NavLink>
                </div>

                <div className="tarjetas">
                    {games.map(game => (
                        <div key={game.id} className="tarjeta" onClick={() => openPopup(game)}>
                            <div className="tarjeta-container">
                            <h2 className="nombre">{game.name}</h2>
                                <img src={game.img} alt={game.name} className="img" />
                            </div>
                        </div>
                    ))}
                </div>
                {showPopup && (
                <div className="containPopup">
                    <div className="popup">
                        <button className="closePopup" onClick={closePopup}></button>
                        <div className="popupInfo">
                            <Link to={`/videogames/${selectedGame.id}`}>
                                <div className="nombre">{selectedGame.name}</div>
                            </Link>
                            <img src={selectedGame.img} alt={selectedGame.name} style={{ width: '500px', height: 'auto' , display:'flexbox' }}/>
                            <p>Rating: {selectedGame.rating}</p>
                            <p>Fecha de lanzamiento: {selectedGame.released}</p>
                            <p>Plataformas:<br/> {selectedGame.platforms}</p>
                        </div>
                    </div>
                </div>
            )}
            </div>   
        </div>
    );

}

export default LandingPage;
