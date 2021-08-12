import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { signupUser } from "../../store/session";

import './SignupFormPage.css'



function SignupFormPage () {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/"></Redirect>;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username,
            email,
            password
        }

        try {
            const user = await dispatch(signupUser(payload));
            console.log(user);
            history.push('/')
        } catch (e) {
            const errors = await e.json();
            console.log(errors);
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
            </div>
            <div className='widget-container'>
                <input
                    type="text"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div className='widget-container'>
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <div className='btn-container'>
                <button className='btn btn-primary' type="submit">Sign Up</button>
            </div>
        </form>
    </div>
    )
}

export default SignupFormPage;
