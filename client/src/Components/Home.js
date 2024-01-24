import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "./Home.css";
import { calculateTimeDifference } from './PostingTime';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [commentVisible, setCommentVisible] = useState({});
  const [moreVisible, setMoreVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState({});

  const handleCommentClick = (postId) => {
    setCommentVisible((prevVisible) => ({
      ...prevVisible,
      [postId]: !prevVisible[postId],
    }));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleMoreclick = () => {
    setMoreVisible(!moreVisible);
  };

  const handleCommentSubmit = async (e,postId) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to submit a comment.");
        window.location.href = "/login";
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/comment/${postId}`,
        {
          text: comment,
        },
        {
          headers: {
            "x-token": token,
          },
        }
      );

      console.log("Comment submitted:", response.data);
      setComment("");
      setCommentVisible(null);

      // Fetch comments immediately after submitting a comment
      await fetchComments(postId);

      // Update state with the new comment data if needed
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: response.data.comments, // Update comments with the new data
              }
            : post
        )
      );

      toast.success("Comment submitted successfully!");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Error submitting comment. Please try again.");
    }
  };

  const handleLike = (e, postId, userId) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items to the wishlist.");
      window.location.href = "/login";
      return;
    }

    axios
      .post(
        `http://localhost:5000/api/like/${postId}`,
        null, // No request data needed
        {
          headers: {
            "x-token": token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAllPosts((prevPosts) => {
          return prevPosts.map((post) =>
            post._id === postId ? response.data : post
          );
        });
      })
      .catch((error) => console.error("Error liking media:", error));
  };

  const handleDislike = (postId, userId) => {
    axios
      .post(`http://localhost:5000/api/dislike/${postId}/${userId}`)
      .then((response) => {
        console.log(response.data);
        setAllPosts((prevPosts) => {
          return prevPosts.map((post) =>
            post._id === postId ? response.data : post
          );
        });
      })
      .catch((error) => console.error("Error disliking media:", error));
  };


  const fetchComments = async (postId) => {
    try {
      if (!postId) {
        console.error("Error: postId is undefined.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/comments/${postId}`,
        {
          headers: {
            "x-token": token,
          },
        }
      );

      const comments = response.data.comments;

      console.log(`Comments for post ${postId}:`, comments);

      if (Array.isArray(comments)) {
        // Handle comments as needed (e.g., update state to display comments)
        setPostComments((prevComments) => ({
          ...prevComments,
          [postId]: comments,
        }));
      } else {
        console.error("Invalid comments data received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Commented out the following line to avoid unnecessary toasts on component mount
      // toast.error("Error fetching comments. Please try again.");
    }
  };

  useEffect(() => {
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

    fetchPosts();
    fetchUsers();
  }, []);


  const generateBackgroundColor = (userInfo) => {
    // Combine user information to create a unique identifier (you can customize this logic)
    const userIdentifier = userInfo ? userInfo._id || userInfo.email || userInfo.username : null;
  
    // Generate a hash based on the user identifier
    const hash = userIdentifier ? userIdentifier.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  
    // Use the hash to select a color from a predefined array
    const colors = ["#808000", "#008080", "#800080", "#800000", "#008000"];
    const colorIndex = Math.abs(hash) % colors.length;
  
    return colors[colorIndex];
  };







  return (
    <>
      <Navbar />
      <div className="App">
        <div style={{ width: "75%", margin: "auto" }}>
          <header className="App-header">
            <h1>Facebook Feed</h1>
          </header>
          <div className="feed-container">
            {allPosts.map((post) => {
              const user = allUsers.find(
                (user) => user._id === post.Author.UserId
              );

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
                      <div>
                      <h2 style={{ margin: "0%", marginLeft: "15px" }}>
                        {`${user.firstName} ${user.lastName}`}
                      </h2>
                      <p className="card1-timestamp">
                  Posted {calculateTimeDifference(post.createdAt)}
                  </p>
                  </div>
                    </div>
                    <div className="post-div1">
                      {(post.type &&
                        (post.type.toLowerCase() === "mp4" ||
                          post.type.toLowerCase() === "mp3")) ? (
                        <video controls className="post-video">
                          <source src={`http://localhost:5000${post.image}`} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          className="post-picture"
                          src={`http://localhost:5000${post.image}`}
                          alt="img"
                        />
                      )}
                    </div>
                    <div>
                      <h3 style={{ padding: "10px", margin: "0%" }}>
                        {post.title}
                      </h3>
                      {moreVisible && (
                        <div className="post-div5">
                          <p className="post-p">{post.content}</p>
                          <button
                            className="post-button"
                            onClick={handleMoreclick}
                          >
                            Show Less
                          </button>
                        </div>
                      )}
                      {!moreVisible && (
                        <div className="post-div5">
                          <p>{post.content.substring(0, 200)}</p>
                          <button
                            className="post-button"
                            onClick={handleMoreclick}
                          >
                            Show More
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="post-div4">
                      <div
                        className="post-div3"
                        onClick={(e) =>
                          handleLike(e, post._id, post.Author.UserId)
                        }
                      >
                        <AiFillLike className="post-like" />
                        <p style={{ margin: "0%", marginLeft: "5px" }}>
                          {post.likes} Likes
                        </p>
                      </div>

                      <div
                        className="post-div3"
                        onClick={() => handleDislike(post._id, post.Author.UserId)}
                      >
                        <AiFillDislike className="post-like" />
                        <p style={{ margin: "0%", marginLeft: "5px" }}>
                          {post.dislikes} Dislikes
                        </p>
                      </div>

                      <div
                        className="post-div3"
                        onClick={() => handleCommentClick(post._id)}
                      >
                        <FaCommentAlt className="post-like" />
                        <p style={{ margin: "0%", marginLeft: "5px" }}>
                          {" "}
                          {post.comments.length} Comments{" "}
                        </p>
                      </div>

                      <div className="post-div3">
                        <IoMdShare className="post-like" />
                        <p style={{ margin: "0%", marginLeft: "5px" }}>Share</p>
                      </div>
                    </div>
                    {commentVisible[post._id] && (
                      <div className="comment-popup">
                        <div className="comment-section1">
                          <h4> Post Comments: {post.comments.length} </h4>
                          <div className="comment-section2">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={comment}
                              onChange={handleCommentChange}
                              className="comment-input"
                            />
                            <button
                              type="button"
                              onClick={(e) => handleCommentSubmit(e,post._id)}
                            >
                              Post
                            </button>
                          </div>
                          <div>
                            {post.comments.map((comment) => {
                              const commentedUser = allUsers.find(
                                (user) => user._id === comment.postedBy
                              );

                              // Check if commentedUser is defined before rendering
                              if (commentedUser) {
                                return (
                                  <div key={comment._id} className="comment">
                                    <div className="post-div">
                                    {commentedUser.profilePicture !== null ? (
    <img
      className="post-profile-pic"
      src={`http://localhost:5000${commentedUser.profilePicture}`}
      alt="User Profile"
      style={{ width: "40px", height: "40px" }}
    />
  ) : (
    <div className="post-profile-pic" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: generateBackgroundColor(commentedUser), display: "flex", justifyContent: "center", alignItems: "center" }}>
      <span style={{ fontSize: "20px", color: "#" }}>{commentedUser.firstName.charAt(0).toUpperCase()}</span>
    </div>
  )}
                                      <h3
                                        style={{
                                          margin: "0%",
                                          marginLeft: "15px",
                                        }}
                                      >
                                        {`${commentedUser.firstName} ${commentedUser.lastName}`}
                                      </h3>
                                    </div>
                                    <p className="comment">{comment.text}</p>
                                  </div>
                                );
                              } else {
                                // Handle the case where commentedUser is undefined
                                return (
                                  <div key={comment._id} className="comment">
                                    <p >User not found</p>
                                    <p className="comment">{comment.text}</p>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
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
