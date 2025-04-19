const authorize = require('../../middleware/authorize/authorize');

module.exports = app => {
    const Property = require("../../controllers/Property/property.controller.js");
  
    var router = require("express").Router();
  
    router.post("/type/create", Property.Create);

    router.get("/type/all/:restaurant_id", Property.TypeAll);

    router.get("/find/:property_id", Property.Find);

    app.use('/dashboard/api/v1/property', authorize.authorize ,router);
    
};