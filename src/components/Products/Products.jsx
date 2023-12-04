
import { useState, useEffect } from 'react';
import '../Products/products.css';
import { useAuth } from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Products = () => {
  const [products, setProducts] = useState([]);
  const { setCartCount, setTotalPrice } = useAuth();


  useEffect(() => {
    const apiUrl = 'http://localhost:9094/shop/v1/products';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Use reduce to update products and check for changes
        const updatedProducts = data.reduce((acc, currentProduct) => {
          const existingProduct = products.find((p) => p.id === currentProduct.id);

          if (existingProduct) {
            acc.push(existingProduct);
          } else {
            acc.push(currentProduct);
          }
          return acc;
        }, []);

        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // Adjust the interval as needed (e.g., every 5 seconds)

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [products]); // Include products in the dependency array to avoid stale closure


  const handleAddToCart = async (product_id, productPrice) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      console.error("User not found in localStorage");
      return;
    }

    let userId = user.id;
    try {
      const response = await fetch('http://localhost:9094/shop/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: product_id,
        })
      });
      console.log(response);
      if (response.status == 409) {
        let res = await response.json();
        toast.error('Product has already been added to cart');
        console.log(res)

        return
      }
      if (response.status === 200 || response.status === 201) {
        const res = await response.json();
        console.log(res);
        const { product_id } = res;
        console.log(product_id);

        toast.success("Item added to cart", {
          position: toast.POSITION.TOP_LEFT,
        });
        
        const selectedProduct = products.find(
          (product) => product.id === parseInt(product_id, 10)
        );
        setCartCount((prevCount) => prevCount + 1);
        
        setTotalPrice((prevPrice) => prevPrice + productPrice);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className='products-container'>
        <h3 className='title'>Our Products</h3>

        <div className='all-products'>
          {products.map((product) => (
            <div className='product-card' key={product.id}>
              <img
                className='product-image'
                src={product.image}
                alt={product.name}
              />

              <div className='product-details'>
                <h3 className='product-name'>{product.name}</h3>
                <p className='product-price'>${product.price}</p>
              </div>

              <button
                className='addBtn'
                id={product.id}
                onClick={() => handleAddToCart(product.id, product.price)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;