require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 80;
nginx;

const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
    }),
);
app.use(cookieParser());
app.use('/mypage', controllers.mypage);
app.delete('/user', controllers.user);
app.use('/post', controllers.post);

app.post('/signin', controllers.user);
app.post('/signup', controllers.user);
app.get('signout', controllers.user);

app.listen(port, () => {
    console.log(`서버가 ${port}번에서 작동중입니다.`);
});
