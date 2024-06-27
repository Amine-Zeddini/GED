const Joi = require("joi");
const HttpStatus = require("http-status-codes");
const TypeDocument = require("../models/typeDocumentModel");

module.exports = {
  /***************************** ADD TypeDocument **************************************/
  async AddTypeDocument(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    const schema = Joi.object().keys({
      typeDocument: Joi.string().required(),
      description: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
        msg: error.details,
      });
    }
    const typeDocument = new TypeDocument({
      typeDocument: req.body.typeDocument,
      description: req.body.description,
      createdAt: new Date(),
    });

    await TypeDocument.create(typeDocument)
      .then(async (typeDocument) => {
        res
          .status(HttpStatus.StatusCodes.OK)
          .json({ message: "TypeDocument created", typeDocument });
      })
      .catch((err) => {
        res
          .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },

  /*************************************** GET  TypeDocument  ******************************************/
  async GetTypeDocuments(req, res) {
    try {
      const typeDocuments = await TypeDocument.find({}).sort({
        createdAt: -1,
      });

      return res
        .status(HttpStatus.StatusCodes.OK)
        .json({ message: "All TypeDocuments", typeDocuments });
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*********************************************find by id **************************************************** */
  async GetTypeDocument(req, res) {
    try {
      const typeDocument = await TypeDocument.findById({
        _id: req.params.id,
      });

      return res
        .status(HttpStatus.StatusCodes.OK)
        .json({ message: " TypeDocument", typeDocument });
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*************************************** update TypeDocument ******************************************/

  async updateTypeDocument(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    console.log(req.params.id);
    console.log(req.body);

    try {
      await TypeDocument.findOneAndUpdate(
        { _id: req.params.id },
        {
          typeDocument: req.body.typeDocument,
          description: req.body.description,
          createdAt: new Date(),
        },
        { new: true },
        (err, typeDocument) => {
          if (err) {
            return res
              .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "Not Found" });
          }

          return res
            .status(HttpStatus.StatusCodes.OK)
            .json({ message: "update TypeDocument", typeDocument });
        }
      );
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*************************************** delete TypeDocument ******************************************/

  async deleteTypeDocument(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    console.log(req.params.id);

    try {
      await TypeDocument.remove({ _id: req.params.id }, (err, typeDocument) => {
        if (err) {
          return res
            .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Not Found" });
        }

        return res
          .status(HttpStatus.StatusCodes.OK)
          .json({ message: "delete TypeDocument", typeDocument });
      });
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },
};
