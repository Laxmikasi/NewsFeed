import React, { useState } from 'react';
import './ForgotPassword.css';
import { CiLock } from "react-icons/ci";
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

// window.alert(A password reset link has been sent to ${email});
    setEmail('');
  };

  return (
    <div className='forgot-main'>
        <div className='lock'>
         <button className='lock-adjust' ><CiLock  className='clock'/> </button>
        </div>
        <div className='p-tag'>
            <p className='p-tag-fontset'>Trouble logging in ?</p>
        </div>
        <div>
            <p className='p-tag-downset'>Enter your email, phone, or username and we'll<br></br> send you a link to get back into your account.</p>
        </div>
     
      <form className='form-class' onSubmit={handleSubmit}>
     
        <div>
            
       
          <input className='inputtag-email' placeholder='Email'
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button className='reset-password-button' type="submit">Send Login link</button>
      </form>

      {message && <p>{message}</p>}

           <div className='resetpass-set'>
            <p className='para'>Can't reset your password</p>
            <br/>
             <div className='separator'>
      <p className='or-p'>---------- OR ----------</p>
    </div>
  </div>
  <div className='create-account-class'>
    <p className='create-account-class-ptag'>Create new account</p>
  </div>

  <div className='back-login-class'>
    <button className='login-back-adjust'>Back to login</button>
  </div>
    </div>
  );
  
};

export default ForgotPassword;