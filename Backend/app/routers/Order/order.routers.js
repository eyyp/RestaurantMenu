const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const Order = require("../../controllers/Order/order.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create", Order.Create);

    app.use('/api/v1/order', authorize.authorize ,router);
    
};