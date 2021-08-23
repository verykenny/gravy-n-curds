import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import CheckinEditForm from "../CheckinEditForm";

import './CheckinCard.css'

const CheckinCard = ({ checkin }) => {
    const sessionUser = useSelector(state => state.session.user)
    const [showEdit, setShowEdit] = useState(false)


    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date).valueOf()) / 1000);
        if (seconds < 60) return `${seconds} seconds ago`
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return (minutes > 1) ? `${minutes} minutes ago` : `1 minute ago`
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return (hours > 1) ? `${hours} hours ago` : `1 hour ago`
        const days = Math.floor(hours / 24);
        if (days < 30) return (days > 1) ? `${days} days ago` : `1 day ago`
        const months = Math.floor(days / 30);
        return (months > 1) ? `${months} months ago` : `1 month ago`
    }

    const checkinComment = (comment) => {
        if (!comment) {
            return (
                <p className='comment no-comment'>no comment</p>
            )
        }

        return (
            <p className='comment'>{comment}</p>
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


    const showButton = () => {

        return (
            <>
                {sessionUser.id === checkin.userId && (
                    <button className={(showEdit) ? 'btn btn-warning' : 'btn btn-alt'} onClick={() => setShowEdit((prevState) => !prevState)}>{(showEdit) ? 'cancel' : 'edit'}</button>
                )}
            </>
        )
    }


    const checkinCard = (checkin) => {
        return (<>
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
                    {sessionUser && showButton()}
                </div>
                <div className='poutine-edit-card'>
                    {showEdit && <CheckinEditForm checkin={checkin} setShowEdit={setShowEdit} />}
                </div>
            </div>
        </>
        )
    }

    return (
        <div className='top-checkin-card'>
            {checkin.User && checkinCard(checkin)}
        </div>
    )
}





export default CheckinCard;
