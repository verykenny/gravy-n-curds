import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPoutines } from '../../store/poutine';
import { getStores } from '../../store/stores';

import './Poutine.css'

const Poutine = () => {
    const { poutineId } = useParams();
    const poutineData = useSelector((state) => ({ poutine: state.poutines[poutineId], store: state.poutines[poutineId] }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPoutines());
    }, [dispatch]);

    const poutineContent = () => {
        return (
            <>
                <h1>{poutineData.poutine.name}</h1>
                <p>{poutineData.poutine.description}</p>
                <p>Find it at:</p>
                {poutineData.store && <Link to={`/stores/${poutineData.store.id}`}>{poutineData.store.name}</Link>}

                <div className='btn-container'>
                    <Link to={`/poutine/${poutineData.poutine.id}/checkins/create`} className='btn btn-alt'>Check-in</Link>
                </div>
            </>
        );
    };

    const poutineImage = () => {
        return <img src={poutineData.poutine.imageUrl} alt={poutineData.poutine.name} />;
    };

    return (
        <>
            <div className="poutine-container">
                <div className="poutine-content">
                    {poutineData.poutine && poutineContent()}

                </div>
                <div className="poutine-image">
                    {poutineData.poutine && poutineImage()}
                </div>
            </div>
            <div className="checkins-container">
                {poutineData.poutine && poutineData.poutine.Checkins.map((checkin) => (
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
