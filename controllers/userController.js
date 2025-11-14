import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModel.js";

// createUser → Yeni kullanıcı kaydı yapmak için fonksiyon
const createUser = async (req, res) => {
  try {
    // Kullanıcı bilgilerini alıp MongoDB'de User koleksiyonuna kaydet
    const user = await User.create(req.body);
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log("error", error);

    let errors2 = {};

    if (error.code === 1100) {
      errors2.email = "The email is already registered";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors2[key] = error.errors[key].message;
      });
    }

    res.status(400).json(errors2);
  }
};

// loginUser → Kullanıcı giriş yapmak istediğinde çalışacak fonksiyon
const loginUser = async (req, res) => {
  try {
    // Kullanıcının gönderdiği username ve password'u al
    const { username, password } = req.body;

    // Veritabanında bu kullanıcı var mı kontrol et
    const user = await User.findOne({ username });

    let same = false; // şifre eşleşmesi için başlangıç değeri

    if (user) {
      // Eğer kullanıcı bulunduysa, gönderilen şifre ile veritabanındaki hashlenmiş şifreyi karşılaştır
      same = await bcrypt.compare(password, user.password);
    } else {
      // Kullanıcı bulunamazsa 401 Unauthorized hatası döndür
      return res.status(401).json({
        succesed: false,
        message: "User not found",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      }); // 1 day

      // Şifre doğruysa → dashboarda yönlendir
      res.redirect("/users/dashboard");
    } else {
      // Şifre yanlışsa → 401 Unauthorized hatası
      res.status(401).json({
        succesed: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    // Sunucu hatası olursa 500 kodu ile JSON döndür
    res.status(500).json({
      succesed: true, // hata durumunda false olmalı
      error,
    });
  }
};

// createToken → Kullanıcıya JWT token oluşturur
const createToken = (userId) => {
  return jwt.sign(
    { userId }, // token payload → içinde userId var
    process.env.JWT_SECRET, // gizli anahtar (.env dosyasında olmalı)
    { expiresIn: "1d" } // token 1 gün geçerli
  );
};

const getDashboardPage = async (req, res) => {
  const photos = await Photo.find({ user: res.locals.user._id });
  res.render("dashboard", {
    link: "dashboard",
    photos,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id:{$ne : res.locals.user._id} });
    res.status(200).render("Users", {
      users, // tüm kullanıcılar
      link: "users", // sayfa linki
    });
  } catch (error) {
    res.status(500).json({
      succesed: false,
      error,
    });
  }
};

const getAUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id })
    const photos = await Photo.find({ user: res.locals.user._id })
    res.status(200).render("user", {
      user,
      photos,
      link: "users",
    });
  } catch (error) {
    res.status(500).json({
      succesed: false,
      error,
    });
  }
};

export { createUser, loginUser, getDashboardPage, createToken, getAllUsers, getAUser };
