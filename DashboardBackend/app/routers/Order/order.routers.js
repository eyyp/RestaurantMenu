const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const Order = require("../../controllers/Order/order.controller.js");
  
    var router = require("express").Router();
  
    router.post("/pull/:perPage", Order.Pull);

    router.post("/delete/:order_id", Order.Delete);

    router.post("/change/delivery", Order.ChangeDelivery);

    router.get("/find/item/:order_id", Order.ItemFind);

    router.get("/item/property/:order_item_id", Order.ItemProperty);

    app.use('/dashboard/api/v1/order', authorize.authorize ,router);
    
};