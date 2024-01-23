import React, { useState, useEffect } from 'react';
import Post from './Post';
import Navbar from './Navbar';
import axios from 'axios';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { FaCommentAlt } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [commentVisible, setCommentVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [comment, setComment] = useState('');

  const handleCommentClick = () => {
    setCommentVisible(!commentVisible);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleMoreclick = () => {
    setMoreVisible(!moreVisible);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allPosts");
      const responseData = response.data.reverse();
      console.log(responseData);
      setAllPosts(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = (postId, userId) => {
    axios.post(`http://localhost:5000/api/like/${postId}/${userId}`)
      .then(response => {
        console.log(response.data);
        setAllPosts(prevPosts => {
          return prevPosts.map(post => (post._id === postId ? response.data : post));
        });
      })
      .catch(error => console.error('Error liking media:', error));
  };

  const handleDislike = (postId, userId) => {
    axios.post(`http://localhost:5000/api/dislike/${postId}/${userId}`)
      .then(response => {
        console.log(response.data);
        setAllPosts(prevPosts => {
          return prevPosts.map(post => (post._id === postId ? response.data : post));
        });
      })
      .catch(error => console.error('Error disliking media:', error));
  };

  const handleCommentPost = (postId) => {
    console.log('Comment Text:', comment); // Log the comment text
    axios.post(`http://localhost:5000/api/comment/${postId}`, { text: comment })
      .then(response => {
        console.log(response.data);
        setComment('');
        fetchPosts(); // Fetch the updated list of posts after posting a comment
      })
      .catch(error => {
        console.error('Error posting comment:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      });
  };
  
  
      
  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  
    if (minutesDifference < 60) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      const hoursDifference = Math.floor(minutesDifference / 60);
      if (hoursDifference < 24) {
        return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
      } else {
        const daysDifference = Math.floor(hoursDifference / 24);
  
        if (daysDifference === 7) {
          // Display month and year after 7 days
          const options = { month: 'long', year: 'numeric' };
          return `1 week ago (${createdDate.toLocaleDateString('en-US', options)})`;
        } else if (daysDifference > 7 && daysDifference <= 14) {
          // Display month and year after 1 week
          const options = { month: 'long', year: 'numeric' };
          return `1 week ago (${createdDate.toLocaleDateString('en-US', options)})`;
        } else if (daysDifference > 7) {
          // Display weeks ago
          const weeksDifference = Math.floor(daysDifference / 7);
          return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
        } else {
          // Display days ago
          return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
        }
      }
    }
  };
  




  return (
<>
<Navbar/>
    <div className="App">
      <div style={{width:'75%',margin:'auto'}}>

      
      <header className="App-header">
        <h1>Facebook Feed</h1>
      </header>
      <div className="feed-container">
        {allPosts.map((post) => (
          
          <div className="post" key={post.id}>
          <div className="post-div">
            <img className="post-profile-pic" src={''} alt="img" />
            <h2 style={{ margin: '0%', marginLeft: '15px' }}>{post.Author.Name}</h2>
            
          </div>
          <p className="card1-timestamp">
                    Posted {calculateTimeDifference(post.createdAt)}
                  </p>
          
          <div className="post-div1">
           
            <img className="post-picture" 
            src={`http://localhost:5000${post.image}`}
             alt="img" />
            {/* <div className='post-div5'>
            <p>{text}</p>
            {moreVisible &&(<p>{text}</p>)}
                <button className='post-button' onClick={handleMoreclick}>Show More</button>
            </div> */}
                </div>
                <div >
                <h3 style={{padding:'10px',margin:'0%'}}>{post.title}</h3>
                {moreVisible && (
                    <div className='post-div5'>
                    <p className='post-p'>{post.content}</p>
                    <button className='post-button'  onClick={handleMoreclick}>Show Less</button>
                    </div>
                )}
                {!moreVisible && (
                    <div className='post-div5'>
                    <p>{post.content.substring(0, 200)}</p>
                    <button className='post-button' onClick={handleMoreclick}>Show More</button>
                    </div>
                )}
                </div>
          <div className="post-div4">
            <div className="post-div3"  onClick={() => handleLike(post._id,post.Author.UserId)}>
              <AiFillLike className="post-like" />
              <p style={{ margin: '0%', marginLeft: '5px' }}>{post.likes} Likes</p>
            </div>
    
            <div className="post-div3"  onClick={() => handleDislike(post._id,post.Author.UserId)}>
              <AiFillDislike className="post-like" />
              <p style={{ margin: '0%', marginLeft: '5px' }}>{post.dislikes} Dislikes</p>
            </div>
    
            <div className="post-div3" onClick={handleCommentClick}>
              <FaCommentAlt className="post-like" />
              <p style={{ margin: '0%', marginLeft: '5px' }}>Comment</p>
            </div>
    
            <div className="post-div3">
              <IoMdShare className="post-like" />
              <p style={{ margin: '0%', marginLeft: '5px' }}>Share</p>
            </div>
          </div>
          {commentVisible && (
  <div className="comment-section1">
    <input
      type="text"
      placeholder="Write a comment..."
      value={comment}
      onChange={handleCommentChange}
    />
    <button onClick={() => handleCommentPost(post._id)}>Post </button>
    {/* {post.comments.map((comment) => (
      <div key={comment._id}>
        <p>{comment.text}</p>
        <p className="comment-timestamp">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </div>
    ))} */}
  </div>
)}



        </div>




        ))}
      
      </div>
    </div>
    </div>
    </>
  );
  
    
  
}

export default Home