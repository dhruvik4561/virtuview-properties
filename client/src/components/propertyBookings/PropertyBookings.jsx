import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./propertyBookings.scss";

function PropertyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiRequest.get("/property-bookings");
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch property bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const response = await apiRequest.patch(`/property-bookings/${bookingId}/status`, {
        status: newStatus,
      });
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? response.data : booking
      ));
    } catch (err) {
      setError("Failed to update booking status");
    }
  };

  if (loading) return <p>Loading property bookings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="property-bookings">
      {bookings.length === 0 ? (
        <p className="no-bookings">No booking requests for your properties yet.</p>
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
                <p className="requester">
                  Requested by: {booking.user.username}
                </p>
                <p className={`status ${booking.status}`}>
                  Status: {booking.status}
                </p>
              </div>
              <div className="booking-actions">
                <Link to={`/post/${booking.postId}`}>
                  <button>View Property</button>
                </Link>
                {booking.status === 'pending' && (
                  <div className="status-buttons">
                    <button 
                      className="approve"
                      onClick={() => handleStatusUpdate(booking.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="reject"
                      onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyBookings; 