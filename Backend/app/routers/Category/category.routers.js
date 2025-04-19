const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const Category = require("../../controllers/Category/category.controller.js");
  
    var router = require("express").Router();
  
    router.get("/all/:restaurant_id", Category.All);

    app.use('/api/v1/category', authorize.authorize ,router);
    
};