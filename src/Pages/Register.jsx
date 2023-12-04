import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import '../components/css/register.css'
import { Link, useNavigate  } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'


export const Register = () => {
  const navigate = useNavigate();
  const { login, setAuthUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const onSubmission = async (formData) => {
    try {
      const response = await fetch('http://localhost:9094/shop/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      const data = await response.json();

      if (data && data.id > 0) {
        // Registration successful
        login(data);
        setAuthUser(true);

        setSuccessMessage('Registration successful. Proceed to login...');
        setErrorMessage('');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Registration failed
        setSuccessMessage('');
        setErrorMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };



  return (
    <>
    <div className='registration'>
    <div className='register-container'>
        <h3 className='heading'>Registration Form</h3>
        <form className='register-form' onSubmit={handleSubmit(onSubmission)}>

          <div className='register-form-group'>
            <label htmlFor="first_name">First Name</label>
            <input 
              type="text" 
              name='name' 
              id='name' 
              placeholder='Name' 
              {...register('name', {
                required: "Name is required",
                minLength: {value: 4, message:"Name should be at least 4 characters"}
              })} 
              />
              <small className='error-check'>
              {errors.name && <p>{errors.name.message}</p>}
              </small>
          </div>

          <div className='register-form-group'>
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name='email' 
              id='email' 
              placeholder='Email'
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                }, 
                })}
              />
              <small className='error-check'>
                {errors.email && <p>{errors.email.message}</p>}
              </small>
          </div>
          
          <div className='register-form-group'>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name='password' 
              id='password' 
              placeholder='Password' 
              {...register('password', {
                required: "Password is required",
                minLength: { value: 5, message: "Password must be at least 4 characters"} 
                })}
              />
              <small className='error-check'>
                {errors.password && <p>{errors.password.message}</p>}
              </small>
          </div>

            <button type='submit'className='registerBtn'>Register</button>

            {/* Display success or error messages */}
          {successMessage && <div className='success-message'>{successMessage}</div>}
          {errorMessage && <div className='error-message'>{errorMessage}</div>}

            <div className='ex-link'>
            <small>
              Already registered? Login <Link to='/login'>here</Link>
            </small>
            </div>
        </form>
    </div>
    </div>
    </>
  )
}


export default Register;