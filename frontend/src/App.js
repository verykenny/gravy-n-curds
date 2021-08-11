
import { Switch, Route } from 'react-router-dom'


import LoginFormPage from "./components/LoginFormPage";
import Navigation from './components/Navigation';


function App() {
    return (
        <>
            <Navigation />
            <Switch>
                <Route exact path='/'>
                    <h1>Home Page</h1>
                </Route>
                <Route path='/login'>
                    <LoginFormPage />
                </Route>
            </Switch>
        </>
    );
}

export default App;
