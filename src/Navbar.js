import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <NavLink className="nav-link" to="/search-form">
                    Sök 
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">
                    Favoriter
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/shopping-cart">
                    Kundvagn
                </NavLink>
            </li>
        </ul>
    );
}
export default NavBar;