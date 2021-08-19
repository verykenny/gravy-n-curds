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
        if (days < 30) return (days > 1) ? `${days} days ago` : `1 day ago`
        const months = Math.floor(days / 30);
        return (months > 1) ? `${months} months ago` : `1 month ago`
    }

    const checkinComment = (comment) => {
        if (!comment) {
            return (
                <p class='comment no-comment'>no comment</p>
            )
        }

        return (
            <p class='comment'>{comment}</p>
        )
    }

    const checkinRating = (rating) => {
        if (!rating) {
            return (
                <p className='rating no-rating'>not rated</p>
            )
        }
        return (
            <p className='rating'>rating: {rating}</p>
        )
    }

    return (
        <div className='checkin-card'>
            <div>
                <img src='/images/poutine-icon-red-background.svg' alt='poutine icon' />
            </div>
            <div className='checkin-content'>
                <p className='card-description'>{checkin.User.username} ate <Link to={`/poutines/${checkin.Poutine.id}`}>{checkin.Poutine.name}</Link> at <Link to={`/stores/${checkin.Poutine.Store.id}`}>{checkin.Poutine.Store.name}.</Link></p>
                <div className='comment-container'>
                    {checkinComment(checkin.comment)}
                    {checkinRating(checkin.rating)}
                </div>
                <div className='checkin-footer'>
                    <p>{timeAgo(checkin.createdAt)}</p>
                    <Link to={`/checkins/${checkin.id}`}>more info</Link>
                </div>
            </div>
        </div>
    )
}


export default RecentReviews;
