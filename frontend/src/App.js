
import { Switch, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Navigation from './components/Navigation';
import { restoreUser } from "./store/session";
import SignupFormPage from './components/SignupFormPage';
import Home from './components/Home';
import Profile from './components/Profile';


function App() {

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return isLoaded && (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/signup'>
                    <SignupFormPage />
                </Route>
                <Route path='/profile'>
                    <Profile />
                </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
