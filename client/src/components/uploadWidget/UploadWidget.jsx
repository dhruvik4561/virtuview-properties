import { useEffect, useState, useRef } from "react";

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    // Check if the script is already loaded
    const uwScript = document.getElementById("uw");
    if (!uwScript) {
      // If not loaded, create and load the script
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    } else if (window.cloudinary) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded && window.cloudinary && !widgetRef.current) {
      try {
        widgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);
              setState(prev => [...prev, result.info.secure_url]);
            }
          }
        );
      } catch (error) {
        console.error("Error creating upload widget:", error);
      }
    }
  }, [loaded, uwConfig, setState]);

  const handleClick = (e) => {
    e.preventDefault();
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <button className="cloudinary-button" onClick={handleClick}>
      Upload
    </button>
  );
}

export default UploadWidget;
