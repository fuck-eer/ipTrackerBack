const express = require("express");
const isAuth = require("../middlewares/is-auth");
const ipDataController = require("../controllers/ipData");
const route = express.Router();

route.get("/", isAuth, ipDataController.getIpData);
route.post("/", isAuth, ipDataController.saveIpData);
route.get("/find/:ip", isAuth, ipDataController.findIp);
module.exports = route;
