import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login/login';
import Registor from './components/Registor/registor'
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/registor" component={Registor} />
                </Switch>
            </Router>

            hi
            {/* <Login /> */}

        </div>
    );
}

export default App;
