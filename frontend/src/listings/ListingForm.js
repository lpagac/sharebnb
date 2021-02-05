import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import SharebnbApi from "../api/api";
import BookingForm from "../booking/BookingForm";

/** Renders form to book a Listing
 * props: None
 * 
 * state: 
 * - formData
 * - formErrors
 */

// process image only as of right now 
function ListingForm(props) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    location: '',
    price_per_hour: '',
    price_per_day: '',
    price_per_month: '',
    description: '',
    max_guests: '',
    title: '',
    listing_type: '',
    image_file: '',
    username: 'j.lei',
  });
  const [formErrors, setFormErrors] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => {
      return {
        ...fData,
        [name]: value,
      }
    })
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let result = await fetch
      ("http://localhost:8000/api/listings/",
      {method: 'POST', 
       body: {payload: {...formData, image_file: ""}}});
      console.log(result.id, "result id ");
      // upload image
      await fetch(`http://localhost:8000/api/listings/1/image-upload/`,
        {method: 'POST', 
        body: {file: formData.image_file}});
      //  headers: {
      //   'Content-Type': 'multipart/form-data','boundry':"----WebKitFormBoundary7MA4YWxkTrZu0gW"}});
      // history.push(`/listings/${result.id}`);
    } catch (err) {
      setFormErrors(true);
    }
  }

  return (
    <div className="ListingForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Get ready to host!</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input hidden value="j.lei"/>
                <label>Location</label>
                <input
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Price per hour</label>
                <input
                    type="number"
                    name="price_per_hour"
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Price per day</label>
                <input
                    type="number"
                    name="price_per_day"
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Price per month</label>
                <input
                    type="number"
                    name="price_per_month"
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Max guests</label>
                <input
                    type="number"
                    name="max_guests"
                    className="form-control"
                    value={formData.max_guests}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ListingForm-listingType">Listing type</label>
                <select 
                    id="ListingForm-listingType" 
                    name="listing_type" 
                    className="form-control" 
                    onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="backyard">Backyard</option>
                  <option value="entire_house">Home and Yard</option>
                  <option value="apartment_yard">Apartment Backyard</option>
                </select>
              </div>
              <div className="form-group">
                <label>Title for listing</label>
                <input
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Photo of space</label>
                <input
                    type="file"
                    name="image_file"
                    className="form-control"
                    value={formData.end_time}
                    onChange={handleChange}
                />
              </div>

              {formErrors
                  ? <Alert type="danger" message={'Error submitting'} />
                  : null
              }

              <button
                  type="submit"
                  className="btn btn-primary float-right"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
);
}

export default ListingForm;