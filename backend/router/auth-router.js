const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller")
const authMiddleware = require("../middlewares/authMiddleware");
router.route("/").get(authcontrollers.home)


router.route("/login").post(authcontrollers.login)

router.route("/forgotPassword").post(authcontrollers.forgotPassword)

router.route("/reset-password").post(authcontrollers.resetPassword)

router.route("/signup").post(authcontrollers.register)

router.route("/verify").get(authMiddleware,authcontrollers.verify)

router.route("/products").get(authcontrollers.getProducts)

router.route("/products/:id").get(authcontrollers.getSingleProduct)

router.route("/update-cart").post(authMiddleware, authcontrollers.updateCart);

router.route("/create-checkout-session").post(authcontrollers.checkoutsession);


module.exports = router;