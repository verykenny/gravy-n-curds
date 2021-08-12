import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { logInUser } from '../../store/session';

import './LoginForm.css';

function LoginForm({ setShowModal }) {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/"></Redirect>;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            await dispatch(logInUser(credential, password));
            history.go(-1);
        } catch (e) {
            const res = await e.json();
            const { errors } = res
            setErrors(errors);
        }
    };


    return (
        <div className="form-container login-form">
            <div className='errors-container'>
            {errors.includes('The provided credentials were invalid.') && (
                        <p className='form-custom-error'>The provided credentials were invalid.</p>
                    )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="widget-container">
                    <input
                        type="text"
                        placeholder="username or email"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    ></input>
                    {errors.includes('Please provide a valid email or username.') && (
                        <p className='form-custom-error'>Please provide a valid email or username</p>
                    )}
                </div>
                <div className="widget-container">
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {errors.includes('Please provide a password.') && (
                        <p className='form-custom-error'>Please provide a password</p>
                    )}
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" type="submit">
                        Log In
                    </button>
                    <Link
                        className="btn btn-alt"
                        to="/signup"
                        onClick={() => setShowModal(false)}
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
