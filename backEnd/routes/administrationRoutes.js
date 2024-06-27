const express = require("express");
const router = express.Router();

const AdministrationCtrl = require("../controllers/administration");
const AuthHelper = require("../Helpers/AuthHelper");

router.post(
  "/administration/add-administration",
  AuthHelper.VerifyToken,
  AdministrationCtrl.AddAdministration
);
router.put(
  "/administration/add-administration/:id",
  AuthHelper.VerifyToken,
  AdministrationCtrl.updateAdministration
);
router.delete(
  "/administration/delete-administration/:id",
  AuthHelper.VerifyToken,
  AdministrationCtrl.deleteAdministration
);

router.get("/administrations", AdministrationCtrl.GetAdministrations);
router.get("/administration/:id", AdministrationCtrl.GetAdministration);

module.exports = router;
