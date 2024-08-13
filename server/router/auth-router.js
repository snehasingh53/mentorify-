
const express = require('express');
const router = express.Router(); 

const authController = require('../controllers/auth-controller');
const {signupSchema , loginSchema} = require("../validators/auth-validator"); 
const validate = require("../middlewares/validate_middleware");
const authMiddleware = require("../middlewares/auth_middleware");




router.post("/", authController.home);
router.post("/register", validate(signupSchema), authController.register);
router.post("/login", validate(loginSchema) ,authController.login);
router.get("/user", authMiddleware ,authController.user);



module.exports = router;
