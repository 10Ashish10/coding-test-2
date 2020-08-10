const express = require('express');

const router = express.Router();

router.use('/pets', require('./pets'));

module.exports = router;