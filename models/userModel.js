import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// Mongoose içinden 'Schema' nesnesini alıyoruz
const { Schema } = mongoose;

// Kullanıcı şeması (userSchema) oluşturuyoruz
// Yani MongoDB’de her kullanıcının hangi bilgileri tutacağını belirliyoruz
const userSchema = new mongoose.Schema(
  {
    // username alanı → kullanıcı adı
    username: {
      type: String, // metin olarak saklanacak
      required: [true, "Username area is required"], // boş bırakılamaz
      lowercase: true,
      validate: [validator.isAlphanumeric, "Username must be alphanumeric"], // sadece harf ve rakam içerebilir
    },

    email: {
      type: String,
      required: [true, "Email area is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password area is required"],
      minlength: [4, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik ekler
  }
);

// 🔐 Şifreyi kaydetmeden önce hashleme işlemi
userSchema.pre("save", function (next) {
  const user = this; // this → kaydedilen kullanıcı objesi

  // bcrypt ile şifreyi hashliyoruz
  // 10 → hashleme karmaşıklığı
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash; // şifreyi güvenli hash ile değiştir
    next(); // kaydetme işlemi devam etsin
  });
});

// Model oluşturuyoruz → kullanıcılar koleksiyonunu temsil eder
const User = mongoose.model("User", userSchema);

// Modeli dışarı aktarıyoruz ki controller veya route’ta kullanabilelim
export default User;
