import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getStores } from "../../store/stores";

import './StoreEditForm.css'


const StoreEditForm = () => {
    const { storeId } = useParams();
    const store = useSelector(state => state.stores[storeId])
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        dispatch(getStores())
    }, [dispatch])

    const storeContent = () => {
        return (
            <>
                <h1>{store.name}</h1>
                <div className='form-container store-edit-form'>
                    <form>
                        <div className='widget-container'>
                            <input
                                type='text'
                                placeholder={store.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div className='widget-container'>
                            <input
                                type='text'
                                placeholder={store.imageUrl}
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            ></input>
                        </div>
                        <div className='btn-container'>
                            <button className='btn btn-primary' type="submit">Submit Changes</button>
                        </div>
                    </form>
                </div>

            </>
        )
    }

    const storeImage = () => {
        return <img src={store.imageUrl} alt={store.name} />
    }

    return (
        <>
            <h1>STORE EDIT FORM</h1>
            <div className='store-page-container'>
                <div className='store-content'>
                    {store && storeContent()}
                </div>
                <div className='store-image'>
                    {store && storeImage()}
                </div>
            </div>
            <div className='poutine-list-container'>
                {(store && store.Poutines) && store.Poutines.map(poutine => (
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


export default StoreEditForm;
