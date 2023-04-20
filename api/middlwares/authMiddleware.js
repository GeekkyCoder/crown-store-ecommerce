const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("not authorized ");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN);
    const { userId, username } = decoded;
    req.user = { userId, username };
    next();
  } catch (err) {
    throw new UnauthenticatedError("not authorized");
  }
};

module.exports = authMiddleware;
