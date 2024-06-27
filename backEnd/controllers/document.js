const Joi = require("joi");
const HttpStatus = require("http-status-codes");
const Document = require("../models/documentModel");

module.exports = {
  /***************************** ADD Document **************************************/
  async AddDocument(req, res) {
   
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      userID: Joi.string(),
      administrationID: Joi.string(),
      typeDocmentID: Joi.string(),
      status:Joi.string()


     
    });
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
        msg: error.details,
      });
    }
    const document = new Document({
      title: req.body.title,
      description: req.body.description,
      userID: req.body.userID,
      administrationID: req.body.administrationID,
      typeDocmentID: req.body.typeDocmentID,
      status:req.body.status,
      createdAt: new Date(),
    });

    await Document.create(document)
      .then(async (document) => {
        res
          .status(HttpStatus.StatusCodes.OK)
          .json({ message: "document created", document });
      })
      .catch((err) => {
        res
          .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },
    /*************************************** GET  Document  ******************************************/
    async GetDocuments(req, res) {
      try {
        const documents = await Document.find({})
          .populate("userID")
          .populate("administrationID")
          .populate("typeDocmentID")
          .sort({
          createdAt: -1,
        });
  
        return res
          .status(HttpStatus.StatusCodes.OK)
          .json({ message: "All documents", documents });
      } catch (err) {
        return res
          .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      }
    },

  /*************************************** GET  Document  by User ******************************************/
  async GetDocumentsByUser(req, res) {
    try {
      const documents = await Document.find({
        "userID": req.params.id,

      })
        .populate("userID")
        .populate("administrationID")
        .populate("typeDocmentID")
        .sort({
        createdAt: -1,
      });

      return res
        .status(HttpStatus.StatusCodes.OK)
        .json({ message: "All documents", documents });
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*********************************************find by id **************************************************** */
  async GetDocument(req, res) {
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

  /*************************************** update  ******************************************/

  async updateDocument(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    console.log(req.params.id);
    console.log(req.body);

    try {
      await Document.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          description: req.body.description,
          userID: req.body.userID,
          administrationID: req.body.administrationID,
          typeDocmentID: req.body.typeDocmentID,
          status: req.body.status,
          createdAt: new Date(),
        },
        { new: true },
        (err, document) => {
          if (err) {
            return res
              .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "Not Found" });
          }

          return res
            .status(HttpStatus.StatusCodes.OK)
            .json({ message: "update document", document });
        }
      );
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  /*************************************** delete  ******************************************/

  async deleteDocument(req, res) {
    // if (req.user.role !== "admin") {
    //   return res.status(HttpStatus.FORBIDDEN).json({ message: "Forbidden" });
    // }
    console.log(req.params.id);

    try {
      await Document.remove(
        { _id: req.params.id },
        (err, document) => {
          if (err) {
            return res
              .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "Not Found" });
          }

          return res
            .status(HttpStatus.StatusCodes.OK)
            .json({ message: "delete document", document });
        }
      );
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },



  /****************************************chnage status */
  async updateStatus(req, res) {
   
    console.log(req.params.id)
    
    try {
      await Availabledate.findOneAndUpdate({_id:req.params.id},
        {
          $set: {
          
          "status":req.body.status
         },
         

        }, { multi: true },
        (err, availableDate)=>{
        if(err){
          return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Not Found" });
         }
  
        return res.status(HttpStatus.OK).json({ message: "update status", availableDate });
      })
    
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  async updateStatus(req, res) {
 
    console.log(req.params.id);
    console.log(req.body);

    try {
      await Document.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
          
          "status":req.body.status
         },
         

        }, 
        { new: true },
        (err, document) => {
          if (err) {
            return res
              .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "Not Found" });
          }

          return res
            .status(HttpStatus.StatusCodes.OK)
            .json({ message: "update Status", document });
        }
      );
    } catch (err) {
      return res
        .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

};
