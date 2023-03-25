import userService from '../service/userService';



const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
  // model = get data
  let userList = await userService.getUserList();
  await userService.deleteUser(5);
  return res.render("user.ejs", { userList });
}



//  tao moi 
const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.createNewUser(email, password, username)
  return res.redirect("/user");
}


//  xoa
const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id)
  return res.redirect("/user");
}


// sua
const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = {};
  userData = user;
  // if (user && user.length > 0) {
  //   userData = user[0];
  // }
  return res.render("user-update.ejs", { userData });
}

//  cap nhat
const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;

  await userService.updateUserInfor(email, username, id);

  return res.redirect("/user");

}

module.exports = {
  handleHelloWord,
  handleUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUserPage, handleUpdateUser
}
