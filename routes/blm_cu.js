var express = require('express'); 
var bodyParser = require('body-parser'); 
var app = express();
const router = express.Router();
const path = require("path");
var request = require('request-promise');      
const multer  = require('multer');
const upload = multer({ dest: '/uploads' });
const fs = require('fs');
const config = require ('../config/config.js');
var authCheck = require('../lib_login/authCheck.js');
router.get('/', (req, res) => {
    if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
        res.redirect('/auth/login');
        return false;
    }
    res.render('./contents/blm_cu',{data:"", data2:"", data3:"", data4:"",pH:"",ChRCR:"",AcRCR:""});
});

router.post('/', upload.single('file'), (req,res)=> {
    if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
        res.redirect('/auth/login');
        return false;
    }
    const formId = req.body.formId;
    // console.log(formId);
    if(formId === 'form1'){
    const name =req.body;
    var options = {
        method: 'POST',
    
        // http:flaskserverurl:port/route
        uri: 'http://'+config.app.ip+':'+config.app.port_flask+'/cu',
        body: name,
    
        // Automatically stringifies
        // the body to JSON 
        json: true
    };
    var sendrequest = request(options)
    
    // The parsedBody contains the data
    // sent back from the Flask server 
        .then(function (parsedBody) {
            // console.log(parsedBody);
               
            // You can do something with
            // returned data

            var lists_in=[name['cu_pH_input'],name['cu_mg_input'],name['cu_ca_input'],name['cu_na_input'],name['cu_al_input'],name['cu_doc_input'],name['cu_dc_input'],name['cu_dc2_input']];


            let result;
            let result2;
            let result3;
            let result4;
            
            //both
            if(name['cu_dc_input']!="" & name['cu_dc2_input']!=""){
                result  = parsedBody['result'];
                result  = result.toExponential(2)
                result2 = parsedBody['result2'];
                result2  = result2.toExponential(2)
                result3 = parsedBody['result3'];
                result3  = result3.toExponential(2)
                result4 = parsedBody['result4'];
                result4  = result4.toExponential(2)
                var lists=[result,result2,result3,result4];

                res.render('./contents/blm_cu',{pH:"",ChRCR:"",AcRCR:"",data:lists[0], data2:lists[1], data3:lists[2], data4:lists[3],
                in_ph:lists_in[0],in_mg:lists_in[1],in_ca:lists_in[2],in_na:lists_in[3],in_al:lists_in[4],in_doc:lists_in[5],in_dc:lists_in[6],in_dc2:lists_in[7]});  

            //eu 
            } else if(name['cu_dc2_input']===""){
                result  = parsedBody['result'];
                result  = result.toExponential(2)
                result2 = parsedBody['result2'];
                result2  = result2.toExponential(2)
                var lists=[result,result2];

                res.render('./contents/blm_cu',{pH:"",ChRCR:"",AcRCR:"",data:lists[0], data2:lists[1],data3:"", data4:"",
                in_ph:lists_in[0],in_mg:lists_in[1],in_ca:lists_in[2],in_na:lists_in[3],in_al:lists_in[4],in_doc:lists_in[5],in_dc:lists_in[6]});      

            //asia
            } else if(name['cu_dc_input']===""){
                result3 = parsedBody['result3'];
                result3  = result3.toExponential(2)
                result4 = parsedBody['result4'];
                result4  = result4.toExponential(2)
                var lists=[result3,result4];

                res.render('./contents/blm_cu',{pH:"",ChRCR:"",AcRCR:"",data3:lists[0], data4:lists[1],data:"", data2:"",
                in_ph:lists_in[0],in_mg:lists_in[1],in_ca:lists_in[2],in_na:lists_in[3],in_al:lists_in[4],in_doc:lists_in[5],in_dc:lists_in[7]});  
            
            }
        })
        
      
    .catch(function (err) {
        console.log(err);
    });
    } else if (formId === 'form2'){
        const files = req.file;
        if (files === undefined){
            // res.render('./contents/404')
            return res.render('./contents/alert', {error: 'please input csv file'});
        }
        else if (files != null) {
        var options = {
            method: 'POST',
        
            // http:flaskserverurl:port/route
            uri: 'http://'+config.app.ip+':'+config.app.port_flask+'/cu2',
            formData: {
                file: {
                    value: fs.createReadStream(files.path),
                    options: {
                        filename: files.originalname,
                        contentType: files.mimetype
                    }
                }
            }
        
            // Automatically stringifies
            // the body to JSON 
        };
        var sendrequest = request(options)
        .then(function (parsedBody) {
            // console.log(parsedBody)
            var data_s = JSON.parse(parsedBody);
            //both
            if(data_s.hasOwnProperty('Chronic RCR') & data_s.hasOwnProperty('Acute RCR')){
                // console.log(data_s.hasOwnProperty('Chronic RCR') & data_s.hasOwnProperty('Acute RCR'))
                res.render('./contents/blm_cu',{data:"", data2:"", data3:"", data4:"", pH:Object.values(data_s['pH']), Mg:Object.values(data_s['Mg']),
                Ca:Object.values(data_s['Ca']), Na:Object.values(data_s['Na']),DOC:Object.values(data_s['DOC']),
                Alk:Object.values(data_s['Alkalinity']),BLM_eu:Object.values(data_s['BLM-based chronic PNEC']),ChRCR:Object.values(data_s['Chronic RCR']),BLM_asia:Object.values(data_s['BLM-based acute PNEC']),AcRCR:Object.values(data_s['Acute RCR'])})               
            }//eu
            else if(data_s.hasOwnProperty('Chronic RCR')) { 
                res.render('./contents/blm_cu',{data:"", data2:"", data3:"", data4:"",AcRCR:"", pH:Object.values(data_s['pH']), Mg:Object.values(data_s['Mg']),
                Ca:Object.values(data_s['Ca']), Na:Object.values(data_s['Na']),DOC:Object.values(data_s['DOC']),
                Alk:Object.values(data_s['Alkalinity']),BLM_eu:Object.values(data_s['BLM-based chronic PNEC']),ChRCR:Object.values(data_s['Chronic RCR']),BLM_asia:Object.values(data_s['BLM-based acute PNEC'])})
            }//asia
            else if(data_s.hasOwnProperty('Acute RCR')){
                res.render('./contents/blm_cu',{data:"", data2:"", data3:"", data4:"",ChRCR:"", pH:Object.values(data_s['pH']), Mg:Object.values(data_s['Mg']),
                Ca:Object.values(data_s['Ca']), Na:Object.values(data_s['Na']),DOC:Object.values(data_s['DOC']),
                Alk:Object.values(data_s['Alkalinity']),BLM_eu:Object.values(data_s['BLM-based chronic PNEC']),BLM_asia:Object.values(data_s['BLM-based acute PNEC']),AcRCR:Object.values(data_s['Acute RCR'])})
            }//none
            else { 
                res.render('./contents/blm_cu',{data:"", data2:"", data3:"", data4:"", ChRCR:"",AcRCR:"",pH:Object.values(data_s['pH']), Mg:Object.values(data_s['Mg']),
                 Ca:Object.values(data_s['Ca']), Na:Object.values(data_s['Na']),DOC:Object.values(data_s['DOC']),
                Alk:Object.values(data_s['Alkalinity']),BLM_eu:Object.values(data_s['BLM-based chronic PNEC']),BLM_asia:Object.values(data_s['BLM-based acute PNEC']),DC:""})                
            }
        });
    }} else {
        console.log("unknown button");
    }
});


module.exports = router;