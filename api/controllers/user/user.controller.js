const { BadRequestError, UnauthenticatedError } = require("../../errors");
const User = require("../../modal/user/user.modal");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    throw new BadRequestError("plz provide information! inavlid credentials");
  }
  
  const userAlreadyExist = await User.findOne({email})


   if(userAlreadyExist){
     throw new BadRequestError("user already exist")
   }

   if(password !== confirmPassword){
    throw new BadRequestError("password does not match")
   }
 

  const user = await User.create({ username, email, password });


  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

const login = async (req, res) => {
    const {email,password} = req.body 

    if(!email || !password){
        throw new BadRequestError("plz provide email and password")
    }

    const userFound = await User.findOne({email})

    if(!userFound){
        throw new UnauthenticatedError("invalid credentials")
    }

    const isPasswordMatch = await userFound.comparePassword(password)

    if(!isPasswordMatch){
        throw new UnauthenticatedError("wrong passoword ! invalid credentials")
    }

    const token = userFound.createJWT()

    res.status(StatusCodes.OK).json({user:{username:userFound.username},token})

};

module.exports = {
  register,
  login,
};
