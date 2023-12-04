import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../components/css/cart.css';
import { useAuth } from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'


const ShoppingCart = () => {
  const { setCartCount, setAuthUser, setIsLoggedIn, totalPrice, setTotalPrice } = useAuth();
  const [cartItem, setCartItem] = useState([]);


  useEffect(() => {
    const checkUserAuthentication = async () => {
      const localToken = localStorage.getItem('token');

      if (localToken && localToken.length > 0) {
        let user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
          console.error('User not found in localStorage');
          return;
        }

        setAuthUser(true);
        setIsLoggedIn(user);
      } else {
        setAuthUser(false);
      }
    };

    const fetchUserSpecificData = async (userId) => {
      try {
        const response = await fetch('http://localhost:9094/shop/v1/orderWithUserId', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });

        if (response.status === 200) {
          const responseData = await response.json();
          setCartItem(responseData);
        } else {
          console.error('Failed to fetch user-specific data');
        }
      } catch (error) {
        console.error('Error fetching user-specific data:', error);
      }
    };

    const initializeUserData = async () => {
      let user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.id) {
        console.error('User not found in localStorage');
        return;
      }

      setAuthUser(true);
      setIsLoggedIn(user);
      await fetchUserSpecificData(user.id);
    };

    initializeUserData();
  }, [setIsLoggedIn, setAuthUser, setCartItem]);


  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cartItem.forEach((item) => {
        total += item.price;
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItem, setTotalPrice]);



  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete item with id ${cartItemId}`);

      if (confirmed) {
        const updatedItems = cartItem.filter((item) => item.id !== cartItemId);
        setCartItem(updatedItems);

        let user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          console.error('User not found in localStorage');
          return;
        }

        const result = await fetch(`http://localhost:9094/shop/v1/deleteAnOrder/${cartItemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart_id: Number(cartItemId),
            user_id: Number(user.id),
          }),
        });

        if (result.status === 200 || result.status === 201) {
          const response = await result.json();
          toast.success('Item deleted successfully');
          // Update cart count after removing an item
          setCartCount((prevCount) => prevCount - 1);
        } else {
          toast.error('Failed to delete item');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


return (
  <>
    <Header />
    <ToastContainer />
    <div className="cart-container">
      <div className="leftBox">
        <h2 className="title">Your Cart</h2>
        {cartItem.length === 0 ? (
          <div className='empty-cart'>
            <i className="fa-solid fa-cart-shopping"></i>
            <p className='empty'>You have no products in your cart.</p>
            <Link to="/home">
              <button type='submit' className='startBtn'>Start shopping</button>
            </Link> 
          </div>
        ) : (         
          <ul className="cart">
            {cartItem.map((item) => (
              <li key={item.id}>
                <div className="order-card">
                  <img className="order-image" src={item.products.image} alt={item.products.name} />
                  <div className="order-details">
                    <h3 className="order-name">{item.products.name}</h3>
                    <p className="order-price">${item.price}</p>
                  </div>
                  <button className="removeBtn" onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      
      <div className="rightBox">
        <div className="inner-rightBox">
          <h2>Order Summary</h2>
          <h3>
            Sub Total: ${totalPrice}  
          </h3>
          <small>Delivery fees not included yet</small>
          <div>
          <Link to={`/payment?totalPrice=${totalPrice}`}>
            <button type='submit' className='checkoutBtn'>Checkout (${totalPrice})</button>
          </Link>
          </div>
        </div>
    </div> 

      </div>
      <Footer />
  </>
);
};

export default ShoppingCart;