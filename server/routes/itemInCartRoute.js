const express = require("express")
const router = express.Router()

const itemInCartController = require("../controllers/itemInCartController")
const verifyJWT=require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/getAllItemInCart", itemInCartController.getAllItemInCart)
router.get("/getItemInCartById/:id", itemInCartController.getItemInCartById)
router.get("/getItemInCartByUser_id", itemInCartController.getItemInCartByUser_id)
router.post("/createItemInCart", itemInCartController.createItemInCart)
router.delete("/deleteItemInCart", itemInCartController.deleteItemInCart)
router.put("/updateItemInCart", itemInCartController.updateItemInCart)



module.exports = router