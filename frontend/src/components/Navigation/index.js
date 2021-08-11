import { NavLink } from "react-router-dom";

import './Navigation.css'

function Navigation() {
    return (
        <div className='nav-container'>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/login'>Log in</NavLink>
                <NavLink to='/signup'>Sign up</NavLink>
            </nav>
        </div>
    )
}

export default Navigation;
