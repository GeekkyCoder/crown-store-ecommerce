const { getUser, addUserIntoDb } = require("../modal/user.modal");

const userSignUp = async (req, res) => {
  const user = req.body;
  const newUser = await addUserIntoDb(user)
  res.status(200).json(newUser)
};

const userLogin = async (req, res) => {
  return res.status(201).json("user loging in...");
};

module.exports = {
  userSignUp,
  userLogin,
};
