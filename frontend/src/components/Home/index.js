import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getPoutines } from "../../store/poutine";

import './Home.css'

const Home = () => {
    const poutines = useSelector(state => state.poutines)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPoutines());
    }, [dispatch])

    return (
        <div className='main-container'>
            <div className='splash-container' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/splash-image.jpeg` }}>
                <div className='info-container'>
                    <div className='info-card'>
                        <img src='/images/poutine-icon-white.svg' alt='poutine icon' />
                        <h1>gravyNcurds</h1>
                        <h2>EAT GOOD STUFF</h2>
                        <p className='tag-line'>Discover and share your favorite poutine dishes.</p>
                        <p>Get started with some <Link to='/top-rated'>top-rated dishes</Link>.</p>
                    </div>
                </div>
                <div className='photo-container'>
                        <img src='/images/poutine-side-image-3.png' alt='poutine icon' />
                </div>
            </div>
            <div className='feature-container'>
                <div className='example-container'></div>
                <div className='links-container'></div>
            </div>
        </div>
    )
}


export default Home;
