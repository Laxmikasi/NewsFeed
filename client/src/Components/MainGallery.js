import { React, useState, useEffect } from 'react'
import Gallery from './Gallery';
import { Link } from "react-router-dom"
import axios from 'axios';
import { format } from 'date-fns';
const MainGallery = () => {



  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profile`, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.user.post);
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
              <Link to={`/post/${post._id}`}>
                <img src={`http://localhost:5000${post.image}`} alt={''} className="card1-image" />
                <div className="card1-content">
                  <h6 className="card1-title">{post.title}</h6>
                  <p className="card1-timestamp">
                    Posted on: {post.createdAt ? format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm') : 'Unknown'}
                  </p>

                </div>
              </Link>
            </div>
          ))}



        </div>
      </div>
    </div>
  );


}

export default MainGallery;