import React from 'react';
import img from '../Assets/img3.jfif';
import { CgProfile } from 'react-icons/cg';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='main'>
      <div className='navbar'>
        <div className='main-Logo'>
          <img className='nf-logo' src='https://as1.ftcdn.net/v2/jpg/04/08/44/62/1000_F_408446246_Lq0KqLi6ETZxS4SLpRgx1RAw7QIoAwPL.jpg' alt='nf-logo-alt-tag' />
          <div className='newsfeed-name'>
            <span className='newsfeed'>News feed</span>
          </div>
        </div>
        <div className='div-profile-icon'>
          {/* <button className='button-profile-icon'>
            <CgProfile className='profile-icon' />
          </button>
           */}
        </div>
        <div className='signin-button1'>
          <Link to="/login">
          <button className='signin-button'>SIGN IN</button>
          </Link>
        </div>
        {/* <div className='signin-button2'>
          <button className='signup-button'>SIGN UP</button>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
