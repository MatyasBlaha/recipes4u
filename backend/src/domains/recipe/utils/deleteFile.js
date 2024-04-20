const path = require("path");
const fs = require('fs');
exports.deleteFile = (filePath) => {
    const fullPath = path.join(__dirname, '../../../../../frontend/src/data/images', filePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error(`Error deleting file ${fullPath}:`, err);
        } else {
            console.log(`File ${fullPath} was deleted successfully.`);
        }
    });
};