import { NavLink } from "react-router-dom";


import './Navigation.css'
import { useDispatch, useSelector } from 'react-redux'
import LoginFormModal from "../LoginFormModal";
import { logOutUser } from "../../store/session";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to='/profile'>Profile</NavLink>
                <button onClick={() => dispatch(logOutUser())}>Log Out</button>
            </>
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
            <p>gravy-n-curds</p>
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
