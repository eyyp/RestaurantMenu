const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const user = require("../../controllers/User/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/check", user.findOne);

    router.post("/create", user.Create);

    app.use('/api/v1/user', router);
    
};