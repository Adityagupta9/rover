// Spinner.js
import React from 'react';
import { FallingLines } from 'react-loader-spinner'; // Importing the spinner component
import '../style/spinner.css'; // Assuming you will add CSS in a separate file
import backgroundVideo from '../video/gallery-video.mp4';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <video autoPlay muted loop className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="spinner-overlay">
        <FallingLines
          color="#ffffff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    </div>
  );
};

export default Spinner;
