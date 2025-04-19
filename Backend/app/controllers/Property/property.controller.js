const Property = require("../../models/Property/property.model.js");
const winston = require('winston');

var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

exports.Product = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Property.Product(req.params.product_id, req.params.product_property_type_id, (err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                    message: `User not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};


exports.Type = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Property.Type(req.params.restaurant_id ,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                    message: `User not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};

exports.Find = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Property.Find(req.params.property_id ,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                    message: `User not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};





