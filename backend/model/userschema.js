import  Mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

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
    required:true,
    select:false
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

/*custom midleware to incrypt the password the password and save it */
userSchema.pre("save",async function(next) {
   if(!this.isModified('password')){
      return next();
   }
   this.password = await bcrypt.hash(this.password, 10);
   return next();
})

/* set the jwt token method   */
userSchema.methods = {
   jwtToken(){
      return jwt.sign({
         id: this._id, /* this is for current user id */
         email: this.email /* this is for currrent user email  for using signin */
      },
      process.env.SECRET,
      {
         expiresIn:'24h' /*  expriry time of token which will expire in given time  */
      }
   )
   }
}

export const UserModel = Mongoose.model('User' , userSchema)