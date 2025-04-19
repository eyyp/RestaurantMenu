const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../../enviroments/enviroment');
let refreshTokens = [];
const User = require("../../models/User/user.model.js");
const winston = require('winston');
var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});
 
exports.findOne = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.findOne(req.body.user_name,req.body.password,(err, data) => {
    if (err) {
      if (err.kind=== "not_found") {
        res.status(404).send({
          message: `User not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id"
        });
      }
    } else {
        const access_token = generateAccessToken(data[0]);
        const refresh_token = generateRefreshToken(data[0]);
        refreshTokens.push(refresh_token);
        res.send({...data,access_token,refresh_token})
    }
  });
};

exports.logout = (req, res) => {
    const {token} = req.params;
    refreshTokens = refreshTokens.filter(token => token !== token);
    res.status(204).send();
}

const generateAccessToken = (user) => {
    const time = 1000 * 60 * 60;
    const s = time.toString();
    return jwt.sign({user}, ACCESS_TOKEN_SECRET, { expiresIn: time});
}

const generateRefreshToken = (user) => {
  return jwt.sign({user}, REFRESH_TOKEN_SECRET);
}
