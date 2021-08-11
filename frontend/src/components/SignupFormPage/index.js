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
            <div>
                <label>username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
            </div>
            <div>
                <label>email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <label>password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
    )
}

export default SignupFormPage;
