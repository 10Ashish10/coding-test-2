const express = require('express');

const router = express.Router();

router.use('/pets', require('./users')); // exposed "/pets" path for url   

module.exports = router;