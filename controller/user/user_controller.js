import models from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index";

export let sign_up = (req, res) => {
  try {
    bcrypt.hash(
      req.body.password,
      parseInt(config.salt_rounds),
      (err, hash) => {
        models.user
          .findOrCreate({
            where: {
              mobile_number: req.body.mobile_number,
            },
            defaults: { name: req.body.name, password: hash },
          })
          .spread((user, created) => {
            if (created) {
              res
                .status(200)
                .send({ error: null, data: "user successfully created!" });
            } else {
              res.status(409).send({
                error: "Mobile number is already registered!",
                data: null,
              });
            }
          });
      }
    );
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data processing!", data: null });
  }
};

export let login = (req, res) => {
  try {
    const { mobile_number, password } = req.body;
    models.user
      .findOne({ where: { mobile_number: mobile_number } })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((result) => {
            if (result) {
              let user_data = {
                // mobile_number: req.body.mobile_number,
                mobile_number: mobile_number,
                id: user.id,
                name: user.name,
              };
              const access_token = jwt.sign(
                user_data,
                config.Access_token_secret,
                {
                  expiresIn: "6000m",
                }
              );
              res.status(200).send({
                error: null,
                data: { access_token },
              });
            } else {
              res.status(200).send({
                error: "incorrect password ☹ !",
                data: null,
              });
            }
          });
        } else {
          res.status(404).send({ error: "User not found!", data: null });
        }
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};

export let add_user_address = (req, res) => {
  try {
    const { type, name, location, landmark } = req.body;
    models.user_address
      .create({
        userId: req.user.id,
        type: type,
        name: name,
        location: location,
        landmark: landmark,
      })
      .then((success) => {
        res.status(200).send({ error: null, data: success });
      });
  } catch (err) {
    conosole.log(err);
    res
      .status(503)
      .send({ error: "Something broke in data processing", data: null });
  }
};

export let send_otp = (req, res) => {
  try {
    let otp = Math.floor(Math.random() * 90000) + 10000;
    const { mobile_number } = req.body;
    models.user
      .update({ otp: otp }, { where: { mobile_number: mobile_number } })
      .then((numberOfAffectedRows) => {
        numberOfAffectedRows[0] > 0
          ? res.status(200).send({ error: null, data: { otp: otp } })
          : res.status(404).send({ error: "User not found!", data: null });
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data processing", data: null });
  }
};

export let verify_otp = (req, res) => {
  try {
    const { mobile_number, otp } = req.body;
    models.user
      .findOne({ where: { mobile_number: mobile_number } })
      .then((user) => {
        user
          ? user.otp === parseInt(otp)
            ? res.status(200).send({ error: null, data: "otp verified !" })
            : res.status(400).send({ error: "Incorrect OTP", data: null })
          : res.status(404).send({ error: "User not found!", data: null });
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data processing", data: null });
  }
};

export let get_all_users = (req, res) => {
  try {
    models.user
      .findAll({
        include: [
          models.payment,
          models.user_address,
          models.cart,
          models.wishlist,
        ],
      })
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};

export let add_a_cart = (req, res) => {
  try {
    models.cart
      .create({ userId: req.user.id, itemId: req.body.itemid })
      .then((success) => {
        res.status(200).send({ error: null, data: "data added successfully" });
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};

export let add_a_wishlist = (req, res) => {
  try {
    models.wishlist
      .create({ userId: req.user.id, itemId: req.body.itemid })
      .then((success) => {
        console.log(success);
        res.status(200).send({ error: null, data: "data added successfully" });
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};

export let delete_a_cart = (req, res) => {
  try {
    models.cart.destroy({ where: { id: req.params.id } }).then((success) => {
      res.status(200).send({ error: null, data: "data removed successfully" });
    });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};

export let delete_a_wishlist = (req, res) => {
  try {
    models.wishlist
      .destroy({ where: { id: req.params.id } })
      .then((success) => {
        res
          .status(200)
          .send({ error: null, data: "data removed successfully" });
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};

export let get_all_wishlist = (req, res) => {
  try {
    models.wishlist
      .findAll({
        raw: true,
        include: [
          {
            model: models.item,
            as: "item",
            required: true,
          },
        ],
      })
      .then((success) => {
        console.log(success);
        res.status(200).send({
          error: null,
          data: success.filter((suc) => suc.userId == req.user.id),
        });
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};

export let get_all_cart = (req, res) => {
  try {
    models.cart
      .findAll({
        where: { paymentId: null },
        raw: true,
        include: [
          {
            model: models.item,
            as: "item",
            required: true, // <---- HERE
          },
        ],
      })
      .then((success) => {
        const dataObj = success;

        res.status(200).send({
          error: null,
          data: dataObj,
        });
      });
  } catch (err) {
    console.log(err);
    res
      .status(503)
      .send({ error: "Something broke in data retrival", data: null });
  }
};
