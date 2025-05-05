
const express = require('express');
const router = express.Router();
const fonts = require('../models/FontOptions');
router.get('/', (req, res) => {
    res.json(fonts);
  });
  
  module.exports = router;
  