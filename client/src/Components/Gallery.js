import { React, useState, useEffect } from 'react'
import './Gallery.css'
import { Link } from "react-router-dom"
import axios from 'axios';
import { format } from 'date-fns';
import { calculateTimeDifference } from './PostingTime';


const Gallery = () => {
  

//   const calculateTimeDifference = (createdAt) => {
//     const now = new Date();
//     const createdDate = new Date(createdAt);
//     const timeDifference = now - createdDate;
//     const minutesDifference = Math.floor(timeDifference / (1000 * 60));

//     if (minutesDifference < 60) {
//         return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
//     } else {
//         const hoursDifference = Math.floor(minutesDifference / 60);

//         if (hoursDifference < 24) {
//             return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
//         } else {
//             const daysDifference = Math.floor(hoursDifference / 24);

//             if (daysDifference >= 7) {
//                 const formattedDate = createdDate.toLocaleDateString(undefined, {
//                     month: 'short',  // 3-letter month abbreviation
//                     day: 'numeric',
//                     year: '2-digit',  // 2-digit year
//                 });

//                 return ` ${formattedDate}`;
//             } else {
//                 // Exclude the days information for posts less than 7 days old
//                 const weeksDifference = Math.floor(daysDifference / 7);
//                 return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
//             }
//         }
//     }
// };


const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/gallery`, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.posts.reverse());
      })
      .catch((err) => console.log(err));
  }, [token, setPosts]);







  return (
    <div className="App">
      <div style={{ width: '100%', margin: 'auto', }}>


        <header className="App-header" style={{ maxWidth: '75%', margin: 'auto' }}>
          <h1>Gallery</h1>
        </header>
        <div className="feed-container11" >
          {posts.map((post) => (
            <div className="card1" key={post.id}>
              <p className="card1-timestamp">
                  Posted {calculateTimeDifference(post.createdAt)}
                  </p>
              <Link style={{color:'black',textDecoration:'none'}} to={`/post/${post._id}`}>

              <div className="post-div1">
                      {(post.type && post.type.toLowerCase() === 'mp4') || (post.type && post.type.toLowerCase() === 'mp3') ? (
                        <video controls className='post-video'style={{height:'152px',objectFit:"inherit",marginBottom:'0%'}}>
                          <source src={`http://localhost:5000${post.image}`} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img className="post-picture"
                          src={`http://localhost:5000${post.image}`}
                          alt="img" />
                      )}
                    </div>

                {/* <img src={`http://localhost:5000${post.image}`} 
                alt={''} className="card1-image" /> */}
                <div className="card1-content">
                  <h6 className="card1-title">{post.title.substring(0,50)}</h6>
                  

                </div>
              </Link>
            </div>
          ))}



        </div>
      </div>
    </div>
  );


}

export default Gallery;