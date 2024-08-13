const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller"); 
const authMiddleware =  require("../middlewares/auth_middleware.js");
const adminMiddleware = require("../middlewares/admin_middleware");


router.get("/users", authMiddleware, adminMiddleware  ,adminController.getAllUsers);

router.get("/users/:id",authMiddleware, adminMiddleware,adminController.getUserById);

router.delete("/users/delete/:id",authMiddleware,adminMiddleware, adminController.deleteUserById);

router.patch("/users/update/:id" , authMiddleware, adminController.updateUserById);
router.get("/contacts", authMiddleware, adminController.getAllContacts);

router.delete("/contacts/delete/:id",authMiddleware,adminMiddleware, adminController.deleteContactById);

module.exports = router;
