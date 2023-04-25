var express = require('express'); 
var bodyParser = require('body-parser'); 
var app = express();
const router = express.Router();
const path = require("path");
var request = require('request-promise');      

router.get('/', (req, res) => {
    res.render('./contents/blm_ni');
});

router.post('/',(req,res)=> {
    const name = req.body;

    var options = {
        method: 'POST',
    
        // http:flaskserverurl:port/route
        uri: 'http://127.0.0.1:5000/ni',
        body: name,
    
        // Automatically stringifies
        // the body to JSON 
        json: true
    };
    var sendrequest = request(options)
    
    // The parsedBody contains the data
    // sent back from the Flask server 
        .then(function (parsedBody) {
            console.log(parsedBody);
                
            // You can do something with
            // returned data
            let result;
            let result2;
            let result3;
            let result4;
            result  = parsedBody['result'];
            result  = result.toFixed(3)
            result2 = parsedBody['result2'];
            result2  = result2.toFixed(3)
            result3 = parsedBody['result3'];
            result3  = result3.toFixed(3)
            result4 = parsedBody['result4'];
            result4  = result4.toFixed(3)
            console.log("eu-model-a: ", result,result2);
            console.log("asia-model-a: ", result3,result4);
            
        })
    .catch(function (err) {
        console.log(err);
    });
    res.render('./contents/blm_ni');
});

module.exports = router;