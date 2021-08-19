import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckinFormModal from '../CheckinFormModal';
import './TopRated.css'


const TopRated = () => {
    const [topToggle, setTopToggle] = useState(true)

    const average = (accum, currentValue) => accum + currentValue.rating;

    const topPoutines = useSelector(state => Object.values(state.poutines).sort((a, b) => b.Checkins.length - a.Checkins.length).slice(0, 10))

    return (
        <>
            <div className='top-page-container'>
                <div className='top-menu-container'>
                    <button className={`btn ${(topToggle) ? 'active' : 'disabled'}`} onClick={() => setTopToggle(true)}><h1>Top Rated Poutine</h1></button>
                    <button className={`btn ${(!topToggle) ? 'active' : 'disabled'}`} onClick={() => setTopToggle(false)}><h1>Top Rated Stores</h1></button>
                </div>
                <div className='top-show-container'>
                    {(topToggle && topPoutines.length > 0) && topPoutines.map(poutine => (
                        <TopPoutines key={poutine.id} poutine={poutine} />
                    ))}
                    {!topToggle && <TopStores />}
                </div>
            </div>
        </>
    )
}


const TopPoutines = ({ poutine }) => {
    return (
        <div className='top-poutine-card'>
            <div className='top-poutine-image'>
                <img src={poutine.imageUrl} alt={poutine.name} />
            </div>
            <div className='top-poutine-content'>
                <h2>{poutine.name}</h2>
                <p>{poutine.description}</p>
                <p>Average rating</p>
                <p>number of checkins</p>
            </div>
            <div className='top-poutine-access'>
                <CheckinFormModal poutine={poutine} store={poutine.Store} />
                <Link to={`/stores/${poutine.Store.id}`}>{poutine.Store.name}</Link>
                <Link to={`/poutines/${poutine.id}`}>more info</Link>
                <p>Link to poutine page</p>
            </div>
        </div>
    )
}
const TopStores = () => {
    return (
        <div className='top-store-card'></div>
    )
}


export default TopRated;
