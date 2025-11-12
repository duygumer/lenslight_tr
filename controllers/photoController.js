// Photo modelini alıyoruz, böylece MongoDB'deki fotoğraf verileriyle çalışabiliriz
import Photo from '../models/photoModel.js';

// createPhoto → Yeni bir fotoğraf eklemek için fonksiyon
const createPhoto = async (req, res) => {
    try {
        await Photo.create({
            name:req.body.name,
            description: req.body.description, //dashboard.ejs deki namelere eşit olmalı 
            
        });

        // Başarılıysa 201 kodu ile JSON olarak fotoğrafı döndür
        res.status(201).redirect("/users/dashboard"); 
    } catch (error) {
        // Hata olursa 500 kodu ile hata mesajını JSON olarak döndür
        res.status(500).json({
            succesed: true,  // burada true yanlış yazılmış, hata durumunda false olmalı
            error
        });
    }
};

// getAllPhotos → Tüm fotoğrafları listelemek için fonksiyon
const getAllPhotos = async (req, res) => {
    try {
        // Photo koleksiyonundaki tüm fotoğrafları bul
        const photos = await Photo.find({});

        // photos.ejs dosyasını aç ve fotoğrafları gönder
        res.status(200).render("photos", {
            photos,      // tüm fotoğraflar
            link: "photos" // sayfa linki
        });
    } catch (error) {
        // Hata olursa JSON ile döndür
        res.status(500).json({
            succesed: false,
            error,
        });
    }
};

// getAPhoto → Tek bir fotoğrafı ID ile bulmak için fonksiyon
const getAPhoto = async (req, res) => {
    try {
        // URL'den gelen id parametresini kullanarak fotoğrafı bul
        const photo = await Photo.findById({
            _id: req.params.id
        });

        // photo.ejs dosyasını aç ve fotoğraf bilgisini gönder
        res.status(200).render("photo", {
            photo,
            link: "photo"
        });
    } catch (error) {
        // Hata olursa JSON ile döndür
        res.status(500).json({
            succesed: false,
            error,
        });
    }
};

// Bu fonksiyonları route dosyasında kullanabilmek için export ediyoruz
export {
    createPhoto,
    getAllPhotos,
    getAPhoto
};
