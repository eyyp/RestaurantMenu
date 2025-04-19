var multer = require('multer');
var fs = require('fs');
var sharp = require('sharp');
var path = require('path');

var Jimp = require("jimp");
module.exports = app => {
    const product = require("../../models/Product/product.model.js");
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

    app.post("/dashboard/api/v1/product/setImage/:product_id", upload.single('image'), async (req, res) => { 

      // Yeni çözünürlük
      const newWidth = 1920;
      const newHeight = 1080;

      try {
        // Çözünürlük değişikliğini uygula ve işlenmiş resmi kaydet
        await sharp(req.file.path)
          .resize(newWidth, newHeight)
          .toFile('uploads/'+ 'resize-' + imageFileName, (err, info) => {
            if (err) {
              console.error(err);
            } else {
              console.log('İşlem tamamlandı:', info);
            }
          });
        
        // Avatar bilgilerini veritabanına kaydet
        const productPhoto = new ProductPhoto({
          product_id: req.params.product_id,
          photo_url: 'resize-' + imageFileName
        })
        ProductPhoto.setImage(productPhoto,(err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found users with user_id.`
              });
            } else {
              res.status(500).send({
                message: "Product photo update error"
              });
            }
          } else {
            res.json({ success: true, message: 'Image uploaded successfully' });
          }
        });
      }
      catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });
    app.get('/dashboard/api/v1/product/getImage/:product_id/:page', (req, res) => {

      ProductPhoto.image(req.params.product_id,(error,data)=>{
        if(error){
          res.status(404).send("Not found product");
        }
        else{
            const jsonItem = JSON.parse(JSON.stringify(data));
           fs.readFile('C:\\Users\\eyypb\\Desktop\\RestaurantDashboardBackend\\uploads\\' + 'resize-' + jsonItem[req.params.page].photo_url, (err, data) => {
            if (err) {
              res.status(500).send('Error reading the file');
              return;
            }

            const base64Image = Buffer.from(data).toString('base64');
            res.send({ image: base64Image });
           });
        }
      })
    });
};
