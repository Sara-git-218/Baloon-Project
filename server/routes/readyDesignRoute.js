const express = require("express")
const router = express.Router()

const readyDesignController = require("../controllers/readyDesignController")
const verifyJWT=require("../middleware/verifyJWT")//תלוי האם ניתן להכנס כאורח


router.get("/getAllReadyDesign", readyDesignController.getAllReadyDesign)
router.get("/getReadyDesignById/:id", readyDesignController.getReadyDesignById)
router.post("/createReadyDesign", readyDesignController.createReadyDesign)
router.use(verifyJWT)
router.delete("/deleteReadyDesign", readyDesignController.deleteReadyDesign)
router.put("/updateReadyDesign", readyDesignController.updateReadyDesign)

module.exports = router