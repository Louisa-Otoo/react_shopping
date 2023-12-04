// import React from 'react'
import { useForm } from 'react-hook-form'
import '../Checkout/Checkout.css'
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'



export const Checkout_Form = ({ amount }) => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
const [isProcessing, setIsProcessing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmission = async () => { 
      
      if (!stripe || !elements) {
        return;
      }

      setIsProcessing(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        }
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    
      setIsProcessing(false);
    };


  return (
    <>
    <div className='container'>
    <div className='checkout-container'>
      <form className='outForm' onSubmit={handleSubmit(onSubmission)}> 
        <PaymentElement id="payment-element" />
        
        <div className='outForm_group'>

          <label htmlFor="email">Email</label>

          <input 
          type="text" 
          id="email" 
          placeholder="Email"   
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

       

        <div className='outForm_group'>

          <button disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
              {isProcessing ? "Processing ... " : `Pay ${amount}`}
            </span>
          </button>

        {message && <div id="payment-message">{message}</div>}

        </div>

      </form>

    </div>
    </div>
    </>
  )
}


export default Checkout_Form;