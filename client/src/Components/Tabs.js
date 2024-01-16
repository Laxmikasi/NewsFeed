import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaCloudUploadAlt } from 'react-icons/fa';
import MainGallery from './MainGallery';
// import Tabs from './Tabs'
// import { Toast } from 'react-toastify/dist/types';
// import postimage from './alexander-grey-jYbKxinWQGk-unsplash.jpg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Update the state with the selected file and generate a preview URL
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = () => {
        toast.success('Successfully Posted')
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Post" {...a11yProps(0)} />
          <Tab label="Gallery" {...a11yProps(1)} />
          <Tab label="About" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div className="upload-form-container11">
      <h1>Upload New Post</h1>
      <form className='Postform'>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" placeholder='Title' value={title}  onChange={handleTitleChange} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" placeholder='About Post' rows="4" value={description} onChange={handleDescriptionChange} required></textarea>

        {/* <label htmlFor="file">Select video or photo:</label> */}
        {/* <input type="file" id="file" name="file" accept="image/, video/" onChange={handleFileChange} required /> */}

       

{!file ? (
          <label htmlFor="file" className="upload-icon-label">
            <input type="file" id="file" name="file" accept="image/, video/" style={{ display: 'none' }} onChange={handleFileChange} required />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FaCloudUploadAlt className="upload-icon" />
              <h5 style={{ margin: '0%', padding: '10px' }}>Upload video or photo</h5>
            </div>
          </label>
        ) : (
          <div className="preview-container">
            {file.type.startsWith('image') ? (
              <img src={previewURL} className='Postform-image' alt="Preview" />
            ) : (
              <video controls>
                <source src={previewURL} className='Postform-image' type={file.type} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <button type="button" className='Postform-button' onClick={handleSubmit}>Post</button>
      
      </form>
    </div>
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
                <MainGallery/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} >
                Item Three
      </CustomTabPanel>
    </Box>
  );
}