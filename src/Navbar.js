import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <NavLink className="nav-link" to="/search-form">
                    Search
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">
                    Favorites
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/shopping-cart">
                    Shopping-cart
                </NavLink>
            </li>
        </ul>
    );
}
export default NavBar;