import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCheckins } from "../../store/checkins";

import './Checkin.css'

const Checkin = () => {
    const { checkinId } = useParams();
    const checkin = useSelector(state => state.checkins[checkinId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCheckins())
    }, [dispatch])

    const checkinContent = () => {
        return (
            <>
                <p>{checkin.User.username} ate <Link to={`/poutines/${checkin.Poutine.id}`}>{checkin.Poutine.name}</Link> at <Link to={`/stores/${checkin.Poutine.Store.id}`}>{checkin.Poutine.Store.name}</Link>.</p>
                <p>{checkin.comment}</p>
                <p>Rating: {checkin.rating}</p>
            </>
        )
    }

    const checkinImage = () => {
        return <img src={checkin.Poutine.imageUrl} alt={checkin.Poutine.name} />
    }

    return (
        <>
            <div className='checkin-container'>
                <div className='checkin-content'>
                    {checkin && checkinContent()}
                </div>
                <div className='checkin-image'>
                    {checkin && checkinImage()}
                </div>
            </div>
        </>
    )
}

export default Checkin;
