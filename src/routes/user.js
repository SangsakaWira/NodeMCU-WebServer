const express = require("express");
const middleware = require("../config/middleware")
const router = express.Router();
const userController = require("../controllers/user");

router.post("/register", userController.register);
router.post("/login",userController.login);
router.get("/findById/:id",middleware.verifyAuthorization,userController.findById)
router.get("/findAll",userController.findAllUsers)

module.exports = router;
