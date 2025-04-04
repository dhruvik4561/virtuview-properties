import { useState } from "react";
import "./propertyGallery.scss";

const PropertyGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return <div className="no-images">No images available</div>;
  }

  return (
    <div className="property-gallery">
      <div className="main-image">
        <img 
          src={images[selectedImage]} 
          alt={`Property view ${selectedImage + 1}`}
          className="selected-image"
        />
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery; 