import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Notification from "../../components/notification/Notification";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const { username, email, password, userType } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
        userType
      });
      updateUser(res.data);
      setShowNotification(true);
      setNotificationMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response.data.message);
      setShowNotification(true);
      setNotificationMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input 
            name="username" 
            type="text" 
            placeholder="Username" 
            required 
            minLength={3}
            maxLength={20}
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            minLength={6}
          />
          <div className="userTypeSelection">
            <label>
              <input type="radio" name="userType" value="buyer" defaultChecked />
              <span>Buyer</span>
            </label>
            <label>
              <input type="radio" name="userType" value="seller" />
              <span>Seller</span>
            </label>
          </div>
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <div className="links">
            <Link to="/login">Do you have an account?</Link>
          </div>
        </form>
      </div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={error ? "error" : "success"}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default Register;
