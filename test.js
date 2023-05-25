const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();

// 이메일 발송을 위한 SMTP 설정
const nodemailer = require('nodemailer');

// SMTP 클라이언트 생성
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL/TLS 사용
  auth: {
    user: 'js.jo@ehrnc.com',
    pass: '12345678',
  },
});
//////////////////////////////////////////////////////////////////////////

// 사용자가 이메일을 제출하면 일회용 토큰을 생성하고 이메일로 전송
app.post('/register', (req, res) => {
  const { email } = req.body;

  // 일회용 토큰 생성
  const token = crypto.randomBytes(20).toString('hex');

  // 토큰을 데이터베이스 또는 메모리에 저장
  // 이 예제에서는 변수에 저장하였습니다.
  // 실제로는 데이터베이스에 저장하는 것이 안전합니다.

  // 이메일 내용 설정
  const mailOptions = {
    from: 'js.jo@ehrnc.com',
    to: email,
    subject: 'Email Verification',
    text: `Please use the following token to verify your email: ${token}`
  };

  // 이메일 전송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send verification email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Verification email sent');
    }
  });
});

// 사용자가 토큰을 제출하여 인증
app.post('/verify', (req, res) => {
  const { token } = req.body;

  // 데이터베이스나 메모리에서 저장된 토큰과 비교하여 인증 확인
  // 이 예제에서는 변수에 저장된 토큰과 비교합니다.
  // 실제로는 데이터베이스에서 토큰을 확인하는 것이 안전합니다.

  const storedToken = '...'; // 저장된 토큰

  if (token === storedToken) {
    // 인증 성공
    res.status(200).send('Email verified');
  } else {
    // 인증 실패
    res.status(401).send('Invalid token');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
