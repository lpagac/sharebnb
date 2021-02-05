import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import ListingList from "../listings/ListingList";
import ListingDetail from "../listings/ListingDetail";
import ListingForm from "../listings/ListingForm";
import BookingForm from "../booking/BookingForm";
// import LoginForm from "../auth/LoginForm";
// import ProfileForm from "../profiles/ProfileForm";
// import SignupForm from "../auth/SignupForm";

/** Site-wide routes.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes(props) {

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/listings">
            <ListingList />
          </Route>
          
          <Route exact path="/listings/new">
            <ListingForm />
          </Route>

          <Route exact path="/listings/:listing_id">
            <ListingDetail />
          </Route>


          <Route path="/booking">
            <BookingForm />
          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
