import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/gallery.css';
import Spinner from './spinner';
import backgroundVideo from '../video/gallery-video.mp4';

const Gallery = () => {
  const { camera } = useParams(); // Get the camera type from the URL
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  useEffect(() => {
    if (!camera) {
      setError('Camera parameter is missing in the URL.');
      setLoading(false);
      return;
    }

    const sol = 1000; // Example sol value
    const api_key = 'uyFxfrr2vH7LlnYw3GM8qbOrAs7Khe9erKXgsTEN';
    const normalizedCamera = camera ? camera.toUpperCase() : ''; // Normalize camera name to uppercase
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${normalizedCamera}&api_key=${api_key}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.photos && result.photos.length > 0) {
          setPhotos(result.photos);
        } else {
          setError("No photos available for this camera.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data.");
        setLoading(false);
      });
  }, [camera]);

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc); // Set the clicked image for the modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal by setting the selected image to null
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="gallery-container">
      <h2>Mars Rover Images from {camera}</h2>

      {/* Video background */}
      <video className="gallery-background" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gallery content */}
      <div className="gallery-images">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="gallery-card" onClick={() => handleImageClick(photo.img_src)}>
              <img
                src={photo.img_src}
                alt={photo.camera.full_name}
                className="gallery-image"
              />
              <div className="gallery-card-content">
                <h3>Camera: {photo.camera.full_name}</h3>
                <p>Earth Date: {photo.earth_date}</p>
                <p id="rover-name">Rover: {photo.rover.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No photos available for this camera.</p>
        )}
      </div>

      {/* Modal for showing the clicked image */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="modal-image" />
            <span className="close-btn" onClick={closeModal}>&times;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
