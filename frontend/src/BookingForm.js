import React, { useState } from "react";

/** Renders form to book a Listing
 * 
 * props:
 * - addBooking
 * 
 * state: 
 * - formData
 * - formErrors
 */

// process image only as of right now 
function BookingForm() {
  const [formData, setFormData] = useState({ image: null });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => {
      return {
        ...fData,
        [name]: value,
      }
    })
  }

  return (
    <form method="POST" action="api/listings" enctype="multipart/form-data">
      <input type="file" onChange={handleChange} name="image"/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default BookingForm;