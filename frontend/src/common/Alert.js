import React from "react";

/** Presentational component for showing bootstrap-style alerts.
 *
 * { BookingForm } -> Alert
 **/

function Alert({ type = "danger", message = "Error" }) {

  return (
      <div className={`alert alert-${type}`} role="alert">
        <p className="mb-0 small">
          {message}
        </p>
      </div>
  );
}

export default Alert;
