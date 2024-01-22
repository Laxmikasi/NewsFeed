<div >
          {post.image.endsWith('.jpg') || post.image.endsWith('.jpeg') ? (
  <img src={`http://localhost:5000${post.image}`} alt="img" />
) : (
  <video controls>
    <source src={`http://localhost:5000${post.image}`}  />
    Your browser does not support the video tag.
  </video>
) 
  
}

</div>