import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePoutine, removePoutine } from "../../store/poutine";
import { getStores } from "../../store/stores";


const CheckinEditForm = ({ poutine, setShowEdit }) => {
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
            await dispatch(getStores());
        } catch (e) {
            const res = await e.json();
            const { errors } = res;
            setErrors(errors);
        }
    }

    const handleDelete = async () => {
        await dispatch(removePoutine(poutine.id));
        await dispatch(getStores());
        setShowEdit(false);
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
                            <button className='btn btn-warning delete-btn' type="button" onClick={() => handleDelete()}>delete</button>
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

export default CheckinEditForm;
