import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPoutine } from "../../store/poutine";
import { getStores } from "../../store/stores";

const PoutineAddForm = ({ storeId, setShowAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            description,
            imageUrl,
            storeId
        }
        try {
            await dispatch(createPoutine(payload));
            setShowAdd(false);
            // console.log(setShowAdd);
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

export default PoutineAddForm;
