const express = require('express');
const mypage = express();
const { getmypage, editmypage } = require('./MypageApi');
const upload = require('../../multer');

mypage.get('/', getmypage);
mypage.patch('/', upload.single('profile_img'), editmypage);

module.exports = mypage;
