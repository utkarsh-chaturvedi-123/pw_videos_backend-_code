import  Mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new Mongoose.Schema({
 name:{
    type:String,
    required: [true , 'User Password is Required'],
    minLength: [5 , 'Name must be at least 5 character'],
    maxLength: [20 , 'Name must be less than 20 character'],
    trim: true
 },
 email: {
    type:String,
    required: [true, 'User Email is Required'],
    unique: true,
    lowercase:true,
    unique: [true, 'Already Registered']
    
 },
 password: {
    type: String,
    require: [true , 'User Password is Required']
 },
 forgotPasswordToken: {
    type: String,
 },
 forgotpasswordExpiryDate: {
    type: Date
 },
 
},{
    timestamps:true
});

userSchema.methods = {
   jwtToken(){
      return jwt.sign({
         id: this._id,
         email: this.email
      },
      process.env.SECRET,
      {
         expiresIn:'24h'
      }
   )
   }
}

export const UserModel = Mongoose.model('User' , userSchema)