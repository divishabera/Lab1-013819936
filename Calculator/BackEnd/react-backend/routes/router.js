var express = require('express');
var router = express.Router();
var calculate_API = require('../api/calculate_API');


router.get('/addNumbers', calculate_API.add_numbers);
router.get('/subNumbers', calculate_API.sub_numbers);
router.get('/mulNumbers', calculate_API.mul_numbers);
router.get('/divNumbers', calculate_API.div_numbers);

module.exports = router;
