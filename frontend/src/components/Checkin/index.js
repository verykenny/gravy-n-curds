import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCheckins } from "../../store/checkins";
import CheckinCard from "../CheckinCard";
import PoutineCard from "../PoutineCard";

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

    return (
        <>
            <div className='checkin-container'>
                <div className='checkin-content-info'>
                    {checkin && checkinContent()}
                </div>
            </div>
            <div className='poutine-list-container checkin-poutine-list'>
                {checkin && <PoutineCard poutineId={checkin.poutineId} />}
            </div>
        </>
    )
}

export default Checkin;
