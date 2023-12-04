// import React from 'react';
import Router from './Router';
import { AuthProvider } from './Context/AuthContext';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css'


export const App = () => {

  return (
    <>
      <AuthProvider>
        {/*<GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>*/}
        <GoogleOAuthProvider clientId='670784724764-5j62iiqblkq5md0pt3obrltaohej2knk.apps.googleusercontent.com'>
        <Router />
        </GoogleOAuthProvider>
      </AuthProvider>
    </>
  )
}


export default App;
