import React, { useState, useEffect } from "react";
// import SearchForm from "../common/SearchForm";
import SharebnbApi from "../api/api";
import ListingCard from "./ListingCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of listings.
 *
 * On mount, loads listings from API.
 *
 * This is routed to at /listings
 *
 * Routes -> ListingCard 
 */

function ListingList() {
  const [listings, setListings] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(function loadListings() {
    async function getListings() {
      try {
        let all_listings = await SharebnbApi.getListings();
        setListings(all_listings);
      } catch (err) {
        console.error("App loadListings: problem loading", err);
        setListings(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getListings();
  }, [])

  // /** Triggered by search form submit; reloads companies. */
  // async function search(name) {
  //   let companies = await JoblyApi.getCompanies(name);
  //   setCompanies(companies);
  // }

  if (!listings) return <LoadingSpinner />;

  return (
    <div className="ListingList col-md-8 offset-md-2">
      {/* <SearchForm searchFor={search} /> */}
      {listings.length
        ? (
          <div className="ListingList-list">
            {listings.map(l => (
              <ListingCard
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
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default ListingList;
