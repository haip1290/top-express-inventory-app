const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRoute = Router();

indexRoute.get("/", indexController.index);

module.exports = indexRoute;
