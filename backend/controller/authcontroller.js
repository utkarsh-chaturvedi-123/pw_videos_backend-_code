import { UserModel } from "../model/userschema.js";
import emailValidator from "email-validator"; /* dependencies for valid email id */

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
    /* if block of code differenciate --> if you are creating the same Account (11000 is  a code which is differenciate) */
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

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is mandatory",
    });
  }
  try {
    const userInfo = await UserModel.findOne({
      email,
    }).select("+password"); /* for finding the password of user  */
    /*------ if user does not exist -------*/
    if (!userInfo || userInfo.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invailed Credentials",
      });
    }
    const token = userInfo.jwtToken();
    userInfo.password = undefined;

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
};

export { signup, signin };
