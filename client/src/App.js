import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/LoginComponent/Login";
import Header from "./Components/HeaderComponent/Header";
import Register from "./Components/RegisterComponent/Register";
import Profile from "./Components/ProfileComponent/Profile";
import Home from "./Components/HomeComponent/Home";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
