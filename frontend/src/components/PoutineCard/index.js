import { Link } from "react-router-dom";
import CheckinFormModal from "../CheckinFormModal";
import { useState } from "react";

import PoutineEditForm from "../StoreEditForm/PoutineEditForm";

import './PoutineCard.css'

const PoutineCard = ({ poutine, edit = false }) => {
    console.log(poutine);
    const [showEdit, setShowEdit] = useState(false)
    const checkinCount = poutine.Checkins.length;
    const averageRating = (poutine.Checkins.reduce((sum, ele) => sum + ele.rating, 0) / checkinCount).toFixed(1);

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
