import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import { getAUser } from "../controllers/userController.js";

const router = express.Router();

// "/register" route → kullanıcı kayıt işlemi
// POST isteği geldiğinde createUser fonksiyonu çalışır
router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router
  .route("/dashboard")
  .get(authMiddleware.authenticateToken, userController.getDashboardPage);
router
  .route("/")
  .get(authMiddleware.authenticateToken, userController.getAllUsers);
router
  .route("/:id")
  .get(authMiddleware.authenticateToken, userController.getAUser);

export default router;
