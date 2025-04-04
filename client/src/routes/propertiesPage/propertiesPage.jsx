import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./propertiesPage.scss";

function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/posts");
        setProperties(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = selectedType === 'all' 
    ? properties 
    : properties.filter(property => property.type === selectedType);

  return (
    <div className="propertiesPage">

      <div className="container">
        {/* Filter Section */}
       

        {loading ? (
          <div className="loading">
            <div className="loader">
              <div className="spinner"></div>
              <div className="spinner"></div>
              <div className="spinner"></div>
            </div>
            <p>Loading amazing properties...</p>
          </div>
        ) : (
          <div className="propertiesGrid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Link to={`/${property.id}`} key={property.id} className="propertyCard">
                  <div className="imgContainer">
                    {property.images && property.images.length > 0 ? (
                      <img src={property.images[0]} alt={property.title} />
                    ) : (
                      <div className="noImage">
                        <i className="fas fa-image"></i>
                        <span>No image available</span>
                      </div>
                    )}
                    <div className="priceTag">₹{property.price.toLocaleString()}</div>
                    {property.images && property.images.length > 1 && (
                      <div className="imageCount">
                        <i className="fas fa-images"></i>
                        <span>+{property.images.length - 1}</span>
                      </div>
                    )}
                    <div className="propertyType">
                      <i className={`fas fa-${property.type === 'house' ? 'house-user' : 
                        property.type === 'apartment' ? 'building' : 
                        property.type === 'villa' ? 'hotel' : 'home'}`}></i>
                      <span>{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                    </div>
                  </div>
                  <div className="propertyInfo">
                    <h2>{property.title}</h2>
                    <p className="location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{property.city}</span>
                    </p>
                    <div className="details">
                      <div className="detail">
                        <i className="fas fa-bed"></i>
                        <span>{property.bedroom} beds</span>
                      </div>
                      <div className="detail">
                        <i className="fas fa-bath"></i>
                        <span>{property.bathroom} baths</span>
                      </div>
                      <div className="detail">
                        <i className="fas fa-ruler-combined"></i>
                        <span>{property.postDetail?.size || 'N/A'} sqft</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="noResults">
                <i className="fas fa-search"></i>
                <h3>No properties found</h3>
                <p>We couldn&apos;t find any properties matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage; 