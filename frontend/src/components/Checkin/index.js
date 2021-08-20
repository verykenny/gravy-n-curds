import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCheckins } from "../../store/checkins";
import CheckinCard from "../CheckinCard";

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
                {checkin && <CheckinCard checkin={checkin} />}
            </>
        )
    }

    const checkinImage = () => {
        return <img src={checkin.Poutine.imageUrl} alt={checkin.Poutine.name} />
    }

    return (
        <>
            <div className='checkin-container'>
                <div className='checkin-content-info'>
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
