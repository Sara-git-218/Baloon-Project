const ReadyDesign = require("../models/ReadyDesign");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

const createReadyDesign = async (req, res) => {
    const { name, description, defaultColors, price, category, available } = req.body;
    const image_url = req.file ? '/uploads/' + req.file.filename : null;

    if (!name || !price || !image_url) {
        return res.status(400).send('name, price and image are required');
    }

    if (name.trim().length < 2) {
        return res.status(400).send("Name too short");
    }

    if (isNaN(price) || Number(price) <= 0) {
        return res.status(400).send("Price must be a positive number");
    }

    const double = await ReadyDesign.findOne({ name }).lean();
    if (double) {
        return res.status(400).send("name is not valid");
    }

    const colors = typeof defaultColors === 'string' ? defaultColors.split(',') : defaultColors;

    const readyDesign = await ReadyDesign.create({
        name,
        description,
        image_url,
        defaultColors: colors,
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
    const readyDesigns = await ReadyDesign.find().lean();
    if (!readyDesigns?.length) {
        return res.status(400).send('No readyDesign found');
    }
    res.json(readyDesigns);
};

const updateReadyDesign = async (req, res) => {
    const { _id, name, description, price, defaultColors, category, available } = req.body;
    const image_url = req.file ? '/uploads/' + req.file.filename : null;

    if (!_id ) {
        return res.status(400).send('_id is required');
    }

    if (name.trim().length < 2) {
        return res.status(400).send("Name too short");
    }

    if (isNaN(price) || Number(price) <= 0) {
        return res.status(400).send("Price must be a positive number");
    }

    const readyDesign = await ReadyDesign.findById(_id).exec();
    if (!readyDesign) {
        return res.status(400).send('ReadyDesign not found');
    }

    const double = await ReadyDesign.findOne({ name }).lean();
    if (double && double._id.toString() !== _id) {
        return res.status(400).send("name is not valid");
    }

    const colors = typeof defaultColors === 'string' ? defaultColors.split(',') : defaultColors;

    readyDesign.name = name;
    readyDesign.description = description ?? readyDesign.description;
    readyDesign.image_url = image_url !== null ? image_url : readyDesign.image_url;
    readyDesign.defaultColors = colors ?? readyDesign.defaultColors;
    readyDesign.price = price;
    readyDesign.category = category ?? readyDesign.category;
    readyDesign.available = available ?? readyDesign.available;

    const updatedReadyDesign = await readyDesign.save();
    res.json(await ReadyDesign.find().lean());
};

const deleteReadyDesign = async (req, res) => {
    const { _id } = req.body;

    const readyDesign = await ReadyDesign.findById(_id).exec();
    if (!readyDesign) {
        return res.status(400).send('readyDesign not found');
    }

    // אפשרות למחיקת הקובץ מהשרת:
    /*
    const imagePath = path.join(__dirname, '..', readyDesign.image_url);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
    */

    const result = await readyDesign.deleteOne();
    res.json(await ReadyDesign.find().lean());
};

const getReadyDesignById = async (req, res) => {
    const { id } = req.params;
    const readyDesign = await ReadyDesign.findById(id).lean();
    if (!readyDesign) {
        return res.status(400).send('No readyDesign found');
    }
    res.json(readyDesign);
};

module.exports = {
    upload,
    createReadyDesign,
    getAllReadyDesign,
    updateReadyDesign,
    deleteReadyDesign,
    getReadyDesignById
};
