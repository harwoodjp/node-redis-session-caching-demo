exports.signout = (req, res) => {
  req.logout()
  res.redirect("/")
}