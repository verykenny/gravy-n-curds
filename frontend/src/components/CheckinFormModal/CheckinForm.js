import { useState } from 'react';
import { createCheckin, getCheckins } from '../../store/checkins';
import { useDispatch } from 'react-redux';
// import { Link, Redirect, useHistory } from 'react-router-dom';

import './CheckinForm.css'
import { getPoutines } from '../../store/poutine';

function CheckinForm({ setShowModal, poutine }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState([]);


    const dispatch = useDispatch();
    // const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            comment,
            rating: rating ? Number(rating) : null,
            poutineId: poutine.id
        }

        await dispatch(createCheckin(payload));
        await dispatch(getPoutines());
        await dispatch(getCheckins());
        setShowModal(false);
    };


    return (
        <div className="form-container checkin-form">
            <p>Create a checkin for {poutine.name} at {poutine.Store.name}</p>
            <form onSubmit={handleSubmit}>
                <div className="widget-container">
                    <textarea
                        placeholder='comments'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
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
