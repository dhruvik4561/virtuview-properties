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
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="bookings">
      {bookings.length === 0 ? (
        <p className="no-bookings">You have no bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <div className="booking-info">
                <h3>{booking.post.title}</h3>
                <p className="address">{booking.post.address}</p>
                <p className="date">
                  Visit Date: {new Date(booking.date).toLocaleString()}
                </p>
                <p className={`status ${booking.status}`}>
                  Status: {booking.status}
                </p>
              </div>
              <div className="booking-actions">
                <Link to={`/post/${booking.postId}`}>
                  <button>View Property</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings; 