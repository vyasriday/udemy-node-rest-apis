const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).send('Unauthorized Access');
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    console.log('decoded', decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send('Invalid Token');
  }
};
