import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getStores, removeStore, updateStore } from "../../store/stores";
import PoutineAddForm from "./PoutineAddForm";
import PoutineCard from '../PoutineCard'

import './StoreEditForm.css'


const StoreEditForm = () => {
    const { storeId } = useParams();
    const store = useSelector(state => state.stores[storeId])
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const history = useHistory();

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
            await dispatch(getStores());
            setErrors([])
        } catch (e) {
            const res = await e.json();
            const { errors } = res;
            setErrors(errors);
        }
    }

    const handleDelete = async () => {

        await dispatch(removeStore(store.id))
        history.push('/profile')
    }

    const storeContent = () => {
        return (
            <>
                <h1>{store.name}</h1>
                <div className='form-container store-edit-form'>
                    <p>Edit your store information:</p>
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
                            <button
                                className='btn btn-warning'
                                type="button"
                                onClick={() => handleDelete()}
                            >Delete Store</button>
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
            <div className='store-page-container'>
                <div className='store-content'>
                    {store && storeContent()}
                </div>
                <div className='store-image'>
                    {store && storeImage()}
                </div>
            </div>
            <div className='poutine-list-container'>
                <button className={(showAdd) ? 'btn btn-warning add-btn' : 'btn btn-primary add-btn'} onClick={() => setShowAdd(prevState => !prevState)}>{(showAdd) ? 'cancel' : 'add poutine dish'}</button>
                {showAdd && <PoutineAddForm storeId={store.id} setShowAdd={setShowAdd} />}
                {store && <PoutineList storeId={store.id} />}
            </div>
        </>
    )
}



const PoutineList = ({ storeId }) => {
    const poutines = useSelector(state => Object.values(state.poutines).filter(poutine => poutine.storeId === storeId))
    return (
        <>
            {poutines && poutines.map(poutine => (
                <PoutineCard key={poutine.id} poutine={poutine} edit={true} />
            ))}
        </>
    )
}

export default StoreEditForm;
