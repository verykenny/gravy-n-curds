import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getStores, updateStore } from "../../store/stores";

import './StoreEditForm.css'


const StoreEditForm = () => {
    const { storeId } = useParams();
    const store = useSelector(state => state.stores[storeId])
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getStores())
    }, [dispatch])

    useEffect(() => {
        if (store) setName(store.name);
        if (store) setImageUrl(store.imageUrl);
    }, [store])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            imageUrl,
            storeId
        }

        try {
            await dispatch(updateStore(payload));
            setErrors([])
        } catch (e) {
            const res = await e.json();
            const { errors } = res;
            setErrors(errors);
        }
    }

    const storeContent = () => {
        return (
            <>
                <h1>{store.name}</h1>
                <div className='form-container store-edit-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='widget-container'>
                            <input
                                type='text'
                                placeholder={store.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                            {errors.includes('Please provide a store/restaurant name with at least 4 characters.') && (
                                <p className='form-custom-error'>Please provide a store/restaurant name with at least 4 characters.</p>
                            )}
                        </div>
                        <div className='widget-container'>
                            <input
                                type='text'
                                placeholder={store.imageUrl}
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            ></input>
                            {errors.includes('Please provide a url to a photo of your store/restaurant.') && (
                                <p className='form-custom-error'>Please provide a url to a photo of your store/restaurant.</p>
                            )}
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
