import React from 'react';
import{Link} from "react-router-dom"
import { FaLock } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FcLock } from "react-icons/fc";
import './ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div>
      <div className='forgotmainpage'>
        <div className='lock-icon'>
        <FcLock  className='icon-widthlock'/>
        </div>
        <div className='forgot-text'>
          Forgot Password ? 
        </div>
        <div className='downtext'>
          Remember your password ? <Link to='/login'>Login here</Link>.
        </div>
        <div className='outletof-forgot'>
          {/* <div className='mail-boxicon'>
            < CiMail/>
          </div>
          <div>
          <hr className='line'/>
          </div> */}
          <div className='input-forgot'>
            <input type='mail' placeholder='Email address' name='emailaddress' className='forgotpassword-input12'/>
          </div>
        </div>
        <div className='forgotbutton1'>
          <button className='forgot-buttn'>Forgot Password</button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;