const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!String(authHeader)?.startsWith("Bearer")) return res.sendStatus(401);
  const token = String(authHeader).split(" ")[1];
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.tokenData = { ...decoded };
    next();
  });
};
