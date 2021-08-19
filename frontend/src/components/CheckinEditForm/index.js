import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCheckin, removeCheckin, getCheckins } from "../../store/checkins";
import { getStores } from "../../store/stores";


import './CheckinEditForm.css'

const CheckinEditForm = ({ checkin, setShowEdit }) => {
    const [comment, setComment] = useState(checkin.comment);
    const [rating, setRating] = useState(checkin.rating);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            comment,
            rating,
            checkinId: checkin.id
        }
        await dispatch(updateCheckin(payload));
        await dispatch(getCheckins());
        await dispatch(getStores());
        setShowEdit(false)

    }

    const handleDelete = async () => {
        await dispatch(removeCheckin(checkin.id));
        await dispatch(getCheckins());
        setShowEdit(false);
    }

    return (
        <>
            <div className='form-container checkin-edit-form'>
                <form onSubmit={handleSubmit}>
                    <div className='small-inputs'>
                        <div className='widget-container'>
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
                                placeholder='comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CheckinEditForm;
