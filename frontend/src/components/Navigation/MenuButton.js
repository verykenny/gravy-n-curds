import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logOutUser, logInUser } from "../../store/session";


function MenuButton({ sessionUser }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleDemoLogin = async () => {
        await dispatch(logInUser('demo@user.io', 'password'));
    }

    return (
        <>
            <button className='btn ham' onClick={openMenu}>
                <i className="fas fa-bars" />
            </button>
            {(showMenu && sessionUser) && (
                <div className='collapse-menu'>
                    <NavLink className='nav-link' to='/recent'>Recent Reviews</NavLink>
                    <NavLink className='nav-link' to='/top-rated'>Top Rated</NavLink>
                    <NavLink className='nav-link' to='/profile'>Profile</NavLink>
                    <button className='btn btn-alt' onClick={() => dispatch(logOutUser())}>Log Out</button>
                </div>
            )}
            {(showMenu && !sessionUser) && (
                <div className='collapse-menu'>
                    <button className='btn btn-alt' type='button' onClick={() => handleDemoLogin()}>Demo Login</button>
                    <NavLink className='btn btn-primary' to="/signup">Sign Up</NavLink>
                </div>
            )}
        </>
    );
}

export default MenuButton;
