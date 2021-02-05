import React from "react";
import ListingCard from "./ListingCard.js";

/** Renders list if ListingCard components
 * 
 * props:
 * - listings: array Listing objects
 * 
 * state: none
 * 
 * App -> ListingList
 */

function ListingList({listings}) {

  function renderCards() {
    return listings.map(l => {
      return <ListingCard
                  key={l.id}
                  id={l.id}
                  location={l.location}
                  price={l.price}
                  images_url={l.images_url}
                  max_guests={l.max_guests}
                  rating={l.rating}
                  title={l.title}
                  type={l.listing_type}
              />
    });
  }
  return (
    <ul className="ListingList">
      {renderCards()}
    </ul>
  )
}

