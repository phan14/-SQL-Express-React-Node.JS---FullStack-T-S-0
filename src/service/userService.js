import mysql from 'mysql2';
import bcrypt from 'bcryptjs';



// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt1'
});



const salt = bcrypt.genSaltSync(10);



const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;

  // let check = bcrypt.compareSync(password, hashPassword)//true
  // console.log(">>check passs: ", check)
}

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password)
  // simple query
  connection.query(
    'INSERT INTO users(email,password,username) VALUES(?,?,?)', [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err)
      }
    }
  );
}


//  lay ra list
const getUserList = () => {
  let users = [];
  // simple query
  connection.query(
    'Select * from users',
    function (err, results, fields) {
      if (err) {
        console.log(err)
      }
      console.log("check results ", results)
    }
  );
}



module.exports = {
  createNewUser, getUserList
}