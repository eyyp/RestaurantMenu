const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const Property = require("../../controllers/Property/property.controller.js");
  
    var router = require("express").Router();
  
    router.get("/type/:restaurant_id", Property.Type);

    router.get("/product/:product_id/:product_property_type_id", Property.Product);

    router.get("/find/:property_id", Property.Find);

    app.use('/api/v1/property', authorize.authorize ,router);
    
};