const router = require("express").Router();
const uploadFile = require("../multer/uploadFile");
const { upload, imgToText } = require("../multer/uploadFile");

router.post('/upload', upload.single("profileImage"), uploadFile.imgToText)

module.exports = router;