
// import React from 'react'
import { useState, createContext, useContext, useEffect } from 'react'

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(['']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(['']);
  const [cartCount, setCartCount] = useState(0); 
  const [totalPrice, setTotalPrice] = useState(0);


  const login = (user) => {
  if (user && user.id) {
    const randomToken = Array.from({ length: 32 }, () =>
      Math.random().toString(36)[2]
    ).join('');
    setToken(randomToken);
    localStorage.setItem("token", randomToken);

    let User = JSON.stringify(user);

    setIsLoggedIn(User);
    setAuthUser(true);

    localStorage.setItem("user", User);
    return;
  }

  console.error("Invalid user object:", user);
};


  const logout = () => {
    setIsLoggedIn(null)
    setToken(null)
    setAuthUser(false)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && localToken.length > 0) {
      setAuthUser(true);
    } else {
      setAuthUser(false);
      console.log("user not authenticated")
    }
    

  }, [isLoggedIn, setToken]);


  const authData = {
    authUser,
    setAuthUser,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    cartCount,
    setCartCount,
    totalPrice,
    setTotalPrice,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};   



