
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckinFormModal from '../CheckinFormModal';
import PoutineCard from '../PoutineCard';
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
                        <PoutineCard key={poutine.id} poutine={poutine} />
                    ))}
                </div>
            </div>
        </>
    )
}


export default TopRated;
