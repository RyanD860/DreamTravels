module.exports = function(req, res, next) {
  if (!req.session.user) {
    req.session.user = {
      id: 0
    };
  }
  next();
};
