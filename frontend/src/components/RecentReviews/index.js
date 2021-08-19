import { useSelector } from 'react-redux';

import CheckinCard from '../CheckinCard';
import TrendingDishes from './TrendingDishes';

import './RecentReviews.css'


const RecentReviews = () => {

    const recentCheckins = useSelector(state => Object.values(state.checkins).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 7))

    return (
        <>
            <div className='recent-page-container'>
                <div className='recent-reviews-container'>
                    <h2>Recent activity</h2>
                    {recentCheckins && recentCheckins.map(checkin => (
                        <CheckinCard key={checkin.id} checkin={checkin} />
                    ))}

                </div>
                <div className='trending-poutine-container'>
                    <h2>Trending Dishes</h2>
                    <TrendingDishes />
                </div>
            </div>
        </>
    )
}





export default RecentReviews;
