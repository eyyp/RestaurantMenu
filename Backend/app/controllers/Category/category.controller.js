const Category = require("../../models/Category/category.model")
const winston = require('winston');

var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

exports.All = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Category.All(req.params.restaurant_id,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Order create error.`
                });
            } else {
                res.status(500).send({
                    message: "Error "
                });
            }
        } else {
            res.send(data)
        }
    });
};