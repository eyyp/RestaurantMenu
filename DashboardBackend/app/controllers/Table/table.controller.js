const Table = require("../../models/Table/table.models.js");
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

  const table = new Table({
    title: req.body.title,
    restaurant_id: req.body.restaurant_id,
  })

  Table.Create(table,(err, data) => {
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

  Table.Find(req.params.table_id,(err, data) => {
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



