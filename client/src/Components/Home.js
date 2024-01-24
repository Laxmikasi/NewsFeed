import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [commentVisible, setCommentVisible] = useState({});
  const [moreVisible, setMoreVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState({});
  const [selectedComment, setSelectedComment] = useState({
    postId: null,
    commentId: null,
  });
  const [editedComment, setEditedComment] = useState("");
  const [user, setUser] = useState(null); // Assuming you have a user state

  const handleCommentClick = (postId) => {
    setCommentVisible((prevVisible) => ({
      ...prevVisible,
      [postId]: !prevVisible[postId],
    }));
  };

  const handleCommentChange = (e) => {
    if (selectedComment.commentId) {
      setEditedComment(e.target.value);
    } else {
      setComment(e.target.value);
    }
  };

  const handleMoreclick = () => {
    setMoreVisible(!moreVisible);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allPosts");
      const responseData = response.data.reverse();
      setAllPosts(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = (e, postId, userId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to the wishlist.");
      window.location.href = "/login";
      return;
    }
    axios
      .post(`http://localhost:5000/api/like/${postId}`, null, {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
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
        setAllPosts((prevPosts) => {
          return prevPosts.map((post) =>
            post._id === postId ? response.data : post
          );
        });
      })
      .catch((error) => console.error("Error disliking media:", error));
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to submit a comment.");
        window.location.href = "/login";
        return;
      }

      if (selectedComment.commentId) {
        await axios.put(
          `http://localhost:5000/api/comment/${postId}/${selectedComment.commentId}`,
          {
            text: editedComment,
          },
          {
            headers: {
              "x-token": token,
            },
          }
        );
        setEditedComment("");
        setSelectedComment({ postId: null, commentId: null });
      } else {
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
        setComment("");
        setCommentVisible((prevVisible) => ({
          ...prevVisible,
          [postId]: false,
        }));
        await fetchComments(postId);
        setAllPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comments: response.data.comments,
                }
              : post
          )
        );
      }

      toast.success("Comment submitted successfully!");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Error submitting comment. Please try again.");
    }
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
      if (Array.isArray(comments)) {
        setPostComments((prevComments) => ({
          ...prevComments,
          [postId]: comments,
        }));
      } else {
        console.error("Invalid comments data received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allUsers");
        const responseData = response.data;
        setAllUsers(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditComment = (postId, commentId) => {
    setSelectedComment({ postId, commentId });
  };

  const handleUpdateComment = async (postId) => {
    await handleCommentSubmit(postId);
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to delete a comment.");
        window.location.href = "/login";
        return;
      }
      const response = await axios.delete(
        `http://localhost:5000/api/comment/${postId}/${commentId}`,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: response.data.comments,
              }
            : post
        )
      );
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment. Please try again.");
    }
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
              if (!post._id) {
                return null; // or some other fallback
              }

              const postUser = allUsers.find((u) => u._id === post.Author.UserId);

              if (postUser) {
                return (
                  <div className="post" key={post._id}>
                    <div className="post-div">
                      <img
                        className="post-profile-pic"
                        src={`http://localhost:5000${postUser.profilePicture}`}
                        alt="img"
                      />
                      <h2 style={{ margin: "0%", marginLeft: "15px" }}>
                        {`${postUser.firstName} ${postUser.lastName}`}
                      </h2>
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
                          {post.comments.length} Comments
                        </p>
                      </div>
                      <div className="post-div3">
                        <IoMdShare className="post-like" />
                        <p style={{ margin: "0%", marginLeft: "5px" }}>Share</p>
                      </div>
                    </div>
                    {commentVisible[post._id] && (
                      <div className="comment-section1">
                        <h4> Post Comments: {post.comments.length} </h4>
                        <div className="comment-section2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            value={
                              selectedComment.commentId
                                ? editedComment
                                : comment
                            }
                            onChange={handleCommentChange}
                            className="comment-input"
                          />
                          <button
                            type="button"
                            onClick={() => handleCommentSubmit(post._id)}
                          >
                            {selectedComment.commentId ? "Update" : "Post"}
                          </button>
                        </div>
                        <div>
                          {post.comments.map((comment) => {
                            const commentUser = allUsers.find(
                              (u) => u._id === comment.postedBy
                            );
                            return (
                              <div key={comment._id} className="comment">
                                <div className="post-div">
                                  <img
                                    className="post-profile-pic"
                                    src={`http://localhost:5000${
                                      commentUser.profilePicture
                                    }`}
                                    alt="img"
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                  <h2
                                    style={{
                                      margin: "0%",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {`${commentUser.firstName} ${commentUser.lastName}`}
                                  </h2>
                                </div>
                                <p>{comment.text}</p>
                                <div>
                                  <button
                                    onClick={() =>
                                      handleEditComment(post._id, comment._id)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(post._id, comment._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else {
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
