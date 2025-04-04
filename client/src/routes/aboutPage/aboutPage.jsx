import "./aboutPage.css";

function AboutPage() {
  return (
    <>
      <div className="about-us-container">
        <header className="about-header">
          <h1>About VirtuView Properties</h1>
          <p>Where luxury meets technology for your perfect home.</p>
        </header>

        <section className="about-section">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At VirtuView Properties, our mission is to transform the real estate
              landscape by combining cutting-edge virtual experiences with world-class
              property listings. We help clients discover, explore, and secure their dream properties from anywhere in the world.
            </p>
          </div>
          <img src="./mission.jpg" alt="Our Mission" />
        </section>

        <section className="about-section vision">
          <img src="./vision.jpg" alt="Our Vision" />
          <div className="about-text">
            <h2>Our Vision</h2>
            <p>
              We envision a future where luxury properties can be experienced virtually 
              with stunning detail, making property discovery seamless, global, and innovative.
            </p>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We lead with technology to provide next-level real estate experiences.</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>Clear, honest communication with clients at every stage.</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>High-end service, quality listings, and exceptional client care.</p>
            </div>
            <div className="value-card">
              <h3>Global Reach</h3>
              <p>Connecting clients with luxury properties worldwide.</p>
            </div>
          </div>
        </section>


        <section className="why-choose-container">
          <div className="why-choose-card">
            <h2>Why Choose VirtuView?</h2>
            <ul>
              <li>🏡 Exclusive luxury listings</li>
              <li>👓 Virtual tours in HD</li>
              <li>📜 End-to-end documentation assistance</li>
              <li>🛡️ Safe and secure transactions</li>
              <li>🌐 Global network of elite properties</li>
            </ul>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"VirtuView helped me purchase my dream villa entirely online. The virtual tours felt like I was really there!"</p>
              <h4>— Amanda Richards</h4>
            </div>
            <div className="testimonial-card">
              <p>"Professional, fast, and flawless service. Highly recommend VirtuView for luxury property buyers."</p>
              <h4>— Martin Brooks</h4>
            </div>
            <div className="testimonial-card">
              <p>"A seamless experience from virtual viewing to closing the deal!"</p>
              <h4>— Priya Sharma</h4>
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <h2>Ready to Find Your Dream Property?</h2>
          <p>Contact VirtuView Properties and let us guide you home.</p>
          <a href="/contact" className="cta-button">Contact Us</a>
        </section>
      </div>
    </>
  );
}

export default AboutPage; 