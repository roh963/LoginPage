const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema  = new Schema({
 name : {
    type:String ,
    required: [true,'user name is required'],
    minLength:[5,'Name must be at least 5 char'],
    maxLength:[50,'Name must be at least 5 char'],
    trim: true
  } ,
  email:{
    type:String,
    required: [true,'user email is required'],
    unique:[true,'already registred'],
    lowercase:true,
    trim: true
    

   },
  password:{
    type:String,
    required: [true,'user password is required'],
    select:false
  },
  forgotPasswordToken:{
    type:String
  },
  forgotPasswordExpiryDate:{
    type:Date
  }
},{
    timestamps:true
}
);

const userModel= mongoose.model("user", userSchema);
module.exports = userModel;