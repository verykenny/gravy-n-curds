import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';



function CheckinForm({ setShowModal }) {
    const [credential, setCredential] = useState('');

    // const dispatch = useDispatch();
    // const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/"></Redirect>;


    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    return (
        <div className="form-container login-form">
            <form onSubmit={handleSubmit}>
                <div className="widget-container">
                    <input
                        type="text"
                        placeholder="username or email"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    ></input>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" type="submit">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckinForm;
