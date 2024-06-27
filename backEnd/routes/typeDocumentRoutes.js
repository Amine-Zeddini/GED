const express = require("express");
const router = express.Router();

const TypeDocumentCtrl = require("../controllers/typeDocument");
const AuthHelper = require("../Helpers/AuthHelper");

router.post(
  "/typeDocument/add-typeDocument",
  AuthHelper.VerifyToken,
  TypeDocumentCtrl.AddTypeDocument
);
router.put(
  "/typeDocument/add-typeDocument/:id",
  AuthHelper.VerifyToken,
  TypeDocumentCtrl.updateTypeDocument
);
router.delete(
  "/typeDocument/delete-typeDocument/:id",
  AuthHelper.VerifyToken,
  TypeDocumentCtrl.deleteTypeDocument
);

router.get("/typeDocuments", TypeDocumentCtrl.GetTypeDocuments);
router.get("/typeDocument/:id", TypeDocumentCtrl.GetTypeDocument);

module.exports = router;
