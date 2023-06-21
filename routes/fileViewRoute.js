const router = require("express").Router();
const fileViewController = require("../controllers/fileViewController");
const readFile = require("../controllers/fileViewController");

router.get("/file", fileViewController.readFile);

module.exports = router;