const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
  
// const upload = multer({ dest: 'uploads' }).single('file'); 
const upload = multer({ storage: storage }).single('file');

module.exports = { upload };
