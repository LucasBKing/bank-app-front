import React from 'react';
import UserRegistration from './components/authentication/UserRegistration';
import LoginRegistration from './components/authentication/LoginRegistration';
import BankAccountRegistration from './components/authentication/BankAccountRegistration';
import Login from './components/authentication/Login';

import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home/Home';

import 'bootstrap/dist/css/bootstrap.css';

import { Switch, Route } from 'react-router-dom';
 

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/user_registration" component={UserRegistration} />
        <Route path="/login_registration" component={LoginRegistration} />
        <Route path="/bank_account_registration" component={BankAccountRegistration} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
