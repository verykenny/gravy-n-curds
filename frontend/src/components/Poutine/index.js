import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPoutines } from '../../store/poutine';
import CheckinFormModal from '../CheckinFormModal';
import CheckinCard from '../CheckinCard'

import './Poutine.css'

const Poutine = () => {
    const { poutineId } = useParams();
    const sessionUser = useSelector(state => state.session)
    const poutine = useSelector((state) => state.poutines[poutineId]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPoutines());
    }, [dispatch]);

    const averageRating = (checkins) => {
        const totalCheckins = checkins.length;
        const sum = checkins.reduce((accum, ele) => accum + ele.rating, 0)
        return (sum / totalCheckins).toFixed(1);
    }

    const poutineContent = () => {
        return (
            <>
                <h1 className='poutine-info-header'>{poutine.name}</h1>
                <p className='poutine-info-header'>{poutine.description}</p>
                <div className='sub-content'>
                    <div className='store-info'>
                        <p>Find it at:</p>
                        <Link to={`/stores/${poutine.Store.id}`}>{poutine.Store.name}</Link>
                    </div>
                    <div className='rating-info'>
                        <p>Total checkins:</p>
                        <p>{poutine.Checkins && poutine.Checkins.length}</p>
                        <p>Average rating:</p>
                        <p>{(poutine.Checkins) ? averageRating(poutine.Checkins) : 'no ratings'}</p>
                    </div>
                </div>

                <div className='btn-container'>
                    {sessionUser.user && <CheckinFormModal poutine={poutine} store={poutine.Store} />}
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
                {poutine && <CheckinsContainer poutineId={poutine.id} />}
            </div>
        </>
    );
};


const CheckinsContainer = ({ poutineId }) => {
    const checkins = useSelector(state => Object.values(state.checkins).filter(checkin => checkin.poutineId === poutineId))

    return (
        <>
            {checkins && checkins.map(checkin => (
                <CheckinCard key={checkin.id} checkin={checkin} />
            ))}
        </>
    )
}



export default Poutine;
