const Order_item = require("../../models/Order/oder_item.models");
const Order = require("../../models/Order/order.model")
const winston = require('winston');

var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

exports.Pull = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Order.Pull(req.body.restaurant_id,req.body.delivery,req.params.perPage,(err, data) => {
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

exports.Delete = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Order.Delete(req.params.order_id,(err, data) => {
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

exports.ChangeDelivery = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Order.ChangeDelivery(req.body.order_id,req.body.delivery,(err, data) => {
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

exports.ItemFind = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Order.ItemFind(req.params.order_id,(err, data) => {
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

exports.ItemProperty = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Order_item.ItemProperty(req.params.order_item_id,(err, data) => {
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