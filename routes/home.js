var express = require('express'); 
var bodyParser = require('body-parser'); 
var app = express();
const router = express.Router();
const path = require("path");


router.get('/', (req, res) => {
    res.render('intoduction');
});

module.exports = router;