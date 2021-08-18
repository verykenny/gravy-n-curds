import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCheckins } from "../../store/checkins";
import { getStores } from '../../store/stores'

import './Profile.css'
// import CheckinEditForm from "./CheckinEditForm.js";


const Profile = () => {
    const sessionUser = useSelector(state => state.session.user)
    const checkins = useSelector(state => Object.values(state.checkins).filter(checkin => checkin.userId === sessionUser.id))
    const stores = useSelector(state => Object.values(state.stores).filter(store => store.ownerId === sessionUser.id))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCheckins());
        dispatch(getStores());
    }, [dispatch])

    return (
        <>
            <div className='profile-container'>
                <main className='checkins-container'>
                    <h2>Your most recent check-ins:</h2>
                    {checkins.length > 0 && checkins.map(checkin => (
                        <CheckinCard key={checkin.id} checkin={checkin} />
                    ))}
                </main>
                <div className='side-container'>
                    <section className='store-container'>
                        <h2>Edit your stores:</h2>
                        {stores.length > 0 && stores.map(store => (
                            <StoreCard key={store.id} store={store} />
                        ))}
                        <Link className='btn btn-alt' to='/stores/create'>Add new store</Link>
                    </section>
                </div>
            </div>
        </>
    )
};

export default Profile;


const CheckinCard = ({ checkin }) => {
    const [showEdit, setShowEdit] = useState(false)
    return (
        <>
            <div className='checkin-card'>
                <p>You ate <Link to={`/poutines/${checkin.Poutine.id}`}>{checkin.Poutine.name}</Link> at <Link to={`/stores/${checkin.Poutine.Store.id}`}>{checkin.Poutine.Store.name}</Link>.</p>
                <p>You said: </p>
                <p>{checkin.comment}</p>
                <p>Rating: {checkin.rating}</p>
                <Link className='btn btn-primary' to={`/checkins/${checkin.id}`}>more info</Link>
                <button className={(showEdit) ? 'btn btn-warning' : 'btn btn-alt'} onClick={() => setShowEdit((prevState) => !prevState)}>{(showEdit) ? 'cancel' : 'edit'}</button>
            </div>
            <div className='poutine-edit-card'>
                {/* {showEdit && <CheckinEditForm  />} */}
            </div>
        </>
    )
}

const StoreCard = ({ store }) => {

    return (
        <div className='store-card'>

            <p><Link to={`/stores/${store.id}/edit`}>{store.name}</Link></p>
        </div>
    )
}
