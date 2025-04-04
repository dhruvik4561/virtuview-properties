import "./contactPage.scss";
import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="contactPage">
      <div className="hero">
        <div className="overlay"></div>
        <div className="heroContent">
          <h1>Get in Touch</h1>
          <p>We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
        </div>
      </div>
      
      <div className="container">
        <div className="content">
          <div className="contactInfo">
            <div className="infoCard">
              <div className="icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Our Location</h3>
              <p>123 Real Estate Ave, City, Country</p>
            </div>
            
            <div className="infoCard">
              <div className="icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p>info@virtuview.com</p>
            </div>
            
            <div className="infoCard">
              <div className="icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="contactForm">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="formGroup">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  required
                />
              </div>
              
              <div className="formGroup">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  required
                />
              </div>
              
              <div className="formGroup">
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject" 
                  required
                />
              </div>
              
              <div className="formGroup">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submitBtn">
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 