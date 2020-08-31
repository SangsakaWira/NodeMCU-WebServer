const jwt = require("jsonwebtoken");

exports.verifyAuthorization = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
    return;
  });
};

exports.verifySecurity = (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/page/login");
    return;
  }
  next();
};
