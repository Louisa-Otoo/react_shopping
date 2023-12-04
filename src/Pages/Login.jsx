
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../components/css/login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const { setAuthUser, login, setToken, setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Both email and password are required.');
      return;
    }

    const apiUrl = 'http://localhost:9094/shop/v1/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const user = await response.json();

      if (user.id > 0) {
        login(user);
        setAuthUser(true);

        toast.success('Welcome to Heights', {
          autoClose: 2000,
        });
        navigate('/home');
      } else {
        setErrorMessage('Invalid login credentials.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };


const handleGoogleLogin = async (credentialResponse) => {
  try {
    var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);

    const googleId = credentialResponseDecoded.sub;
    console.log('Google ID:', googleId);

    // Assuming 'sub' contains the Google ID
    const formattedGoogleUser = {
      google_id: googleId,
      email: credentialResponseDecoded.email,
      email_verified: credentialResponseDecoded.email_verified,
      name: credentialResponseDecoded.name,
      picture: credentialResponseDecoded.picture,
    };
    console.log(formattedGoogleUser);

    // Add a condition to check if the user ID is greater than 0
    if (formattedGoogleUser.google_id > 0) {
      // Make a POST request to the backend endpoint
      const response = await fetch('http://localhost:9094/shop/v1/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedGoogleUser),
      });

      if (response.ok) {
        // Successfully stored Google user details on the server
        const responseData = await response.json();
        console.log('Backend response:', responseData);

        // Do any additional handling if needed

        // Proceed with your client-side logic
        if (googleId > 0) {
          login(responseData);
          setAuthUser(true);
          setIsLoggedIn(formattedGoogleUser);

          toast.success('Welcome to Heights', {
            autoClose: 2000,
          });
          navigate('/home');
        } else {
          setErrorMessage('Google ID is not found');
        }
      }
    }
  } catch (error) {
    console.error('Error decoding Google details:', error.message);
  }
};


  return (
    <>
      <div className='background'>
        <div className='login-container'>
          <h3 className='title'>Login</h3>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}

          <form onSubmit={handleEmailPasswordLogin}>
            <input
              type='text'
              placeholder='Email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type='password'
              placeholder='Password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className='btn' type='submit'>
              Login
            </button>
          </form>

          <div className='forgot'>
            <small>Forgot password?</small>
          </div>

          <div className='login-options'>
            <p>Or</p>
          </div>

          <div className='google-button'>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Google Login Failed');
              }}
            />
          </div>

          <div className='link'>
            <small>
              Don't have an account? Sign up <Link to='/register'>here</Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;