const mongoose = require("mongoose");

const administrationSchema = mongoose.Schema({
  title: { type: String, default: "" },
  code: { type: String, default: "" },
  libelle: { type: String, default: "" },
  createdAt: { type: Date, defualt: Date.now() },
});

module.exports = mongoose.model("Administration", administrationSchema);
