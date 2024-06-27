const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  administrationID: { type: mongoose.Schema.Types.ObjectId, ref: "Administration" },
  typeDocmentID: { type: mongoose.Schema.Types.ObjectId, ref: "TypeDocument" },
  status:{ type: String, default: "" },
  createdAt: { type: Date, defualt: Date.now() },
});

module.exports = mongoose.model("Document", documentSchema);
