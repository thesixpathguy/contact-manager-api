const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("wrong auth header in request");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403);
      throw err;
    }
    req.username = decoded.username;
    req.email = decoded.email;
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
