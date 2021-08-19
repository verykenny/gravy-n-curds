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



    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date).valueOf()) / 1000);
        if (seconds < 60) return `${seconds} seconds ago`
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return (minutes > 1) ? `${minutes} minutes ago` : `1 minute ago`
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return (hours > 1) ? `${hours} hour ago` : `1 hour ago`
        const days = Math.floor(hours / 24);
        return (days > 1) ? `${days} days ago` : `1 day ago`
    }

    return (
        <div className='checkin-card'>
            <div>
                <img src='/images/poutine-icon-red-background.svg' alt='poutine icon' />
            </div>
            <div>
                <p>{checkin.User.username} ate <Link to={`/poutines/${checkin.Poutine.id}`}>{checkin.Poutine.name}</Link> at <Link to={`/stores/${checkin.Poutine.Store.id}`}>{checkin.Poutine.Store.name}.</Link></p>
                <div className='comment-container'>
                    <p>{checkin.comment}</p>
                    <p>Rating: {checkin.rating}</p>
                </div>
                <div>
                    <p>{timeAgo(checkin.createdAt)}</p>
                    <Link to={`/checkins/${checkin.id}`}>more info</Link>
                </div>
            </div>
        </div>
    )
}


export default RecentReviews;
