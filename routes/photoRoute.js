// Express'i alıyoruz, böylece route'ları oluşturabiliriz
import express from "express";

// photoController içindeki tüm fonksiyonları alıyoruz
// Böylece route'larda hangi işlemi yapacağımızı biliyoruz
import * as photoController from "../controllers/photoController.js";

// Express Router oluşturuyoruz
const router = express.Router();

// "/" route → ana fotoğraf yolu
// POST isteği → yeni fotoğraf eklemek için createPhoto fonksiyonu çalışır
// GET isteği → tüm fotoğrafları listelemek için getAllPhotos fonksiyonu çalışır
router.route("/")
  .post(photoController.createPhoto)
  .get(photoController.getAllPhotos);

// "/:id" route → tek bir fotoğrafı ID ile bulmak için
// GET isteği geldiğinde getAPhoto fonksiyonu çalışır
// req.params.id ile URL'den gelen fotoğraf ID'si alınır
router.route("/:id").get(photoController.getAPhoto);

// Bu router'ı dışarı aktarıyoruz
// Ana server dosyasında import edip app.use("/photos", photoRoute) şeklinde kullanacağız
export default router;

