import "./singlePage.scss";
import PropertyGallery from "../../components/propertyGallery/PropertyGallery";
import Map from "../../components/map/Map";
import ModelViewer from "../../components/modelViewer/ModelViewer";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const res = await apiRequest.post("/users/save", { postId: post.id });
      if (res.data.message === "Post saved") {
        setSaved(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } else if (res.data.message === "Post removed from saved list") {
        setSaved(false);
      }
    } catch (err) {
      console.error("Save error:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setBookingError(err.response?.data?.message || "Failed to save the property");
      }
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!bookingDate) {
      setBookingError("Please select a date for your visit");
      return;
    }

    try {
      const res = await apiRequest.post("/bookings", {
        postId: post.id,
        date: bookingDate,
      });
      
      if (res.data.message === "Booking created successfully") {
        setBookingSuccess("Booking request sent successfully!");
        setShowBookingForm(false);
        setBookingDate("");
        setBookingError("");
      } else {
        setBookingError(res.data.message || "Failed to book the property");
      }
    } catch (err) {
      console.error("Booking error:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setBookingError(err.response?.data?.message || "Failed to book the property. Please try again later.");
      }
    }
  };

  return (
    <div className="singlePage">
      <div className="leftContent">
        <div className="wrapper">
          <PropertyGallery images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">₹ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
        
        <div className="features">
          <div className="wrapper">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Utilities</span>
                  {post.postDetail.utilities === "owner" ? (
                    <p>Owner is responsible</p>
                  ) : (
                    <p>Tenant is responsible</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  {post.postDetail.pet === "allowed" ? (
                    <p>Pets Allowed</p>
                  ) : (
                    <p>Pets not Allowed</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Income Policy</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
            <p className="title">Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom} beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>
            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>
                    {post.postDetail.school > 999
                      ? post.postDetail.school / 1000 + "km"
                      : post.postDetail.school + "m"}{" "}
                    away
                  </p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{post.postDetail.bus}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{post.postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
            
            <div className="buttons">
              <button
                onClick={handleSave}
                className={saved ? "saved" : ""}
                style={{
                  backgroundColor: saved ? "#fece51" : "white",
                  cursor: saved ? "default" : "pointer",
                }}
              >
                <img src="/save.png" alt="" />
                {saved ? "Place Saved" : "Save the Place"}
              </button>
              {currentUser?.userType !== "seller" && (
                <button onClick={() => setShowBookingForm(true)}>
                  <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Calendar" />
                  Book a Visit
                </button>
              )}
            </div>
            
            {showBookingForm && (
              <div className="booking-form">
                <h3>Book a Visit</h3>
                <form onSubmit={handleBooking}>
                  <input
                    type="datetime-local"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                  <button type="submit">Book Now</button>
                  <button type="button" onClick={() => setShowBookingForm(false)}>
                    Cancel
                  </button>
                  {bookingSuccess && <div className="success">{bookingSuccess}</div>}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="rightContent">
        <div className="modelViewerContainer">
          <ModelViewer />
        </div>
        <div className="mapContainer">
          <Map items={[post]} />
        </div>
      </div>
      {saveSuccess && (
        <div className="saveSuccess">
          <p>Post saved successfully!</p>
        </div>
      )}
    </div>
  );
}

export default SinglePage;
