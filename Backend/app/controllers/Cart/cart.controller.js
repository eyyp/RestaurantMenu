const Cart = require("../../models/Cart/cart.model.js");
const Cart_item = require("../../models/Cart/cart_item.model.js");
const Cart_item_property = require("../../models/Cart/cart_item_property.js");
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

    const cart = new Cart({
        user_id: req.body.user_id,
        restaurant_id : req.body.restaurant_id,
        table_id: req.body.table_id
    })

    Cart.Create(cart,(err, data) => {
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

exports.Property = (req, res) => {
    if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Cart_item_property.Property(req.params.cart_item_id,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                    res.status(404).send({
                        message: `User cart not found.`
                    });
            } else {
                res.status(500).send({
                    message: "Error retrieving user cart with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};


exports.User = (req, res) => {
    if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Cart.User(req.params.cart_id,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                message: `User cart not found.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving user cart with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};

exports.Count = (req, res) => {
    if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Cart.Count(req.params.cart_id,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                message: `Cart count not found.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving cart count with id"
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

    Cart.Delete(req.params.cart_id,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                message: `Cart count not found.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving cart count with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};

exports.DeleteItem = (req, res) => {
    if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Cart_item.DeleteItem(req.params.cart_item_id,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                message: `Cart count not found.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving cart count with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};

exports.Total = (req, res) => {
    if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Cart.Total(req.params.cart_id,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                message: `Cart count not found.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving cart count with id"
                });
            }
        } else {
            res.send(data)
        }
    });
};

exports.Add = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    const cart_item = new Cart_item({
        cart_id: req.body.cart_id,
        product_id: req.body.product_id,
    })

    const property = req.body.property;

    Cart_item.Add(cart_item,property,(err, data) => {
        if (err) {
            if (err.kind=== "not_found") {
                res.status(404).send({
                message: `User not found.`
                });
            } else {
                res.status(500).send({
                message:err
                });
            }
        } else {
            res.send(data)
        }
    });
};