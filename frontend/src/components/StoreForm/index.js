
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStore } from "../../store/stores";


import './StoreForm.css'



function StoreForm() {
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();



    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors([]);

        const payload = {
            name,
            imageUrl
        }

        try {
            const store = await dispatch(createStore(payload));
            history.push(`/stores/${store.id}/edit`)
        } catch (e) {
            const res = await e.json();
            const { errors } = res;
            setErrors(errors);
        }
    }

    return (
        <div className='form-container new-store-form'>
            <h1>Add your store/restaurant:</h1>
            <form onSubmit={handleSubmit}>
                <div className='widget-container'>
                    <input
                        type="text"
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    {errors.includes('Please provide a store/restaurant name with at least 4 characters.') && (
                        <p className='form-custom-error'>Please provide a store/restaurant name with at least 4 characters.</p>
                    )}
                </div>
                <div className='widget-container'>
                    <input
                        type="text"
                        placeholder='image url'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    ></input>
                    {errors.includes('Please provide a url to a photo of your store/restaurant.') && (
                        <p className='form-custom-error'>Please provide a url to a photo of your store/restaurant.</p>
                    )}
                </div>
                <div className='btn-container'>
                    <button className='btn btn-primary' type="submit">Create Store</button>
                </div>
            </form>
        </div>
    )
}

export default StoreForm;
