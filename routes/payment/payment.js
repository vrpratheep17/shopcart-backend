import express from "express";
const router = express.Router();

// controller import
import {
  add_a_payment,
  get_all_payment_user,
  get_all_payment_all,
  find_cart_by_payment_id,
} from "../../controller/payment/payment";
import route_protection from "../../utils/routeprotection";

// @route   POST /payment/addapayment
// @desc    to add a payment
// @access  public
router.post("/addapayment", route_protection, add_a_payment);

// @route   GET /payment/payment
// @desc    to gett all payments for a user
// @access  public
router.get("/payment", route_protection, get_all_payment_user);

// @route   GET /payment/payment
// @desc    to gett all payments
// @access  public
router.get("/allpayment", get_all_payment_all);

router.get("/paymentcart/:id", route_protection, find_cart_by_payment_id);

export default router;
