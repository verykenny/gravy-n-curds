import { useState } from 'react';
import { useSelector } from 'react-redux';

import './TopRated.css'


const TopRated = () => {
    const [topToggle, setTopToggle] = useState(true)

    const sum = (accum, currentValue) => accum + currentValue;

    const topPoutines = useSelector(state => Object.values(state.poutines).sort((a, b) => b.Checkins.length - a.Checkins.length).slice(0, 10))

    return (
        <>
            <div className='top-page-container'>
                <div className='top-menu-container'>
                    <button className={`btn ${(topToggle) ? 'active': 'disabled'}`} onClick={() => setTopToggle(true)}><h1>Top Rated Poutine</h1></button>
                    <button className={`btn ${(!topToggle) ? 'active': 'disabled'}`} onClick={() => setTopToggle(false)}><h1>Top Rated Stores</h1></button>
                </div>
                <div className='top-show-container'>
                    {topToggle && <p>Top Poutine</p>}
                    {!topToggle && <p>Top Store</p>}
                </div>
            </div>
        </>
    )
}





export default TopRated;
