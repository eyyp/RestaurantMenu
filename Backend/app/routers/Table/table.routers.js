const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const table = require("../../controllers/Table/table.controller.js");
  
    var router = require("express").Router();
  
    router.get("/all/:restaurant_id", table.All);

    router.get("/find/:table_id", table.Find);

    app.use('/api/v1/tables', authorize.authorize ,router);
    
};