import React from "react";
import "./contactus.css";
import { motion } from "framer-motion";
import Header from "../../header/header";
import Footer from "../../footer/footer";

const ContactUs = () => {
  return (
    <div className="contact-page">
      <Header />

      <motion.section
        className="contact-form-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Contact Our Real Estate Experts</h2>
        <p>
          Whether you're buying, selling, or investing, our team is here to help. Fill out the form and we’ll connect with you soon!
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Full Name" required />
          <input type="email" placeholder="Your Email Address" required />
          <input type="text" placeholder="Phone Number (Optional)" />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            Submit Inquiry
          </motion.button>
        </form>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ContactUs;
