import { NavLink } from "react-router-dom";


import './Navigation.css'
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux'
import LoginFormModal from "../LoginFormModal";

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
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
            <nav className='nav-container'>
                <ul>
                    <li>
                        <NavLink exact to="/">Home</NavLink>
                        {isLoaded && sessionLinks}
                    </li>
                </ul>
            </nav>
    )
}

export default Navigation;
