const express = require('express');
var app = express(); 
var app2=express()
const config = require('./config/config.js');
const bodyParser = require('body-parser');
const path = require("path");
const introRouter = require('./routes/introduce');
const guideRouter = require('./routes/guide');
const blmcuRouter = require('./routes/blm_cu');
const blmcubRouter = require('./routes/blm_cu_b');
const blmcucRouter = require('./routes/blm_cu_c');
const blmcuaRouter = require('./routes/blm_cu_asia');
const blmcubaRouter = require('./routes/blm_cu_b_asia');
const blmcucaRouter = require('./routes/blm_cu_c_asia');
const multer  = require('multer');
// const userRouter = require('./routes/user');
const https=require('https');
const http = require('http');
// login test
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const MemoryStore = require('memorystore')(session);
var authRouter = require('./lib_login/auth');
var authCheck = require('./lib_login/authCheck.js');
var template = require('./lib_login/template.js');
//
const fs = require('fs');


const IP_ADDRESS = config.app.ip; // 원하는 IP 주소 입력
const PORT = config.app.port; // 원하는 포트 번호 입력


const options = {
  key: fs.readFileSync('./172.30.1.43-key.pem'),
  cert: fs.readFileSync('./172.30.1.43.pem'),
  host:'172.30.1.43'
};

app.set('port', process.env.PORT || PORT);

app.use(bodyParser.urlencoded({ extended: true }));
const maxAge = 1000 * 60 * 15;
//login test
app.use(session({
    secret: 'ehrnc',	// 원하는 문자 입력
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
      maxAge,
    },
  }))
//
app.use(bodyParser.json());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use('/assets/', express.static(`${__dirname}/assets`));
app.engine('html', require('ejs').renderFile);
app.use(express.static('public')); 

//login 
// app.get('/', (req, res) => {
//     if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
//       res.redirect('/auth/login');
//       return false;
//     } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
//       res.redirect('/Intoduction');
//       return false;
//     }
//   })

app.use('/auth', authRouter);

app.get('/main', (req, res) => {
    if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
      res.redirect('/auth/login');
      return false;
    }
    var html = template.HTML('Welcome',
      `<hr>
          <h2>메인 페이지에 오신 것을 환영합니다</h2>
          <p>로그인에 성공하셨습니다.</p>`,
      authCheck.statusUI(req, res)
    );
    res.send(html);
  })
  
//

app.use('/', introRouter);

app.use('/Intoduction' ,introRouter)

app.use('/guide',guideRouter)

app.use('/blm_cu', blmcuRouter)

app.use('/blm_cu_b', blmcubRouter)

app.use('/blm_cu_c', blmcucRouter)

app.use('/blm_cu_asia', blmcuaRouter)

app.use('/blm_cu_b_asia', blmcubaRouter)

app.use('/blm_cu_c_asia', blmcucaRouter)

app.use((req, res, next) => {
    res.status(404).render('./contents/404.ejs');
    // res.render('./contents/404');
});


app.listen(app.get('port'), IP_ADDRESS, () => {
  console.log(`Server running on http://${IP_ADDRESS}:${PORT}`);
});

// const httpsServer = https.createServer(options, app);

// httpsServer.listen(PORT, ()=>{
//   console.log((new Date()).toLocaleString());
//   console.log(`HTTPS -- listening on port ${PORT} ...`);
// })



// // const HTTP_PORT = 8080;
// // http.createServer(app2).listen(HTTP_PORT);
// // const HTTPS_PORT = 8443;
// // https.createServer(options, app).listen(PORT,IP_ADDRESS);

