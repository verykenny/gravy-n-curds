
import { useSelector } from 'react-redux';

import PoutineCard from '../PoutineCard';
import './TopRated.css'


const TopRated = () => {

    const averageRating = (checkins) => {
        const checkinCount = checkins.filter(checkin => checkin.rating > 0).length;
        const averageRating = (checkins.reduce((sum, ele) => (ele.rating > 1) ? sum + ele.rating : sum, 0) / checkinCount).toFixed(1);
        return averageRating
    }

    const topPoutines = useSelector(state => Object.values(state.poutines).sort((a, b) => averageRating(b.Checkins) - averageRating(a.Checkins)).slice(0, 10))

    return (
        <>
            <div className='top-page-container'>
                <div className='top-show-container'>
                    <h1>Top Rated Poutine Dishes</h1>
                    {topPoutines.length > 0 && topPoutines.map(poutine => (
                        <PoutineCard key={poutine.id} poutineId={poutine.id} />
                    ))}
                </div>
            </div>
        </>
    )
}


export default TopRated;
