const Joi = require("joi");
const HttpStatus = require("http-status-codes");
const Administration = require("../models/administrationModel");

module.exports = {
  /***************************** ADD Administration **************************************/
  async AddAdministration(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      code: Joi.string(),
      libelle: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
        msg: error.details,
      });
    }
    const administration = new Administration({
      title: req.body.title,
      code: req.body.code,
      libelle: req.body.libelle,
      createdAt: new Date(),
    });

    await Administration.create(administration)
      .then(async (administration) => {
        res
          .status(HttpStatus.StatusCodes.OK)
          .json({ message: "administration created", administration });
      })
      .catch((err) => {
        res
          .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },

  /*************************************** GET  Administration  ******************************************/
  async GetAdministrations(req, res) {
    try {
      const administrations = await Administration.find({}).sort({
        createdAt: -1,
      });

      return res
        .status(HttpStatus.StatusCodes.OK)
        .json({ message: "All Administration", administrations });
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*********************************************find by id **************************************************** */
  async GetAdministration(req, res) {
    try {
      const administration = await Administration.findById({
        _id: req.params.id,
      });

      return res
        .status(HttpStatus.StatusCodes.OK)
        .json({ message: " administration", administration });
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*************************************** update Administration ******************************************/

  async updateAdministration(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    console.log(req.params.id);
    console.log(req.body);

    try {
      await Administration.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          code: req.body.code,
          libelle: req.body.libelle,
          createdAt: new Date(),
        },
        { new: true },
        (err, administration) => {
          if (err) {
            return res
              .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "Not Found" });
          }

          return res
            .status(HttpStatus.StatusCodes.OK)
            .json({ message: "update administration", administration });
        }
      );
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*************************************** delete administration ******************************************/

  async deleteAdministration(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    console.log(req.params.id);

    try {
      await Administration.remove(
        { _id: req.params.id },
        (err, administration) => {
          if (err) {
            return res
              .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "Not Found" });
          }

          return res
            .status(HttpStatus.StatusCodes.OK)
            .json({ message: "delete administration", administration });
        }
      );
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },
};
