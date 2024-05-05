const express = require('express'); 
const { signUp,signIn,getUser } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');
const authRouter = express.Router();


authRouter.post('/signup',signUp);
authRouter.post('/signin',signIn);
authRouter.get('/getuser',jwtAuth,getUser);

module.exports= authRouter;