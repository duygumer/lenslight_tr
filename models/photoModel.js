// Mongoose'u içe aktarıyoruz, çünkü MongoDB ile konuşmak için buna ihtiyacımız var
import mongoose from "mongoose";

// Mongoose içinden 'Schema' nesnesini alıyoruz, böylece veri şeması tanımlayabiliriz
const { Schema } = mongoose;

// Şimdi bir fotoğraf şeması oluşturuyoruz (photoSchema)
// Yani MongoDB’de her fotoğrafın nasıl saklanacağını belirliyoruz
const photoSchema = new mongoose.Schema({

  // name alanı → fotoğrafın ismi
  name: {
    type: String,        // veritabanında metin olarak saklanacak
    required: true,      // bu alan boş olamaz
    trim: true,          // başındaki ve sonundaki boşlukları otomatik siler
  },

  // description alanı → fotoğrafın açıklaması
  description: { 
    type: String,        // metin olarak saklanacak
    required: true,      // boş bırakılamaz
    trim: true,          // başındaki ve sonundaki boşlukları siler
  },

  // uploadedAt alanı → fotoğrafın yüklenme tarihi
  uploadedAt: {
    type: Date,          // tarih formatında saklanacak
    default: Date.now,   // eğer bir tarih verilmezse, otomatik olarak şu anki tarihi koy
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User", // user modal ına referans vereceğiz(satır 51 deki user a eşit olmalı)
  }
});

// Şimdi şemayı kullanarak bir model oluşturuyoruz
// Model → MongoDB’de fotoğraflar koleksiyonuna karşılık gelir
const Photo = mongoose.model("Photo", photoSchema);

// Modeli dışarıya aktarıyoruz ki başka dosyalarda kullanabilelim
export default Photo;

