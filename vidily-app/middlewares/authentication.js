module.exports = function (req, res, next) {
  console.log('Authenticating the user!!!');
  next();
};
