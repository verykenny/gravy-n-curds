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
            <div className='links'>
                <div className='public-links'>
                    <NavLink to='/recent'>Recent Checkins</NavLink>
                    <NavLink to='/top-rated'>Top Rated</NavLink>
                </div>
                <div className='session-links'>
                    <NavLink to='/profile'>Profile</NavLink>
                    <button className='btn btn-alt' onClick={() => dispatch(logOutUser())}>Log Out</button>
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink className='btn btn-primary' to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='nav-bar-color'>
            <nav className='nav-container'>
                <div className='home-link'>
                    <NavLink exact to="/">gravyNcurds</NavLink>
                </div>
                {isLoaded && sessionLinks}
            </nav>
        </div>
    )
}

export default Navigation;
