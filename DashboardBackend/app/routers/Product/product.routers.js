const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const Product = require("../../controllers/Product/product.controller.js");
  
    var router = require("express").Router();

    router.post("/create", Product.Create);
  
    router.get("/all/:restaurant_id/:perPage", Product.All);

    router.get("/find/:product_id", Product.Find);

    router.get("/delete/:product_id", Product.Delete);

    app.use('/dashboard/api/v1/product', authorize.authorize ,router);
    
};