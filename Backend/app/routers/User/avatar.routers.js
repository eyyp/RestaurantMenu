var multer = require('multer');
var fs = require('fs');
var sharp = require('sharp');
var path = require('path');

var Jimp = require("jimp");
module.exports = app => {
    const user = require("../../models/User/user.model.js");
    var avatarFileName ='';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
      },
      filename: function (req, file, cb) {
        var types = file.mimetype;
        types = types.split('/');
        avatarFileName = req.params.user_id + '-' + Date.now() + '.' +types[1];
        cb(null, req.params.user_id + '-' + Date.now() + '.' + types[1]);
      },
    });
    
    const upload = multer({ storage: storage });

    app.post("/api/user/setavatar/:user_id", upload.single('image'), async (req, res) => { 

      // Yeni çözünürlük
      const newWidth = 512;
      const newHeight = 512;

      try {
        // Çözünürlük değişikliğini uygula ve işlenmiş resmi kaydet
        await sharp(req.file.path)
          .resize(newWidth, newHeight)
          .toFile('uploads/'+ 'resize-' + avatarFileName, (err, info) => {
            if (err) {
              console.error(err);
            } else {
              console.log('İşlem tamamlandı:', info);
              // Orijinal dosyayı sil
        fs.unlink('uploads/'+avatarFileName, async (unlinkError) => {
          if (unlinkError) {
            console.error('Orijinal dosya silinemedi:', unlinkError);
          } else {
            console.log('Orijinal dosya silindi.');
        
        // Avatar bilgilerini veritabanına kaydet
        user.setAvatar(avatarFileName, req.params.user_id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found users with user_id.`
              });
            } else {
              res.status(500).send({
                message: "Error updating users with avatar"
              });
            }
          } else {
            res.json({ success: true, message: 'Image uploaded successfully' });
          }
        });
      }});
            }
          });
      } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });
};
