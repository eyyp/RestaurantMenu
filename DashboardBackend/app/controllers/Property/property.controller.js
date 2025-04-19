//const Property = require("../../models/Property/property.model.js");
const Property_type = require("../../models/Property/property_type.models.js");
const Property = require("../../models/Property/property.models.js");
const winston = require('winston');

var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

exports.Create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    const property_type = new Property_type({
        restaurant_id: req.body.restaurant_id,
        number_choices: req.body.number_choices,
        title: req.body.title,
        difficualty: req.body.difficualty
    })

    Property_type.Create(property_type,(err, data) => {
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
}

exports.Find = (req, res) => {

    Property.Find(req.params.property_id,(err, data) => {
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
}

exports.TypeAll = (req, res) => {

    console.log(req.params)

    Property_type.TypeAll(req.params.restaurant_id,(err, data) => {
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
}


