const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
  // model = get data

  return res.render("user.ejs");
}

module.exports = {
  handleHelloWord, handleUserPage
}
