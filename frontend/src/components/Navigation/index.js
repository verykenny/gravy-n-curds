import { NavLink } from "react-router-dom";

import './Navigation.css'

function Navigation() {
    return (
        <div className='nav-container'>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </nav>
        </div>
    )
}

export default Navigation;
