import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React,{useState,createContext} from 'react'
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
import ResetPassword from './Components/ResetPassword';
import Home from './Components/Home';
 
function App() {
  
  return (
    <div >
          
   <Router>
    <Routes>
    <Route path="/" element={<Home/>}/>   
       
    <Route path='/register' element={<Register/>}/> 
    
    <Route path='/login' element={<Login/>}/> 
    <Route path='/forgotPassword' element={<ForgotPassword/>}/> 
    <Route path='/resetPassword' element={<ResetPassword/>}/> 
    <Route path='/profile' element={<Profile/>}/> 
       
    </Routes>
    </Router>   

           
    </div>
  );
}

export default App;
