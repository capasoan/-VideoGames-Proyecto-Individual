import { NavLink } from "react-router-dom";


function LandingPage() {
    const backgroundStyle = {
        backgroundImage: `url('http://images6.fanpop.com/image/photos/38600000/Neon-Playstation-video-games-38676846-1600-900.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={backgroundStyle}>
            <NavLink to="/homepage">
                <button>Home page</button>
            </NavLink>
           
        </div>
    )
}

export default LandingPage;
