import { NavLink } from "react-router-dom";


function LandingPage() {
    return (
        <div>
            <h1>Landing Page</h1>
            <NavLink to="/homepage">
                <button>Home page</button>
            </NavLink>
            <NavLink to="/Form">
                <button>Crear Video juego</button>
            </NavLink>
        </div>
    )
}

export default LandingPage;
