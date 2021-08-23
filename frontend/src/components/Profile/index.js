import { useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCheckins } from "../../store/checkins";
import { getStores } from '../../store/stores'

import './Profile.css'
import CheckinCard from '../CheckinCard';


const Profile = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCheckins());
        dispatch(getStores());
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/"></Redirect>;

    return (
        <>
            <div className='profile-container'>
                <main className='checkins-container'>
                    <h2>Your most recent check-ins</h2>
                    {sessionUser && <Checkins sessionUserId={sessionUser.id} />}
                </main>
                <div className='side-container'>
                    <section className='user-info-container'>
                        {sessionUser && <SessionUserInfo sessionUser={sessionUser} />}
                    </section>
                    <section className='store-container'>
                        <h2>Edit your stores</h2>
                        {sessionUser && <Stores sessionUserId={sessionUser.id} />}
                        <Link className='btn btn-alt' to='/stores/create'>Add new store</Link>
                    </section>
                </div>
            </div>
        </>
    )
};

export default Profile;


const SessionUserInfo = ({ sessionUser }) => {
    const checkins = useSelector(state => Object.values(state.checkins).filter(checkin => checkin.userId === sessionUser.id))



    return (
        <>
            <h2>About you</h2>
            <p>Welcome back {sessionUser.username}</p>
            {checkins && <p>Total checkins: {checkins.length}</p>}
            {checkins && <p>Different dishes: {new Set(checkins.map(checkin => checkin.poutineId)).size}</p>}
        </>
    )
}


const Checkins = ({ sessionUserId }) => {
    const checkins = useSelector(state => Object.values(state.checkins).filter(checkin => checkin.userId === sessionUserId).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)))

    return (
        <>
            {checkins.length > 0 && checkins.map(checkin => (
                <CheckinCard key={checkin.id} checkin={checkin} />
            ))}
        </>
    )
}

const Stores = ({ sessionUserId }) => {
    const stores = useSelector(state => Object.values(state.stores).filter(store => store.ownerId === sessionUserId))

    return (
        <>
            {stores.length > 0 && stores.map(store => (
                    <StoreCard key={store.id} store={store} />
            ))}
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
