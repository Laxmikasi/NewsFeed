import React, { useState } from 'react';
import './Home.css';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';

const Post = ({ profile, username, picture ,header,text}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes,setDislikes]=useState(0)
  const [commentVisible, setCommentVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false)
  const [comment, setComment] = useState('');

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };
  const handleDislikeClick = () => {
    setDislikes(dislikes + 1);
  };

  const handleCommentClick = () => {
    setCommentVisible(!commentVisible);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleMoreclick = () => {
    setMoreVisible(!moreVisible);
  };

  

  return (
    <div className="post">
      <div className="post-div">
        <img className="post-profile-pic" src={profile} alt="img" />
        <h2 style={{ margin: '0%', marginLeft: '15px' }}>{username}</h2>
      </div>
      {/* <p>{text}</p> */}
      <div className="post-div1">
       
        <img className="post-picture" src={picture} alt="img" />
        {/* <div className='post-div5'>
        <p>{text}</p>
        {moreVisible &&(<p>{text}</p>)}
            <button className='post-button' onClick={handleMoreclick}>Show More</button>
        </div> */}
            </div>
            <div >
            <h3 style={{padding:'10px',margin:'0%'}}>{header}</h3>
            {moreVisible && (
                <div className='post-div5'>
                <p className='post-p'>{text}</p>
                <button className='post-button'  onClick={handleMoreclick}>Show Less</button>
                </div>
            )}
            {!moreVisible && (
                <div className='post-div5'>
                <p>{text.substring(0, 200)}</p>
                <button className='post-button' onClick={handleMoreclick}>Show More</button>
                </div>
            )}
            </div>
      <div className="post-div4">
        <div className="post-div3" onClick={handleLikeClick}>
          <AiFillLike className="post-like" />
          <p style={{ margin: '0%', marginLeft: '5px' }}>{likes} Likes</p>
        </div>

        <div className="post-div3" onClick={handleDislikeClick}>
          <AiFillDislike className="post-like" />
          <p style={{ margin: '0%', marginLeft: '5px' }}>{dislikes} Dislikes</p>
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
          {/* Additional comment-related components can be added as needed */}
        </div>
      )}
    </div>
  );
};

export default Post;