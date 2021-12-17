import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";

// pages
import { AllJourneysPage } from './pages/AllJourneysPage';
import { CreateJourneyPage } from './pages/CreateJourneyPage';
import { CreateJourneyDetailsPage } from './pages/CreateJourneyDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { JourneyPage } from './pages/JourneyPage';

// config
import { routes } from './config/routes';

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateSearchJourney from "./pages/CreateSearchJourney";
// import CreatePinJourney from "./components/CreatePinJourney";
import CreateJourney2 from "./pages/CreateJourney2";
import Journey from "./pages/Journey"
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/SignUp";
import Signin from "./pages/Signin";
import HomeSearch from "./pages/HomeSearch";



// auth
import { UserContextProvider } from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";


function App() {


  return (
    <div className="wrap-app">
      <div className="App">
        <UserContextProvider>
          <Switch>
            {/* <Route exact path="/" component= {Home} /> */}
            <ProtectedRoute exact path="/profile" component={ProfilePage} />
            <ProtectedRoute exact path="/createSearchJourney" component={CreateJourneyPage} />

            <ProtectedRoute exact path="/createSearchJourney/create2" component={CreateJourneyDetailsPage} />
            {/* <Route exact path="/createSearchJourney/Pin" component = {CreatePinJourney} /> */}
            <ProtectedRoute exact path="/journey" component={JourneyPage} />
            {/* <Route exact path="/profile" component={Profile} /> */}
            {/* <Route exact path="/createSearchJourney" component = {CreateSearchJourney} />         */}
            {/* <Route exact path="/createSearchJourney/create2" component = {CreateJourney2} />    */}
            {/* <Route exact path="/journey" component = {Journey} />  */}

            <Route exact path="/auth/signup" component={Signup} />
            <Route exact path="/auth/signin" component={Signin} />
            <Route exact path="/" component={AllJourneysPage} />

            <Route path="*" component={ErrorPage} />
          </Switch>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
