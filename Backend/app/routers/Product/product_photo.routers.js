var multer = require('multer');
var fs = require('fs');
var sharp = require('sharp');
var path = require('path');

var Jimp = require("jimp");
module.exports = app => {
    const ProductPhoto = require("../../models/ProductPhoto/productPhoto.model.js")
    var imageFileName ='';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
      },
      filename: function (req, file, cb) {
        var types = file.mimetype;
        types = types.split('/');
        imageFileName = req.params.product_id + '-' + Date.now() + '.' + types[1];
        cb(null, req.params.product_id + '-' + Date.now() + '.' + types[1]);
      },
    });
    
    const upload = multer({ storage: storage });

    app.get('/api/v1/product/getImage/:product_id/:page', (req, res) => {

      ProductPhoto.image(req.params.product_id,(error,data)=>{
        if(error){
          res.status(404).send("Not found product");
        }
        else{
          const jsonItem = JSON.parse(JSON.stringify(data));
          if(jsonItem[req.params.page]?.photo_url !== undefined){
            fs.readFile('C:\\Users\\eyypb\\Desktop\\RestaurantDashboardBackend\\uploads\\' + jsonItem[req.params.page].photo_url, (err, data) => {
              if (err) {
                res.status(500).send('Error reading the file');
                return;
              }
              else{
                const base64Image = Buffer.from(data).toString('base64');
                res.send({ image: base64Image, count:jsonItem.length });
              }
            });
          }
          else{
            res.send({});
          }
        }
      })
    });
};
