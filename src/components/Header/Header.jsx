import '../Header/Header.css'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useEffect } from 'react';


const Header = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, logout, cartCount } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {

    const localToken = localStorage.getItem("token");
    if (localToken && localToken.length > 0) {
      setAuthUser(true);
      let user = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(user);
    } else {
      setAuthUser(false);
    }
  }, [setIsLoggedIn, setAuthUser]); 



  const handleLogout = () => {
    logout();
    navigate('/login');
  }


  return (
    <>
      <header className='header'>
        <h1 className='logo'>Heights</h1>

        <div className='search'>
          <input type="text" placeholder='search'/>
        </div>

        <div className='header-links'>
          <ul>
            <li className='header-list'>
              <NavLink to='/' className='active-link'>
                <i className="fa-solid fa-house"></i> Home
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to='/cart' className='active-link'>
                <i className="fa-solid fa-cart-shopping"></i> Cart  
              </NavLink>
              <span className="cart-Number">{cartCount}</span>
            </li>
          </ul>

        <div>
          
        </div>


         <div className='login'>
          {authUser ? (
            <div className='user-info'>
                 {/* Check if it's a Google login   */}
               {isLoggedIn && isLoggedIn.picture ? (
                <>
                  <img src={isLoggedIn.picture} alt="User" className="user-image" />
                  <span className="welcome">{isLoggedIn.given_name || isLoggedIn.name}</span>
                </>
              ) : ( 
                <span className="welcome">{isLoggedIn && (isLoggedIn.given_name || isLoggedIn.name)}</span>
              )}
              <Link to="/login">
                <i className="fa-regular fa-circle-left" onClick={handleLogout}></i>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <i className="fa-solid fa-right-to-bracket" onClick={handleLogout}></i>
              
            </Link> 
           )} 
         </div>         
        </div>
      </header>

    </>
  )
}


export default Header;

