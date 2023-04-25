var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

// 로그인 화면
router.get('/login', (req, res) => {
    res.render('../views/contents/login.ejs');
});

// 로그인 프로세스
router.post('/login_process', function (request, response) {
    var username = request.body.username;
    var password = request.body.pwd;
    if (username && password) {             // id와 pw가 입력되었는지 확인
        
        db.query('SELECT * FROM userTable WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                request.session.is_logined = true;      // 세션 정보 갱신
                request.session.nickname = username;
                request.session.save(function () {
                    response.redirect(`/`);
                });
            } else {              
                response.send(`<script type="text/javascript">alert("Login information does not match."); 
                document.location.href="/auth/login";</script>`);    
            }            
        });

    } else {
        response.send(`<script type="text/javascript">alert("Enter your ID and password!"); 
        document.location.href="/auth/login";</script>`);    
    }
});

// 로그아웃
// router.get('/logout', (req, res) => {
//     res.render('../views/contents/logout.ejs');
// });

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        const html = `
        <!DOCTYPE html>
        <html lang="en-US" dir="ltr">
        
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        
        
            <!-- ===============================================-->
            <!--    Document Title-->
            <!-- ===============================================-->
            <title>DNN model for BLM vol.1</title>
        
        
            <!-- ===============================================-->
            <!--    Favicons-->
            <!-- ===============================================-->
            <link rel="apple-touch-icon" sizes="180x180" href="../../assets/img/favicons/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="../../assets/img/favicons/EHRNC-32X32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="../../assets/img/favicons/EHRNC-16X16.png">
            <link rel="shortcut icon" type="image/x-icon" href="../../assets/img/favicons/EHRNC.ico">
            <link rel="manifest" href="../../../assets/img/favicons/manifest.json">
            <meta name="msapplication-TileImage" content="../../assets/img/favicons/EHRNC_150x150.png">
            <meta name="theme-color" content="#ffffff">
            <script src="../../../assets/js/config.js"></script>
            <script src="../../../vendors/simplebar/simplebar.min.js"></script>
        
        
            <!-- ===============================================-->
            <!--    Stylesheets-->
            <!-- ===============================================-->
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet">
            <link href="../../../vendors/simplebar/simplebar.min.css" rel="stylesheet">
            <link href="../../../assets/css/theme-rtl.min.css" rel="stylesheet" id="style-rtl">
            <link href="../../../assets/css/theme.min.css" rel="stylesheet" id="style-default">
            <link href="../../../assets/css/user-rtl.min.css" rel="stylesheet" id="user-style-rtl">
            <link href="../../../assets/css/user.min.css" rel="stylesheet" id="user-style-default">
            <script>
              var isRTL = JSON.parse(localStorage.getItem('isRTL'));
              if (isRTL) {
                var linkDefault = document.getElementById('style-default');
                var userLinkDefault = document.getElementById('user-style-default');
                linkDefault.setAttribute('disabled', true);
                userLinkDefault.setAttribute('disabled', true);
                document.querySelector('html').setAttribute('dir', 'rtl');
              } else {
                var linkRTL = document.getElementById('style-rtl');
                var userLinkRTL = document.getElementById('user-style-rtl');
                linkRTL.setAttribute('disabled', true);
                userLinkRTL.setAttribute('disabled', true);
              }
            </script>
          </head>
        
        
          <body>
        
            <!-- ===============================================-->
            <!--    Main Content-->
            <!-- ===============================================-->
            <main class="main" id="top">
              <div class="container-fluid">
                <div class="row min-vh-100 flex-center g-0">
                  <div class="col-lg-8 col-xxl-5 py-3 position-relative"><img class="bg-auth-circle-shape" src="../../../assets/img/icons/spot-illustrations/bg-shape.png" alt="" width="250"><img class="bg-auth-circle-shape-2" src="../../../assets/img/icons/spot-illustrations/shape-1.png" alt="" width="150">
                    <div class="card overflow-hidden z-index-1">
                      <div class="card-body p-0">
                        <div class="row g-0 h-100">
                          <div class="col-md-5 text-center bg-card-gradient">
                            <div class="position-relative p-4 pt-md-5 pb-md-7 light">
                              <div class="bg-holder bg-auth-card-shape" style="background-image:url(../../../assets/img/icons/spot-illustrations/half-circle.png);">
                              </div>
                              <!--/.bg-holder-->
        
                              <div class="z-index-1 position-relative"><a class="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder" href="/auth/login">EH R&C</a>
                                <p class="opacity-75 text-white">An independent scientific consultancy on the global issues of environmental health and ecosystem</p>
                              </div>
                            </div>
                            <div class="mt-3 mb-4 mt-md-4 mb-md-5 light">
                            </br>
                            </div>
                          </div>
                          <div class="col-md-7 d-flex flex-center">
                            <div class="p-4 p-md-5 flex-grow-1">
                              <div class="text-center"><img class="d-block mx-auto mb-4" src="../../../assets/img/icons/spot-illustrations/45.png" alt="shield" width="100" />
                                <h3>See you again!</h3>
                                <p>Thanks for Comming EH R&C. <br/> You are now successfully signed out.</p><a class="btn btn-primary btn-sm mt-3" href="/auth/login"><span class="fas fa-chevron-left me-1" data-fa-transform="shrink-4 down-1"></span>Return to Login</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <!-- ===============================================-->
            <!--    End of Main Content-->
            <!-- ===============================================-->
        
        
            <!-- ===============================================-->
            <!--    JavaScripts-->
            <!-- ===============================================-->
            <script src="../../../vendors/popper/popper.min.js"></script>
            <script src="../../../vendors/bootstrap/bootstrap.min.js"></script>
            <script src="../../../vendors/anchorjs/anchor.min.js"></script>
            <script src="../../../vendors/is/is.min.js"></script>
            <script src="../../../vendors/fontawesome/all.min.js"></script>
            <script src="../../../vendors/lodash/lodash.min.js"></script>
            <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
            <script src="../../../vendors/list.js/list.min.js"></script>
            <script src="../../../assets/js/theme.js"></script>
        
          </body>
        
        </html>
        `;
        res.send(html);
      }
    });
  });
  


// 회원가입 화면
router.get('/register', (req, res) => {
    res.render('../views/contents/register.ejs');
});
 
// 회원가입 프로세스
router.post('/register_process', function(request, response) {    
    var username = request.body.username;
    var password = request.body.pwd;    
    var password2 = request.body.pwd2;
    var affiliation =request.body.affi;
    var country = request.body.count;
    var sector = request.body.sect;
    if (username && password && password2 && affiliation && country && sector) {
        
        db.query('SELECT * FROM userTable WHERE username = ?', [username], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
                db.query('INSERT INTO userTable (username, password, Affiliation, Country, Sector) VALUES(?,?,?,?,?)', [username, password, affiliation, country, sector], function (error, data) {
                    if (error) throw error2;
                    response.send(`<script type="text/javascript">alert("Your Register is complete!");
                    document.location.href="/";</script>`);
                });
            } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우
                response.send(`<script type="text/javascript">alert("The passwords entered are different."); 
                document.location.href="/auth/register";</script>`);    
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우
                response.send(`<script type="text/javascript">alert("The ID or Email already exists."); 
                document.location.href="/auth/register";</script>`);    
            }            
        });

    } else {        // 입력되지 않은 정보가 있는 경우
        response.send(`<script type="text/javascript">alert("There is information that has not been entered."); 
        document.location.href="/auth/register";</script>`);
    }
});

module.exports = router;