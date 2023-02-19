const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user) {
    if (user.password === req.body.password) {
      token = jwt.sign({ id: user.id, type: user.type }, "secret", {
        expiresIn: "10d",
      });
      res
        .status(200)
        .json({ accessToken: token, role: user.type, userid: user.id });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

module.exports = { login };
