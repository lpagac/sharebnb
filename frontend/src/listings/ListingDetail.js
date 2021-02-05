import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SharebnbApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** Listing Detail page.
 *
 * Renders information about Listing, with a link to BookingForm for listing.
 *
 * Routed at /listings/:listing_id
 *
 * Routes -> ListingDetail
 */

function ListingDetail() {
  const { listing_id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(function getListingInfo() {
    async function getListing() {
      setListing(await SharebnbApi.getListing(listing_id));
    }

    getListing();
  }, [listing_id]);

  if (!listing) return <LoadingSpinner />;

  return (
      <div className="ListingDetail col-md-8 offset-md-2">
        <h2>{listing.title}</h2>
        <h4>{listing.location} <small>Host: {listing.host}</small></h4>
        <img src={listing.images_url} alt={listing.title} />
        <h4><small>Price: {listing.price}, Max Guests: {listing.max_guests}, Rating: {listing.rating}, Property Type: {listing.type}</small></h4>
        <p>{listing.description}</p>
        <Link to="/booking"><button>Book Now!</button></Link>
      </div>
  );
}

export default ListingDetail;

