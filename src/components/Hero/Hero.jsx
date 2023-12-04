
import React from 'react';
import heroImage from '../../assets/hero-image.jpg';
// import rightImage from '../../assets/right-image.jpg';
import topImage from '../../assets/topImage.jpg'
import bottomImg from '../../assets/bottomImg.jpg'
import bottomLeft from '../../assets/bottom-left.jpg'
import topRight from '../../assets/top-right.jpg'

import './hero.css';

const Hero = () => {
  return (
    <div className='hero-container'>
      <div className='main-image'>
        <img className='hero-image' src={heroImage} alt="Pink Heels" />
        {/* <div className='text-overlay'>
          <h1>Clothing trends in 2023</h1>
          <p>Up to 30% off</p>
        </div> */}
      </div> 
      
        <div className='small-images'> 
        <div className='image-with-text'>
          <img className='top-image' src={topImage} alt="Right image" />
          <img className='right-image' src={topRight} alt="bottom image" />
        </div> 

        <div className='image-with-text'> 
          <img className='bottom-image' src={bottomImg} alt="Bottom image" />
          <img className='bottom-left' src={bottomLeft} alt="top image" />
        </div>  
        </div>
      </div>
    
  );
};

export default Hero;
