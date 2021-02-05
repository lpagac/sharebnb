import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import SharebnbApi from "./api/api";
import UserContext from "./auth/UserContext";

function App() {

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={'currUser'}>
        <div className="App">
          <Navigation />
          <Routes />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
