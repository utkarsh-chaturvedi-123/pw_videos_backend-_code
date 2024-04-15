import { UserModel } from "../model/userschema.js";
import emailValidator from "email-validator"; /* dependencies for valid email id */
import bcrypt from "bcrypt";

const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Every field are Required",
    });
  }

  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email ID",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password doesnt match",
    });
  }

  try {
    /* this part is code to store data in to database */
    const userInfo = UserModel(req.body);
    const Result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: Result,
    });
  } catch (error) {
    /* if block of code differenciate --> if you are creating the same Account (11000 is a code which is differenciate) */
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exist with provided Email ID",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
/* this is for when user going to set  field of signin (if user email or password is blank) */
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is mandatory",
    });
  }
  /* this try and catch block of code will execute after entering the field in  signin  */
  /* this code will work for checking the user signin info  */
  try {
    const userInfo = await UserModel.findOne({ /* this function will check if email is exist or not in database */
      email,
    }).select("+password"); /* for finding the password of user  */
    /*------ if user does not exist or user info is not valid similar to signup user  -------*/
    /* we are comparing raw password with the bcrypt password --> so for this we will use [bcrypt.compare()] function */
    if (!userInfo || !(await bcrypt.compare(password, userInfo.password))) { /* here is password in the form of 'Raw' and 'user.password' in the form of bcryt ---> so now we can compare 'Raw' password (eg. "123456") with the 'encrypt password' (eg. "$2b$10$FGJTwNUHFCgBV7R4xcaY") */
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    /* we will use token because of A JSON web token(JWT) is JSON Object which is used to securely transfer information over the web(between two parties). It can be used for an authentication system and can also be used for information exchange */
    /* basically token is a special type of code or link. which is encryption of information  */
    const token = userInfo.jwtToken(); /* accessing the token or generating the token which we have set in userSchema.js file */
    userInfo.password = undefined; /* if we dont want to show the password after sign in */

    const cookieoptions = {
      maxTime: 24 * 60 * 60 * 1000 /* cookie active time validation */,
      httpOnly: true /* accessible only from serverside not a client side js  */,
    };

    res.cookie("token", token, cookieoptions);
    res.status(200).json({
      success: true,
      data: userInfo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
/* for find the user if user is sign in */
const getUser = async (req,res,next) =>{
  const userID = req.userInfo.id;

  try {
    const user = await UserModel.findById(userID);
    return res.status(200).json({
      success:true,
      data:user
    })
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message
    })
  }
}


const logout = (req, res)=>{
  try {
    const cookieoptions = {
      expires: new Date(),
      httpOnly:true
    };
    res.cookie("token", null, cookieoptions);
    res.status(200).json({
      success:true,
      message: "Log Out"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
    
  }
}

export { signup, signin ,getUser, logout };
