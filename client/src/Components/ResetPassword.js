import React from 'react'
import './ForgotPassword.css';

const ResetPassword = () => {
  return (
    <div>
      <div className='resetmain'>
        <div className='reset-text'>
          Reset Password
        </div>
        <div className='Passwordreset'>
          <label className='passwordname'>New Password<span className='r-span'>*</span></label>
          <br/>
          <input type='password' name='password' className='name-reset'/>
        </div>
        <div className='Passwordreset'>
          <label className='passwordname'>Confirm Password<span className='r-span'>*</span></label>
          <br/>
          <input type='conformpassword' name='conformpassword' className='name-reset'/>
        </div>
        <div className='resetbutton1'>
          <button className='reset-butn'>Reset Password</button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword