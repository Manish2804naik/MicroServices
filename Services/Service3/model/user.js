//User Schema

const mongoose = require("mongoose");
  // first service 
  const firstDBUrl = 'mongodb://localhost:27017/service1';
  const firstDBConnection = mongoose.createConnection(firstDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var userSchema = new mongoose.Schema({
  
  fullname:{type:String},
  email: { type: String, unique: true },
  password: { type: String },
  mobile:{type:String},
  changePassowrd:{type:Boolean,default:false},
  order:{type:Object}
});



module.exports = firstDBConnection.model("User", userSchema);

