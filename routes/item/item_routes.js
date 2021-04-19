import express from "express";

// controller import
import {add_a_item,get_all_items,delete_a_item, update_a_item} from "../../controller/item/item_controller";
import route_protection from "../../utils/routeprotection"

const router = express.Router();



// @route   POST /item/addaitem
// @desc    to add a item
// @access  private
router.post("/addaitem",add_a_item)

// @route   GET /item/getallitems
// @desc    to get all items
// @access  private
router.get("/getallitems",get_all_items)



// @route   DELETE /item/item/:id    PUT /item/item/:id
// @desc    to delete a item         to update an item
// @access  private                  private
router.route("/item/:id").delete(delete_a_item).put(update_a_item)

export default router;