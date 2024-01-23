import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import axios from 'axios';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import './Home.css';


const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [commentVisible, setCommentVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [comment, setComment] = useState('');

  const handleCommentClick = (postId) => {
    setCommentVisible(commentVisible === postId ? null : postId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleMoreclick = () => {
    setMoreVisible(!moreVisible);
  };


  const handleCommentPost = (e) => {
    setComment(e.target.value);
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

  // const handleLike = (e,postId, userId) => {

  //   e.preventDefault();
    
  //   const token = localStorage.getItem("token");
  
  //   if (!token) {
  //     toast.error("Please login to add items to the wishlist.");
  //     window.location.href = "/login";
  //     return;
  //   }
  //   axios.post(`http://localhost:5000/api/like/${postId}`)
  //     .then(response => {
  //       console.log(response.data);
  //       setAllPosts(prevPosts => {
  //         return prevPosts.map(post => (post._id === postId ? response.data : post));
  //       });
  //     })
  //     .catch(error => console.error('Error liking media:', error));
  // };
  
  // const handleDislike = (e,postId, userId) => {

  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  
  //   if (!token) {
  //     toast.error("Please login to add items to the wishlist.");
  //     window.location.href = "/login";
  //     return;
  //   }
  //   axios.post(`http://localhost:5000/api/dislike/${postId}`)
  //     .then(response => {
  //       console.log(response.data);
  //       setAllPosts(prevPosts => {
  //         return prevPosts.map(post => (post._id === postId ? response.data : post));
  //       });
  //     })
  //     .catch(error => console.error('Error disliking media:', error));
  // };

  // const handleLike = (e,postId, userId) => {

  //   e.preventDefault();
    
  //   const token = localStorage.getItem("token");
  
  //   if (!token) {
  //     toast.error("Please login to add items to the wishlist.");
  //     window.location.href = "/login";
  //     return;
  //   }
  //   axios.post(`http://localhost:5000/api/like/${postId}`)
  //     .then(response => {
  //       console.log(response.data);
  //       setAllPosts(prevPosts => {
  //         return prevPosts.map(post => (post._id === postId ? response.data : post));
  //       });
  //     })
  //     .catch(error => console.error('Error liking media:', error));
  // };
  
  // const handleDislike = (e,postId, userId) => {

  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  
  //   if (!token) {
  //     toast.error("Please login to add items to the wishlist.");
  //     window.location.href = "/login";
  //     return;
  //   }
  //   axios.post(`http://localhost:5000/api/dislike/${postId}`)
  //     .then(response => {
  //       console.log(response.data);
  //       setAllPosts(prevPosts => {
  //         return prevPosts.map(post => (post._id === postId ? response.data : post));
  //       });
  //     })
  //     .catch(error => console.error('Error disliking media:', error));
  // };
  

  const handleLike = (e, postId, userId) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Please login to add items to the wishlist.");
      window.location.href = "/login";
      return;
    }
  
    axios.post(
      `http://localhost:5000/api/like/${postId}`,
      null,  // No request data needed
      {
        headers: {
          'x-token': token,
          
        },
      }
    )
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

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/comments', {
        userId: 'your_user_id', // Replace with the actual user ID
        postId,
        text: comment,
      });

      console.log('Comment submitted:', response.data);
      setComment('');

      // You might want to update your state with the new comment data here
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  useEffect(() => {
    // Fetch vitals data from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allUsers");
        const responseData = response.data;
        console.log(responseData);
        setAllUsers(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="App">
        <div style={{ width: '75%', margin: 'auto' }}>
          <header className="App-header">
            <h1>Facebook Feed</h1>
          </header>
          <div className="feed-container">
            {allPosts.map((post) => {
              const user = allUsers.find((user) => user._id === post.Author.UserId);

              // Check if user is found
              if (user) {
                return (
                  <div className="post" key={post.id}>
                    <div className="post-div">
                      <img
                        className="post-profile-pic"
                        src={`http://localhost:5000${user.profilePicture}`}
                        alt="img"
                      />
                      <h2 style={{ margin: '0%', marginLeft: '15px' }}>
                        {`${user.firstName} ${user.lastName}`}
                      </h2>
                    </div>
                    {/* Other post content goes here */}
                    <div className="post-div1">
                      {(post.type && post.type.toLowerCase() === 'mp4') || (post.type && post.type.toLowerCase() === 'mp3') ? (
                        <video controls className='post-video'>
                          <source src={`http://localhost:5000${post.image}`} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img className="post-picture"
                          src={`http://localhost:5000${post.image}`}
                          alt="img" />
                      )}
                    </div>
                    <div>
                      <h3 style={{ padding: '10px', margin: '0%' }}>{post.title}</h3>
                      {moreVisible && (
                        <div className='post-div5'>
                          <p className='post-p'>{post.content}</p>
                          <button className='post-button' onClick={handleMoreclick}>Show Less</button>
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
                      <div className="post-div3" onClick={(e) => handleLike(e, post._id, post.Author.UserId)}>
                        <AiFillLike className="post-like" />
                        <p style={{ margin: '0%', marginLeft: '5px' }}>{post.likes} Likes</p>
                      </div>

                      <div className="post-div3" onClick={(e) => handleDislike(e, post._id, post.Author.UserId)}>
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
                      </div>
                    )}
                  </div>
                );
              } else {
                // Handle the case when user is not found
                return (
                  <div className="post" key={post.id}>
                    <p>User not found</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;