import { NavLink } from "react-router-dom";


import './Navigation.css'
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='nav-container'>
            <nav>
                <ul>
                    <li>
                        <NavLink exact to="/">Home</NavLink>
                        {isLoaded && sessionLinks}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;
