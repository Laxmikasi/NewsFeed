import React from 'react'
import Gallery from './Gallery';
const MainGallery = () => {

  const posts = [
    {
      id: 1, 
      picture:'https://th.bing.com/th/id/R.17b33d455795f7955f374703ec5db7ec?rik=NxSsDRRowb8cGw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fngPEfyE.jpg&ehk=H8cSGsfjlgPQaG1%2f3Ozt2CphyeUbP7kRRn7Dc8mef9s%3d&risl=&pid=ImgRaw&r=0',
      header:'Happy holiday!',
    },
    {
      id: 2,
      picture:'https://th.bing.com/th/id/OIP.jwKmDSrVEEe9X9wTKrcPKwHaEo?rs=1&pid=ImgDetMain',
      header:'Happy Festival!',

    },
    {
      id: 3,
      picture:'https://th.bing.com/th/id/R.9d812e0638aec020faa11d89795bb90f?rik=A006j6sL742cww&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f07%2fnatural-landscape-purple-lake-wallpaper-.jpg&ehk=pAMyN7JHIDi73moP1dIjfu7zY10pXVNw92GFzZalDaE%3d&risl=&pid=ImgRaw&r=0',
      header:'Happy hacking!',
    },
    {
        id: 4,
        picture:'https://th.bing.com/th/id/R.9d812e0638aec020faa11d89795bb90f?rik=A006j6sL742cww&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f07%2fnatural-landscape-purple-lake-wallpaper-.jpg&ehk=pAMyN7JHIDi73moP1dIjfu7zY10pXVNw92GFzZalDaE%3d&risl=&pid=ImgRaw&r=0',
        header:'Good Day!',
      },
      {
        id: 5,
        picture:'https://th.bing.com/th/id/OIP.jwKmDSrVEEe9X9wTKrcPKwHaEo?rs=1&pid=ImgDetMain',
        header:'Nice Day!',
      },
      {
        id: 6,
        picture:'https://th.bing.com/th/id/R.17b33d455795f7955f374703ec5db7ec?rik=NxSsDRRowb8cGw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fngPEfyE.jpg&ehk=H8cSGsfjlgPQaG1%2f3Ozt2CphyeUbP7kRRn7Dc8mef9s%3d&risl=&pid=ImgRaw&r=0',
        header:'hello hi !',
      },
      {
        id: 7,
        picture:'https://th.bing.com/th/id/R.9d812e0638aec020faa11d89795bb90f?rik=A006j6sL742cww&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f07%2fnatural-landscape-purple-lake-wallpaper-.jpg&ehk=pAMyN7JHIDi73moP1dIjfu7zY10pXVNw92GFzZalDaE%3d&risl=&pid=ImgRaw&r=0',
        header:'i hope u r doing great!',
      },
    // Add more posts as needed
  ];

      

  return (
    <div className="App">
      <div style={{width:'100%',margin:'auto',}}>

      
      <header className="App-header" style={{maxWidth:'75%',margin:'auto'}}>
        <h1>Gallery</h1>
      </header>
      <div className="feed-container11" >
        {posts.map((post) => (
          <Gallery key={post.id} {...post} />
        ))}
      </div>
    </div>
    </div>
  );
    
  
}

export default MainGallery;