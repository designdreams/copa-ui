import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TravelDetail from './Travel/TravelDetail'
import viewTravel from './Travel/ViewTravel'

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={TravelDetail}/>
                    <Route path='/view' exact={true} component={viewTravel}/>
                </Switch>

            </Router>

        )


    }

}
export default App;
