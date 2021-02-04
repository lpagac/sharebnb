import React, { useState, useEffect } from "react";
import { render } from "react-dom";


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
      NEED: ListingsList, Listing
      listings here
    </div>
  )
}

export default App;

const container = document.getElementById("root");
render(<App />, container);