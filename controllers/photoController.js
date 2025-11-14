import Photo from "../models/photoModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// createPhoto → Yeni bir fotoğraf eklemek için fonksiyon
const createPhoto = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "lenslight_tr",
    }
  );

  try {
    await Photo.create({
      name: req.body.name,
      description: req.body.description, //dashboard.ejs deki namelere eşit olmalı
      user: res.locals.user._id,
      url: result.secure_url,
    });

    fs.unlinkSync(req.files.image.tempFilePath);

    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      error,
    });
  }
};

// getAllPhotos → Tüm fotoğrafları listelemek için fonksiyon
const getAllPhotos = async (req, res) => {
  try {
    const photos = res.locals.user
      ? await Photo.find({ user: { $ne: res.locals.user._id } })
      : await Photo.find({});
    res.status(200).render("photos", {
      photos, // tüm fotoğraflar
      link: "photos", // sayfa linki
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      error,
    });
  }
};

// getAPhoto → Tek bir fotoğrafı ID ile bulmak için fonksiyon
const getAPhoto = async (req, res) => {
  try {
    // URL'den gelen id parametresini kullanarak fotoğrafı bul
    const photo = await Photo.findById({ _id: req.params.id }).populate("user");
    res.status(200).render("photo", {
      photo,
      link: "photo",
    });
  } catch (error) {
    // Hata olursa JSON ile döndür
    res.status(500).json({
      succeeded: false,
      error,
    });
  }
};

export { createPhoto, getAllPhotos, getAPhoto };
