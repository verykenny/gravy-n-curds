import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCheckins } from "../../store/checkins";

import './Profile.css'


const Profile = () => {
    const sessionUser = useSelector(state => state.session.user)
    const checkins = useSelector(state => Object.values(state.checkins).filter(checkin => checkin.userId === sessionUser.id))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCheckins());
    }, [dispatch])

    return (
        <div className='profile-container'>
            <main className='checkins-container'>
                <h1>Your most recent check-ins:</h1>
                {checkins.length && checkins.map(checkin => (
                    <CheckinCard checkin={checkin}/>
                ))}
            </main>
            <div className='side-container'>
                <section className='store-container'>
                </section>
            </div>
        </div>
    )
};

export default Profile;


const CheckinCard = ({ checkin }) => {

    return (
        <div className='checkin-card'>

            <p>{checkin.comment}</p>
            <p>{checkin.rating}</p>
            <p>{checkin.Poutine.name}</p>
        </div>
    )
}
