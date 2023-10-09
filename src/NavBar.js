import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    Sök 
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    Favoriter
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    Kundvagn
                </NavLink>
            </li>
        </ul>
    );
}
export default NavBar;