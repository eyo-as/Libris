module.exports = (fn) => {
  return (req, res, next) => {
    // Runs your controller function; if it fails or rejects, passes the error to next()
    fn(req, res, next).catch(next);
  };
};
