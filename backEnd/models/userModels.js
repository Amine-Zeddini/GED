const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: { type: String },
  lastName: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  created: { type: Date, default: Date.now() },
  picVersion: { type: String, default: "1602591277" },
  picId: { type: String, default: "default-men_l2to0e.png" },
  images: [
    {
      imgId: { type: String, default: "" },
      imgVersion: { type: String, default: "" },
    },
  ],
});

userSchema.statics.EncryptPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

module.exports = mongoose.model("User", userSchema);
