const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "plz provide email"],
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, "plz provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "plz provide password"],
    minlength: 6,
    maxlength: 12,
  },
  confirmPassword: {
    type: String
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30d" }
  );
};

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}

module.exports = mongoose.model("user", userSchema);
