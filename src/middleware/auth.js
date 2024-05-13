const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) {
            console.log(err);
          req.user = undefined;
          req.message = "Header Verification Failed";
          next();
        } else {
          User.findOne({
            _id: decoded.id,
          })
            .then((user) => {
              req.user = user;
              req.message = "Found the user successfully";
              next();
            })
            .catch((err) => {
              req.user = undefined;
              req.message =
                "Something went wrong while fetching the user information";
              next();
            });
        }
      }
    );
  } else {
    req.user = undefined;
    req.message = "Authorization Header is not found";
    next();;
  }
};

module.exports = verifyToken;