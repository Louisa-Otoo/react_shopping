import {BrowserRouter , Routes , Route} from 'react-router-dom'

import Index from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ShoppingCart from './Pages/ShoppingCart';
import Payment from './Pages/Payment';
import Success from './Pages/Success'


export const Router = () => {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/home" element={<Index/>}/>  
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
         
        <Route path="/cart" element={<ShoppingCart/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/success" element={<Success/>}/>
        
    </Routes>
    </BrowserRouter>

    </>
  )
}


export default Router;
