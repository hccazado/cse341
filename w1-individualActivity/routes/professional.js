const express = require("express");
const router = express.Router();
const conntroller = require("../controllers/professional");
//const cors = require("cors");

//router.get("/", cors(), conntroller.getData);
router.get("/", conntroller.getData);

module.exports = router;