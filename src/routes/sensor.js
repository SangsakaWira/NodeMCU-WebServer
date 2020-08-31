const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensor");

router.get("/create/:value/:user_id/:sensor_type", sensorController.create);
router.get("/findByUserId/:user_id",sensorController.findByUserId);
router.get("/findAll",sensorController.findAll)

module.exports = router;
