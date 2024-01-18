const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
    },

    lastName :{
        type : String,
        required : true,
    },
   
    phone :{
        type : String,
        required : true,
    },


    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required:true,
    },
   otp:String,
    post: [{ 
        image:String,
         title:String ,
         subtitle: String ,
         content: String,
         likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        comments: [{ text: String }],
        createdAt: { type: Date, default: Date.now }
    },
        ],  
   
  })
  
  const User = mongoose.model('User', userSchema);
  

module.exports = User;
