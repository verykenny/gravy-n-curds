import { Link } from "react-router-dom";
import CheckinFormModal from "../CheckinFormModal";
import { useEffect, useState } from "react";

import PoutineEditForm from "../StoreEditForm/PoutineEditForm";

import './PoutineCard.css'
import { useSelector } from "react-redux";

const PoutineCard = ({ poutineId, edit = false }) => {
    const poutine = useSelector(state => state.poutines[poutineId])
    const [showEdit, setShowEdit] = useState(false);
    const [checkinCount, setCheckinCount] = useState(0)
    const [averageRating, setAverageRating] = useState(0)

    useEffect(() => {
        if (poutine.Checkins) {
            setCheckinCount(poutine.Checkins.length);
            setAverageRating((poutine.Checkins.reduce((sum, ele) => sum + ele.rating, 0) / checkinCount).toFixed(1))
        }
    }, [poutine, checkinCount])


    return (
        <>
            <div className='top-poutine-card'>
                <div className='top-poutine-image'>
                    <img src={poutine.imageUrl} alt={poutine.name} />
                </div>
                <div className='top-poutine-content'>
                    <h2>{poutine.name}</h2>
                    <p>{poutine.description}</p>
                    <p>Average rating: {(averageRating > 0) ? averageRating : 'no rating'}</p>
                    <p>Check-ins: {checkinCount}</p>
                </div>
                <div className='top-poutine-access'>
                    <CheckinFormModal poutine={poutine} store={poutine.Store} />
                    <Link to={`/stores/${poutine.Store.id}`}>{poutine.Store.name}</Link>
                    <Link to={`/poutines/${poutine.id}`}>more info</Link>
                    {edit && <button className={(showEdit) ? 'btn btn-warning edit' : 'btn btn-alt edit'} onClick={() => setShowEdit((prevState) => !prevState)}>{(showEdit) ? 'cancel' : 'edit'}</button>}

                </div>
            </div>
            {edit && (
                <div className='poutine-edit-card'>
                    {showEdit && <PoutineEditForm poutine={poutine} setShowEdit={setShowEdit} />}
                </div>
            )}
        </>
    )
}


export default PoutineCard;
