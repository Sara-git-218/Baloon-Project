// const express = require("express")
// const router = express.Router()

// const readyDesignController = require("../controllers/readyDesignController")
// const verifyJWT=require("../middleware/verifyJWT")//תלוי האם ניתן להכנס כאורח
// const { upload } = require('../controllers/readyDesignController');

// router.get("/getAllReadyDesign", readyDesignController.getAllReadyDesign)
// router.get("/getReadyDesignById/:id", readyDesignController.getReadyDesignById)
// router.post("/createReadyDesign", readyDesignController.createReadyDesign)
// router.use(verifyJWT)

// router.post('/', upload.single('image'), readyDesignController.createReadyDesign);
// router.delete("/deleteReadyDesign", readyDesignController.deleteReadyDesign)
// router.put("/updateReadyDesign", readyDesignController.updateReadyDesign)

// module.exports = router
const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const readyDesignController = require("../controllers/readyDesignController");
const verifyJWT = require("../middleware/verifyJWT");
const fs = require('fs');
// const path = require('path');

// וודא שהתיקייה קיימת לפני ששומרים את הקובץ
// const uploadsDir = path.join(__dirname, 'uploads');

// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }
// הגדרת multer לאחסון תמונות
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = req.body.name ? req.body.name.replace(/\s+/g, '_') : 'file';
        const uniqueName = baseName + '-' + Date.now() + ext;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// ראוטים פתוחים לכולם
router.get("/getAllReadyDesign", readyDesignController.getAllReadyDesign);
router.get("/getReadyDesignById/:id", readyDesignController.getReadyDesignById);

// רק אם צריך לוודא הרשאות – מכאן ואילך
// router.use(verifyJWT);

// יצירת עיצוב מוכן – כולל קובץ
router.post("/createReadyDesign", upload.single('image'), readyDesignController.createReadyDesign);

// עדכון ומחיקה
router.put("/updateReadyDesign",upload.single('image'), readyDesignController.updateReadyDesign);
router.delete("/deleteReadyDesign", readyDesignController.deleteReadyDesign);

module.exports = router;
