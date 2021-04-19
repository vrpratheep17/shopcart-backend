import models from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index";

export let add_a_payment = (req, res) => {
  console.log(req.body);
  try {
    models.payment
      .create({
        userId: req.user.id,
        address: req.body.address,
        amount: req.body.amount,
        mode_of_payment: req.body.mode_of_payment,
      })
      .then((payment) => {
        const dataObj = payment.get({ plain: true });
        console.log(dataObj);
        models.cart
          .update({ paymentId: dataObj.id }, { where: { userId: req.user.id } })
          .then((numberOfAffectedRows) => {
            numberOfAffectedRows[0] > 0
              ? res
                  .status(200)
                  .send({ error: null, data: "Order Successfully Placed" })
              : res.status(404).send({
                  error: "Some Error in placing the order!",
                  data: null,
                });
          });
      });
  } catch (err) {
    console.log(err);
    res
      .status(503)
      .send({ error: "Something broke in data processing!", data: null });
  }
};

export let get_all_payment_user = (req, res) => {
  console.log(req.body);
  try {
    models.payment
      .findAll({
        where: { userId: req.user.id },
      })
      .then((payment) => {
        res.status(200).json({ error: null, data: payment });
      });
  } catch (err) {
    console.log(err);
    res
      .status(503)
      .send({ error: "Something broke in data processing!", data: null });
  }
};

export let get_all_payment_all = (req, res) => {
  console.log(req.body);
  try {
    models.payment
      .findAll({
        include: [models.cart, models.user],
      })
      .then((payment) => {
        res.status(200).json({ error: null, data: payment });
      });
  } catch (err) {
    console.log(err);
    res
      .status(503)
      .send({ error: "Something broke in data processing!", data: null });
  }
};

export let find_cart_by_payment_id = (req, res) => {
  console.log(req.params.id);
  try {
    models.cart
      .findAll({
        where: { paymentId: req.params.id },
        include: [
          {
            model: models.item,
            as: "item",
            required: true, // <---- HERE
          },
        ],
      })
      .then((data) => {
        res.status(200).json({ error: null, data: data });
      });
  } catch (err) {
    res
      .status(503)
      .send({ error: "Something broke in data processing!", data: null });
  }
};
