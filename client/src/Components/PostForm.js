import React, { useState } from 'react';
import './PostForm.css'; // Import the CSS file
// import { FaCloudUploadAlt } from 'react-icons/fa';
import Tabs from './Tabs'
// import { Toast } from 'react-toastify/dist/types';
import postimage from '../Assets/backgroung.webp'
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PostForm = () => {


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

                <Tabs />
        </div>

       
    
    </div>
  );
};

export default PostForm;