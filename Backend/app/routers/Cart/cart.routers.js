const authorize = require('../../middleware/authorize/authorize');

module.exports = app => {
    const cart = require("../../controllers/Cart/cart.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create", cart.Create);

    router.post("/add", cart.Add);

    router.get("/user/:cart_id", cart.User);

    router.get("/count/:cart_id", cart.Count);

    router.post("/delete/:cart_id", cart.Delete);

    router.post("/delete/item/:cart_item_id", cart.DeleteItem);

    router.get("/total/:cart_id", cart.Total);

    router.get("/item/property/:cart_item_id", cart.Property);

    app.use('/api/v1/cart', authorize.authorize , router);
    
};