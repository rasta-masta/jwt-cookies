const express = require('express');
const { userController } = require("../controllers")
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/", verifyToken, userController.getUsers)
router.get("/", verifyToken, userController.keepLogin)
router.delete("/logout", userController.logout)

module.exports = router;



