import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import BookingForm from "./BookingForm";

function App() {
  const [listings, setListings ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function makeAPIRequest() {
    async function fetchListings() {
      try {
        let listings = await fetch("api/listings");
        setListings(listings);
        setIsLoading(false);
      } catch(err) {
        setListings(null);
        setIsLoading(false);
        console.error('ERROR: ', err);
      }
    if (isLoading) fetchListings();  
    }
  }, [isLoading])

  return (
    <div className="App">
      <h1>Hello</h1>
      <BookingForm />
    </div>
  )
}

export default App;

