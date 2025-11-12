// Express'i alıyoruz, böylece route'ları oluşturabiliriz
import express from "express";
import * as pageController from "../controllers/pageController.js";

// Express Router oluşturuyoruz
// Router → URL’leri belirli controller fonksiyonlarına bağlamak için kullanılır
const router = express.Router();

// "/" → ana sayfa URL'si
// GET isteği geldiğinde getIndexPage fonksiyonu çalışır
router.route("/").get( pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLoginPage);
router.route("/logout").get(pageController.getLogout);

export default router;
