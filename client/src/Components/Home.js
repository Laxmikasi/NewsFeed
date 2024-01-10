import React from 'react'
import Post from './Post';
import Navbar from './Navbar';

const Home = () => {

  const posts = [
    {
      id: 1,
      profile:'https://i2.wp.com/techbeasts.com/wp-content/uploads/2016/01/green_mountain_nature_wallpaper_hd.jpg',
      username: 'John Doe',
      picture:'https://th.bing.com/th/id/R.17b33d455795f7955f374703ec5db7ec?rik=NxSsDRRowb8cGw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fngPEfyE.jpg&ehk=H8cSGsfjlgPQaG1%2f3Ozt2CphyeUbP7kRRn7Dc8mef9s%3d&risl=&pid=ImgRaw&r=0',
      header:'Happy holiday!',
      text: 'Feeling great today!To implement the functionality of increasing likes count and displaying a comment input area when the user clicks on "Like" or "Comment," you will need to manage the state of likes and comments in your component. Below is an example of how you can achieve this using Reacts state.ParagraphParagraphs are the group of sentences combined together, about a certain topic. It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc. We can say that a well-structured paragraph is the essence of good writing. The purposes of the paragraph are to give information, to explain something, to tell a story, and to convince someone that our idea is right.Paragraphs are blocks of textual content that segment out a larger piece of writing—stories, novels, articles, creative writing, or professional writing portions—making it less complicated to read and understand. Excellent paragraphs are an available writing skill for plenty of types of literature, and proper writers can substantially beautify the clarity of their news, essays, or fiction writing whilst constructing nicely.',
    },
    {
      id: 2,
      profile:'https://th.bing.com/th/id/OIP.WKmRKC01ItIs99LZylpilQHaEc?w=1280&h=768&rs=1&pid=ImgDetMain',
      username: 'Jane Smith',
      picture:'https://th.bing.com/th/id/OIP.jwKmDSrVEEe9X9wTKrcPKwHaEo?rs=1&pid=ImgDetMain',
      header:'Happy Festival!',
      text: 'Feeling great today!To implement the functionality of increasing likes count and displaying a comment input area when the user clicks on "Like" or "Comment," you will need to manage the state of likes and comments in your component. Below is an example of how you can achieve this using Reacts state.ParagraphParagraphs are the group of sentences combined together, about a certain topic. It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc. We can say that a well-structured paragraph is the essence of good writing. The purposes of the paragraph are to give information, to explain something, to tell a story, and to convince someone that our idea is right.Paragraphs are blocks of textual content that segment out a larger piece of writing—stories, novels, articles, creative writing, or professional writing portions—making it less complicated to read and understand. Excellent paragraphs are an available writing skill for plenty of types of literature, and proper writers can substantially beautify the clarity of their news, essays, or fiction writing whilst constructing nicely.',

    },
    {
      id: 3,
      profile:'https://th.bing.com/th/id/OIP.t8FdjFRADxucLG2gBhj2QwHaEo?rs=1&pid=ImgDetMain',
      username: 'salvatore',
      picture:'https://th.bing.com/th/id/R.9d812e0638aec020faa11d89795bb90f?rik=A006j6sL742cww&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f07%2fnatural-landscape-purple-lake-wallpaper-.jpg&ehk=pAMyN7JHIDi73moP1dIjfu7zY10pXVNw92GFzZalDaE%3d&risl=&pid=ImgRaw&r=0',
      header:'Happy hacking!',
      text: 'Feeling great today!To implement the functionality of increasing likes count and displaying a comment input area when the user clicks on "Like" or "Comment," you will need to manage the state of likes and comments in your component. Below is an example of how you can achieve this using Reacts state.ParagraphParagraphs are the group of sentences combined together, about a certain topic. It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc. We can say that a well-structured paragraph is the essence of good writing. The purposes of the paragraph are to give information, to explain something, to tell a story, and to convince someone that our idea is right.',

    },
    // Add more posts as needed
  ];

      

  return (
<>
<Navbar/>
    <div className="App">
      <div style={{width:'75%',margin:'auto'}}>

      
      <header className="App-header">
        <h1>Facebook Feed</h1>
      </header>
      <div className="feed-container">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
    </div>
    </>
  );
    
  
}

export default Home