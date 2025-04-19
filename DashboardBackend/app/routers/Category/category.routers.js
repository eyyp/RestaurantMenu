const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const category = require("../../controllers/Category/category.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create", category.Create);

    router.get("/all/:restaurant_id", category.All);

    router.get("/find/:category_id", category.Find);

    app.use('/dashboard/api/v1/category', authorize.authorize ,router);
    
};