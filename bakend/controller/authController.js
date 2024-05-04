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
    //    const  userInfo = userModel(req.body)

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
      message: e.message,
    });
  }
};

const signIn = async () => {
const {email,password} =req.body;
if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Every field is required ",
      }); 
}
const user = await userModel
                            .findOne({
                                email
                            }).select(`+password`);
if(!user || user.password !== password ){
    return res.status(400).json({
        success: false,
        message: "Invalid crendential ",
      });
}                            
                            
};

module.exports = {
  signUp,
  signIn
};
