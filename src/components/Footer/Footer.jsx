import React from 'react'
import '../Footer/Footer.css'

const Footer = () => {
  const today = new Date();

  return (
    <>

    <div className='footer'>
      <h2 className='co-name'>Heights</h2>

      <div className="co-rights">
        <p>
          &copy; {today.getFullYear()} <span className="co-rights-text">Heights ltd</span> | All rights reserved
        </p>
      </div>

      <div className='co-details'>
        <p>About | Privacy | Return Policy</p>
      </div>


    </div>
        
    </>
  )
}


export default Footer; 

