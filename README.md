# BLM_DNN

## The Website using Falcon Template and BLM_DNN model 

#### The copyright of this template is in Falcon.

#### The copyright of BLM_DNN model (EU & ASIA) Copper belongs to Dr. Jung Ji-woong. 

## Directory Structure
```
BLM/
├── app.js
├── config
│   └── config.js
├── db
│   └── db.js
├── lib_login
│   ├── auth.js
│   ├── authCheck.js
│   └── template.js
├── public
│   ├── assets
│   ├── js
│   └── vendors
├── routes
│   ├── blm_cu.js
│   ├── blm_cu_b.js
│   ├── blm_cu_c.js
│   ├── blm_cu_asia.js
│   ├── blm_cu_b_asia.js
│   ├── blm_cu_c_asia.js
│   ├── home.js
│   ├── blm_ni.js
│   ├── blm_zn.js
│   ├── template.csv
│   └── index.js
└── views
   ├── index.ejs
   ├── home.ejs
   ├── introduction.ejs
   └── contents
    ├── blm_cu.ejs
    ├── blm_cu_b.ejs
    ├── blm_cu_c.ejs
    ├── blm_cu_asia.ejs
    ├── blm_cu_b_asia.ejs
    ├── blm_cu_c_asia.ejs
    ├── introduction.ejs
    ├── blm_ni.ejs
    ├── blm_zn.ejs
    ├── 404.ejs
    ├── login.ejs
    ├── logout.ejs
    ├── register.ejs
    ├── alert.ejs
    └── index.js
```
## Procedure
프로그램의 실행 순서 측면에서 보면 다음과 같이 파일들이 순차적으로 호출된다고 생각하면 편하다.

![simple](https://user-images.githubusercontent.com/29397382/234165076-e2ed8f9f-a4ec-4948-86b8-60f1dbafad4d.png)


