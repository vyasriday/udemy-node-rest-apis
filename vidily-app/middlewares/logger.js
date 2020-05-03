module.exports = function (req, res, next) {
  console.log('Logging the request!');
  next();
};
