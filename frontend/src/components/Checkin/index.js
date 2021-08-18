import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCheckins } from "../../store/checkins";


const Checkin = () => {
    const { checkinId } = useParams();
    const checkin = useSelector(state => state.checkins[checkinId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCheckins())
    }, [dispatch])

    return (
        <>
            <h1>{checkin.User.username}</h1>
        </>
    )
}

export default Checkin;
