
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'



// create the connection to database



const salt = bcrypt.genSaltSync(10);



const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;

  // let check = bcrypt.compareSync(password, hashPassword)//true
  // console.log(">>check passs: ", check)
}


// tao new 
const createNewUser = async (email, password, username) => {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt1', Promise: bluebird });

  let hashPass = hashUserPassword(password)
  // simple query
  connection.query(
    'INSERT INTO user(email,password,username) VALUES(?,?,?)', [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err)
      }
    }
  );
}


//  lay ra list
const getUserList = async () => {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt1', Promise: bluebird });
  try {
    const [rows, fields] = await connection.execute('Select * from user');
    return rows;
  } catch (error) {
    console.log(">>check err", error)
  }
}


// ham xoa
const deleteUser = async (id) => {

  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt1', Promise: bluebird });
  try {
    const [rows, fields] = await connection.execute('delete from user where id =?', [id]);
    return rows;
  } catch (error) {
    console.log(">> check err", error);
  }
}

// ham sua

const getUserById = async (id) => {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt1', Promise: bluebird });
  try {
    const [rows, fields] = await connection.execute('select * from user where id =?', [id]);
    return rows;
  } catch (error) {
    console.log(">> check err", error);
  }
}

const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt1', Promise: bluebird });
  try {
    const [rows, fields] = await connection.execute('update user set email= ?, username=? where id =?', [email, username, id]);
    return rows;
  } catch (error) {
    console.log(">> check err", error);
  }
}



module.exports = {
  createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}