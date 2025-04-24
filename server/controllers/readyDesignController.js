const ReadyDesign = require("../models/ReadyDesign");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const createReadyDesign = async (req, res) => {
//     const { name, description, image_url, defaultColors, price, category, available } = req.body;

//     if (!name || !price) {
//         return res.status(400).send('name and price are required');
//     }

//     const double = await ReadyDesign.findOne({ name: name }).lean();
//     if (double) {
//         return res.status(400).send("name is not valid");
//     }

//     const readyDesign = await ReadyDesign.create({
//         name,
//         description,
//         image_url, // זה השם שתואם לשם מהקליינט
//         defaultColors,
//         price,
//         category,
//         available
//     });

//     if (readyDesign) {
//         return res.status(200).json(await ReadyDesign.find().lean());
//     } else {
//         return res.status(400).send('Invalid readyDesign');
//     }
// };


// Multer config – אחסון התמונות בתיקיית uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });


// יצירת עיצוב מוכן עם תמונה
const createReadyDesign = async (req, res) => {
    console.log("נכנס לקונטרולרררררר")
    console.log(req.file);  // בודק אם קובץ התמונות התקבל
    console.log(req.body);
    const { name, description, defaultColors, price, category, available } = req.body;
    const image_url = req.file ? '/uploads/' + req.file.filename : null;

    if (!name || !price || !image_url) {
        return res.status(400).send('name, price and image are required');
    }

    const double = await ReadyDesign.findOne({ name: name }).lean();
    if (double) {
        return res.status(400).send("name is not valid");
    }

    const readyDesign = await ReadyDesign.create({
        name,
        description,
        image_url,
        defaultColors,
        price,
        category,
        available
    });

    if (readyDesign) {
        return res.status(200).json(await ReadyDesign.find().lean());
    } else {
        return res.status(400).send('Invalid readyDesign');
    }
};



const getAllReadyDesign = async (req, res) => {
    const readyDesigns= await ReadyDesign.find().lean()
    if (!readyDesigns?.length) {
        return res.status(400).send( 'No readyDesign found' )
    }
    res.json(readyDesigns)
}

// const getReadyDesignByCategory=async(req,res)=>{

// }

const updateReadyDesign = async (req, res) => {
    const { _id,name,description,image_url,defaultColors,category,available } = req.body

    if (!_id || !name || !price ) {
        return res.status(400).send( '_id , name and price fields are required' )
    }

    const readyDesign = await ReadyDesign.findById(_id).exec()
    if (!readyDesign) {
        return res.status(400).send('ReadyDesign not found')
    }

    const double=await ReadyDesign.findOne({name:name}).lean()
    if(double && double._id != _id){//בדיקה שהשם הזהה הוא לא של הנוכחי
        return res.status(400).send("name is not valid")
    }

    readyDesign.name=name
    readyDesign.description=description
    readyDesign.image_url=image_url
    readyDesign.defaultColors=defaultColors
    readyDesign.price=price
    readyDesign.category=category
    readyDesign.available=available

    const updatedReadyDesign = await readyDesign.save()
    res.json(await ReadyDesign.find().lean())
}



const deleteReadyDesign = async (req, res) => {
    const { _id } = req.body

    const readyDesign = await ReadyDesign.findById(_id).exec()

    if (!readyDesign) {
        return res.status(400).send( 'readyDesign not found' )
    }

    const result = await readyDesign.deleteOne()

    res.json(await ReadyDesign.find().lean())
}

const getReadyDesignById = async (req, res) => {
    const { id } = req.params
    const readyDesign = await ReadyDesign.findById(id).lean()
    if (!readyDesign) {
        return res.status(400).send( 'No readyDesign found' )
    }
    res.json(readyDesign)
}

module.exports ={
    createReadyDesign,
    getAllReadyDesign,
    updateReadyDesign,
    deleteReadyDesign,
    getReadyDesignById
}