import React from "react";
import { Link } from "react-router-dom";

import "./ListingCard.css";

/** Renders single Listing Card 
 * 
 * props:
 * - id
 * - location
 * - price
 * - images_url
 * - max_guests
 * - rating
 * - title
 * - type
 * 
 * state: None
 * 
 * ListingList -> ListingCard
 * 
 */

function ListingCard(props) {
  const {
    id,
    location,
    price,
    images_url,
    max_guests,
    rating,
    title,
    type } = props

  return (
    <Link className="ListingCard card" to={`/listings/${id}`}>
      <div className="card-body">
        <h6 className="card-title">
          {title}
          <small>{location}</small>
          <img src={images_url}
            alt={title}
            className="float-right ml-5" />
        </h6>
        <p><small>Price: {price}, Max Guests: {max_guests}, Rating: {rating}, Property Type: {type}</small></p>
      </div>
    </Link>
  );
}

export default ListingCard;
