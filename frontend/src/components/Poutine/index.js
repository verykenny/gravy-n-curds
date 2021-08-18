import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPoutines } from '../../store/poutine';
import { getStores } from '../../store/stores';

import './Poutine.css'

const Poutine = () => {
    const { poutineId } = useParams();
    const poutine = useSelector((state) => state.poutines[poutineId]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPoutines());
    }, [dispatch]);

    const poutineContent = () => {
        return (
            <>
                <h1>{poutine.name}</h1>
                <p>{poutine.description}</p>
                <p>Find it at:</p>
                {<Link to={`/stores/${poutine.Store.id}`}>{poutine.Store.name}</Link>}

                <div className='btn-container'>
                    <Link to={`/poutine/${poutine.id}/checkins/create`} className='btn btn-alt'>Check-in</Link>
                </div>
            </>
        );
    };

    const poutineImage = () => {
        return <img src={poutine.imageUrl} alt={poutine.name} />;
    };

    return (
        <>
            <div className="poutine-container">
                <div className="poutine-content">
                    {poutine && poutineContent()}

                </div>
                <div className="poutine-image">
                    {poutine && poutineImage()}
                </div>
            </div>
            <div className="checkins-container">
                {poutine && poutine.Checkins.map((checkin) => (
                    <CheckinCard key={checkin.id} checkin={checkin} />
                ))}
            </div>
        </>
    );
};

const CheckinCard = ({ checkin }) => {
    return (
        <div className="checkin-card">
            <p>{checkin.User.username} said: </p>
            <p>{checkin.comment}</p>
            <p>Rating: {checkin.rating}</p>
            <Link className="btn btn-primary" to={`/checkins/${checkin.id}`}>
                more info
            </Link>
        </div>
    );
};

export default Poutine;
