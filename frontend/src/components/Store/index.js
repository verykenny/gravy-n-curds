import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getStores } from "../../store/stores";

import PoutineCard from "../PoutineCard";

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
            <div className='store-page-container'>
                <div className='store-content'>
                    {store && storeContent()}
                </div>
                <div className='store-image'>
                    {store && storeImage()}
                </div>
            </div>
            <div className='poutine-list-container'>
                {(store) && <PoutineList storeId={store.id} />}
            </div>
        </>
    )
}



const PoutineList = ({ storeId }) => {
    const poutines = useSelector(state => Object.values(state.poutines).filter(poutine => poutine.storeId === storeId))
    return (
        <>
            {poutines && poutines.map(poutine => (
                <PoutineCard key={poutine.id} poutine={poutine} />
            ))}
        </>
    )
}


export default Store;
