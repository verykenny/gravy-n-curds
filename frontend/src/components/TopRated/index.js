
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckinFormModal from '../CheckinFormModal';
import './TopRated.css'


const TopRated = () => {

    const averageRating = (checkins) => {
        const checkinCount = checkins.length;
        const averageRating = (checkins.reduce((sum, ele) => sum + ele.rating, 0) / checkinCount).toFixed(1);
        return averageRating
    }

    const topPoutines = useSelector(state => Object.values(state.poutines).sort((a, b) => averageRating(b.Checkins) - averageRating(a.Checkins)).slice(0, 10))

    return (
        <>
            <div className='top-page-container'>
                <div className='top-show-container'>
                    <h1>Top Rated Poutine Dishes</h1>
                    {topPoutines.length > 0 && topPoutines.map(poutine => (
                        <TopPoutines key={poutine.id} poutine={poutine} />
                    ))}
                </div>
            </div>
        </>
    )
}


const TopPoutines = ({ poutine }) => {
    const checkinCount = poutine.Checkins.length;
    const averageRating = (poutine.Checkins.reduce((sum, ele) => sum + ele.rating, 0) / checkinCount).toFixed(1);

    return (
        <div className='top-poutine-card'>
            <div className='top-poutine-image'>
                <img src={poutine.imageUrl} alt={poutine.name} />
            </div>
            <div className='top-poutine-content'>
                <h2>{poutine.name}</h2>
                <p>{poutine.description}</p>
                <p>Average rating: {(averageRating > 0) ? averageRating : 'no rating'}</p>
                <p>Check-ins: {checkinCount}</p>
            </div>
            <div className='top-poutine-access'>
                <CheckinFormModal poutine={poutine} store={poutine.Store} />
                <Link to={`/stores/${poutine.Store.id}`}>{poutine.Store.name}</Link>
                <Link to={`/poutines/${poutine.id}`}>more info</Link>
            </div>
        </div>
    )
}


export default TopRated;
