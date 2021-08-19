import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './RecentReviews.css'


const RecentReviews = () => {

    const recentCheckins = useSelector(state => Object.values(state.checkins).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)))



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
                </div>
            </div>
        </>
    )
}


const CheckinCard = ({ checkin }) => {

    return (
        <div className='checkin-card'>
            <div>
                <img src='/images/poutine-icon-red-background.svg' alt='poutine icon' />
                Restaurant: <Link to={`/stores/${checkin.Poutine.Store.id}`}>{checkin.Poutine.Store.name}</Link>
                Dish: <Link to={`/poutines/${checkin.Poutine.id}`}>{checkin.Poutine.name}</Link>
            </div>
            <p>{checkin.User.username} ate .</p>
            <p>Comment: </p>
            <p>{checkin.comment}</p>
            <p>Rating: {checkin.rating}</p>
            <Link to={`/checkins/${checkin.id}`}>more info</Link>
        </div>
    )
}


export default RecentReviews;
