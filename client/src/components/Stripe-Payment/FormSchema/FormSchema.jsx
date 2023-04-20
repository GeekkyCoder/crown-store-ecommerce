const { object, string, ref, number } = require("yup");

const signUpSchema = object({
  displayName: string().min(2).max(20).required("plz provide your username"),
  email: string().email().required("plz provide your email address"),
  password: string().min(6).max(8).required(),
  confirmPassword: string().oneOf([ref("password")]),
});

const loginSchema = object({
  email: string().email().required("plz provide your email address"),
  password: string().required(),
});


export  {signUpSchema,loginSchema};
