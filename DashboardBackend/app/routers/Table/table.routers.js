const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const table = require("../../controllers/Table/table.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create", table.Create);

    router.get("/find/:table_id", table.Find);

    app.use('/dashboard/api/v1/tables', authorize.authorize ,router);
    
};