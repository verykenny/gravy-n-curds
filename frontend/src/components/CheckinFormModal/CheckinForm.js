import { useState } from 'react';
import { createCheckin, getCheckins } from '../../store/checkins';
import { useDispatch } from 'react-redux';

import './CheckinForm.css'
import { getPoutines } from '../../store/poutine';

function CheckinForm({ setShowModal, poutine, store }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            comment,
            rating: rating ? Number(rating) : null,
            poutineId: poutine.id
        }

        try {
            await dispatch(createCheckin(payload));
            await dispatch(getPoutines());
            await dispatch(getCheckins());
            setShowModal(false);
        } catch (e) {
            const res = await e.json();
            const { errors } = res;
            setErrors(errors);
        }
    };

    return (
        <div className="form-container checkin-form">
            <p>Create a checkin for {poutine.name} at {store.name}</p>
            <form onSubmit={handleSubmit}>
                <div className="widget-container">
                    <textarea
                        placeholder='comments'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    {errors.includes('Please provide a comment with at least 4 characters.') && (
                        <p className='form-custom-error'>Please provide a comment with at least 4 characters.</p>
                    )}
                </div>
                <div className="widget-container">
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value=''>no rating</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    {errors.includes('Please provide a rating.') && (
                        <p className='form-custom-error'>Please provide a rating.</p>
                    )}
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" type="submit">
                        create check-in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckinForm;
