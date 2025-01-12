const express=require("express")
const router=express.Router()

const userController=require("../controllers/userController")
const verifyJWT=require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/getAllUsers",userController.getAllUsers)
router.get("/getUserById/:id",userController.getById)
router.delete("/deleteUser",userController.deleteUser)
router.put("/updateUser",userController.updateUserById)

module.exports=router