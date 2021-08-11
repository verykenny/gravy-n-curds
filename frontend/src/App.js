
import { Switch, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";



import LoginFormPage from "./components/LoginFormPage";
import Navigation from './components/Navigation';
import { restoreUser } from "./store/session";
import SignupFormPage from './components/SignupFormPage';


function App() {

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return isLoaded && (
        <>
            <Navigation />

            <Switch>
                <Route exact path='/'>
                    <h1>Home Page</h1>
                </Route>
                <Route path='/login'>
                    <LoginFormPage />
                </Route>
                <Route path='/signup'>
                    <SignupFormPage />
                </Route>
            </Switch>
        </>
    );
}

export default App;
