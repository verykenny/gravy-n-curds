import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { signupUser } from "../../store/session";

import './SignupFormPage.css'



function SignupFormPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/"></Redirect>;


    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors([]);
        const payload = {
            username,
            email,
            password
        }

        try {
            await dispatch(signupUser(payload));
            history.go(-1)
        } catch (e) {
            const res = await e.json();
            const { errors } = res
            setErrors(errors);
        }

    }

    return (
        <div className='form-container signup-form'>
            <form onSubmit={handleSubmit}>
                <div className='widget-container'>
                    <input
                        type="text"
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    {errors.includes('Please provide a username with at least 4 characters.') && (
                        <p className='form-custom-error'>Please provide a username with at least 4 characters.</p>
                    )}
                    {errors.includes('Username cannot be an email.') && (
                        <p className='form-custom-error'>Username cannot be an email.</p>
                    )}
                </div>
                <div className='widget-container'>
                    <input
                        type="text"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    {errors.includes('Please provide a valid email.') && (
                        <p className='form-custom-error'>Please provide a valid email.</p>
                    )}
                </div>
                <div className='widget-container'>
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {errors.includes('Password must be 6 characters or more.') && (
                        <p className='form-custom-error'>Password must be 6 characters or more.</p>
                    )}
                </div>
                <div className='btn-container'>
                    <button className='btn btn-primary' type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignupFormPage;
