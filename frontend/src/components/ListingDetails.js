import React, { useParams, useEffect } from "react";

/** Renders single Listing Card 
 * 
 * props: None
 * 
 * state:
 * - listing
 * 
 * /listings/:id -> ListingDetails
 * 
 */

function ListingCard(props) {
  const {id} = useParams();
  const [listing, setListing] = useState(null);

  useEffect(function makeRequest() {
    async function fetchListing() {
      try {
        let listing = await fetch(`/api/listings/${id}`)
        setListing(listing)
      } catch (err) {
        setListing(null)
        console.error("ERROR: ". err);
      }
    }
    fetchListing();
  }, []);

  if (!listing) {
    return (
      <div>Loading . . .</div>
    )
  }

  return (
    <div className="ListingCard">listing.
      <h2>{listing.title}</h2>
      <h4>{listing.location}</h4>
      <h4><i>Price: {listing.price}</i></h4>
      <p>Max Guests: {listing.max_guests}, Rating: {listing.rating}, Property Type: {listing.type}</p>
      <img src={listing.images_url} alt={listing.title} />
      <p>Hosted by: {listing.host}</p>
      <p>{listing.description}</p>
    </div>
  )
}