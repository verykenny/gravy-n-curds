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
                    <CheckinFormModal poutine={poutine} store={poutine.Store}/>
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


const CheckinsContainer = ({poutineId}) => {
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
