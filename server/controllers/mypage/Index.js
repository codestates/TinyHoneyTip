const express = require('express');
const mypage = express();
const { getmypage, editmypage } = require('./MypageApi');
const upload = require('../../multer');

mypage.get('/', getmypage);
mypage.patch('/', upload.single('file'), editmypage);

module.exports = mypage;
