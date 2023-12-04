import React from 'react'
import '../components/css/success.css'
import { Link } from 'react-router-dom';

export const Success = () => {

  return (
    <>
    <div className='wrapper'>
      <h1 className='thank-you'>Thank you</h1>
      <p className='h1-summary'>Thanks for choosing <span className='company'>Heights</span></p>
      
      <Link to="/home">
        <button className='go-home-btn'>Home</button>
      </Link>
      
    </div>
    </>
  )
}


export default Success;