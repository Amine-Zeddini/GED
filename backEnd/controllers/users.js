const httpStatus = require("http-status-codes");
const User = require("../models/userModels");
const moment = require("moment");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const Helpers = require("../Helpers/helpers");

module.exports = {
  async GetAllUsers(req, res) {
    await User.find({})
      .sort({ created: -1 })
      .then((result) => {
        res
          .status(httpStatus.StatusCodes.OK)
          .json({ message: "All users", result });
      })
      .catch((err) => {
        res
          .status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },

  async GetUser(req, res) {
    await User.findOne({ _id: req.params.id })
      .then((result) => {
        res
          .status(httpStatus.StatusCodes.OK)
          .json({ message: "User by id", result });
      })
      .catch((err) => {
        res
          .status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },

  async GetUserByName(req, res) {
    await User.findOne({ username: req.params.username })
      .then((result) => {
        res
          .status(httpStatus.StatusCodes.OK)
          .json({ message: "User by username", result });
      })
      .catch((err) => {
        res
          .status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },

  

  /******************************update user by ID *************** */
  async updateUser(req, res) {
    const schema = Joi.object().keys({
      name: Joi.string(),
      lastName: Joi.string(),
      username: Joi.string().min(4).max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      role: Joi.string(),
    });

    // VALIDATE BEFORE SAVING A USER
    const { error, value } = schema.validate(req.body);

    //console.log(value);

    if (error && error.details) {
      return res
        .status(httpStatus.StatusCodes.BAD_REQUEST)
        .json({ msg: error.details });
    }

    //converts email to lowercase and checks if the Email already exists
    const userEmail = await User.findOne({
      _id: { $ne: req.params.id },
      email: Helpers.lowercase(req.body.email),
    });
    console.log("userEmail", userEmail);
    if (userEmail) {
      return res
        .status(httpStatus.StatusCodes.CONFLICT)
        .json({ message: "Email already exist" });
    }

    //converts the usernames to firstUpper and Checks if the username already exists
    const userName = await User.findOne({
      _id: { $ne: req.params.id },
      username: Helpers.firstUpper(req.body.username),
    });
    console.log("userName", userName);
    if (userName) {
      return res
        .status(httpStatus.StatusCodes.CONFLICT)
        .json({ message: "UserName already exist" });
    }

    return await bcrypt.hash(value.password, 10, (err, hash) => {
      if (err) {
        return res
          .status(httpStatus.StatusCodes.BAD_REQUEST)
          .json({ message: "Error hashing password" });
      }
      const body = {
        username: Helpers.firstUpper(value.username),
        email: Helpers.lowercase(value.email),
        password: hash,
        name: value.name,
        lastName: value.lastName,
        role: value.role,
        created: new Date(),
      };
      console.log("body", body);
      User.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          username: Helpers.firstUpper(value.username),
          email: Helpers.lowercase(value.email),
          password: hash,
          name: value.name,
          lastName: value.lastName,
          role: value.role,
          created: new Date(),
        }
      )
        .then((user) => {
          res
            .status(httpStatus.StatusCodes.CREATED)
            .json({ message: "User updated successfully", user });
        })
        .catch((err) =>
          res
            .status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error occurred while updating user" })
        );
    });
  },

  /****************************** chnage password *************** */

  async ChangePassword(req, res) {
    const schema = Joi.object().keys({
      cpassword: Joi.string().required(),
      newPassword: Joi.string().min(5).required(),
      confirmPassword: Joi.string().min(5).optional(),
    });

    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      return res
        .status(httpStatus.StatusCodes.BAD_REQUEST)
        .json({ msg: error.details });
    }

    const user = await User.findOne({ _id: req.user._id });

    return bcrypt
      .compare(value.cpassword, user.password)
      .then(async (result) => {
        if (!result) {
          return res
            .status(httpStatus.StatusCodes.CONFLICT)
            .json({ message: "Current password is incorrect" });
        }

        const newpassword = await User.EncryptPassword(req.body.newPassword);
        await User.update(
          {
            _id: req.user._id,
          },
          {
            password: newpassword,
          }
        )

          .then(() => {
            res
              .status(httpStatus.StatusCodes.OK)
              .json({ message: "Password changed successfully" });
          })
          .catch((err) => {
            res
              .status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "Error occured" });
          });
      });
  },

  DeleteUser(req, res) {
    const { id } = req.params;
    User.findByIdAndRemove(id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  },
};
