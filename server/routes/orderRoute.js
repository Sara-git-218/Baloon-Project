const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")
const verifyJWT=require("../middleware/verifyJWT")
const adminMiddleware=require("../middleware/adminMiddleware")
router.use(verifyJWT,adminMiddleware)

router.get("/getAllOrder", orderController.getAllOrder)
router.get("/getOrderById/:id", orderController.getOrderById)
router.get("/getOrderByStatus/:status", orderController.getOrdersByStatus)
router.get("/getOrderByUser_id", orderController.getOrderByUser_id)
router.post("/createOrder", orderController.createOrder)
router.delete("/deleteOrder", orderController.deleteOrder)
router.put("/updateOrder", orderController.updateOrder)
router.put("/updateStatus", orderController.updateStatus)
module.exports = router