const Order = require("../../models/Order/order.model")
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

    const order = new Order({
        user_id: req.body.user_id,
        restaurant_id : req.body.restaurant_id,
        table_id: req.body.table_id,
        total: req.body.total,
        piece: req.body.piece,
        notes: req.body.notes
    })
    
    Order.Create(order,req.body.cart_id,(err, data) => {
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