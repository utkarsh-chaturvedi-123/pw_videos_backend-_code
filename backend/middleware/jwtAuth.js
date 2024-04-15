import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next) =>{
    /* this condition is used bcz  my user signin token stored in the cookies*/
    /* cookies se token ko access karne ke liye ya parse karne ke liye  we will use  cookie-parser--> so this will ensure in the app.js file*/
    const token = (req.cookies && req.cookies.token) || null;

    if(!token){
        return res.status(400).json({
            success: false,
            message: 'Not Authorized'
        })
    }
    try {
        const payload = jwt.verify(token ,process.env.SECRET);
        req.userInfo = {id: payload.id, email: payload.email}
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    next();
}

export {jwtAuth} 