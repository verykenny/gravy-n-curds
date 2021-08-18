import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Redirect, useHistory } from 'react-router-dom';



function CheckinForm({ setShowModal, poutineId }) {
    const [credential, setCredential] = useState('');

    // const dispatch = useDispatch();
    // const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    return (
        <div className="form-container login-form">
            <form onSubmit={handleSubmit}>
                <div className="widget-container">
                    <input
                        type="text"
                        placeholder='comments'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    ></input>
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
