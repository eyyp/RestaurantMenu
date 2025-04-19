const sql = require("../db.js");
const winston = require('winston');
var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

const { 
    v4: uuidv4,
} = require('uuid');

const User = function(user) {
  this.user_id = uuidv4();
  this.user_name = user.user_name;
  this.restaurant_id = user.restaurant_id;
  this.password = user.password;
  this.create_date = new Date();
};

User.findOne = (user_name,password,result) => {
  let query = `SELECT * FROM users WHERE user_name="${user_name}" and password="${password}" `;

  sql.query(query, (err, res) => {
    if (err) {
      logger.log('error','User findOne Error:',err);
      result(err, null);
      return;
    }
    if(res.length > 0){
      result(null, res);
    }
    else{
      result(null,{status:'dont'})
    }
  });
};

User.Create = (newUser,result) => {

  sql.query("INSERT INTO users SET ?",newUser,(err, res) => {
    if (err) {
      logger.log('error','User create Error:',err);
      result(err, null);
      return;
    }
    result(null,res);
  });
};

module.exports = User;