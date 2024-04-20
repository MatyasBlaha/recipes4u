const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../../../../frontend/src/data/images'));
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: storage });

module.exports = {
    uploads
};
