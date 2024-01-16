import React from 'react';
import './Gallery.css';
// import img from './backgroung.webp'
 // Import your stylesheet if you have one

const Gallery = ({picture,header}) => {
  return (
    <div className="card1">
      <img src={picture} alt='img' className="card1-image" />
      <div className="card1-content">
        <h6 className="card1-title">{header}</h6>
        {/* <p className="card1-description">{description}</p> */}
      </div>
    </div>
  );
};

export default Gallery;