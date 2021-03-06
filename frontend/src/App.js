
import { Switch, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Navigation from './components/Navigation';
import { restoreUser } from "./store/session";
import SignupFormPage from './components/SignupFormPage';
import Home from './components/Home';
import Profile from './components/Profile';
import Poutine from './components/Poutine';
import Store from './components/Store';
import Checkin from './components/Checkin';
import StoreForm from './components/StoreForm';
import { getCheckins } from './store/checkins';
import { getPoutines } from './store/poutine';
import { getStores } from './store/stores';
import StoreEditForm from './components/StoreEditForm';
import RecentReviews from './components/RecentReviews';
import TopRated from './components/TopRated';
import Footer from './components/Footer';
import NotFound from './components/NotFound';


function App() {

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(restoreUser()).then(() => setIsLoaded(true));
        dispatch(getCheckins());
        dispatch(getPoutines());
        dispatch(getStores());
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
                    <Route path='/recent'>
                        <RecentReviews />
                    </Route>
                    <Route path='/top-rated'>
                        <TopRated />
                    </Route>
                    <Route path='/poutines/:poutineId'>
                        <Poutine />
                    </Route>
                    <Route path='/stores/create'>
                        <StoreForm />
                    </Route>
                    <Route path='/stores/:storeId/edit'>
                        <StoreEditForm />
                    </Route>
                    <Route path='/stores/:storeId'>
                        <Store />
                    </Route>
                    <Route path='/checkins/:checkinId'>
                        <Checkin />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            )}
            <Footer />
        </>
    );
}

export default App;
