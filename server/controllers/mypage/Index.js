const express = require('express');
const mypage = express();
const { getmypage, editmypage } = require('./MypageApi');

mypage.get('/', getmypage);
mypage.patch('/', editmypage);

module.exports = mypage;
