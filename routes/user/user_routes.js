import express from "express";
const router = express.Router();

// controller import
import {
  login,
  sign_up,
  get_all_users,
  send_otp,
  verify_otp,
  add_user_address,
  add_a_cart,
  add_a_wishlist,
  delete_a_cart,
  delete_a_wishlist,
  get_all_cart,
  get_all_wishlist,
} from "../../controller/user/user_controller";
import route_protection from "../../utils/routeprotection";

// @route   POST /user/signup
// @desc    to signup the user
// @access  public
router.post("/signup", sign_up);

// @route   POST /user/login
// @desc    to login the user
// @access  public
router.post("/login", login);

// @route   POST /user/sendotp
// @desc    send otp to the user
// @access  public
router.post("/sendotp", send_otp);

// @route   POST /user/verifyotp
// @desc    verify otp to the user
// @access  public
router.post("/verifyotp", verify_otp);

// @route   POST /user/useraddress
// @desc    to add user address
// @access  private
router.post("/adduseraddress", route_protection, add_user_address);

// @route   GET /user/cart              POST /user/cart
// @desc    to get all the cart         to add the item to cart
// @access  private                     private
router
  .route("/cart")
  .get(route_protection, get_all_cart)
  .post(route_protection, add_a_cart);

// @route   GET /user/wishlist          POST /user/wishlist
// @desc    to get all the wishlist     to add the item to wishlist
// @access  private                     private
router
  .route("/wishlist")
  .get(route_protection, get_all_wishlist)
  .post(route_protection, add_a_wishlist);

// @route   DELELTE /user/deleteacart/:id
// @desc    delete a cart based on id
// @access  private
router.delete("/deleteacart/:id", route_protection, delete_a_cart);

// @route   DELELTE /user/deleteawishlist/:id
// @desc    delete a wishlist based on id
// @access  private
router.delete("/deleteawishlist/:id", route_protection, delete_a_wishlist);

// @route   GET /user/getallusers
// @desc    to get all users
// @access  private
router.get("/getallusers", get_all_users);

export default router;
