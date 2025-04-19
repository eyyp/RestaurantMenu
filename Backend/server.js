const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require("cors");
var corsOptions = {
 "content-Type": "application/json",
  origin: ["http://localhost:3002"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

require("./app/routers/User/user.routers.js")(app);
require("./app/routers/Table/table.routers.js")(app);
require("./app/routers/Product/product.routers.js")(app);
require("./app/routers/Cart/cart.routers.js")(app);
require("./app/routers/Order/order.routers.js")(app);
require("./app/routers/Product/product_photo.routers.js")(app);
require("./app/routers/Property/property.routers.js")(app);
require("./app/routers/Category/category.routers.js")(app);

const port = 3002;

http.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta host:${corsOptions.origin} çalışıyor`);
});
