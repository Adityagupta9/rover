import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './spinner';  // Import your Spinner component
import '../style/home.css';
import saturn from '../img/saturn.png';
import roverimg from '../img/rover.png';
import backgroundVideo from '../video/gallery-video.mp4'; // Import video

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate based on camera type
  const handleCamera = (camera) => {
    navigate(`/gallery/${camera}`);
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Error state to handle potential issues

  useEffect(() => {
    const api_key = 'uyFxfrr2vH7LlnYw3GM8qbOrAs7Khe9erKXgsTEN';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError('Error fetching NASA data');
        } else {
          setData(result);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;  // Display the spinner component while loading
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div id="home">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="main-container">
        <div className="container1">
          <p id="wel1">Welcome to</p>
          <p id="wel2">Space Explorer</p>
          <p>
            Explore the wonders of the universe! This app brings you daily updates
            of breathtaking images and information from NASA.
            <img id="saturn-img" src={saturn} alt="Saturn" />
          </p>
        </div>
        <div className="container2">
          <h2>NASA's Astronomy Picture of the Day</h2>
          <div className="image-section">
            <img src={data.url} alt="NASA APOD" />
            <img id="rover-img" src={roverimg} alt="Rover" />
            <p><strong>{data.title}</strong></p>
            <p>{data.explanation}</p>
          </div>
        </div>
      </div>
      <div className="cta-section">
        <h3>Explore Mars Cameras</h3>
        <ul>
          <li onClick={() => handleCamera('FHAZ')}>Front Hazard Avoidance Camera</li>
          <li onClick={() => handleCamera('RHAZ')}>Rear Hazard Avoidance Camera</li>
          <li onClick={() => handleCamera('MAST')}>Mast Camera</li>
          <li onClick={() => handleCamera('CHEMCAM')}>Chemistry and Camera Complex</li>
          <li onClick={() => handleCamera('NAVCAM')}>Navigation Camera</li>
        </ul>
        <p>Start your journey through the cosmos today!</p>
      </div>
    </div>
  );
};

export default Home;
