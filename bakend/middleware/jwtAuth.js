const JWT = require('jsonwebtoken');
const jwtAuth =  (req, res , next)=>{
    const token = (req.cookies && req.cookies.token) || null;
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Not Athorized",
          });
    }

    try {
         
        const playload = JWT.verify(token, process.env.SECRET)
        req.user={ id:playload.id ,email: playload.email};
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ,
          }); 
    }
    next();
}
 module.exports = jwtAuth;