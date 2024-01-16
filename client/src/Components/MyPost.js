import {React,useState}from 'react'
import img from './backgroung.webp'
import './MyPost.css'
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
const MyPost = () => {
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
    <div className='MainPost'>
        <div className='MyPost'>
            <div className='MyPost-img'>
                <img className='Postimage' src={img} alt='img' />
            </div>
            <div className='postdiv'>
            <div className="post-div11">
                <div style={{display:'inline-flex',alignItems:'center'}}>
                    <img className="post-profile-pic" src={img} alt="img" />
                    <h2 style={{ margin: '0%', marginLeft: '15px' }}>UserName</h2>
                    </div>
                    <h3 style={{padding:'10px',margin:'0%',marginTop:'10px'}}>Hey There!</h3>
                    {moreVisible && (
                <div className='post-div5' >
                <p className='post-p'>Feeling great today!To implement the functionality of increasing likes count and displaying a comment input area when the user clicks on "Like" or "Comment," you will need to manage the state of likes and comments in your component. Below is an example of how you can achieve this using Reacts state.ParagraphParagraphs are the group of sentences combined together, about a certain topic. It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc. We can say that a well-structured paragraph is the essence of good writing. The purposes of the paragraph are to give information, to explain something, to tell a story, and to convince someone that our idea is right.Paragraphs are blocks of textual content that segment out a larger piece of writing—stories, novels, articles, creative writing, or professional writing portions—making it less complicated to read and understand. Excellent paragraphs are an available writing skill for plenty of types of literature, and proper writers can substantially beautify the clarity of their news, essays, or fiction writing whilst constructing nicely.</p>
                <button className='post-button'  onClick={handleMoreclick}>Show Less</button>
                </div>
            )}
            {!moreVisible && (
                <div className='post-div5' >
                <p>Feeling great today!To implement the functionality of increasing likes count and displaying a comment input area when the user clicks on "Like" or "Comment," you will need to manage the state of likes and comments in your component.</p>
                <button className='post-button' onClick={handleMoreclick}>Show More</button>
                </div>
            )}     
            </div>
<div className="post-div4">
        <div className="post-div3" onClick={handleLikeClick}>
          <AiFillLike className="post-like" />
          <p  style={{ margin: '0%', marginLeft: '5px' }}>{likes} Likes</p>
        </div>

        <div className="post-div3" onClick={handleDislikeClick}>
          <AiFillDislike className="post-like" />
          <p style={{ margin: '0%', marginLeft: '5px' }}>{dislikes} Dislikes</p>
        </div>

        <div className="post-div3">
          <IoMdShare className="post-like" />
          <p style={{ margin: '0%', marginLeft: '5px' }}>Share</p>
        </div>
      </div>
      <div className="post-div3" style={{margin:'15px 35px',paddingBottom:'10px',borderBottom:'1px solid #ddd'}} onClick={handleCommentClick}>
          <FaCommentAlt className="post-like" />
          <p style={{ margin: '0%', marginLeft: '5px' }}>Comment</p>
        </div>
      {commentVisible && (
        <div className="comment-section11">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={handleCommentChange}
          />
          {/* Additional comment-related components can be added as needed */}
          {/* <p>{comment}</p> */}
        </div>
      )}
            

            </div>
        </div>

    </div>
  )
}

export default MyPost