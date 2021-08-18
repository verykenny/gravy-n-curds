import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { getStores, removeStore, updateStore } from "../../store/stores";
import { updatePoutine } from "../../store/poutine";

import './StoreEditForm.css'


const StoreEditForm = () => {
    const { storeId } = useParams();
    const store = useSelector(state => state.stores[storeId])
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([]);
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
                {(store && store.Poutines) && store.Poutines.map(poutine => (
                    <PoutineCard poutine={poutine} />
                ))}
            </div>
        </>
    )
}



const PoutineCard = ({ poutine }) => {
    const [showEdit, setShowEdit] = useState(false)
    return (
        <>
            <div className='poutine-card'>
                <img src={poutine.imageUrl} alt={poutine.name} />
                <div className='poutine-card-content'>
                    <p>{poutine.name}</p>
                    <p>{poutine.description}</p>
                    <Link to={`/poutines/${poutine.id}`}>more info</Link>
                    <button className={(showEdit) ? 'btn btn-warning' : 'btn btn-alt'} onClick={() => setShowEdit((prevState) => !prevState)}>{(showEdit) ? 'cancel' : 'edit'}</button>
                </div>
            </div>
            <div className='poutine-edit-card'>
                {showEdit && <PoutineEdit poutine={poutine} setShowEdit={setShowEdit} />}
            </div>
        </>
    )
}


const PoutineEdit = ({ poutine, setShowEdit }) => {
    const [name, setName] = useState(poutine.name);
    const [description, setDescription] = useState(poutine.description);
    const [imageUrl, setImageUrl] = useState(poutine.imageUrl);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            description,
            imageUrl,
            poutineId: poutine.id
        }
        try {
            await dispatch(updatePoutine(payload));
            setShowEdit(false)
            dispatch(getStores());
        } catch (e) {
            const res = await e.json();
            const { errors } = res;
            setErrors(errors);
        }
    }

    return (
        <>
            <div className='form-container poutine-edit-form'>
                <form onSubmit={handleSubmit}>
                    <div className='small-inputs'>
                        <div className='widget-container'>
                            <input
                                type="text"
                                placeholder='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                            {errors.includes('Please provide a name for your poutine with at least 4 characters.') && (
                                <p className='form-custom-error'>Please provide a name for your poutine with at least 4 characters.</p>
                            )}
                        </div>
                        <div className='widget-container'>
                            <input
                                type="text"
                                placeholder='imageUrl'
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            ></input>
                            {errors.includes('Please provide a url to a photo of your poutine dish.') && (
                                <p className='form-custom-error'>Please provide a url to a photo of your poutine dish.</p>
                            )}
                        </div>
                        <div className='btn-container'>
                            <button className='btn btn-primary' type="submit">update</button>
                        </div>
                    </div>
                    <div>
                        <div className='widget-container description-input-container'>
                            <textarea
                                className='description-input'
                                cols='100'
                                placeholder='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            {errors.includes('Please provide a description of your poutine with at least 4 characters.') && (
                                <p className='form-custom-error'>Please provide a description of your poutine with at least 4 characters.</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export default StoreEditForm;
