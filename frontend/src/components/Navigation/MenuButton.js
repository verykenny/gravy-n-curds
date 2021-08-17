import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logOutUser } from "../../store/session";


function MenuButton() {
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

    return (
        <>
            <button className='btn ham' onClick={openMenu}>
                <i className="fas fa-bars" />
            </button>
            {showMenu && (
                <div className='collapse-menu'>
                    <NavLink className='nav-link' to='/recent'>Recent Reviews</NavLink>
                    <NavLink className='nav-link' to='/top-rated'>Top Rated</NavLink>
                    <NavLink className='nav-link' to='/profile'>Profile</NavLink>
                    <button className='btn btn-alt' onClick={() => dispatch(logOutUser())}>Log Out</button>
                </div>
            )}
        </>
    );
}

export default MenuButton;
