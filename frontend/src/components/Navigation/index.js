import { NavLink } from "react-router-dom";


import './Navigation.css'
import { useDispatch, useSelector } from 'react-redux'
import LoginFormModal from "../LoginFormModal";
import { logOutUser } from "../../store/session";
import MenuButton from "./MenuButton";
import { logInUser } from "../../store/session";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const handleDemoLogin = async () => {
        await dispatch(logInUser('demo@user.io', 'password'));
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='nav-links'>
                <div className='public-links'>
                    <NavLink className='nav-link' to='/recent'>Recent Reviews</NavLink>
                    <NavLink className='nav-link' to='/top-rated'>Top Rated</NavLink>
                </div>
                <div className='session-links'>
                    <NavLink className='nav-link' to='/profile'>Profile</NavLink>
                    <button className='btn btn-alt' onClick={() => dispatch(logOutUser())}>Log Out</button>
                </div>
                <div className='hidden-module'>
                    <MenuButton sessionUser={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className='session-buttons'>
                <div className='session-links'>
                    <button className='btn btn-alt' type='button' onClick={() => handleDemoLogin()}>Demo Login</button>
                    <LoginFormModal />
                    <NavLink className='btn btn-primary' to="/signup">Sign Up</NavLink>

                </div>
                <div className='hidden-module'>
                    <MenuButton sessionUser={sessionUser} />
                </div>
            </div >
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
