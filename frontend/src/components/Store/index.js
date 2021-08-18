import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getStores } from "../../store/stores";

import './Store.css'


const Store = () => {
    const { storeId } = useParams();
    const store = useSelector(state => state.stores[storeId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStores())
    }, [dispatch])

    const storeContent = () => {
        return (
            <>
                <h1>{store.name}</h1>

            </>
        )
    }

    const storeImage = () => {
        return <img src={store.imageUrl} alt={store.name} />
    }

    return (
        <>
            <div className='store-container'>
                <div className='store-content'>
                    {store && storeContent()}
                </div>
                <div className='store-image'>
                    {store && storeImage()}
                </div>
            </div>
            <div className='poutine-list-container'>
                {store && store.Poutines.map(poutine => (
                    <PoutineCard poutine={poutine} />
                ))}
            </div>
        </>
    )
}



const PoutineCard = ({ poutine }) => {
    return (
        <div className='poutine-card'>
            <img src={poutine.imageUrl} alt={poutine.name} />
            <div className='poutine-card-content'>
                <p>{poutine.name}</p>
                <p>{poutine.description}</p>
            <Link to={`/poutines/${poutine.id}`}>more info</Link>
            <Link to={`/poutine/${poutine.id}/checkins/create`} className='btn btn-alt'>Check-in</Link>
            </div>
        </div>
    )
}


export default Store;
