import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./bookings.scss";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiRequest.get("/bookings");
        if (response.data && Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        if (err.response?.status === 401) {
          setError("Please login to view your bookings");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to fetch bookings. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bookings">
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You have no bookings yet.</p>
          <Link to="/properties" className="browse-btn">
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <div className="booking-info">
                <h3>{booking.post?.title || "Property Title Not Available"}</h3>
                <p className="address">{booking.post?.address || "Address Not Available"}</p>
                <p className="date">
                  Visit Date: {new Date(booking.date).toLocaleString()}
                </p>
                <p className={`status ${booking.status}`}>
                  Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </p>
              </div>
              <div className="booking-actions">
                {booking.postId && (
                  <Link to={`/${booking.postId}`}>
                    <button>View Property</button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings; 