require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 80;

const controllers = require('./controllers/Index');

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
app.get('/', (req, res) => {
    res.send('helloworld');
});
app.use('/mypage', controllers.mypage);
app.use('/post', controllers.post);

app.delete('/user', controllers.user);
app.post('/signin', controllers.signin);
app.post('/signup', controllers.signup);
app.get('signout', controllers.signout);

app.listen(port, () => {
    console.log(`서버가 ${port}번에서 작동중입니다.`);
});
