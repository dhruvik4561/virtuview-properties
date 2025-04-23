import { useEffect, useRef, useState } from 'react';
import './ModelViewer.scss';

function ModelViewer() {
  const iframeRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Handle iframe resize on window resize
  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        // Force iframe to reload on resize to ensure proper rendering
        const currentSrc = iframeRef.current.src;
        iframeRef.current.src = '';
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.src = currentSrc;
          }
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Send zoom message to iframe
  useEffect(() => {
    const sendZoomMessage = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'zoom',
          value: zoomLevel
        }, '*');
      }
    };

    // Send zoom message when zoom level changes
    sendZoomMessage();
  }, [zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="modelViewer">
      <div className="zoomControls">
        <button onClick={handleZoomIn} className="zoomButton zoomIn">
          <span>+</span>
        </button>
        <button onClick={handleZoomOut} className="zoomButton zoomOut">
          <span>-</span>
        </button>
      </div>
      <iframe 
        ref={iframeRef}
        src="/model-viewer.html" 
        title="3D Model Viewer"
        width="100%" 
        height="100%" 
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default ModelViewer; 