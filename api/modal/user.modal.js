const usersDB = require("./user.mongo");

async function addUserIntoDb(user) {
  user.createdAt = new Date();

  const newUser = new usersDB(user);
  const savedUser = await newUser.save();

  return savedUser;
}

async function getUser(user) {
  return await usersDB.findById(user.id);
}

module.exports = {
  getUser,
  addUserIntoDb,
};
