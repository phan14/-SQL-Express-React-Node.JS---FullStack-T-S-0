import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt1'
});







const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
  // model = get data
  return res.render("user.ejs");
}



//  tao moi 
const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  // simple query
  connection.query(
    'INSERT INTO users(email,password,username) VALUES(?,?,?)', [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log(err)
      }
    }
  );
  return res.send("handleCreateNewUser");
}










module.exports = {
  handleHelloWord, handleUserPage, handleCreateNewUser
}
