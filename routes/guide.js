var express = require('express'); 
var bodyParser = require('body-parser'); 
var app = express();
const router = express.Router();
const path = require("path");
var authCheck = require('../lib_login/authCheck.js');

router.get('/', (req, res) => {
    if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
        res.redirect('/auth/login');
        return false;
    }
    res.render('./contents/BLM_DNN_Guide_EN');
});

module.exports = router;