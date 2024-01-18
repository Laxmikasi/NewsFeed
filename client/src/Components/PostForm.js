import React, { useState } from 'react';
import './PostForm.css'; // Import the CSS file
// import { FaCloudUploadAlt } from 'react-icons/fa';
import Tabs from './Tabs'
// import { Toast } from 'react-toastify/dist/types';
import postimage from '../Assets/backgroung.webp'
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostForm = () => {

    const getCurrentTimestamp = () => {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return currentDate.toLocaleDateString('en-US', options);
      };
return (
    <div className='PostForm-Post'>
        <div className='Postform-div'>
            <img style={{
                width:"100px",
                height:'100px',
                borderRadius:'50%'
            }} src={postimage} alt='img' />
            <h3 style={{marginBottom:'0%'}}>UserName</h3>
            <p style={{marginTop:'0%'}}>@UserName</p>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#777' }}>Posted on: {getCurrentTimestamp()}</p>

                <Tabs />
        </div>

       
    
    </div>
  );
};

export default PostForm;