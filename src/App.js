import React from 'react';
import UserRegistration from './components/authentication/UserRegistration';
import LoginRegistration from './components/authentication/LoginRegistration';
import BankAccountRegistration from './components/authentication/BankAccountRegistration';
import Home from './components/Home/Home';
import './App.css';
import { Switch, Route } from 'react-router-dom';
 

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/user_registration" component={UserRegistration} />
        <Route path="/login_registration" component={LoginRegistration} />
        <Route path="/bank_account_registration" component={BankAccountRegistration} />
      </Switch>
    </div>
  );
}

export default App;
