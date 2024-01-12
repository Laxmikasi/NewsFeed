import {React,useState} from 'react';
import{Link} from "react-router-dom"
import { FaLock } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FcLock } from "react-icons/fc";
import './ForgotPassword.css';

const ForgotPassword = () => {


  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your backend to initiate the OTP sending
      const response = await fetch("http://localhost:5555/api/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response:', response);

      if (response.ok) {
        setShowOtpField(true);
      } else {
        // Handle error response
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your backend to verify the entered OTP
      const response = await fetch("http://localhost:5555/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      console.log('Response:', response);

      if (response.ok) {
        // TODO: Navigate the user to the password reset page
        console.log("OTP verified successfully. Redirect to password reset page.");
      } else {
        // Handle error response
        console.error("Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };











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