const express = require("express");
const router = express.Router();

const DocumentCtrl = require("../controllers/document");
const AuthHelper = require("../Helpers/AuthHelper");

router.post(
  "/document/add-document",
  AuthHelper.VerifyToken,
  DocumentCtrl.AddDocument
);
router.put(
  "/document/add-document/:id",
  AuthHelper.VerifyToken,
  DocumentCtrl.updateDocument
);
router.put(
  "/document/update-status/:id",
  AuthHelper.VerifyToken,
  DocumentCtrl.updateStatus
);
router.delete(
  "/document/delete-document/:id",
  AuthHelper.VerifyToken,
  DocumentCtrl.deleteDocument
);
router.get("/documents", DocumentCtrl.GetDocuments);

router.get("/documents/:id", DocumentCtrl.GetDocumentsByUser);
router.get("/document/:id", DocumentCtrl.GetDocument);

module.exports = router;
