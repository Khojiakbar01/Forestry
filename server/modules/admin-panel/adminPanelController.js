exports.getAdminPanel = (req, res, next) => {
  return res.status(200).render("./pages/admin/admin-panel/adminPanel", {
    user: req.session.user,
  });
};
