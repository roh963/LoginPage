const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");

const signUp = async (req, res, next) => {
  const { name, email, password, confirpassword } = req.body;
  console.log(name, email, password, confirpassword);

  if (!name || !email || !password || !confirpassword) {
    return res.status(400).json({
      success: false,
      message: "Every field is required ",
    });
  }
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Email not valid ",
    });
  }
  if (password !== confirpassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirpassword dosn't match ",
    });
  }
  try {
      //  const  userInfo = userModel(req.body)

    //if not equal schema n e p
    const userInfo = userModel({
      name: name,
      email: email,
      password: password,
      confirpassword: password,
    });

    const result = await userInfo.save();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exist with provided email id",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is required ",
    });
  }
  try {
    const user = await userModel
      .findOne({email})
      .select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid crendential user ",
      });
    }
    if ( user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid crendential password ",
      });
    }
    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookieOption);
    res.status(200).json({
        success: true,
        data: user,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser=async(req,res,next)=>{
    const userId = req.user.id;

    try {
      const user = await userModel.findById(userId);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
}

const logOut = async(req,res)=>{
  try {
    const cookieOption = {
      maxAge: new Date(),
      httpOnly: true,
    };
    res.cookie("token",null,cookieOption)
    return res.status(200).json({
      success: true,
      data: "logout user",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  signUp,
  signIn,
  getUser,
  logOut
};
