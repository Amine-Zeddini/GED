const mongoose = require("mongoose");

const typeDocumentSchema = mongoose.Schema({
  typeDocument: { type: String, default: "" },
  description: { type: String, default: "" },
  createdAt: { type: Date, defualt: Date.now() },
});

module.exports = mongoose.model("TypeDocument", typeDocumentSchema);
