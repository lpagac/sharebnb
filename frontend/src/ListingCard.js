import React from "react";
import { Link } from "react-router-dom";

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
    <Link to={`/listings/${id}`}>
      <li className="ListingCard">
        <h2>{title}</h2>
        <h4>{location}</h4>
        <p>Price: {price}, Max Guests: {max_guests}, Rating: {rating}, Property Type: {type}</p>
        <img src={images_url} alt={title} />
      </li>
    </Link>
  )
}