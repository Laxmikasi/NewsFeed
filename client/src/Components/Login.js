import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import './Login.css';
import { BASE_URL } from '../Helper.js/Helper';

const Login = () => {
  const navigate = useNavigate();
  const [error, /*setError*/] = useState('');
 const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
      const response = await axios.post(`${BASE_URL}/api/login`,formData);
    
      if (response.status === 200) {  
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success('Login successful');      
      } else {
        toast.error('Invalid credentials', { position: 'top-center', autoClose: 3000 });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, { position: 'top-center', autoClose: 3000 });
      } else {
        console.error("Error occurred during login:", error);
          toast.error('An error occurred', { position: 'top-center', autoClose: 3000 });
  
        console.log(error);
      }
    }
  };
  
  if(token){
    setTimeout(() => {
      navigate('/');
    }, 2000);
  
  
   }


  return (
    <div className="Login">
      <div className="LoginForm">
        <h1 className='LoginForm-h2'>Login</h1>
        {error && <p className="ErrorMessage">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className='LoginForm-label' htmlFor="email">Email:</label>
          <input
          className='LoginForm-inp'
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <label className='LoginForm-label' htmlFor="password">Password:</label>
          <input
          className='LoginForm-inp'
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="FormLinks">
            
          <button className='LoginForm-but' type="submit">
            Login
          </button>
          </div>
        </form>
        <div className="FormLinks">
        <Link to="/forgotPassword" style={{textDecorationLine:'none',position:'relative',left:'156px'}}>Forgot Password?</Link>
          
          <p className='register-link'>
            Don't have an account? <Link to="/register" style={{textDecorationLine:'none'}}>Register Here</Link>
          </p>
        </div>
        <ToastContainer  />
      </div>
    </div>
  );
};

export default Login;