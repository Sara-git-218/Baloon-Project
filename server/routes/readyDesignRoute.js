
// const express = require("express");
// const router = express.Router();
// const path = require('path');
// const multer = require('multer');
// const readyDesignController = require("../controllers/readyDesignController");
// const verifyJWT = require("../middleware/verifyJWT");
// const adminMiddleware=require("../middleware/adminMiddleware")
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const baseName = req.body.name ? req.body.name.replace(/\s+/g, '_') : 'file';
//         const uniqueName = baseName + '-' + Date.now() + ext;
//         cb(null, uniqueName);
//     }
// });
// const upload = multer({ storage });

// //  פתוחים לכולם
// router.get("/getAllReadyDesign", readyDesignController.getAllReadyDesign);
// router.get("/getReadyDesignById/:id", readyDesignController.getReadyDesignById);

// router.use(verifyJWT,adminMiddleware);

// router.post("/createReadyDesign", upload.single('image'), readyDesignController.createReadyDesign);
// router.put("/updateReadyDesign",upload.single('image'), readyDesignController.updateReadyDesign);
// router.delete("/deleteReadyDesign", readyDesignController.deleteReadyDesign);

// module.exports = router;

const express = require("express");
const router = express.Router();
const readyDesignController = require("../controllers/readyDesignController");
const verifyJWT = require("../middleware/verifyJWT");
const adminMiddleware = require("../middleware/adminMiddleware");


router.get("/getAllReadyDesign", readyDesignController.getAllReadyDesign);
router.get("/getReadyDesignById/:id", readyDesignController.getReadyDesignById);


router.use(verifyJWT, adminMiddleware);
router.post("/createReadyDesign",readyDesignController.upload.single("image"),readyDesignController.createReadyDesign);
router.put( "/updateReadyDesign",readyDesignController.upload.single("image"),readyDesignController.updateReadyDesign);
router.delete("/deleteReadyDesign", readyDesignController.deleteReadyDesign);

module.exports = router;

