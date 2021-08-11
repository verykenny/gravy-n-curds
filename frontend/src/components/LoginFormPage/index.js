// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
// import { logInUser } from '../../store/session';

// import './LoginForm.css'

// function LoginFormPage() {
//     const [credential, setCredential] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const sessionUser = useSelector((state) => state.session.user);

//     if (sessionUser) return <Redirect to="/"></Redirect>;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await dispatch(logInUser(credential, password));
//             history.push('/');
//         } catch (e) {
//             const error = await e.json();
//             console.log('error that was returned', error);
//             // TODO:
//             // 1. Handle and display these errors
//         }
//     };

//     return (
//         <div className='form-container login-form'>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>username or email:</label>
//                     <input
//                         type="text"
//                         value={credential}
//                         onChange={(e) => setCredential(e.target.value)}
//                     ></input>
//                 </div>
//                 <div>
//                     <label>password: </label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     ></input>
//                 </div>
//                 <div>
//                     <button type="submit">Log In</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default LoginFormPage;
