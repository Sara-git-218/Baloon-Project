const express=require("express")
const router=express.Router()

const userController=require("../controllers/userController")
const verifyJWT=require("../middleware/verifyJWT")
const adminMiddleware=require("../middleware/adminMiddleware")
router.use(verifyJWT,adminMiddleware)
router.get("/getAllUsers",userController.getAllUsers)
router.get("/getUserById/:id",userController.getById)
router.delete("/deleteUser",userController.deleteUser)
router.put("/updateUser",userController.updateUserById)

module.exports=router