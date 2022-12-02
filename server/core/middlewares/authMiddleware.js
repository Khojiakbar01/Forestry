module.exports = (req, res, next) => {
  // const lang =
  //     req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect(`/login`);
  }
};
