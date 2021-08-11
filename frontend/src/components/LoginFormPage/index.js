import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser, logOutUser } from '../../store/session';

function LoginFormPage () {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = dispatch(logInUser(credential, password));

        console.log(user);
        reset()
    }

    const reset = () => {
        setCredential('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>username or email:</label>
            <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)}></input>
            <label>password: </label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <div>
                <button type='submit'>Sign In</button>
            </div>
        </form>
    )
};




export default LoginFormPage;
