
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models/index'



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

  let hashPass = hashUserPassword(password)
  // simple query
  try {
    await db.User.create({
      username: username,
      email: email,
      password: password
    })
  } catch (error) {
    console.log(">>check err", error)
  }
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