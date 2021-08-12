import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { logInUser } from '../../store/session';

import './LoginForm.css'

function LoginForm({ setShowModal }) {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/"></Redirect>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(logInUser(credential, password));
            history.push('/');
        } catch (e) {
            const error = await e.json();
            console.log('error that was returned', error);
            // TODO:
            // 1. Handle and display these errors
        }
    };

    return (
        <div className='form-container login-form'>
            <form onSubmit={handleSubmit}>
                <div className='widget-container'>
                    <input
                        type='text'
                        placeholder='username or email'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    ></input>
                </div>
                <div className='widget-container'>
                    <input
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div className='btn-container'>
                    <button className='btn btn-primary' type="submit">Log In</button>
                    <Link className='btn btn-primary' to="/signup" onClick={() => setShowModal(false)}>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
