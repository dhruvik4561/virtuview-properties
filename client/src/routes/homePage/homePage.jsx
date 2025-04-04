import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function HomePage() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="homePage">
      {/* Hero Section */}
      <div className="heroSection">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
            <p>
              Discover your perfect home with our extensive property listings. 
              From cozy apartments to luxurious mansions, we have the right property for you.
            </p>
            <SearchBar />
           
          </div>
        </div>
        <div className="imgContainer">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Luxury Real Estate" />
        </div>
      </div>

      {/* Our Features Section */}
      <div className="featuresSection">
        <div className="wrapper">
          <div className="sectionHeader">
            <h2>Our Features</h2>
            <p>Discover what makes us the best choice for your real estate needs</p>
          </div>
          <div className="featuresGrid">
            <div className="featureCard">
              <div className="icon">
                <img src="/search.png" alt="Search" />
              </div>
              <h3>Advanced Search</h3>
              <p>Find properties that match your exact criteria with our powerful search filters</p>
            </div>
            <div className="featureCard">
              <div className="icon">
                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Map" />
              </div>
              <h3>Interactive Maps</h3>
              <p>Explore properties in their real-world location with our interactive map view</p>
            </div>
            <div className="featureCard">
              <div className="icon">
                <img src="/chat.png" alt="Chat" />
              </div>
              <h3>Direct Communication</h3>
              <p>Connect directly with property owners and agents through our messaging system</p>
            </div>
            <div className="featureCard">
              <div className="icon">
                <img src="/save.png" alt="Save" />
              </div>
              <h3>Save Favorites</h3>
              <p>Bookmark your favorite properties to easily access them later</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Value Section */}
      <div className="valueSection">
        <div className="wrapper">
          <div className="sectionHeader">
            <h2>Our Value</h2>
            <p>Why thousands of people trust us for their real estate needs</p>
          </div>
          <div className="valueContent">
            <div className="valueImage">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80" alt="Our Value - Modern Real Estate" />
            </div>
            <div className="valuePoints">
              <div className="valuePoint">
                <div className="pointNumber">01</div>
                <div className="pointContent">
                  <h3>Transparent Process</h3>
                  <p>We believe in complete transparency throughout the property transaction process</p>
                </div>
              </div>
              <div className="valuePoint">
                <div className="pointNumber">02</div>
                <div className="pointContent">
                  <h3>Verified Listings</h3>
                  <p>All properties are verified to ensure they meet our quality standards</p>
                </div>
              </div>
              <div className="valuePoint">
                <div className="pointNumber">03</div>
                <div className="pointContent">
                  <h3>Expert Support</h3>
                  <p>Our team of real estate experts is always ready to assist you</p>
                </div>
              </div>
              <div className="valuePoint">
                <div className="pointNumber">04</div>
                <div className="pointContent">
                  <h3>Secure Transactions</h3>
                  <p>Your security is our priority with protected payment and data systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="wrapper">
          <div className="footerContent">
            <div className="footerColumn">
              <div className="footerLogo">
                <img src="/logo.png" alt="LamaEstate" />
                <h3>Virtuview properties</h3>
              </div>
              <p>Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters in one place.</p>
              <div className="socialLinks">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="footerColumn">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                <li><Link to="/list"><i className="fas fa-building"></i> Properties</Link></li>
                <li><Link to="/about"><i className="fas fa-info-circle"></i> About Us</Link></li>
                <li><Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link></li>
                <li><Link to="/blog"><i className="fas fa-blog"></i> Blog</Link></li>
              </ul>
            </div>
            <div className="footerColumn">
              <h4>Contact Us</h4>
              <ul className="contactInfo">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>virtuview properties, City, Country</span>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>+1 234 567 890</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@virtuview.com</span>
                </li>
              </ul>
            </div>
            <div className="footerColumn">
              <h4>Newsletter</h4>
              <p>Subscribe to our newsletter for the latest property listings and updates</p>
              <div className="newsletterForm">
                <input type="email" placeholder="Your email address" />
                <button><i className="fas fa-paper-plane"></i> Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footerBottom">
            <p>&copy; {new Date().getFullYear()} VirtuView Properties. All rights reserved.</p>
            <div className="footerLinks">
              <a href="#"><i className="fas fa-shield-alt"></i> Privacy Policy</a>
              <a href="#"><i className="fas fa-file-contract"></i> Terms of Service</a>
              <a href="#"><i className="fas fa-cookie"></i> Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
