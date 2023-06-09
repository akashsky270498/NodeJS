const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "video/mp4" ||
            file.mimetype == "video/3gp"
        ) {
            callback(null, true)
        } else {
            console.log("Supported File formats : jpg-jpeg-png-mp4-3gp");
            callback(null, false)
        }
    },
    limits: { filesize: 1024 * 1024 * 100 }
})

module.exports = upload;