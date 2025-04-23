import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate, Link } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0] || currentUser.avatar
      });
      updateUser(res.data);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred while updating your profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              placeholder="Enter your username"
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
              placeholder="Enter your email"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Leave blank to keep current password"
            />
          </div>
          <div className="item">
            <label>Account Type</label>
            <div className="userTypeDisplay">
              {currentUser.userType === "seller" ? "Seller Account" : "Buyer Account"}
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
          {error && <span className="error">{error}</span>}
          {successMessage && <span className="success">{successMessage}</span>}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/profile" style={{ color: "#3498db", textDecoration: "none", fontWeight: "500" }}>
              ← Back to Profile
            </Link>
          </div>
        </form>
      </div>
      <div className="sideContainer">
        <img 
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} 
          alt="Profile Avatar" 
          className="avatar" 
        />
        <div className="uploadSection">
          <UploadWidget
            uwConfig={{
              cloudName: "lamadev",
              uploadPreset: "estate",
              multiple: false,
              maxImageFileSize: 2000000,
              folder: "avatars"
            }}
            setState={setAvatar}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
