import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import SharebnbApi from "../api/api";

/** Renders form to book a Listing
 * props: None
 * 
 * state: 
 * - formData
 * - formErrors
 */

// process image only as of right now 
function BookingForm({listing_id}) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    num_guests: '',
    price_type: '',
    start_time: '',
    end_time: '',
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
      let result = await SharebnbApi.bookListing(1, listing_id, formData);
      history.push("/listings");
    } catch (err) {
      setFormErrors(true);
    }
  }

  return (
    <div className="BookingForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Book it!</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Number of Guests?</label>
                <input
                    type="number"
                    name="num_guests"
                    className="form-control"
                    value={formData.num_guests}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>What rate would you like?</label>
                <select
                    name="price_type"
                    className="form-control"
                    onChange={handleChange}
                />
                <option value="">Choose...</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </div>
              <div className="form-group">
                <label>Start Date/Time</label>
                <input
                    type="datetime-local"
                    name="start_time"
                    className="form-control"
                    value={formData.start_time}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>End Date/Time</label>
                <input
                    type="datetime-local"
                    name="end_time"
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

export default BookingForm;